import { CallbackWithoutResultAndOptionalError, Schema } from "mongoose";
import { ROL } from "src/utils/enums/roles";
import { TextEncrypt } from "src/utils/helpers/encryptor";
import { UserData } from "../types/user-data.type";

const UserSchema = new Schema<UserData>({
  rol: {
    type: String,
    enum: ROL,
    require: true,
    default: ROL.GUEST,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  create_at: {
    type: Date,
    default: new Date(),
  },
});

UserSchema.pre(
  "save",
  async function (next: CallbackWithoutResultAndOptionalError): Promise<void> {
    const textEncrypt = new TextEncrypt(this.password);
    this.password = await textEncrypt.encrypt();
    next();
  }
);

export default UserSchema;
