"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Button from "@/components/Button";
import { Playlist, Track } from "./types";

type PlaylistListProps = {
  playlists: Playlist[];
};

type TracksListProps = {
  tracks?: Track[];
};

function TracksList({ tracks }: TracksListProps) {
  return (
    <ul>
      {tracks?.map((track) => (
        <li key={track.id}>
          <div className="flex items-center gap-8 py-2 pl-8 border border-red-500">
            {track.image && (
              <Image
                src={track.image}
                alt={`${track.name} Image`}
                width={64}
                height={64}
              />
            )}

            <h1>{track.name}</h1>
          </div>
        </li>
      ))}
    </ul>
  );
}

function PlaylistList({ playlists }: PlaylistListProps) {
  return (
    <ul className="flex flex-col gap-8">
      {playlists.map((playlist) => (
        <li key={playlist.id} className="flex flex-col border border-blue-200">
          <div className="flex items-center gap-8 border border-black">
            {playlist.image && (
              <Image
                src={playlist.image}
                alt={`${playlist.name} Image`}
                width={64}
                height={64}
              />
            )}

            <div>
              <h1>{playlist.name}</h1>
              <p>{`${playlist.tracks?.length} tracks`}</p>
            </div>
          </div>

          <TracksList tracks={playlist.tracks} />
        </li>
      ))}
    </ul>
  );
}

export default function PlaylistStep() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  // TODO: move to page.tsx
  useEffect(() => {
    const getSpotifyPlaylists = async () => {
      try {
        const res = await axios.get(
          "https://localhost:8080/playlists/spotify",
          {
            withCredentials: true,
          }
        );
        console.log(res.data);
        setPlaylists(res.data.playlists);
      } catch (err) {
        // console.log(err);
      }
    };

    getSpotifyPlaylists();
  }, []);

  return (
    <div>
      <PlaylistList playlists={playlists} />
      <Button text="Select destination" />
    </div>
  );
}
