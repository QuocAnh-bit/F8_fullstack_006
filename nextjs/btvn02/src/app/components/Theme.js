"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { Button } from "@nextui-org/button";
import SunIcon from "./components-svg/SunIcon";
import MoonIcon from "./components-svg/MoonIcon";

export default function Theme() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <Button
        color="#FF71D7"
        variant="shadow"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? <SunIcon /> : <MoonIcon />}
      </Button>
    </>
  );
}
