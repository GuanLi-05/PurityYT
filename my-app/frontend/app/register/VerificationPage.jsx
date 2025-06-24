"use client"

import axios from 'axios'
import OTPComponent from './OTPComponent'
import React, { useRef } from 'react'
import { SendEmailError, SendEmailSuccess } from './Alert';
import Load from './Load';

export default function VerificationPage({storeEmail}) {
  const [showAlert, setShowAlert] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const alertMessage = useRef("");

  /* Send email verification request to backend */
  const sendCode = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8000/email/verify/send', {
        "email": storeEmail.current,
      })
      setShowAlert("success");
      alertMessage.current = res.data.message;
      console.log(res.data.message);
      setLoading(false);
    } catch (error) {
      setShowAlert("error");
      alertMessage.current = error.response?.data?.error || "";
      console.log(error.response?.data?.error);
      setLoading(false);
    }
  }

  /* Confirm verification request to backend */
  const confirmCode = async (code) => {
    try {
      const res = await axios.post('http://localhost:8000/email/verify/confirm', {
        email: storeEmail.current,
        code: code
      })
      setShowAlert("success");
      alertMessage.current = res.data.message;
      console.log(res.data.message); 
    } catch (error) {
      setShowAlert("error");
      alertMessage.current = error.response?.data?.error || "";
      console.log(error.response?.data?.error);
    }
  }

  /* Send email verification on mount */
  React.useEffect(() => {
    (async function () {
      await sendCode();
    })();
  }, []);

  return (
    <div>
      {loading ? (
        <Load/>
      ) : (
        <div className="flex flex-col justify-center items-center shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
          <div>
            <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
              Verify Email
            </h2>
            <p className="mt-2 mb-10 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
              Enter the one-time password sent to your email
            </p>
          </div>
          <OTPComponent confirmCode={confirmCode} />
        </div>
        
      )}
      {showAlert === "error" ? 
        (<SendEmailError message={alertMessage.current}/>) : showAlert === "success" ? 
        (<SendEmailSuccess message={alertMessage.current}/>) : 
        (<></>)
      }
    </div>
    
  )
}


