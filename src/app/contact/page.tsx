"use client";
import { useState } from "react";
import Button from "@/components/Button";

export default function Contact() {
  const [topic, setTopic] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTopic("");
    setName("");
    setEmail("");
    setMessage("");
    setIsOpen(true);
  };

  return (
    <section id="contact" className="w-full flex justify-center min-h-[75vh]">
      <div className="flex flex-col gap-6 bg-secondary w-full max-w-5xl px-12 py-10 rounded-3xl">
        <h1 className="font-bold text-5xl">Contact us</h1>

        <form
          className="flex flex-col gap-6 items-center"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col w-full">
            <label htmlFor="ftopic">Topic</label>
            <select
              required
              className="bg-inherit border border-slate-300 rounded-sm px-4 py-3 mt-1 focus:outline focus:outline-2 focus:outline-accent"
              id="ftopic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            >
              <option value="">Select the topic</option>
              <option value="Feedback">Feedback</option>
              <option value="Suggestion">Suggestion</option>
              <option value="Problems">Problems</option>
            </select>
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="fname">Name</label>
            <input
              required
              className="border border-slate-300 rounded-sm px-4 py-3 mt-1 focus:outline focus:outline-2 focus:outline-accent"
              id="fname"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="femail">Email address</label>
            <input
              required
              className="border border-slate-300 rounded-sm px-4 py-3 mt-1 focus:outline focus:outline-2 focus:outline-accent"
              id="femail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="fmessage">Message</label>
            <textarea
              required
              className="border border-slate-300 rounded-sm px-4 py-3 mt-1 focus:outline focus:outline-2 focus:outline-accent"
              id="fmessage"
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>

          <Button className="w-72 mt-4" text="Submit" type="submit" />
        </form>
      </div>

      <dialog
        open={isOpen}
        className="bg-black bg-opacity-50 fixed top-0 left-0 w-screen h-screen z-50"
      >
        <div className="bg-secondary relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit p-8 flex flex-col gap-8 items-center">
          <p className="text-lg text-center">
            Thank you for contacting us. We will reach out to you soon.
          </p>

          <Button
            className="text-sm"
            text="OK"
            onClick={() => setIsOpen(false)}
          />
        </div>
      </dialog>
    </section>
  );
}
