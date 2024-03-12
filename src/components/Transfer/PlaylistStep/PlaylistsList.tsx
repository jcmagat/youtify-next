"use client";
import { useState } from "react";
import Image from "next/image";
import { FaAngleDown } from "react-icons/fa";
import { Playlist } from "@/types/transfer";
import TracksList from "./TracksList";

type PlaylistsListProps = {
  playlists: Playlist[];
  checkedPlaylistIds: string[];
  checkedTrackIds: string[];
  handlePlaylistCheckboxChange: (playlistId: string) => void;
  handleTrackCheckboxChange: (trackId: string) => void;
  uniquePlaylistTrackId: (playlistId: string, trackId: string) => string;
};

export default function PlaylistsList({
  playlists,
  checkedPlaylistIds,
  checkedTrackIds,
  handlePlaylistCheckboxChange,
  handleTrackCheckboxChange,
  uniquePlaylistTrackId,
}: PlaylistsListProps) {
  // TODO: individualize this to each TracksList
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <ul className="flex flex-col gap-4">
      {playlists.map((playlist) => (
        <li key={playlist.id} className="flex flex-col border border-black">
          <div className="flex items-center gap-6">
            <input
              type="checkbox"
              checked={checkedPlaylistIds.includes(playlist.id)}
              onChange={() => handlePlaylistCheckboxChange(playlist.id)}
            />

            {playlist.image && (
              <Image
                src={playlist.image}
                alt={`${playlist.name} Image`}
                width={64}
                height={64}
              />
            )}

            <div className="flex justify-between w-full">
              <div>
                <h1>{playlist.name}</h1>
                <p>{`${playlist.tracks?.length} tracks`}</p>
              </div>

              <button
                className={`transition duration-150 ${
                  isCollapsed ? "rotate-90" : ""
                }`}
                onClick={toggleCollapse}
              >
                <FaAngleDown />
              </button>
            </div>
          </div>

          <TracksList
            disabled={!checkedPlaylistIds.includes(playlist.id)}
            playlist={playlist}
            checkedTrackIds={checkedTrackIds}
            handleTrackCheckboxChange={handleTrackCheckboxChange}
            uniquePlaylistTrackId={uniquePlaylistTrackId}
          />
        </li>
      ))}
    </ul>
  );
}
