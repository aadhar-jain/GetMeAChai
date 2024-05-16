"use server";

import Razorpay from "razorpay";
import connectDB from "@/db/connectDb";
import User from "@/models/User";
import Payment from "@/models/Payment";

export const initiate = async (amount, to_username, paymentform) => {
    //connect to DB
    await connectDB();

    //fetch the key secret of the user getting the payment
    let user = await User.findOne({ username: to_username })
    const key_secret = user.razorpaySecret;
    const key_id = user.razorpayId;

    //creating a instance i.e a new razorpay order
    var instance = new Razorpay({ key_id: key_id, key_secret: key_secret });

    let options = {
        amount: Number.parseFloat(amount),
        currency: "INR",
    }

    let x = await instance.orders.create(options);

    //create a payment object which shows a pending payment in the database
    await Payment.create({ oid: x.id, amount: amount / 100, to_user: to_username, name: paymentform.name, message: paymentform.message })

    return x;
}

export const fetchUser = async (username) => {
    await connectDB();
    let u = await User.findOne({ username: username });
    let user = u?.toObject({ flattenObjectIds: true });
    return user;
}

export const fetchpayments = async (username) => {
    await connectDB()

    //find all payments made to this username and sort them in decreasing order of amount
    let p = await Payment.find({ to_user: username, done: true }).sort({ amount: -1 }).limit(10).lean();
    return p
}

export const updateProfile = async (data, oldusername, oldemail) => {
    await connectDB();
    let ndata = Object.fromEntries(data);

    let newusername = ndata.username;
    ndata.username = oldusername;

    await User.updateOne({ email: ndata.email}, ndata);        //ensure that email & username is never changed

    //check if user had tried to change its username
    if (oldusername != newusername || oldemail != ndata.email) {
        return { error: 1 };
    }
    else{
        return {error : 0};
    }

}