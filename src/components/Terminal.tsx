"use client";

import { useState, useRef, useEffect } from "react";
import Prompt from "@/components/Prompt";
import { useTerminal } from "@/hooks/useTerminal";
import { useDarkMode } from "@/hooks/useDarkMode";
import { Minus, X, Moon, Sun } from "lucide-react";

const WindowButton = ({
  onClick,
  title,
  children,
}: {
  onClick: () => void;
  title?: string;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    title={title}
    className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-[#2a2a2a] dark:hover:bg-[#333333] transition-colors"
  >
    {children}
  </button>
);

export default function Terminal() {
  const { isDark, toggle } = useDarkMode();
  const { history, executeCommand } = useTerminal();
  const [closeAttempts, setCloseAttempts] = useState(0);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState(getTime());

  function getTime() {
    return new Date().toLocaleTimeString("en-US", {
      hour12: true,
      hour: "numeric",
      minute: "2-digit",
    });
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const closeMessages = [
    "Nice try! 😉",
    "Nope, not happening",
    "This terminal is staying open",
    "You're persistent, aren't you?",
    "Maybe try Alt+F4? (Just kidding)",
    "I could do this all day...",
  ];

  const handleClose = () => {
    const message =
      closeMessages[Math.min(closeAttempts, closeMessages.length - 1)];
    executeCommand(`echo "${message}"`);
    setCloseAttempts((prev) => prev + 1);
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleTerminalClick = () => {
    const commandInput = terminalRef.current?.querySelector(
      'input[name="command"]'
    ) as HTMLInputElement;
    if (commandInput) {
      commandInput.focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black">
      <div className="w-[1800px] bg-white dark:bg-[#2b2b2b] rounded-lg overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gray-100 dark:bg-[#1e1e1e] px-4 h-12 flex items-center justify-between">
          {/* Left side */}
          <div className="z-10">
            <div className="flex items-center gap-2">
              <WindowButton
                onClick={toggle}
                title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDark ? (
                  <Sun size={18} className="text-gray-200" />
                ) : (
                  <Moon size={18} className="text-gray-600" />
                )}
              </WindowButton>
            </div>
          </div>

          {/* Center title */}
          <div className="absolute left-1/2 transform -translate-x-1/2 text-gray-600 dark:text-gray-300">
            terminal.santiagosayshey.me
          </div>

          {/* Right side buttons */}
          <div className="flex items-center gap-2 z-10">
            <WindowButton
              onClick={() => executeCommand('echo "Still here! 😄"')}
              title="Minimize"
            >
              <Minus size={18} className="text-gray-600 dark:text-gray-200" />
            </WindowButton>
            <WindowButton onClick={handleClose} title="Close">
              <X size={18} className="text-gray-600 dark:text-gray-200" />
            </WindowButton>
          </div>
        </div>

        {/* Terminal Content */}
        <div
          ref={terminalRef}
          className="bg-white dark:bg-[#1A1D23] h-[1000px] p-4 overflow-y-auto cursor-text"
          onClick={handleTerminalClick}
          style={{ fontFamily: "MesloLGS NF, monospace" }}
        >
          {/* History */}
          <div className="space-y-1 text-base">
            {history.map((line) => (
              <div key={line.id}>
                {line.type === "command" ? (
                  <Prompt
                    currentPath="~"
                    command={line.content as string}
                    time={getTime()}
                  />
                ) : (
                  <pre className="text-gray-800 dark:text-gray-200 mb-2 whitespace-pre-wrap font-[inherit]">
                    {line.content}
                  </pre>
                )}
              </div>
            ))}
          </div>

          {/* Current input line */}
          <Prompt
            currentPath="~"
            showInput
            onCommand={executeCommand}
            time={currentTime}
          />
        </div>
      </div>
    </div>
  );
}
