import React from 'react'
import PaymentPage from '@/components/PaymentPage/PaymentPage';
import { notFound } from "next/navigation";
import connectDB from '@/db/connectDb';
import User from '@/models/User';

const Username = async ({ params }) => {  

  //if profile you are searching doesn't exist
  await connectDB();
  let u = await User.findOne({username : params.username});
  if(!u){
    return notFound();
  }

  return (
    <>
      <PaymentPage username = {params.username}/>
    </>
  )
}

export default Username

//setting page title
export async function generateMetadata({params}){
  return{
    title : `${params.username} - Get Me a CHAI `,
  }
}