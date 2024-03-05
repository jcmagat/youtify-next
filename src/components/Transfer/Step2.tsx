"use client";
import ServiceGrid from "./ServiceGrid";

export default function Step2() {
  return (
    <div className="bg-primary text-secondary flex flex-col items-center gap-4">
      <h1 className="text-5xl font-bold">Select the destination</h1>
      <p>STEP 2/4</p>
      <ServiceGrid />
    </div>
  );
}
