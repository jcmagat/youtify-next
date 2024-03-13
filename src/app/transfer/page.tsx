"use client";
import { useState } from "react";
import { TransferData, Service } from "@/types/transfer";
import useTransferSteps from "@/hooks/useTransferSteps";
import SourceStep from "@/components/Transfer/SourceStep";
import PlaylistStep from "@/components/Transfer/PlaylistStep";
import DestinationStep from "@/components/Transfer/DestinationStep";
import ConfirmTransferStep from "@/components/Transfer/ConfirmTransferStep";

const INITIAL_DATA: TransferData = {
  source: Service.None,
  destination: Service.None,
  playlists: [],
};

export default function Transfer() {
  const [data, setData] = useState(INITIAL_DATA);

  const updateData = (updatedData: Partial<TransferData>) => {
    setData((prev) => {
      return { ...prev, ...updatedData };
    });
  };

  const { steps, currStepIndex, currStep, next, back } = useTransferSteps([
    <SourceStep key={1} updateData={updateData} />,
    <PlaylistStep key={2} {...data} updateData={updateData} />,
    <DestinationStep key={3} updateData={updateData} />,
    <ConfirmTransferStep key={4} {...data} />,
  ]);

  const titles = [
    "Select the source",
    "Select playlists",
    "Select the destination",
    "Transfer playlists",
  ];

  return (
    <section id="home" className="w-full flex justify-center">
      <div className="flex flex-col items-center gap-4 w-full max-w-5xl py-10 bg-primarylight rounded-3xl shadow-xl">
        <h1 className="text-5xl font-bold">{titles[currStepIndex]}</h1>

        <div className="flex gap-4">
          <button onClick={back}>{"<"}</button>
          <p>{`Step ${currStepIndex + 1}/${steps.length}`}</p>
          <button onClick={next}>{">"}</button>
        </div>

        {currStep}
      </div>
    </section>
  );
}
