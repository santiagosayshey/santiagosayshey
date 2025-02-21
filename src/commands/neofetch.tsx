import React from "react";
import { Command } from "../types/commands";
import Neofetch from "@/components/Neofetch";

export const neofetchCommand: Command = {
  name: "neofetch",
  description: "Display my info",
  usage: "neofetch",
  execute: () => <Neofetch />,
};
