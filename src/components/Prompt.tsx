import React from "react";

interface PromptProps {
  currentPath?: string;
  showInput?: boolean;
  command?: string | React.ReactNode;
  onCommand?: (command: string) => void;
  time?: string;
}

export const Prompt: React.FC<PromptProps> = ({
  currentPath = "~",
  showInput = false,
  command,
  onCommand,
  time,
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = (
      e.currentTarget.elements.namedItem("command") as HTMLInputElement
    ).value;
    if (input.trim() && onCommand) {
      onCommand(input);
      (
        e.currentTarget.elements.namedItem("command") as HTMLInputElement
      ).value = "";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center w-full">
      {/* Left side with prompt */}
      <div className="flex items-center min-w-fit">
        {/* OS Icon segment */}
        <div className="bg-[#264F8D] text-white px-2 py-0.5 flex items-center rounded-tl-xl rounded-bl-xl">
          <span>❯</span>
        </div>
        {/* Directory segment */}
        <div className="bg-[#3465A4] text-white px-2 py-0.5 flex items-center rounded-tr-xl rounded-br-xl">
          {currentPath}
        </div>
      </div>
      {/* Content/Input area */}
      {showInput ? (
        <input
          name="command"
          type="text"
          className="flex-1 bg-transparent outline-none px-2 text-gray-800 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-600"
          style={{ fontFamily: "MesloLGS NF, monospace" }}
          placeholder="Type 'help' to see available commands..."
          autoFocus
        />
      ) : (
        <div className="flex-1 px-2 text-gray-800 dark:text-gray-200">
          {command}
        </div>
      )}
      {/* Right side - Time */}
      {time && (
        <div className="bg-[#2C5BA6] text-white px-2 py-0.5 rounded-xl">
          {time}
        </div>
      )}
    </form>
  );
};

export default Prompt;
