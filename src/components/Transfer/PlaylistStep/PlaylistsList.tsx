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
  const [collapsedDict, setCollapsedDict] = useState(
    playlists.reduce<Record<string, boolean>>(
      (acc, playlist) => ((acc[playlist.id] = false), acc),
      {}
    )
  );

  const toggleCollapse = (playlistId: string) => {
    setCollapsedDict((prev) => {
      return { ...prev, [playlistId]: !prev[playlistId] };
    });
  };

  return (
    <ul className="flex flex-col gap-4">
      {playlists.map((playlist) => (
        <li
          key={playlist.id}
          className="flex flex-col px-4 pb-4 [&:not(:last-child)]:border-b border-secondary"
        >
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
                className={`transition-transform duration-200 
                ${collapsedDict[playlist.id] ? "rotate-90" : ""}`}
                onClick={() => toggleCollapse(playlist.id)}
              >
                <FaAngleDown />
              </button>
            </div>
          </div>

          <TracksList
            collapsed={collapsedDict[playlist.id]}
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
