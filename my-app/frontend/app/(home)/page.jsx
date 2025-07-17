"use client"
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Load from "../Load";
import { Vanish } from "./Vanish";
import { motion } from "motion/react";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  React.useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status]);

  return (
    status === "loading" ? (
      <Load />
    ) : (status === "unauthenticated" && <>
      <Vanish />
      <motion.p
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.3,
          delay: 0.8,
        }}
        className="mt-[3rem] relative z-10 mx-auto max-w-xl py-2 text-center text-sm font-normal text-neutral-600 dark:text-neutral-400">
        Want to take it a step further ?
      </motion.p>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.3,
          delay: 1,
        }}
        className="relative z-10 mx-auto max-w-xl text-center font-normal text-neutral-600 dark:text-neutral-400 hover:underline">
        <Link href="/more">Explore Blockers</Link>
      </motion.div>
    </>)
  )
}