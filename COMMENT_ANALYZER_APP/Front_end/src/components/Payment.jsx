import React from 'react'
import {Box,Stack} from "@chakra-ui/react"
import Card from './Card'
import axios from "axios"

const Payment = () => {

  const checkouthandler =async(amount)=>{
    const {data:{key}}=await axios.get("http://localhost:3001/payment/api/getkey")
    const {data:{order}}=await axios.post("http://localhost:3001/payment/checkout",{amount})
    console.log(window);
    const options ={
      key,
      amount:order.amount,
      currency:"INR",
      name:`${localStorage.getItem('username')}`,
      description:"Razorpay",
      image:"https://avatars.githubusercontent.com/u/133936044?s=400&u=e7eb26da0874714a82280267208ef26cd98536b9&v=4",
      order_id:order.id,
      callback_url:"http://localhost:3001/payment/paymentverification",
      prefill:{
        name:`${localStorage.getItem('username')}`,
        email:"rudrapatel2992003@gmail.com",
        contact:"1234567890"
      },
      notes:{
        "address":"razorapy official"
      },
      theme:{
        "color":"#3399cc"
      }
    };
    const razor = new window.Razorpay(options);
    razor.open();

  }

  return (
    <Box>
    <Stack h={"100vh"} justifyContent={"center"} alignItems={"center"} direction={["column","row"]}>
     <Card amount={3000} img={"https://images.pexels.com/photos/17117471/pexels-photo-17117471/free-photo-of-close-up-of-pink-flowers.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"} checkouthandler={checkouthandler}  />
     <Card amount={3000} img={"https://images.pexels.com/photos/18285166/pexels-photo-18285166/free-photo-of-toast-with-glasses-of-cold-drinks.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"} checkouthandler={checkouthandler}  />
    </Stack>
  </Box>
  )
}

export default Payment