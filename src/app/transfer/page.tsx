"use client";
import axios from "axios";
import Link from "next/link";

export default function Transfer() {
  const printStatus = async () => {
    try {
      const res = await axios.get("https://localhost:8080/oauth/status", {
        withCredentials: true,
      });
      console.log(res.data);
    } catch (err) {
      // console.log(err);
    }
  };

  const printSession = async () => {
    try {
      const res = await axios.get("https://localhost:8080/session", {
        withCredentials: true,
      });
      console.log(res.data);
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <main>
      <h2>Copy your Spotify playlists onto YouTube in 4 easy steps:</h2>

      <h3>Step 1: Sign into YouTube using your Google account</h3>

      <Link href={"https://localhost:8080/oauth/youtube/login"}>
        <button>Sign in with Google</button>
      </Link>

      <h3>Step 2: Sign into your Spotify account</h3>
      <a href="https://localhost:8080/oauth/spotify/login">
        <button>Sign in with Spotify "a href"</button>
      </a>

      <br></br>
      <button onClick={printStatus}>Print status</button>

      <br></br>
      <button onClick={printSession}>Print session</button>

      <h3>Step 3: Select which playlists you want to copy</h3>

      <h3>Step 4: Click "Copy Playlists"</h3>
      <button>Copy Playlists</button>
    </main>
  );
}
