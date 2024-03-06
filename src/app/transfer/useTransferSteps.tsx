import { ReactElement, useState } from "react";

export default function useTransferSteps(steps: ReactElement[]) {
  const [currStepIndex, setCurrStepIndex] = useState(0);

  const next = () => {
    setCurrStepIndex((i) => (i >= steps.length - 1 ? steps.length - 1 : i + 1));
  };

  const back = () => {
    setCurrStepIndex((i) => (i <= 0 ? 0 : i - 1));
  };

  return {
    steps,
    currStepIndex,
    currStep: steps[currStepIndex],
    next,
    back,
  };
}
