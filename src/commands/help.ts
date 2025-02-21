import { Command } from "../types/commands";
import { commands } from "./index";

export const helpCommand: Command = {
  name: "help",
  description: "Display information about available commands",
  usage: "help [command]",
  execute: (args: string[]) => {
    if (args.length > 0) {
      const commandName = args[0].toLowerCase();
      const command = commands[commandName];

      if (command) {
        return [
          `Command: ${command.name}`,
          `Description: ${command.description}`,
          `Usage: ${command.usage}`,
          "", // Empty line at the end
        ].join("\n");
      }

      return `Command '${commandName}' not found. Type 'help' to see all available commands.`;
    }

    const commandList = Object.values(commands)
      .map((cmd) => `  ${cmd.name.padEnd(12)} - ${cmd.description}`)
      .join("\n");

    return [
      "Available commands:",
      commandList,
      "", // Empty line
      "Type 'help [command]' for more information about a specific command.",
      "", // Empty line at the end
    ].join("\n");
  },
};
