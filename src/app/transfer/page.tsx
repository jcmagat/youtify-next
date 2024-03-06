"use client";
import useMultistepForm from "./useMultistepForm";
import SourceForm from "./SourceForm";
import PlaylistForm from "./PlaylistForm";
import DestinationForm from "./DestinationForm";
import { Playlist } from "./types";

const INITIAL_FORM_STATE = {
  source: "",
  destination: "",
  playlists: [] as Playlist[],
};

export default function Transfer() {
  const { steps, currStepIndex, currStep, next, back } = useMultistepForm([
    <SourceForm />,
    <PlaylistForm />,
    <DestinationForm />,
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
