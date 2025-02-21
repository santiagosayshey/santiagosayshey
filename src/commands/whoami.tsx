import React from "react";
import { Command } from "../types/commands";
import WhoamiOutput from "@/components/WhoamiOutput";

export const whoamiCommand: Command = {
  name: "whoami",
  description: "Display information about Sam",
  usage: "whoami",
  execute: () => {
    return <WhoamiOutput />;
  },
};
