"use client";

import Link from "next/link";

function Logo() {
  return (
    <Link href="/" className="flex">
      <div>Logo</div>
      <div>YouTify</div>
    </Link>
  );
}

function FeaturesFlyout() {
  return (
    <div className="flex">
      <div className="font-bold hover:border-b">Features</div>

      <Link href="/transfer">
        <div className="font-bold hover:border-b">Transfer</div>
      </Link>
      <Link href="/export">
        <div className="ml-10 font-bold hover:border-b">Export</div>
      </Link>
    </div>
  );
}

export default function Navbar() {
  return (
    <nav className="bg-red-300 fixed w-full h-24 shadow-xl">
      <div className="flex justify-between items-center h-full w-full px-4 2xl:px-16">
        <Logo />

        <div className="flex">
          <FeaturesFlyout />
          <div className="ml-10 font-bold hover:border-b">Help</div>
        </div>
      </div>
    </nav>
  );
}
