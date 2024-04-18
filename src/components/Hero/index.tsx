import Image from "next/image";
import Button from "../Button";

export default function Hero() {
  return (
    <section id="home" className="w-full flex justify-center text-center">
      <div className="flex flex-col justify-center items-center gap-10 max-w-4xl">
        <h1 className="text-6xl font-bold">
          Have Full Control Over Your Music Playlists
        </h1>

        <div className="flex gap-6 min-h-10">
          <div className="relative w-28">
            <Image fill src={"/assets/spotify.svg"} alt="spotify" />
          </div>
          <div className="relative w-28">
            <Image fill src={"/assets/youtube.svg"} alt="youtube" />
          </div>
        </div>

        <p className="max-w-xl">
          Transfer your library between different music services. Currently
          supports Spotify and YouTube with more to come!
        </p>

        <Button href="/transfer" text="Let's get it started" />
      </div>
    </section>
  );
}
