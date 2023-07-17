"use client";

import { useTheme } from "next-themes";
import { FaSun, FaRegMoon, FaRegSun } from "react-icons/fa";

function Modebtn(): React.ReactElement {
  const { systemTheme, theme, setTheme } = useTheme();

  const currentTheme: string | undefined = theme === "system" ? systemTheme : theme;

  return (
    <div className="flex flex-row justify-end">
        {currentTheme === "dark" ? (
          <FaSun
            className="h-6 w-6 cursor-pointer text-yellow-400 "
            onClick={() => {
              setTheme("light");
            }}
          />
        ) : (
          <FaRegMoon
            className="h-6 w-6 cursor-pointer text-slate-700 "
            onClick={() => {
              setTheme("dark");
            }}
          />
        )}
        <FaRegSun
          className="h-6 w-6 cursor-pointer ml-5"
          onClick={() => {
            setTheme("system")
          }}
        />
    </div>
  );
}

export default Modebtn;
