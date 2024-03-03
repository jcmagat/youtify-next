"use client";

import Link from "next/link";

function Logo() {
  return (
    <Link href="/" className="flex gap-2">
      <div>Logo</div>
      <div>YouTify</div>
    </Link>
  );
}

export default function Navbar() {
  return (
    <header>
      <nav className="fixed w-full h-24 shadow-xl">
        <div className="flex justify-between items-center h-full w-full px-8 2xl:px-16">
          <Logo />

          <ul className="flex gap-16">
            <Link href="/transfer">
              <li className="font-bold hover:border-b">Transfer</li>
            </Link>
            <Link href="/export">
              <li className="font-bold hover:border-b">Export</li>
            </Link>
            <Link href="/help">
              <li className="font-bold hover:border-b">Help</li>
            </Link>
          </ul>
        </div>
      </nav>
    </header>
  );
}
