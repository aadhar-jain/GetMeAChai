"use client"

import "./page.scss";
import React, { useState, useEffect } from 'react'
import Script from 'next/script'
import { fetchUser, fetchpayments, initiate } from '@/actions/useractions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

const PaymentPage = ({ username }) => {
    const [paymentform, setpaymentform] = useState({ name: "", message: "", amount: "" })
    const handleChange = (e) => {
        setpaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }
    const searchParams = useSearchParams()
    const router = useRouter()

    //calls getdata on 
    useEffect(() => {
        getData()

    }, [])

    useEffect(() => {
        if (searchParams.get("paymentdone") == "true") {
            toast('Thanks for your donation!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });

            router.push(`/${username}`)
        }
    }, [])


    const [currentUser, setcurrentUser] = useState({})
    const [Payments, setPayments] = useState([])
    //getting data from Payments from the database
    const getData = async () => {
        let u = await fetchUser(username);
        setcurrentUser(u);

        let dbPayments = await fetchpayments(username);
        setPayments(dbPayments);
    }

    const pay = async (amount) => {
        //get orderId
        let a = await initiate(amount, username, paymentform);
        if(a.error){
            toast(`Cannot complete transaction! Try later`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
            return;
        }

        let orderId = a.id;

        var options = {
            "key": currentUser.razorpayId, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": currentUser.name, //your business name
            "description": "Test Transaction",
            "image": currentUser.profilepic,
            "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": currentUser.name, //your customer's name
                "email": currentUser.email,
                "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };


        var rzp1 = new Razorpay(options);
        rzp1.open();
    }

    return (
        <>
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark" />
            <ToastContainer />


            <div className='profilePage'>

                <div className="images">
                    <img className='coverImg' src={currentUser.coverpic} alt="" />
                    <img className='profileImg' src={currentUser.profilepic} alt="" />
                </div>
                <div className='profileContent'>
                    <div className="userDetails">
                        <span>{currentUser.name}</span>
                        <span>@{currentUser.username}</span>
                        <span>{Payments.length} Payments</span>
                    </div>

                    <div className="payment">
                        <div className="paymentLeft">
                            <h2>Top 10 supporters</h2>
                            <ul>
                                {Payments.length == 0 && <li>No payments yet</li>}
                                {Payments.map((p, i) => {
                                    return <li key={i}>
                                        <img src="/profileIcon.gif" alt="" />
                                        <span>{p.name} donated</span><span className='donation'>&nbsp;₹{p.amount}&nbsp;</span> <span>with a message &quot;{p.message}&quot;</span>
                                    </li>
                                })}

                            </ul>
                        </div>
                        <div className="paymentRight">
                            <h2>Make a Payment</h2>
                            <input onChange={handleChange} value={paymentform.name} name='name' placeholder='Enter name' type="text" />
                            {paymentform.name != "" && paymentform.name.length < 3 && <div style={{ color: "red", fontSize: "smaller" }}>name is too short</div>}
                            {paymentform.name.length > 8 && <div style={{ color: "red", fontSize: "smaller" }}>name is too long</div>}

                            <input onChange={handleChange} value={paymentform.message} name='message' placeholder='Enter message' type="text" />
                            {paymentform.message != "" && paymentform.message.length < 2 && <div style={{ color: "red", fontSize: "smaller" }}>message is too short</div>}
                            {paymentform.message.length > 18 && <div style={{ color: "red", fontSize: "smaller" }}>message is too long</div>}

                            <input onChange={handleChange} value={paymentform.amount} name='amount' placeholder='Enter amount' type="number" />
                            {paymentform.amount.toString().split('.')[1]?.length > 2 && <div style={{ color: "red", fontSize: "smaller" }}>Enter amount upto 2 decimal places(max)</div>}
                            {paymentform.amount < 1 && paymentform.amount != "" && <div style={{ color: "red", fontSize: "smaller" }}>Enter atleast ₹1 to make payment</div>}

                            <button className='payBtn' disabled={paymentform.name.length < 3 || paymentform.name.length > 8 || paymentform.message.length < 2 || paymentform.message.length > 18 || paymentform.amount < 1 || paymentform.amount > 50000 || paymentform.amount.toString().split('.')[1]?.length > 2} onClick={() => { pay(paymentform.amount * 100) }} >Pay</button>

                            <div className="instantPay">
                                <button disabled={paymentform.name.length < 3 || paymentform.name.length > 8 || paymentform.message.length < 2 || paymentform.message.length > 18} onClick={() => { pay(2000) }}>Pay ₹20</button>
                                <button disabled={paymentform.name.length < 3 || paymentform.name.length > 8 || paymentform.message.length < 2 || paymentform.message.length > 18} onClick={() => { pay(3000) }}>Pay ₹30</button>
                                <button disabled={paymentform.name.length < 3 || paymentform.name.length > 8 || paymentform.message.length < 2 || paymentform.message.length > 18} onClick={() => { pay(5000) }}>Pay ₹50</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default PaymentPage
