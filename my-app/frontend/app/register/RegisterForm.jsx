"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useRouter } from 'next/navigation';
import {
  IconBrandGoogle,
} from "@tabler/icons-react";
import Link from 'next/link';

export default function RegisterForm({setAlertShow, setAlertMessage, setVerifyShow, storeEmail}) {
  const router = useRouter();
  //router.push("/")
  const firstName = React.useRef();
  const lastName = React.useRef();
  const email = React.useRef();
  const password = React.useRef();
  const confirmPassword = React.useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const fn = firstName.current.value?.trim();
    console.log("First name: " + fn); // print debug
    if (!checkFirstName(fn)) {
      setAlertShow(false);
      setAlertMessage("First names must be 2 to 15 characters long and may only contain letters, optionally separated by a single hyphen (-), apostrophe ('), or space.");
      setAlertShow(true);
      return;
    } 

    const ln = lastName.current.value?.trim();
    console.log("Last name: " + ln); // print debug
    if (!checkLastName(ln)) {
      setAlertShow(false);
      setAlertMessage("Last names must be 2 to 15 characters long and may only contain letters.");
      setAlertShow(true);
      return;
    } 

    // add check: email doesnt already exist
    const em = email.current.value?.trim();
    console.log("Email: " + em); // print debug
    if (!checkEmail(em)) {
      setAlertShow(false);
      setAlertMessage("Invalid email address");
      setAlertShow(true);
      return;
    }
    storeEmail.current = em;
    
    const pw = password.current.value?.trim();
    console.log("Password: " + pw); // print debug
    if (!checkPassword(pw)) {
      setAlertShow(false);
      setAlertMessage("Password must be longer than 8 characters. Passwords must contain a lowercase letter, an uppercase letter and a number.");
      setAlertShow(true);
      return;
    } 

    const cpw = confirmPassword.current.value?.trim();
    console.log("Confirm: " + cpw); // print debug
    if (!checkConfirm(pw, cpw)) {
      setAlertShow(false);
      setAlertMessage("Passwords do not match");
      setAlertShow(true);
      return;
    } 

    setVerifyShow(true);
  };

  ///////////////////////////////////
  // Input Constraints
  ///////////////////////////////////

  const checkFirstName = (fn) => {
    return fn != null && fn != undefined && fn.length >= 2 && fn.length <= 15 && /^[a-zA-ZÀ-ÿ]+([ '-][a-zA-ZÀ-ÿ]+)*$/.test(fn);
  }

  const checkLastName = (ln) => {
    return ln != null && ln != undefined && ln.length >= 2 && ln.length <= 15 && /^[a-zA-ZÀ-ÿ]+$/.test(ln);
  }

  const checkEmail = (em) => {
    return em != null && em != undefined && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em);
  }

  const checkPassword = (pw) => {
    return pw != null && pw != undefined && pw.length > 8 && /[a-z]+/.test(pw) && /[A-Z]+/.test(pw) && /[0-9]+/.test(pw) 
  }

  const checkConfirm = (pw, cpw) => {
    return cpw != null && cpw != undefined && pw === cpw;
  }

  ///////////////////////////////////

  return (
    <div
      className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Welcome to PurityYT
      </h2>
      <p className="mt-1.5 mb-5 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
       Create an account to get started.
      </p>
      <form className="mt-2" onSubmit={handleSubmit} noValidate>
        <div
          className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input id="firstname" placeholder="John" type="text" ref={firstName}/>
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input id="lastname" placeholder="Doe" type="text" ref={lastName}/>
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="johndoe77@gmail.com" type="email" ref={email} />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••••" type="password" ref={password}/>
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="twitterpassword">Confirm password</Label>
          <Input id="twitterpassword" placeholder="••••••••••" type="password" ref={confirmPassword}/>
        </LabelInputContainer>

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit">
          Sign up &rarr;
          <BottomGradient />
        </button>

        <div
          className="my-7 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

        <div className="flex flex-col space-y-4">
          <span className="max-w-sm text-[0.8rem] text-neutral-500 dark:text-neutral-400">
            Or continue with:
          </span>
          <button
            className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
            type="submit">
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              Google
            </span>
            <BottomGradient />
          </button>
          <span className="max-w-sm text-[0.8rem] text-neutral-500 dark:text-neutral-400">
            Have an account?{" "}
            <Link href="/login" className="font-medium text-neutral-700 dark:text-neutral-300 hover:underline">
              Log In
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span
        className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span
        className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
