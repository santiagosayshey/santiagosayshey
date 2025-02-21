import { Command } from "../types/commands";

// Special phrases and their responses
const specialPhrases: [string, string][] = [
  ["sudo rm -rf", "Haha, nice try! 😏"],
  ["sam is the best", "No, YOU are! 🌟"],
  ["i love this terminal", "And this terminal loves you! ❤️"],
  ["hello there", "General Kenobi!"],
  ["who made this", "A pretty cool guy named Sam! 😎"],
  ["why is sam so cool", "It's just natural talent I guess 😌✨"],
  [
    "42",
    "Yes, that is indeed the answer to life, the universe, and everything! 🌌",
  ],
  ["ping", "pong! 🏓"],
  ["knock knock", "Who's there? 🚪"],
  ["i'm bored", "Have you tried running neofetch? It's pretty cool! 👀"],
  ["sudo", "Nice try! 😏"],
];

export const echoCommand: Command = {
  name: "echo",
  description: "Print text to the terminal",
  usage: "echo [text]",
  execute: (args: string[]) => {
    const input = args.join(" ").toLowerCase();

    // Check for special phrases
    for (const [phrase, response] of specialPhrases) {
      if (input.includes(phrase.toLowerCase())) {
        return response;
      }
    }

    // Default echo behavior
    return args.join(" ") || "";
  },
};
