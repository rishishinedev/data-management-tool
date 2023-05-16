import { Request, Response } from 'express';
import multer from 'multer';
import fs from 'fs';
import csvParser from 'csv-parser';
import { unlink } from 'node:fs';
import userModel, {
  IUser,
} from '../models/userModel';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${Date.now()}_${file.originalname}`
    );
  },
});

const upload = multer({ storage });

const uploadCSV = async (
  req: Request,
  res: Response
) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ error: 'No file uploaded' });
  }

  const filePath = req.file.path;
  const {
    totalRecordsInserted,
    totalDuplicateRecordInCSV,
    totalDuplicateRecordInDB,
  }: any = await uploadAndInsertData(filePath);

  return res.status(200).json({
    status: 'Data uploaded',
    totalRecordsInserted,
    totalDuplicateRecordInCSV,
    totalDuplicateRecordInDB,
  });
};

async function uploadAndInsertData(
  csvFilePath: string
): Promise<object> {
  const existingEmails: Set<string> = new Set();
  let recordsInserted = 0;
  let duplicateRecordInCSV = 0;
  let duplicateRecordInDB = 0;

  const stream = fs
    .createReadStream(csvFilePath)
    .pipe(csvParser());

  for await (const record of stream) {
    const { email } = record;

    if (existingEmails.has(email)) {
      duplicateRecordInCSV++;
      continue;
    }

    const user: IUser = new userModel(record);
    try {
      await user.save();
      existingEmails.add(email);
      recordsInserted++;
    } catch (error) {
      duplicateRecordInDB++;
    }
  }

  unlink(csvFilePath, (err) => {});

  return {
    totalRecordsInserted: recordsInserted,
    totalDuplicateRecordInCSV:
      duplicateRecordInCSV,
    totalDuplicateRecordInDB: duplicateRecordInDB,
  };
}

export default { upload, uploadCSV };
