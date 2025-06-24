"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator
} from "@/components/ui/input-otp"

export default function OTPComponent({confirmCode}) {
  const ref = React.useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const c = ref.current.value;
    if (c === null || c === undefined || c.length !== 6 || !/^[0-9]{6}$/.test(c)) {
      return;
    }
    confirmCode(c);
  }

  return (
    <form onSubmit={handleSubmit} className="w-2/3 space-y-6">
      <div className="space-y-2 flex flex-col items-center">
        <div>
          <InputOTP maxLength={6} ref={ref}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <div className="text-center text-sm mt-5">
          <Button type="submit">Submit</Button>
        </div>
      </div>
    </form>
  )
}