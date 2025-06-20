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
                <Link href="https://joincommunity.com.br" target="_blank">
                  <span className="flex items-center space-x-2 text-2xl font-medium text-indigo-500 dark:text-gray-100">
                    <span>
                      <Image
                        src={"/images/logo-join-white.png"}
                        alt="Logo Join"
                        width="150"
                        height="80"
                        className="w-30"
                      />
                    </span>
                    {/* <span>Nextly</span> */}
                  </span>
                </Link>
              </div>
            </>
          )}
        </Disclosure>
      </nav>
    </div>
  );
};
