"use client"

import axios from 'axios'
import OTPComponent from './OTPComponent'

export default function VerificationPage({storeEmail}) {

  const sendCode = async () => {
    alert("clicked")
    try {
      const res = await axios.post('http://localhost:8000/email/verify/send', {
        "email": storeEmail.current,
      })
      console.log(res.data.message);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  const confirmCode = async (code) => {
    try {
      const res = await axios.post('http://localhost:8000/email/verify/confirm', {
        email: storeEmail.current,
        code: code
      })
      console.log(res.data.check);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  return (
    <div>
      <OTPComponent confirmCode={confirmCode}/>
      <button onClick={sendCode}>Test</button>
    </div>
  )
}
