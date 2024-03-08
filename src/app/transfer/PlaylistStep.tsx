"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { FaAngleDown } from "react-icons/fa";
import Button from "@/components/Button";
import { Playlist, Track } from "./types";

type PlaylistsListProps = {
  playlists: Playlist[];
  checkedPlaylists: string[];
  checkedTrackIds: string[];
  handlePlaylistCheckboxChange: (playlistId: string) => void;
  handleTrackCheckboxChange: (trackId: string) => void;
};

type TracksListProps = {
  tracks: Track[];
  disabled: boolean;
  checkedTrackIds: string[];
  handleTrackCheckboxChange: (trackId: string) => void;
};

function TracksList({
  tracks,
  disabled,
  checkedTrackIds,
  handleTrackCheckboxChange,
}: TracksListProps) {
  return (
    <ul
      className={`flex flex-col gap-2 pt-2 
        ${disabled ? "pointer-events-none brightness-75" : ""}`}
    >
      {tracks?.map((track) => (
        <li key={track.id} className="flex items-center gap-6 pl-8">
          <input
            type="checkbox"
            checked={checkedTrackIds.includes(track.id)}
            onChange={() => handleTrackCheckboxChange(track.id)}
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
  checkedPlaylists,
  checkedTrackIds,
  handlePlaylistCheckboxChange,
  handleTrackCheckboxChange,
}: PlaylistsListProps) {
  return (
    <ul className="flex flex-col gap-4">
      {playlists.map((playlist) => (
        <li key={playlist.id} className="flex flex-col border border-black">
          <div className="flex items-center gap-6">
            <input
              type="checkbox"
              checked={checkedPlaylists.includes(playlist.id)}
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

              <button>
                <FaAngleDown />
              </button>
            </div>
          </div>

          <TracksList
            disabled={!checkedPlaylists.includes(playlist.id)}
            tracks={playlist.tracks}
            checkedTrackIds={checkedTrackIds}
            handleTrackCheckboxChange={handleTrackCheckboxChange}
          />
        </li>
      ))}
    </ul>
  );
}

export default function PlaylistStep() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  const [checkedPlaylistIds, setCheckedPlaylistIds] = useState<string[]>([]);
  const [checkedTrackIds, setCheckedTrackIds] = useState<string[]>([]);

  useEffect(() => {
    const getSpotifyPlaylists = async () => {
      try {
        const res = await axios.get(
          "https://localhost:8080/playlists/spotify",
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

  useEffect(() => {
    setCheckedPlaylistIds(playlists.map((playlist) => playlist.id));
    setCheckedTrackIds(
      playlists.flatMap((playlist) => playlist.tracks.map((track) => track.id))
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
    setPlaylists((prev) =>
      prev
        .filter((playlist) => checkedPlaylistIds.includes(playlist.id))
        .map((playlist) => ({
          ...playlist,
          tracks: playlist.tracks.filter((track) =>
            checkedTrackIds.includes(track.id)
          ),
        }))
    );
  };

  return (
    <div className="relative">
      <PlaylistsList
        playlists={playlists}
        checkedPlaylists={checkedPlaylistIds}
        checkedTrackIds={checkedTrackIds}
        handlePlaylistCheckboxChange={handlePlaylistCheckboxChange}
        handleTrackCheckboxChange={handleTrackCheckboxChange}
      />

      <Button
        className="fixed bottom-8 left-1/2 -translate-x-1/2"
        text="Select destination"
        onClick={handleButtonClick}
      />
    </div>
  );
}
