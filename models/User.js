import mongoose from "mongoose";
const {Schema , model} = mongoose;

const UserSchema = new Schema({
    email : {type : String , required : true},
    name : {type : String },
    username : {type : String , required : true},
    profilepic : {type : String , default : "/defaultProfile.webp"},
    coverpic : {type : String, default : "/defaultCover.gif"},
    razorpayId : {type : String},
    razorpaySecret : {type : String},
    createdAt : {type : Date , default : Date.now},
    UpdatedAt : {type : Date , default : Date.now},
});

export default mongoose.models.User || model("User" , UserSchema);