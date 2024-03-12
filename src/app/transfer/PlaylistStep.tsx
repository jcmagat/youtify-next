"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { FaAngleDown } from "react-icons/fa";
import Button from "@/components/Button";
import { Playlist, TransferData } from "./types";

type PlaylistStepProps = TransferData & {
  updateData: (data: Partial<TransferData>) => void;
};

type PlaylistsListProps = {
  playlists: Playlist[];
  checkedPlaylistIds: string[];
  checkedTrackIds: string[];
  handlePlaylistCheckboxChange: (playlistId: string) => void;
  handleTrackCheckboxChange: (trackId: string) => void;
  uniquePlaylistTrackId: (playlistId: string, trackId: string) => string;
};

type TracksListProps = {
  disabled: boolean;
  playlist: Playlist;
  checkedTrackIds: string[];
  handleTrackCheckboxChange: (trackId: string) => void;
  uniquePlaylistTrackId: (playlistId: string, trackId: string) => string;
};

function TracksList({
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

function PlaylistsList({
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

export default function PlaylistStep({
  source,
  updateData,
}: PlaylistStepProps) {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  const [checkedPlaylistIds, setCheckedPlaylistIds] = useState<string[]>([]);
  const [checkedTrackIds, setCheckedTrackIds] = useState<string[]>([]);

  useEffect(() => {
    const getSpotifyPlaylists = async () => {
      try {
        const res = await axios.get(
          `https://localhost:8080/playlists/${source}`,
          {
            withCredentials: true,
          }
        );

        setPlaylists(res.data.playlists);
      } catch (err) {
        // console.log(err);
      }
    };

    getSpotifyPlaylists();
  }, []);

  const uniquePlaylistTrackId = (
    playlistId: string,
    trackId: string
  ): string => {
    return `${playlistId}-${trackId}`;
  };

  useEffect(() => {
    setCheckedPlaylistIds(playlists.map((playlist) => playlist.id));

    setCheckedTrackIds(
      playlists.flatMap((playlist) =>
        playlist.tracks.map((track) =>
          uniquePlaylistTrackId(playlist.id, track.id)
        )
      )
    );
  }, [playlists]);

  const handlePlaylistCheckboxChange = (playlistId: string) => {
    if (checkedPlaylistIds.includes(playlistId)) {
      setCheckedPlaylistIds((prev) => prev.filter((id) => id !== playlistId));
    } else {
      setCheckedPlaylistIds((prev) => [...prev, playlistId]);
    }
  };

  const handleTrackCheckboxChange = (trackId: string) => {
    if (checkedTrackIds.includes(trackId)) {
      setCheckedTrackIds((prev) => prev.filter((id) => id !== trackId));
    } else {
      setCheckedTrackIds((prev) => [...prev, trackId]);
    }
  };

  const handleButtonClick = () => {
    updateData({
      playlists: playlists
        .filter((playlist) => checkedPlaylistIds.includes(playlist.id))
        .map((playlist) => ({
          ...playlist,
          tracks: playlist.tracks.filter((track) =>
            checkedTrackIds.includes(
              uniquePlaylistTrackId(playlist.id, track.id)
            )
          ),
        })),
    });
  };

  return (
    <div className="relative">
      <PlaylistsList
        playlists={playlists}
        checkedPlaylistIds={checkedPlaylistIds}
        checkedTrackIds={checkedTrackIds}
        handlePlaylistCheckboxChange={handlePlaylistCheckboxChange}
        handleTrackCheckboxChange={handleTrackCheckboxChange}
        uniquePlaylistTrackId={uniquePlaylistTrackId}
      />

      <Button
        className="fixed bottom-8 left-1/2 -translate-x-1/2"
        text="Select destination"
        onClick={handleButtonClick}
      />
    </div>
  );
}
