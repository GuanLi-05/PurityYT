"use client"

import axios from 'axios'
import OTPComponent from './OTPComponent'
import React from 'react'
import { AlertError, AlertSuccess } from '../../Alert';
import Load from '../../Load';
import { Transition } from '@headlessui/react';
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react";

const URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function VerificationPage({ storeEmail, storeFname, storeLname, storePassword }) {
  const [showAlert, setShowAlert] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const alertMessage = React.useRef("");
  const alertHeader = React.useRef("");
  const sentRef = React.useRef(false);
  const router = useRouter();

  /* Send email verification request to backend */
  const sendCode = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${URL}/email/verify/send`, {
        "email": storeEmail.current,
      })
      setShowAlert("success");
      alertMessage.current = res.data.message;
      setLoading(false);
    } catch (error) {
      setShowAlert("error");
      alertMessage.current = error.response?.data?.error || "";
      alertHeader.current = error.response?.data?.header || "Something Went Wrong";
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
      await axios.post(`${URL}/email/verify/confirm`, {
        email: storeEmail.current,
        code: code
      })
      registerUser();
    } catch (error) {
      setShowAlert("error");
      alertMessage.current = error.response?.data?.error || "";
      alertHeader.current = error.response?.data?.header || "Something Went Wrong";
    }
  }

  /* Register user into DB */
  const registerUser = async () => {
    try {
      const res = await axios.post(`${URL}/register`, {
        fname: storeFname.current,
        lname: storeLname.current,
        email: storeEmail.current,
        password: storePassword.current
      })
      setShowAlert("success");
      alertMessage.current = res.data.message;
      handleLogin(storeEmail.current, storePassword.current);
    } catch (error) {
      setShowAlert("error");
      alertMessage.current = error.response?.data?.error || "";
      alertHeader.current = error.response?.data?.header || "Something Went Wrong";
    }
  }

  const handleLogin = async (email, password) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password
    });

    if (res.error) {
      if (res.error === "CredentialsSignin") {
        setShowAlert("error");
        alertMessage.current = "Incorrect email or password.";
      } else {
        setShowAlert("error");
        alertMessage.current = res.error + ": Log in denied.";
      }
      setAlertShow(true);
    } else {
      router.push("/dashboard");
    }
  };

  /* Send email verification on mount */
  React.useEffect(() => {
    if (!sentRef.current) {
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


