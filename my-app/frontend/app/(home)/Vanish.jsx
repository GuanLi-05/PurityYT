"use client";

import { useRouter } from "next/navigation";
import { PlaceholdersAndVanishInput } from "../../components/ui/placeholders-and-vanish-input"

export function Vanish() {
  const router = useRouter();
  const placeholders = [
    "A custom YouTube interface for managing distractions.",
    "A custom interface with no algorithm.",
    "A custom interface that filters search results.",
    "A custom interface without doomscrolling.",
    "A custom interface with content restrictions.",
  ];

  const handleChange = (e) => {
    console.log(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      router.push("/register")
    }, 500)
  };
  return (
    <div className="h-[30rem] flex flex-col justify-end items-center px-4">
      <h2
        className="mb-8 sm:mb-16 text-xl text-center sm:text-6xl dark:text-white text-black">
        Purify your watching experience
      </h2>
      <PlaceholdersAndVanishInput placeholders={placeholders} onChange={handleChange} onSubmit={onSubmit} />
    </div>
  );
}
