import React, { useEffect } from "react";
import { Box, Stack } from "@chakra-ui/react";
import Card from "./Card";
import axios from "axios";

const Payment = () => {
  useEffect(() => {
    checkouthandler();
  }, []);

  const checkouthandler = async (amount) => {
    const {
      data: { key },
    } = await axios.get("http://localhost:3001/payment/api/getkey");
    const {
      data: { order },
    } = await axios.post("http://localhost:3001/payment/checkout", { amount });
    console.log(window);
    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: `${localStorage.getItem("username")}`,
      description: "Razorpay",
      image:
        "https://avatars.githubusercontent.com/u/133936044?s=400&u=e7eb26da0874714a82280267208ef26cd98536b9&v=4",
      order_id: order.id,
      callback_url: "http://localhost:3001/payment/paymentverification",
      prefill: {
        name: `${localStorage.getItem("username")}`,
        email: "rudrapatel2992003@gmail.com",
        contact: "1234567890",
      },
      notes: {
        address: "razorapy official",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();
  };
  return (
    <>
      <Box>
        <Stack
          h={"100vh"}
          justifyContent={"center"}
          alignItems={"center"}
          direction={["column", "row"]}
        >
          <Card
            amount={200}
            img={
              "/logo.png"
            }
            checkouthandler={checkouthandler}
          >
          </Card>
        </Stack>
      </Box>
    </>
  );
};

export default Payment;
