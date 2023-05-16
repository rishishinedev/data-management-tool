import mongoose, {
  Schema,
  Document,
} from 'mongoose';
import validator from 'validator';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

const userSchema: Schema<IUser> =
  new Schema<IUser>({
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [
        validator.isEmail,
        'Please provide a valid email',
      ],
      lowercase: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
  });

const userModel = mongoose.model<IUser>(
  'User',
  userSchema
);
export default userModel;
