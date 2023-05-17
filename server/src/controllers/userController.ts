import { Request, Response } from 'express';
import multer from 'multer';
import fs from 'fs';
import csvParser from 'csv-parser';
import { unlink } from 'node:fs';
import userModel, {
  IUser,
} from '../models/userModel';

const csvFilter = (
  req: Request,
  file: any,
  cb: any
) => {
  if (
    file.mimetype === 'text/csv' ||
    file.originalname.endsWith('.csv')
  ) {
    cb(null, true);
  } else {
    cb(new Error('Only CSV files are allowed'));
  }
};

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

const upload = multer({
  storage,
  fileFilter: csvFilter,
});

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

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({
      status: 'failed',
      message: 'File does not exist',
    });
  }

  const {
    totalRecordsInserted,

    totalDuplicateRecordInDB,
  }: any = await uploadAndInsertData(filePath);

  return res.status(200).json({
    status: 'Data uploaded',
    totalRecordsInserted,

    totalDuplicateRecordInDB,
  });
};

async function uploadAndInsertData(
  csvFilePath: string
): Promise<object> {
  let recordsInserted = 0;
  let duplicateRecordInDB = 0;

  const stream = fs
    .createReadStream(csvFilePath)
    .pipe(csvParser());

  for await (const record of stream) {
    const user: IUser = new userModel(record);
    try {
      await user.save();
      recordsInserted++;
    } catch (error) {
      duplicateRecordInDB++;
    }
  }

  unlink(csvFilePath, (err) => {});

  return {
    totalRecordsInserted: recordsInserted,
    totalDuplicateRecordInDB: duplicateRecordInDB,
  };
}

export default {
  upload,
  uploadCSV,
  uploadAndInsertData,
};
