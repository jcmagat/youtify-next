"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Menu from "./Menu";

export default function Navbar() {
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
          <Link href="/" className="relative w-32 h-full shrink-0">
            <Image
              priority
              fill
              src={"/assets/logo.svg"}
              alt={"logo"}
              sizes="128px"
            />
          </Link>
          <Menu />
        </div>
      </nav>
    </header>
  );
}
