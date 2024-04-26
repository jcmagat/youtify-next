"use client";
import { useState } from "react";
import { MdMenu } from "react-icons/md";
import Link from "next/link";
import ThemeButton from "./ThemeButton";

export default function Menu() {
  return (
    <>
      <LargeScreenMenu />
      <SmallScreenMenu />
    </>
  );
}

function LargeScreenMenu() {
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  return (
    <div className="hidden md:block">
      <ul className="flex gap-16">
        <li
          className="font-bold hover:border-b hover:border-accent"
          onMouseEnter={() => setIsFeaturesOpen(true)}
          onMouseLeave={() => setIsFeaturesOpen(false)}
        >
          Features
          {isFeaturesOpen && (
            <div className="fixed bg-blue-100">
              <ul>
                <li>Transfer</li>
                <li>Export</li>
              </ul>
            </div>
          )}
        </li>

        <li
          className="font-bold hover:border-b hover:border-accent"
          onMouseEnter={() => setIsHelpOpen(true)}
          onMouseLeave={() => setIsHelpOpen(false)}
        >
          Help
          {isHelpOpen && (
            <div className="fixed bg-blue-100">
              <ul>
                <li>FAQs</li>
                <li>Contact</li>
              </ul>
            </div>
          )}
        </li>

        <li>
          <ThemeButton />
        </li>
      </ul>
    </div>
  );
}

function SmallScreenMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <div
        className={`bg-secondary fixed inset-0 z-10 transition-all duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <ul className="mt-24 ml-16">
          <h1 className="font-bold text-2xl mb-2">Features</h1>
          <li
            className="w-fit font-bold hover:border-b hover:border-accent"
            onClick={() => setIsOpen(false)}
          >
            <Link href="/transfer">Transfer</Link>
          </li>
          <li
            className="w-fit font-bold hover:border-b hover:border-accent"
            onClick={() => setIsOpen(false)}
          >
            <Link href="/export">Export</Link>
          </li>

          <h1 className="font-bold text-2xl mt-8 mb-2">Help</h1>
          <li
            className="w-fit font-bold hover:border-b hover:border-accent"
            onClick={() => setIsOpen(false)}
          >
            <Link href="/faq">FAQs</Link>
          </li>
          <li
            className="w-fit font-bold hover:border-b hover:border-accent"
            onClick={() => setIsOpen(false)}
          >
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </div>

      <div className="relative z-20 flex gap-8">
        <ThemeButton />

        <button onClick={() => setIsOpen((prev) => !prev)}>
          <MdMenu className="text-3xl" />
        </button>
      </div>
    </div>
  );
}
