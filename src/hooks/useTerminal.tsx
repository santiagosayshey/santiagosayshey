import { useState, useCallback, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { commands } from "@/commands";

type TerminalLine = {
  id: number;
  type: "command" | "output";
  content: ReactNode;
};

export const useTerminal = () => {
  const [history, setHistory] = useState<TerminalLine[]>([]);
  const [currentLineId, setCurrentLineId] = useState(0);
  const initialized = useRef(false);
  const neofetchComplete = useRef(false);

  const addToHistory = useCallback(
    (type: "command" | "output", content: ReactNode) => {
      setHistory((prev) => [...prev, { id: currentLineId, type, content }]);
      setCurrentLineId((prev) => prev + 1);
    },
    [currentLineId]
  );

  const executeCommand = useCallback(
    async (commandLine: string) => {
      addToHistory("command", commandLine);

      if (commandLine.toLowerCase().trim() === "clear") {
        setHistory([]);
        return;
      }

      const args = commandLine.trim().split(/\s+/);
      const commandName = args[0].toLowerCase();
      const commandArgs = args.slice(1);

      // Single neofetch check that triggers whoami
      if (commandName === "neofetch" && !initialized.current) {
        setTimeout(() => {
          neofetchComplete.current = true;
          executeCommand("whoami");
        }, 1800);
      }

      if (
        commandName === "whoami" &&
        !neofetchComplete.current &&
        !initialized.current
      ) {
        return;
      }

      const command = commands[commandName];
      if (command) {
        try {
          const output = await command.execute(commandArgs);
          addToHistory("output", output);
        } catch (err) {
          const error = err as Error;
          addToHistory(
            "output",
            `Error executing command: ${error.message || "Unknown error"}`
          );
        }
      } else {
        addToHistory("output", `Command not found: ${commandName}`);
      }
    },
    [addToHistory]
  );

  useEffect(() => {
    if (!initialized.current) {
      executeCommand("neofetch");
      initialized.current = true;
    }
  }, [executeCommand]);

  return {
    history,
    executeCommand,
    addToHistory,
  };
};
