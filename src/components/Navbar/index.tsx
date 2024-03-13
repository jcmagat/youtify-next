"use client";
import { useState, useEffect } from "react";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";

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
  // TODO: initialize with localStorage without error
  const [theme, setTheme] = useState("");

  const toggleMode = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    setTheme(localStorage.getItem("theme") ?? "");
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("theme", theme);
    if (theme) localStorage.setItem("theme", theme);
  }, [theme]);

  // Scroll styling
  const [scrollClasses, setScrollClasses] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const isAtTop = !(window.scrollY || document.documentElement.scrollTop);

      if (isAtTop) {
        setScrollClasses("");
      } else {
        setScrollClasses("shadow-xl bg-primarylight");
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header>
      <nav
        className={`bg-primary text-secondary fixed w-full h-24 z-20 ${scrollClasses}`}
      >
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
            <li>
              <button onClick={toggleMode}>
                {theme === "light" ? <MdDarkMode /> : <MdLightMode />}
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
