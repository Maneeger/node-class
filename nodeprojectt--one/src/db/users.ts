import mongoose from "mongoose";

const userschema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  userType: { type: Number, required: true },

  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessiontoken: { type: String, select: false },
  },
});

export const Usermodel = mongoose.model("user", userschema);

export const getusers = () => Usermodel.find();
export const getusersbyemail = (email: string) => Usermodel.findOne({ email });
export const getusertype = (userType: number) =>  Usermodel.findOne({ userType });
export const getusersbyid = (id: string) => Usermodel.findOne({ id });
export const createuser = (values: Record<string, any>) =>
  new Usermodel(values).save().then((user) => user.toObject());
export const getuserbysesssiontoken = (sessiontoken: string) =>
  Usermodel.findOne({
    "authentication.sessiontoken": sessiontoken,
  });
export const deleteuserbyid = (id: string) =>
  Usermodel.findOneAndDelete({ _id: id });
export const updateuserbyid = (id: string, values: Record<string, any>) =>
  Usermodel.findByIdAndUpdate(id, values);
