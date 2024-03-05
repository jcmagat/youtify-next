"use client";
import ServiceGrid from "./ServiceGrid";

export default function Step1() {
  return (
    <div className="bg-primary text-secondary flex flex-col items-center gap-4">
      <h1 className="text-5xl font-bold">Select the source</h1>
      <p>STEP 1/4</p>
      <ServiceGrid />
    </div>
  );
}
