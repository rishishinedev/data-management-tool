//@ts-nocheck
import { Request, Response } from 'express';
import multer from 'multer';
import fs from 'fs';
import csvParser from 'csv-parser';
import userController from './../controllers/userController';
import path from 'path';
import userModel from '../models/userModel';
jest.mock('csv-parser', () => jest.fn());

describe('userController', () => {
  describe('uploadCSV', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
      req = {
        file: {
          path: 'example.csv',
          originalname: 'example.csv',
        },
      } as Request;
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    test('should return 400 if no file is uploaded', async () => {
      req.file = undefined;

      await userController.uploadCSV(req, res);

      expect(res.status).toHaveBeenCalledWith(
        400
      );
      expect(res.json).toHaveBeenCalledWith({
        error: 'No file uploaded',
      });
    });

    test('should return 404 if the file does not exist', async () => {
      fs.existsSync = jest
        .fn()
        .mockReturnValue(false);

      await userController.uploadCSV(req, res);

      expect(fs.existsSync).toHaveBeenCalledWith(
        'example.csv'
      );
      expect(res.status).toHaveBeenCalledWith(
        404
      );
      expect(res.json).toHaveBeenCalledWith({
        status: 'failed',
        message: 'File does not exist',
      });
    });
  });

  describe('uploadAndInsertData', () => {
    test('should upload and insert data successfully', async () => {
      const csvFilePath = 'example.csv';

      const mockStream = {
        pipe: jest.fn().mockReturnThis(),
      };

      fs.createReadStream = jest
        .fn()
        .mockReturnValue(mockStream);
      csvParser.mockReturnValue(mockStream);
    });
  });
});
