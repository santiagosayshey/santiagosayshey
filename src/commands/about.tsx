import React from "react";
import { Command } from "../types/commands";
import Link from "next/link";

export const aboutCommand: Command = {
  name: "about",
  description: "About this terminal",
  usage: "about",
  execute: () => {
    return (
      <div>
        <div className="font-bold text-blue-500">
          Welcome to My Web Terminal! 🚀
        </div>
        <div className="text-blue-500">
          ------------------------------------------------
        </div>

        {"\n"}

        <div>This terminal was built from scratch using:</div>
        <div className="pl-2">• Next.js 15</div>
        <div className="pl-2">• TypeScript</div>
        <div className="pl-2">• Tailwind CSS</div>

        {"\n"}

        <div>Features:</div>
        <div className="pl-2">• Custom animations and transitions</div>
        <div className="pl-2">• Light/dark mode</div>
        <div className="pl-2">• Interactive commands</div>
        <div className="pl-2">• System information with a custom neofetch</div>

        {"\n"}

        <div>
          Source code:{" "}
          <Link
            href="https://github.com/santiagosayshey/santiagosayshey"
            target="_blank"
            className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
          >
            github.com/santiagosayshey/santiagosayshey
          </Link>
        </div>

        {"\n"}

        <div className="italic text-pink-400 dark:text-pink-500 animate-pulse">
          {"<"}Definitely not built to impress a certain someone{">"} ❤️
        </div>
      </div>
    );
  },
};
