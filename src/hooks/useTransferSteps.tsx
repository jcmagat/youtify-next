import { ReactElement, useState } from "react";

export default function useTransferSteps(steps: ReactElement[]) {
  const [currStepIndex, setCurrStepIndex] = useState(0);

  const titles = [
    "Select the source",
    "Select playlists",
    "Select the destination",
    "Transfer playlists",
  ];

  const stepForward = () => {
    setCurrStepIndex((i) => (i >= steps.length - 1 ? steps.length - 1 : i + 1));
  };

  const stepBack = () => {
    setCurrStepIndex((i) => (i <= 0 ? 0 : i - 1));
  };

  return {
    steps,
    currStepIndex,
    currStepTitle: titles[currStepIndex],
    currStep: steps[currStepIndex],
    stepForward,
    stepBack,
  };
}
