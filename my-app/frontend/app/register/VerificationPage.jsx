"use client"

import axios from 'axios'
import OTPComponent from './OTPComponent'
import React, { useRef } from 'react'
import { SendEmailError, SendEmailSuccess } from './Alert';

export default function VerificationPage({storeEmail}) {
  const [showAlert, setShowAlert] = React.useState(null);
  const alertMessage = useRef("");

  const sendCode = async () => {
    alert("clicked")
    try {
      const res = await axios.post('http://localhost:8000/email/verify/send', {
        "email": storeEmail.current,
      })
      setShowAlert("success");
      alertMessage.current = res.data.message;

    } catch (error) {
      setShowAlert("error");
      alertMessage.current = error.response?.data?.error || "";
    }
  }

  const confirmCode = async (code) => {
    try {
      const res = await axios.post('http://localhost:8000/email/verify/confirm', {
        email: storeEmail.current,
        code: code
      })
      setShowAlert("success");
      alertMessage.current = res.data.message;
    } catch (error) {
      setShowAlert("error");
      alertMessage.current = error.response?.data?.error || "";
    }
  }

  return (
    <div>
      {showAlert === "error" ? 
        (<SendEmailError message={alertMessage.current}/>) : showAlert === "success" ? 
        (<SendEmailSuccess message={alertMessage.current}/>) : 
        (<></>)
      }
      <OTPComponent confirmCode={confirmCode}/>
      <button onClick={sendCode}>Test</button>
    </div>
  )
}
