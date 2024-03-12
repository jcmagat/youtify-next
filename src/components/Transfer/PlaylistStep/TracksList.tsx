"use client";
import Image from "next/image";
import { Playlist } from "@/types/transfer";

type TracksListProps = {
  disabled: boolean;
  playlist: Playlist;
  checkedTrackIds: string[];
  handleTrackCheckboxChange: (trackId: string) => void;
  uniquePlaylistTrackId: (playlistId: string, trackId: string) => string;
};

export default function TracksList({
  disabled,
  playlist,
  checkedTrackIds,
  handleTrackCheckboxChange,
  uniquePlaylistTrackId,
}: TracksListProps) {
  return (
    <ul
      className={`flex flex-col gap-2 pt-2 
        ${disabled ? "pointer-events-none brightness-75" : ""}`}
    >
      {playlist.tracks?.map((track) => (
        <li key={track.id} className="flex items-center gap-6 pl-8">
          <input
            type="checkbox"
            checked={checkedTrackIds.includes(
              uniquePlaylistTrackId(playlist.id, track.id)
            )}
            onChange={() =>
              handleTrackCheckboxChange(
                uniquePlaylistTrackId(playlist.id, track.id)
              )
            }
          />

          {track.image && (
            <Image
              src={track.image}
              alt={`${track.name} Image`}
              width={64}
              height={64}
            />
          )}

          <h1>{track.name}</h1>
        </li>
      ))}
    </ul>
  );
}
