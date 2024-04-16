"use client";
import { useState } from "react";

type FaqItemProps = {
  question: string;
  answer: string;
};

function FaqItem({ question, answer }: FaqItemProps) {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div>
      <p
        className="cursor-pointer w-fit underline underline-offset-2"
        onClick={() => setCollapsed((prev) => !prev)}
      >
        {question}
      </p>
      <div
        className={`grid transition-all duration-200 ease-in-out
        ${collapsed ? "grid-rows-[0fr]" : "grid-rows-[1fr]"}`}
      >
        <p className="overflow-hidden whitespace-pre-line">{answer}</p>
      </div>
    </div>
  );
}

export default function Faq() {
  const faqs = {
    "How do I transfer my music playlists?": `
      To transfer your music playlists, follow these steps:
      1. Click "Transfer" in the navigation
      2. Select the source, sign in if necessary and accept the permissions
      3. Select the playlists and tracks you want to transfer and click "Select destination"
      4. Select the destination, signing in if necessary and accepting the permissions`,
    "What services does YouTify support?": `
      YouTify currently supports Spotify and YouTube with more to come!`,
    "Why does YouTify transfer the wrong songs into my playlists?": `
      YouTify relies on the search functionality of the music services it
      uses (e.g. Spotify and YouTube). Sometimes, these services return the
      wrong song despite using the correct search parameters, which gets
      added to your playlists. For now, the solution is to manually remove
      those songs from your playlists and add the correct ones. But don't
      worry, we're working hard to find a solution to this problem!`,
  };

  return (
    <section id="faq" className="w-full flex justify-center min-h-[75vh]">
      <div className="flex flex-col gap-6 bg-secondary max-w-5xl px-12 py-10 rounded-3xl">
        <h1 className="font-bold text-5xl">Frequently Asked Questions</h1>
        <p>
          {`Welcome to our help center. Here you can find answers for questions
          you may have about our service. If you don't find your answer here,
          feel free to contact us.`}
        </p>

        {Object.entries(faqs).map(([question, answer], index) => (
          <FaqItem key={index} question={question} answer={answer} />
        ))}
      </div>
    </section>
  );
}
