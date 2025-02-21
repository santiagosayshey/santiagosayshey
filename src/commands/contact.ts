import { Command } from "../types/commands";

export const contactCommand: Command = {
  name: "contact",
  description: "Display my contact information",
  usage: "contact",
  execute: () => {
    return [
      "Contact Information",
      "-------------------",
      "📧 Email:   schau22@pm.me",
      "👾 Discord: santiagosayshey",
    ].join("\n");
  },
};
