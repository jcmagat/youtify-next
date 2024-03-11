"use client";
import { useState } from "react";
import useTransferSteps from "./useTransferSteps";
import SourceStep from "./SourceStep";
import PlaylistStep from "./PlaylistStep";
import DestinationStep from "./DestinationStep";
import { TransferData } from "./types";

const INITIAL_DATA: TransferData = {
  source: "",
  destination: "",
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
    <PlaylistStep key={2} />,
    <DestinationStep key={3} updateData={updateData} />,
  ]);

  const titles = [
    "Select the source",
    "Select playlists",
    "Select the destination",
  ];

  return (
    <section id="home" className="w-full flex justify-center">
      <div className="flex flex-col items-center gap-4 w-full max-w-5xl bg-green-300">
        <h1 className="text-5xl font-bold">{titles[currStepIndex]}</h1>

        <div className="flex gap-4">
          <button onClick={back}>{"<"}</button>
          <p>{`Step ${currStepIndex + 1}/${steps.length}`}</p>
          <button onClick={next}>{">"}</button>
        </div>

        {currStep}

        {/*TODO: remove, only for testing*/}
        <p>{data.source}</p>
        <p>{data.destination}</p>
      </div>
    </section>
  );
}
