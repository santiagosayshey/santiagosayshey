import { Command } from "../types/commands";
import { useState, useEffect } from "react";

interface Track {
  name: string;
  artist: {
    "#text": string;
  };
  url: string;
  "@attr"?: {
    nowplaying: string;
  };
}

interface LastFMResponse {
  recenttracks: {
    track: Track[];
  };
}

const LASTFM_API_KEY = process.env.NEXT_PUBLIC_LASTFM_API_KEY;
const LASTFM_USERNAME = process.env.NEXT_PUBLIC_LASTFM_USERNAME;

async function getLastPlayedTrack(): Promise<Track | null> {
  if (!LASTFM_API_KEY || !LASTFM_USERNAME) {
    throw new Error("Last.fm API key or username not configured");
  }

  try {
    const response = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&format=json&limit=1`
    );
    const data: LastFMResponse = await response.json();
    return data.recenttracks.track[0] || null;
  } catch (error) {
    console.error("Error fetching Last.fm data:", error);
    return null;
  }
}

function getYouTubeSearchLink(trackName: string, artistName: string): string {
  const searchQuery = encodeURIComponent(`${trackName} ${artistName}`);
  return `https://www.youtube.com/results?search_query=${searchQuery}`;
}

const NOISY_MESSAGES = [
  "They're being too quiet... suspicious 🤔",
  "Seems they're taking a break from their questionable music taste",
  "No music? Must be touching grass",
  "Silent as a ninja... or just AFK",
  "The aux cord is finally safe",
];

const LastFmDisplay = ({ nowOnly = false }) => {
  const [track, setTrack] = useState<Track | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const lastTrack = await getLastPlayedTrack();
        setTrack(lastTrack);
      } catch (err) {
        setError("Failed to fetch track data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-gray-200">Loading last played track...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!track) {
    return <div className="text-gray-200">No recent tracks found.</div>;
  }

  // If we're only looking for now playing and there isn't one
  if (nowOnly && !track["@attr"]?.nowplaying) {
    const randomMessage =
      NOISY_MESSAGES[Math.floor(Math.random() * NOISY_MESSAGES.length)];
    return <div className="text-gray-200">{randomMessage}</div>;
  }

  const youtubeLink = getYouTubeSearchLink(track.name, track.artist["#text"]);
  const isNowPlaying = track["@attr"]?.nowplaying === "true";

  return (
    <div className="text-gray-200">
      <p>
        {isNowPlaying ? "🎵 Now playing: " : "🎵 Last played: "}
        {track.name} - {track.artist["#text"]}
      </p>
      <p className="mt-2">
        Links:{" "}
        <a
          href={track.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300"
        >
          Last.fm
        </a>
        {" | "}
        <a
          href={youtubeLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300"
        >
          YouTube
        </a>
      </p>
    </div>
  );
};

export const lastfmCommand: Command = {
  name: "lastfm",
  description: "Display my most recently played track from Last.fm",
  usage: "lastfm [-now]",
  execute: (args?: string[]) => {
    const nowOnly = args?.includes("-now");
    return <LastFmDisplay nowOnly={nowOnly} />;
  },
};
