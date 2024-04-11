"use client";
import Image from "next/image";
import { Playlist } from "@/types/transfer";

type TracksListProps = {
  collapsed: boolean;
  disabled: boolean;
  playlist: Playlist;
  checkedTrackIds: string[];
  handleTrackCheckboxChange: (trackId: string) => void;
  uniquePlaylistTrackId: (playlistId: string, trackId: string) => string;
};

export default function TracksList({
  collapsed,
  disabled,
  playlist,
  checkedTrackIds,
  handleTrackCheckboxChange,
  uniquePlaylistTrackId,
}: TracksListProps) {
  return (
    <div
      className={`grid transition-all duration-200 ease-in-out
      ${collapsed ? "grid-rows-[0fr]" : "grid-rows-[1fr]"}
      ${disabled ? "pointer-events-none brightness-75" : ""}`}
    >
      <ul className="flex flex-col gap-2 pt-2 overflow-hidden">
        {playlist.tracks?.map((track, index) => (
          <li
            key={`${track.id}-${index}`}
            className="flex items-center gap-6 pl-8"
          >
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
    </div>
  );
}
