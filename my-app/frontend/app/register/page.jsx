"use client"

import React from 'react'
import RegisterForm from './RegisterForm'
import UseAlert from './Alert'
import VerificationPage from './VerificationPage'

export default function Register() {
  const [alertShow, setAlertShow] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState(false);
  const [verifyShow, setVerifyShow] = React.useState(false);
  const storeEmail = React.useRef();

  return (
    !verifyShow ? (
      <div>
        {alertShow && <UseAlert message={alertMessage}/>}
        <RegisterForm 
          setAlertShow={setAlertShow} 
          setAlertMessage={setAlertMessage} 
          setVerifyShow={setVerifyShow}
          storeEmail={storeEmail}
        />
      </div>
    ) : (
      <div>
        <VerificationPage storeEmail={storeEmail}/>
      </div>
    )
  )
}
