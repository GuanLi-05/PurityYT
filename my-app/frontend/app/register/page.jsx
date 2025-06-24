"use client"

import React from 'react'
import RegisterForm from './RegisterForm'
import { AlertError } from './Alert'
import VerificationPage from './VerificationPage'
import { Transition } from '@headlessui/react';

export default function Register() {
  const [alertShow, setAlertShow] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState(false);
  const [verifyShow, setVerifyShow] = React.useState(false);
  const storeEmail = React.useRef();

  return (
  !verifyShow ? (
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

      <RegisterForm 
        setAlertShow={setAlertShow} 
        setAlertMessage={setAlertMessage} 
        setVerifyShow={setVerifyShow}
        storeEmail={storeEmail}
      />
    </div>
  ) : (
    <div>
      <VerificationPage storeEmail={storeEmail} />
    </div>
  )
);
}
