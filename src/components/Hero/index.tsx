import Image from "next/image";
import Button from "../Button";

export default function Hero() {
  return (
    <section id="home" className="w-full flex justify-center text-center">
      <div className="flex flex-col justify-center items-center gap-10 max-w-4xl">
        <h1 className="text-6xl font-bold">
          Have Full Control Over Your Music Playlists
        </h1>

        <div className="flex gap-6">
          <Image
            src={"/assets/spotify.svg"}
            alt="spotify"
            height={30}
            width={30 * (559 / 168)}
          />
          <Image
            src={"/assets/youtube.svg"}
            alt="youtube"
            height={22}
            width={22 * (512 / 114)}
          />
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
