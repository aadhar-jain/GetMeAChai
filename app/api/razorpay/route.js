import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import connectDB from "@/db/connectDb";
import User from "@/models/User";
import Payment from "@/models/Payment";

export const POST = async(req)=>{
    await connectDB();
    let body = await req.formData();
    body = Object.fromEntries(body)

    //check if razorpay orderId is present on the server
    let p = await Payment.findOne({oid : body.razorpay_order_id})
    if(!p){
        return NextResponse.json( {success : false , message : "Order ID not found"} );
    }

    //fetch the key secret of the user getting the payment
    let user = await User.findOne({username : p.to_user})
    const key_secret = user.razorpaySecret;

    //verify the payment (wether it was completed succesfully or not)
    let xx = validatePaymentVerification({"order_id" : body.razorpay_order_id , "payment_id" : body.razorpay_payment_id } , body.razorpay_signature , key_secret );

    if(xx){
        //update payment status
        const updatedPayment =  await Payment.findOneAndUpdate({oid : body.razorpay_order_id} , {done : true}, {new : true});
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentdone=true`);
    }
    else{
        return NextResponse.json( {success : false , message : "Payment Verification Failed"} );
    }
}