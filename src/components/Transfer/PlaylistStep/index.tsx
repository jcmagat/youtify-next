"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "@/components/Button";
import { Playlist, TransferData } from "@/types/transfer";
import PlaylistsList from "./PlaylistsList";

type PlaylistStepProps = TransferData & {
  updateData: (data: Partial<TransferData>) => void;
};

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
