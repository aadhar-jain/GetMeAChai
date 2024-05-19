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
    if (key_id === undefined || key_id == "" || key_secret === undefined || key_secret == "") {
        return { error: 1 };
    }
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

    await User.updateOne({ username: oldusername }, ndata);        //ensure that email & username is never changed

    //check if user had tried to change its username
    if (oldusername != newusername || oldemail != ndata.email) {
        return { error: 1 };
    }
    else {
        return { error: 0 };
    }

}

export const fetchSearchResults = async (searchString) => {
    await connectDB();
    
    if(searchString == ""){
        return await User.find({}).lean();
    }
    
    const usersWithPayments = await User.aggregate([
        {
            $match: {
                $or: [
                    { username: { $regex: searchString, $options: "i" } },
                    { name: { $regex: searchString, $options: "i" } },
                ]
            }
        },
        {
            $lookup: {
                from: "payments", // Name of the Payment collection
                localField: "username", // Field in User collection
                foreignField: "to_user", // Field in Payment collection
                as: "paymentsReceived" // Alias for the joined documents
            }
        },
        {
            $addFields: {
                filteredPayments: {
                    $filter: {
                        input: "$paymentsReceived",
                        as: "payment",
                        cond: { $eq: ["$$payment.done", true] } // Filter payments where "done" is true
                    }
                },
                totalPaymentsReceived: {
                    $size: {
                        $filter: {
                            input: "$paymentsReceived",
                            as: "payment",
                            cond: { $eq: ["$$payment.done", true] }
                        }
                    }
                }
            }
        },
        {
            $sort: { totalPaymentsReceived: -1 } // Sort users by the number of payments received in descending order
        }
    ]);

    // Flatten the result and include all fields from User collection
    const flattenedResult = usersWithPayments.map(user => ({
        ...user, // Include all fields from the User collection
        totalPaymentsReceived: user.totalPaymentsReceived // Include the computed field
    }));

    return flattenedResult;
};
