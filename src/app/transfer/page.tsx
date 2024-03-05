"use client";
import axios from "axios";
import Button from "@/components/Button";
import { useState } from "react";
import Image from "next/image";

type Playlist = {
  id: string;
  name: string;
  description: string;
  image: string;
};

type PlaylistGridProps = {
  playlists: Playlist[];
};

type PlaylistCardProps = {
  playlist: Playlist;
};

function PlaylistCard(props: PlaylistCardProps) {
  const { playlist } = props;

  return (
    <div className="border border-black p-2">
      <Image
        src={playlist.image}
        alt={`${playlist.name} Image`}
        width={160}
        height={160}
      />
      <h1>{playlist.name}</h1>
    </div>
  );
}

function PlaylistGrid(props: PlaylistGridProps) {
  return (
    <div className="grid grid-cols-4 gap-2 w-2/3 bg-yellow-100">
      {props.playlists.map((playlist) => (
        <PlaylistCard key={playlist.id} playlist={playlist} />
      ))}
    </div>
  );
}

export default function Transfer() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  const getSpotifyPlaylists = async () => {
    try {
      const res = await axios.get("https://localhost:8080/playlists/spotify", {
        withCredentials: true,
      });
      console.log(res.data);
      setPlaylists(res.data.playlists);
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <section
      id="home"
      className="w-full min-h-screen flex justify-center bg-red-100"
    >
      <div className="flex flex-col items-center gap-8 pt-36 bg-green-100">
        <h2>Copy your Spotify playlists onto YouTube in 4 easy steps:</h2>

        <h3>Step 1: Sign into YouTube using your Google account</h3>

        <Button
          href="https://localhost:8080/oauth/youtube/login"
          text="Sign in with Google"
        />

        <h3>Step 2: Sign into your Spotify account</h3>
        <Button
          href="https://localhost:8080/oauth/spotify/login"
          text="Sign in with Spotify"
        />

        <h3>Step 3: Select which playlists you want to copy</h3>
        <Button text="Get Spotify Playlists" onClick={getSpotifyPlaylists} />

        <PlaylistGrid playlists={playlists} />

        <h3>Step 4: Click "Copy Playlists"</h3>
        <Button text="Copy Playlists" />
      </div>
    </section>
  );
}
