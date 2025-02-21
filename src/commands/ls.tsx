// commands/ls.tsx
import { Command } from "../types/commands";

const weirdFiles = [
  "shrek_4_directors_cut.mp4",
  "TOMMY_WISEAU_SIGNATURE_(DO_NOT_DELETE!!!!!).png",
  "full_bee_movie_script.txt",
  "every_time_i_said'bro'.csv",

  // X memes if Y / X memes if not Y
  "memes_if_trump_doesnt_win_election.zip",
  "how_to_escape_united_states_if_trump_wins.txt",

  // More unhinged weirdness
  "elon_musk_fan_cam_collection.zip",
  "bigfoot_real_PROOF.pptx",
  "rick_astley_discography.rar",
  "how_to_win_fights_against_goose_population_2024_edition.pdf",
];

export const lsCommand: Command = {
  name: "ls",
  description: "List directory contents, but weird.",
  usage: "ls",
  execute: () => {
    // Shuffle and pick a random selection (5-8 items per execution)
    const shuffledFiles = weirdFiles
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 4) + 5);

    return <pre className="text-gray-200">{shuffledFiles.join("\n")}</pre>;
  },
};
