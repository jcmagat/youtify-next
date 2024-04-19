import Link from "next/link";

type ButtonProps = {
  className?: string;
  text?: string;
  href?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

export default function Button(props: ButtonProps) {
  const { className, text, href, type, onClick } = props;

  let buttonClass = `bg-accent text-textInverted px-8 py-4 text-lg leading-none rounded-full ${className}`;

  if (href) {
    return (
      <Link href={href}>
        <button className={buttonClass}>{text}</button>
      </Link>
    );
  }

  return (
    <button className={buttonClass} type={type} onClick={onClick}>
      {text}
    </button>
  );
}
