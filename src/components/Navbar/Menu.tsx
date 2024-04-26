import { useState } from "react";
import { MdMenu } from "react-icons/md";
import Link from "next/link";
import ThemeButton from "./ThemeButton";

export default function Menu() {
  return (
    <div className="hidden md:block">
      <ul className="flex gap-16">
        <Link href="/transfer">
          <li className="font-bold hover:border-b hover:border-accent">
            Transfer
          </li>
        </Link>
        <Link href="/export">
          <li className="font-bold hover:border-b hover:border-accent">
            Export
          </li>
        </Link>
        <Link href="/help">
          <li className="font-bold hover:border-b hover:border-accent">Help</li>
        </Link>

        <li>
          <ThemeButton />
        </li>
      </ul>
    </div>
  );
}

function Temp() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  return (
    <div>
      <div
        className={`bg-black bg-opacity-50 fixed top-0 bottom-0 left-0 right-0 translate-x-full z-40 transition-all duration-300 ease-in-out
            ${isMenuOpen ? "translate-x-0" : ""}`}
      >
        <ul>
          <h1>Features</h1>
          <Link href="/transfer">
            <li className="font-bold hover:border-b hover:border-accent">
              Transfer
            </li>
          </Link>
          <Link href="/export">
            <li className="font-bold hover:border-b hover:border-accent">
              Export
            </li>
          </Link>

          <h1>Help</h1>
          <Link href="/faq">
            <li className="font-bold hover:border-b hover:border-accent">
              FAQ
            </li>
          </Link>
          <Link href="/contact">
            <li className="font-bold hover:border-b hover:border-accent">
              Contact
            </li>
          </Link>

          <li>
            <ThemeButton />
          </li>
        </ul>
      </div>

      <button
        className="md:hidden z-50"
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        <MdMenu className="text-3xl" />
      </button>
    </div>
  );
}
