import { useState, useCallback, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import Neofetch from "@/components/Neofetch";

type TerminalLine = {
  id: number;
  type: "command" | "output";
  content: string | ReactNode;
};

export const useTerminal = () => {
  const [history, setHistory] = useState<TerminalLine[]>([]);
  const [currentLineId, setCurrentLineId] = useState(0);
  const initialized = useRef(false);

  const addToHistory = useCallback(
    (type: "command" | "output", content: string | ReactNode) => {
      setHistory((prev) => [...prev, { id: currentLineId, type, content }]);
      setCurrentLineId((prev) => prev + 1);
    },
    [currentLineId]
  );

  const executeCommand = useCallback(
    async (command: string) => {
      addToHistory("command", command);

      switch (command.toLowerCase().trim()) {
        case "clear":
          setHistory([]);
          break;

        case "neofetch":
          addToHistory("output", <Neofetch />);
          break;

        default:
          addToHistory("output", `Command not found: ${command}`);
      }
    },
    [addToHistory]
  );

  useEffect(() => {
    if (!initialized.current) {
      executeCommand("neofetch");
      initialized.current = true;
    }
  }, []);

  return {
    history,
    executeCommand,
    addToHistory,
  };
};
