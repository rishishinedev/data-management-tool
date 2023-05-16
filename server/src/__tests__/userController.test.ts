import { Request, Response } from 'express';
import multer from 'multer';
import fs from 'fs';
import csvParser from 'csv-parser';
import userModel, {
  IUser,
} from '../models/userModel';
import uploadController from './../controllers/userController';

jest.mock('multer');
jest.mock('fs');
jest.mock('csv-parser');
jest.mock('../models/userModel');

describe('Upload Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: jest.Mock;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle file upload and return success response', async () => {
    const filePath = './example.csv';
    const totalRecordsInserted = 10;
    const totalDuplicateRecord = 2;

    mockRequest.file = {
      path: filePath,
    };

    jest
      .spyOn(
        uploadController,
        'uploadAndInsertData'
      )
      .mockResolvedValue({
        totalRecordsInserted,
        totalDuplicateRecord,
      });

    await uploadController.uploadCSV(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(
      mockResponse.status
    ).toHaveBeenCalledWith(200);
    expect(
      mockResponse.json
    ).toHaveBeenCalledWith({
      status: 'Data uploaded',
      totalRecordsInserted,
      totalDuplicateRecord,
    });
  });

  it('should handle file upload with no file and return error response', async () => {
    await uploadController.uploadCSV(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(
      mockResponse.status
    ).toHaveBeenCalledWith(400);
    expect(
      mockResponse.json
    ).toHaveBeenCalledWith({
      error: 'No file uploaded',
    });
  });

  it('should upload and insert data from CSV file', async () => {
    const csvFilePath = './example.csv';
    const existingEmails = new Set<string>([
      'test@example.com',
    ]);
    const recordsInserted = 1;
    const duplicateRecordInFile = 1;

    jest
      .spyOn(fs, 'createReadStream')
      .mockReturnValueOnce({
        pipe: jest.fn().mockReturnValueOnce({
          [Symbol.asyncIterator]: jest
            .fn()
            .mockReturnValueOnce({
              next: jest
                .fn()
                .mockResolvedValueOnce({
                  value: {
                    email: 'new@example.com',
                  },
                  done: false,
                })
                .mockResolvedValueOnce({
                  value: undefined,
                  done: true,
                }),
            }),
        }),
      });

    jest
      .spyOn(userModel.prototype, 'save')
      .mockResolvedValueOnce({});

    const result =
      await uploadController.uploadAndInsertData(
        csvFilePath
      );

    expect(
      fs.createReadStream
    ).toHaveBeenCalledWith(csvFilePath);
    expect(
      userModel.prototype.save
    ).toHaveBeenCalledTimes(recordsInserted);
    expect(result).toEqual({
      totalRecordsInserted: recordsInserted,
      totalDuplicateRecord: duplicateRecordInFile,
    });
  });
});
