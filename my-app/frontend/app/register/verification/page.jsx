"use client"

import React from 'react'
import axios from 'axios'

export default function page() {

  const sendCode = async () => {
    alert("clicked")
    try {
      const res = await axios.post(`http://localhost:8000/email/verify/send`, {
        "email": "pinega5302@kimdyn.com",
      })
      console.log(res.data.message);
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  }

  return (
    <div>
      <button onClick={sendCode}>Test</button>
    </div>
  )
}

















































