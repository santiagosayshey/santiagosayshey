import { ReactNode } from "react";

export interface Command {
  name: string;
  description: string;
  usage: string;
  execute: (args: string[]) => Promise<ReactNode> | ReactNode;
}
