import Button from "../Button";

export default function Hero() {
  return (
    <section
      id="home"
      className="bg-red-100 w-full min-h-screen flex justify-center text-center"
    >
      <div className="flex flex-col justify-center items-center gap-8 bg-green-100 max-w-4xl">
        <h1 className=" text-6xl font-bold">
          Have Full Control Over Your Music Playlists
        </h1>

        <div className="flex gap-6">
          <div>Spotify</div>
          <div>YouTube</div>
        </div>

        <p className="bg-red-100 max-w-xl">
          Transfer your library between different music services. Currently
          supports Spotify and YouTube with more to come!
        </p>

        <Button href="/transfer" text="Let's get it started" />
      </div>
    </section>
  );
}
