import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PersonalInfo, info } from "@/constants/neofetchConstants";

const Neofetch = () => {
  const infoRef = useRef<HTMLDivElement>(null);

  // This ref tells us if the user *started* in portrait
  // We only check it once, on mount.
  const portraitOnMountRef = useRef(false);

  // We'll still track the current orientation for layout (stack vs. side by side).
  const [isPortrait, setIsPortrait] = useState(false);

  // These control the animations:
  const [visibleItems, setVisibleItems] = useState(0);
  const [showTitle, setShowTitle] = useState(false);
  const [showImage, setShowImage] = useState(false);

  // 1) On first mount, decide if we started in portrait.
  //    Also attach a resize listener to keep isPortrait updated for layout.
  useEffect(() => {
    const checkOrientation = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };
    // Check on mount
    const startedPortrait = window.innerHeight > window.innerWidth;
    portraitOnMountRef.current = startedPortrait;
    setIsPortrait(startedPortrait);

    // Listen for orientation changes to adjust layout (not animations)
    window.addEventListener("resize", checkOrientation);
    return () => {
      window.removeEventListener("resize", checkOrientation);
    };
  }, []);

  // 2) Run animations (or skip) depending on whether we STARTED in portrait.
  useEffect(() => {
    // If we started in portrait, skip all animations, show final state immediately
    if (portraitOnMountRef.current) {
      setShowTitle(true);
      setShowImage(true);
      setVisibleItems(info.length); // Reveal all rows
      return;
    }

    // Otherwise, run the normal animations:
    setTimeout(() => setShowTitle(true), 50);

    info.forEach((_, index) => {
      setTimeout(() => {
        setVisibleItems((prev) => index + 1);
      }, 150 + index * 35);
    });

    const rowsAnimationTime = 150 + info.length * 35 + 600;
    setTimeout(() => setShowImage(true), rowsAnimationTime);
  }, []);

  return (
    <div
      className={`
        p-4 gap-4 items-start
        flex
        ${isPortrait ? "flex-col" : "flex-col md:flex-row md:items-center"}
      `}
    >
      {/* Image container */}
      <div
        className={`
          transition-all duration-300 overflow-hidden
          ${showImage ? "opacity-100" : "opacity-0"}
          // If portrait or small, just full width. Otherwise, 1/3 width at md+
          ${isPortrait ? "w-full" : "w-full md:w-1/3 self-center"}
        `}
        style={{
          transform: `translateX(${showImage ? "0%" : "-100%"})`,
        }}
      >
        {/* Keep aspect-square or remove if you prefer a different ratio */}
        <div className="relative w-full aspect-square">
          <Image
            src="/images/grim.jpg"
            alt="Profile"
            fill
            className="rounded-lg object-cover"
          />
        </div>
      </div>

      {/* Info container */}
      <div
        // If portrait -> full width. Otherwise -> 2/3 at md+
        className={isPortrait ? "w-full" : "w-full md:w-2/3"}
        ref={infoRef}
      >
        <div
          className={`
            mb-4 transition-transform duration-200
            ${showTitle ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <div className="font-bold text-blue-500">sam@santiagosayshey.me</div>
          <div className="text-blue-500">-----------------------</div>
        </div>

        <div
          className="grid gap-2"
          style={{
            gridTemplateColumns: "minmax(120px, max-content) 1fr",
            columnGap: "2rem",
          }}
        >
          {info.map(({ label, value, link }: PersonalInfo, index) => (
            <React.Fragment key={label}>
              {/* Label */}
              <div
                className="text-blue-500 flex items-center transition-all duration-200"
                style={{
                  transform: `translateX(${
                    index < visibleItems ? "0" : "-100%"
                  })`,
                  opacity: index < visibleItems ? 1 : 0,
                  transitionDelay: `${index * 25 + 50}ms`,
                }}
              >
                {label}:
              </div>
              {/* Value */}
              <div
                className="flex items-center transition-all duration-200"
                style={{
                  transform: `translateX(${
                    index < visibleItems ? "0" : "-100%"
                  })`,
                  opacity: index < visibleItems ? 1 : 0,
                  transitionDelay: `${index * 25 + 100}ms`,
                }}
              >
                {link ? (
                  <Link
                    href={link}
                    target="_blank"
                    className="text-blue-400 underline underline-offset-2
                               hover:text-blue-500 dark:text-blue-400
                               dark:hover:text-blue-300 cursor-pointer transition-colors"
                  >
                    {value}
                  </Link>
                ) : (
                  <span className="text-gray-700 dark:text-gray-200">
                    {value}
                  </span>
                )}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Neofetch;
