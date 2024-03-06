"use client";
import useTransferSteps from "./useTransferSteps";
import SourceStep from "./SourceStep";
import PlaylistStep from "./PlaylistStep";
import DestinationStep from "./DestinationStep";
import { Playlist } from "./types";

const INITIAL_DATA = {
  source: "",
  destination: "",
  playlists: [] as Playlist[],
};

export default function Transfer() {
  const { steps, currStepIndex, currStep, next, back } = useTransferSteps([
    <SourceStep />,
    <PlaylistStep />,
    <DestinationStep />,
  ]);

  const titles = [
    "Select the source",
    "Select playlists",
    "Select the destination",
  ];

  return (
    <section
      id="home"
      className="w-full min-h-screen flex justify-center pt-36 bg-red-100"
    >
      <div className="bg-primary text-secondary flex flex-col items-center gap-4">
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
