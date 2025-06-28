"use client"

import React from 'react'
import LoginForm from './LoginForm'
import { AlertError } from '../../Alert'
import { Transition } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import Load from '../../Load';

export default function Login() {
  const router = useRouter();
  const [alertShow, setAlertShow] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState(false);
  const { data: session, status } = useSession();

  React.useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status]);

  /* Dismiss alert on keydown */
  React.useEffect(() => {
    const handleKeydown = () => {
      setAlertShow(false);
    }
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown)
    }
  }, [])

  return (
    status === "unauthenticated" ? (
      <>
        <div className="flex justify-center items-center h-[92vh]">
          <Transition
            show={alertShow}
            enter="transition ease-out duration-300"
            enterFrom="opacity-0 translate-y-4"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-4"
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div>
              <AlertError header="Invalid Registration Details" message={alertMessage} />
            </div>
          </Transition>

          <LoginForm
            setAlertShow={setAlertShow}
            setAlertMessage={setAlertMessage}
          />
        </div>
      </>
    ) : (
      <Load />
    )
  )
}
