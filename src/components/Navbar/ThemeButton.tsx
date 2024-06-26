import { useTheme } from "next-themes";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";

export default function ThemeButton() {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleMode = () => {
    if (resolvedTheme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <button onClick={toggleMode}>
      <ThemeIcon />
    </button>
  );
}

function ThemeIcon() {
  const { resolvedTheme } = useTheme();

  if (resolvedTheme === "light") {
    return <MdDarkMode className="text-xl" />;
  } else {
    return <MdLightMode className="text-xl" />;
  }
}
