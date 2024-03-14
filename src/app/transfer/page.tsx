"use client";
import { useEffect, useState } from "react";
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
  const [forwardHidden, setForwardHidden] = useState(true);

  const updateData = (updatedData: Partial<TransferData>) => {
    setData((prev) => {
      return { ...prev, ...updatedData };
    });
  };

  const handleStepForward = () => {
    stepForward();
  };

  const {
    steps,
    currStepIndex,
    currStepTitle,
    currStep,
    stepForward,
    stepBack,
  } = useTransferSteps([
    <SourceStep
      key={1}
      {...data}
      updateData={updateData}
      stepForward={handleStepForward}
    />,
    <PlaylistStep
      key={2}
      {...data}
      updateData={updateData}
      stepForward={handleStepForward}
    />,
    <DestinationStep
      key={3}
      {...data}
      updateData={updateData}
      stepForward={handleStepForward}
    />,
    <ConfirmTransferStep key={4} {...data} />,
  ]);

  // Determines whether the stepForward button is visible and clickable
  useEffect(() => {
    switch (currStepIndex) {
      case 0:
        setForwardHidden(true);
        if (data.source) setForwardHidden(false);
        break;
      case 1:
        setForwardHidden(true);
        if (data.playlists && data.playlists.length > 0)
          setForwardHidden(false);
        break;
      case 2:
        setForwardHidden(true);
        if (data.destination) setForwardHidden(false);
        break;
      default:
        setForwardHidden(true);
    }
  }, [currStepIndex, data.source, data.playlists, data.destination]);

  return (
    <section id="home" className="w-full flex justify-center min-h-[75vh]">
      <div className="flex flex-col items-center gap-4 w-full max-w-5xl py-10 bg-primarylight rounded-3xl shadow-xl">
        <h1 className="text-5xl font-bold">{currStepTitle}</h1>

        <div className="flex gap-4">
          <button
            className={currStepIndex === 0 ? "invisible" : ""}
            onClick={stepBack}
          >
            {"<"}
          </button>

          <p>{`Step ${currStepIndex + 1}/${steps.length}`}</p>

          <button
            className={forwardHidden ? "invisible" : ""}
            onClick={handleStepForward}
          >
            {">"}
          </button>
        </div>

        {currStep}
      </div>
    </section>
  );
}
