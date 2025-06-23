"use client"

import React from 'react'
import RegisterForm from './RegisterForm'
import UseAlert from './Alert'

export default function Register() {
  const [alertShow, setAlertShow] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState(false);
  return (
    <div>
      {alertShow && 
        <UseAlert message={alertMessage}/>
      }
      <RegisterForm setAlertShow={setAlertShow} setAlertMessage={setAlertMessage}/>
    </div>
  )
}
