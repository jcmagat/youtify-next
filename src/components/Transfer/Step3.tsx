"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Button from "../Button";

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

export default function Step3() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

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
    <div className="bg-primary text-secondary flex flex-col items-center gap-4">
      <h1 className="text-5xl font-bold">
        Select playlists you want to transfer
      </h1>
      <p>STEP 3/4</p>
      <PlaylistGrid playlists={playlists} />
      <Button text="Transfer" />
    </div>
  );
}
