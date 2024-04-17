"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleMode = () => {
    if (resolvedTheme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  // Scroll styling
  const [scrollClasses, setScrollClasses] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const isAtTop = !(window.scrollY || document.documentElement.scrollTop);

      if (isAtTop) {
        setScrollClasses("");
      } else {
        setScrollClasses("shadow-xl bg-secondary");
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
        className={`bg-primary text-text fixed w-full h-24 z-20 ${scrollClasses}`}
      >
        <div className="flex justify-between items-center h-full w-full px-8 2xl:px-16">
          <Link href="/" className="relative w-32 h-full">
            <Image
              priority
              fill
              src={"/assets/logo.svg"}
              alt={"logo"}
              sizes="128px"
            />
          </Link>

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
                {resolvedTheme === "light" ? <MdDarkMode /> : <MdLightMode />}
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
