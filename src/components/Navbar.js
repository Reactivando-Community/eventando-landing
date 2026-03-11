"use client";
import Link from "next/link";
import ThemeChanger from "./DarkSwitch";
import Image from "next/image";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { useTheme } from "next-themes";
import { useEffect } from "react";

export const Navbar = () => {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    console.log("theme", theme);
  }, [theme]);

  return (
    <div className="w-full">
      <nav className="container relative flex flex-wrap items-center justify-between mx-auto lg:justify-between xl:px-0">
        {/* Logo  */}
        <Disclosure>
          {({ open }) => (
            <>
              <div className="flex flex-wrap items-center justify-between w-full lg:w-auto p-8">
                <Link href="/" className="flex items-center space-x-2">
                  <Image
                    src="/images/logo-dark.png"
                    alt="Startup Weekend Anápolis"
                    width="150"
                    height="150"
                    className="h-12 w-auto object-contain"
                  />
                </Link>
              </div>
            </>
          )}
        </Disclosure>
      </nav>
    </div>
  );
};
