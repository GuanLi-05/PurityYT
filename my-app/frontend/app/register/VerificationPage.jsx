"use client"

import axios from 'axios'
import OTPComponent from './OTPComponent'
import React, { useRef } from 'react'
import { AlertError, AlertSuccess } from './Alert';
import Load from './Load';
import { Transition } from '@headlessui/react';

const URL = 'http://localhost:8000';

export default function VerificationPage({ storeEmail, storeFname, storeLname, storePassword }) {
  const [showAlert, setShowAlert] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const alertMessage = useRef("");
  const alertHeader = useRef("");
  const sentRef = React.useRef(false);

  /* Send email verification request to backend */
  const sendCode = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${URL}/email/verify/send`, {
        "email": storeEmail.current,
      })
      setShowAlert("success");
      alertMessage.current = res.data.message;
      console.log(res.data.message);
      setLoading(false);
    } catch (error) {
      setShowAlert("error");
      alertMessage.current = error.response?.data?.error || "";
      alertHeader.current = error.response?.data?.header || "Something Went Wrong";
      console.log(error.response?.data?.error);
      setLoading(false);
    }
  }

  /* Confirm verification request to backend */
  const confirmCode = async (code) => {
    if (code === null || code === undefined || code.length !== 6 || !/^[0-9]{6}$/.test(code)) {
      alertHeader.current = "Invalid Passkey"
      alertMessage.current = "Please fill in the required 6 digits"
      setShowAlert("error");
      return;
    }
    try {
      const res = await axios.post(`${URL}/email/verify/confirm`, {
        email: storeEmail.current,
        code: code
      })
      registerUser();
      setShowAlert("success");
      alertMessage.current = res.data.message;
      console.log(res.data.message);
    } catch (error) {
      setShowAlert("error");
      alertMessage.current = error.response?.data?.error || "";
      alertHeader.current = error.response?.data?.header || "Something Went Wrong";
      console.log(error.response?.data?.error);
    }
  }

  const registerUser = async () => {
    alert("called");
    try {
      const res = axios.post(`${URL}/register`, {
        fname: storeFname,
        lname: storeLname,
        email: storeEmail,
        password: storePassword
      })
    } catch (error) {
      console.log(error.response?.data?.error);
    }
  }

  /* Send email verification on mount */
  React.useEffect(() => {
    alert("debug");
    if (!sentRef.current) {
      alert("internal debug");
      sendCode();
      sentRef.current = true;
    }
  }, []);

  /* Dismiss alert on keydown */
  React.useEffect(() => {
    const handleKeydown = () => {
      setShowAlert(false);
    }
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown)
    }
  }, [])

  return (
    <div>
      {loading ? (
        <Load />
      ) : (
        <div className="flex flex-col justify-center items-center shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
          <div>
            <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
              Verify Email
            </h2>
            <p className="mt-2 mb-10 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
              Enter the one-time passkey sent to your email
            </p>
          </div>
          <OTPComponent confirmCode={confirmCode} />
        </div>

      )}

      <Transition
        show={showAlert === "error"}
        enter="transition ease-out duration-300"
        enterFrom="opacity-0 translate-y-4"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-200"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-4"
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50"
      >
        <div>
          <AlertError header={alertHeader.current} message={alertMessage.current} />
        </div>
      </Transition>
      <Transition
        show={showAlert === "success"}
        enter="transition ease-out duration-300"
        enterFrom="opacity-0 translate-y-4"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-200"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-4"
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50"
      >
        <div>
          <AlertSuccess header="Success!" message={alertMessage.current} />
        </div>
      </Transition>
    </div>

  )
}


