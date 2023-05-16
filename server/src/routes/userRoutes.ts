import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

router.post(
  '/upload-csv',
  userController.upload.single('file'),
  userController.uploadCSV
);

export default router;
