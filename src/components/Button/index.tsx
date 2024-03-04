import Link from "next/link";

type ButtonProps = {
  className?: string;
  text?: string;
  href?: string;
  onClick?: () => void;
};

export default function Button(props: ButtonProps) {
  const { className, text, href, onClick } = props;

  let buttonClass = `px-8 py-4 text-lg leading-none rounded-full bg-blue-600 text-white ${className}`;

  if (href) {
    return (
      <Link href={href}>
        <button className={buttonClass}>{text}</button>
      </Link>
    );
  }

  return (
    <button className={buttonClass} onClick={onClick}>
      {text}
    </button>
  );
}
