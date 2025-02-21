import React from "react";
import { Command } from "../types/commands";
import Link from "next/link";

export const projectsCommand: Command = {
  name: "projects",
  description: "Display my projects",
  usage: "projects",
  execute: () => {
    return (
      <div>
        {/* Dictionarry */}
        <div className="space-y-2">
          <div>
            <span className="text-blue-400 font-bold">📚 Dictionarry</span>
            <span> • </span>
            <Link
              href="https://dictionarry.dev"
              target="_blank"
              className="text-blue-400 hover:text-blue-300"
            >
              dictionarry.dev
            </Link>
          </div>
          <div>
            Simplifying media automation in Radarr/Sonarr through extensive
            documentation and tools.
          </div>
          <div className="space-y-1">
            <div>
              • Interactive documentation site built with Next.js, streamlining
              complex media concepts
            </div>
            <div>
              • Custom database of tested quality profiles and formats for
              optimal media grabs
            </div>
            <div>
              • Configuration management tool (Profilarr) for automated setup
              and version control
            </div>
          </div>
        </div>

        {"\n"}

        {/* Rogue */}
        <div className="space-y-2">
          <div>
            <span className="text-blue-400 font-bold">🎮 Rogue</span>
            <span> • </span>
            <Link
              href="https://github.com/santiagosayshey/Rogue"
              target="_blank"
              className="text-blue-400 hover:text-blue-300"
            >
              github.com/santiagosayshey/Rogue
            </Link>
          </div>
          <div>
            Turn-based Rogue-Lite game built from scratch in C++ using OOP
            principles.
          </div>
          <div className="space-y-1">
            <div>• Custom game engine built using SFML graphics library</div>
            <div>• Procedurally generated dungeons and enemy placement</div>
            <div>
              • Turn-based combat system with various weapons and abilities
            </div>
            <div>• Custom pixel art and animations</div>
            <div>• Save/load system for game progression</div>
          </div>
        </div>

        {"\n"}
        {/* OMesh */}
        <div className="space-y-2">
          <div>
            <span className="text-blue-400 font-bold">💬 OMesh</span>
            <span> • </span>
            <Link
              href="https://github.com/santiagosayshey/OMesh"
              target="_blank"
              className="text-blue-400 hover:text-blue-300"
            >
              github.com/santiagosayshey/OMesh
            </Link>
          </div>
          <div>
            Secure, decentralized chat application with end-to-end encryption.
          </div>
          <div className="space-y-1">
            <div>
              • Implements WebSocket communication for real-time messaging
            </div>
            <div>• End-to-end encryption using RSA and AES</div>
            <div>• Decentralized server neighborhood protocol</div>
            <div>• File sharing capabilities with secure transfer</div>
            <div>• Built with Python, WebSockets, and React</div>
          </div>
        </div>

        {"\n"}

        {/* DigiBrain */}
        <div className="space-y-2">
          <div>
            <span className="text-blue-400 font-bold">🧠 DigiBrain</span>
            <span> • </span>
            <Link
              href="https://github.com/santiagosayshey/DigiBrain"
              target="_blank"
              className="text-blue-400 hover:text-blue-300"
            >
              github.com/santiagosayshey/DigiBrain
            </Link>
          </div>
          <div>
            Personal knowledge base and digital garden built in Obsidian.
          </div>
          <div className="space-y-1">
            <div>
              • Comprehensive Computer Science course notes and summaries
            </div>
            <div>• Project documentation and development journals</div>
            <div>• Personal knowledge management system</div>
            <div>• Learning resources and study techniques</div>
            <div>• Open-sourced for other students to reference</div>
          </div>
        </div>
      </div>
    );
  },
};
