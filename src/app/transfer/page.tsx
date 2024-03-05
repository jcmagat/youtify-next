"use client";
import { useState } from "react";
import Step1 from "@/components/Transfer/Step1";
import Step2 from "@/components/Transfer/Step2";
import Step3 from "@/components/Transfer/Step3";

export default function Transfer() {
  const [currStep, setCurrStep] = useState(1);

  return (
    <section
      id="home"
      className="w-full min-h-screen flex justify-center pt-36 bg-red-100"
    >
      {currStep === 1 && <Step1 />}
      {currStep === 2 && <Step2 />}
      {currStep === 3 && <Step3 />}
    </section>
  );
}
