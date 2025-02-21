import { Command } from "../types/commands";
import { helpCommand } from "./help";
import { whoamiCommand } from "./whoami";
import { neofetchCommand } from "./neofetch";
import { echoCommand } from "./echo";
import { contactCommand } from "./contact";
import { aboutCommand } from "./about";

export const commands: Record<string, Command> = {
  help: helpCommand,
  whoami: whoamiCommand,
  neofetch: neofetchCommand,
  echo: echoCommand,
  contact: contactCommand,
  about: aboutCommand,
};
