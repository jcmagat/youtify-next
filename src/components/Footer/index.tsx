import Link from "next/link";
import { FaGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-secondary text-primary flex flex-col items-center justify-between h-96 pt-8 sm:pt-16">
      <div className="flex flex-col sm:flex-row gap-8 justify-between w-full max-w-4xl px-4 sm:px-8 py-16">
        <div className="flex flex-col items-start">
          <h1>Developed by Juan Carlo Magat</h1>
          <Link
            href={"https://github.com/jcmagat"}
            className="flex items-center gap-2"
          >
            <FaGithub />
            <p>GitHub</p>
          </Link>
          <Link
            href={"https://www.linkedin.com/in/jcmagat/"}
            className="flex items-center gap-2"
          >
            <FaLinkedin />
            <p>LinkedIn</p>
          </Link>
        </div>

        <div className="flex gap-16 justify-between">
          <div>
            <h1 className="font-bold pb-2">Features</h1>
            <ul>
              <Link href="/transfer">
                <li>Transfer</li>
              </Link>
              <Link href="/export">
                <li>Export</li>
              </Link>
            </ul>
          </div>

          <div>
            <h1 className="font-bold pb-2">Help</h1>
            <ul>
              <Link href="/faq">
                <li>FAQs</li>
              </Link>
              <Link href="/contact">
                <li>Contact</li>
              </Link>
            </ul>
          </div>

          <div>
            <h1 className="font-bold pb-2">Legal</h1>
            <ul>
              <Link href="/terms">
                <li>Terms</li>
              </Link>
              <Link href="/privacy">
                <li>Privacy</li>
              </Link>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-primary text-secondary w-full text-sm py-2 text-center">
        <p>Copyright © 2024 YouTify. All Rights Reserved</p>
      </div>
    </footer>
  );
}
