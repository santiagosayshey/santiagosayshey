import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PersonalInfo, info } from "@/constants/neofetchConstants";

const Neofetch = () => {
  const infoRef = useRef<HTMLDivElement>(null);
  const [imageSize, setImageSize] = useState(0);
  const [visibleItems, setVisibleItems] = useState(0);
  const [showTitle, setShowTitle] = useState(false);
  const [showImage, setShowImage] = useState(false);

  const updateImageSize = () => {
    if (infoRef.current) {
      const height = infoRef.current.offsetHeight;
      setImageSize(height);
    }
  };

  useEffect(() => {
    // Initial title animation
    setTimeout(() => setShowTitle(true), 50);

    // Row animations
    info.forEach((_: PersonalInfo, index: number) => {
      setTimeout(() => {
        setVisibleItems(index + 1);
        setTimeout(updateImageSize, 10);
      }, 150 + index * 35); // Slightly slower row animations
    });

    // Image animation - appears well after all rows
    const rowsAnimationTime = 150 + info.length * 35 + 600; // Longer buffer
    setTimeout(() => {
      setShowImage(true);
    }, rowsAnimationTime);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", updateImageSize);
    return () => window.removeEventListener("resize", updateImageSize);
  }, []);

  useEffect(() => {
    updateImageSize();
  }, [visibleItems]);

  return (
    <div className="py-4 px-1 flex">
      <div
        className={`transition-all duration-200 shrink-0 ${
          showImage ? "w-[480px] opacity-100" : "w-0 opacity-0"
        }`}
        style={{
          minWidth: showImage ? "600px" : "0",
        }}
      >
        <div
          className="relative rounded-lg transition-all duration-300 ml-1"
          style={{
            width: `${imageSize}px`,
            height: `${imageSize}px`,
            transform: `translateX(${showImage ? "0" : "-100%"})`,
            opacity: showImage ? 1 : 0,
          }}
        >
          <Image
            src="/images/grim.jpg"
            alt="Profile"
            fill
            className="rounded-lg object-cover"
          />
        </div>
      </div>

      <div className="flex flex-col min-w-[600px]" ref={infoRef}>
        <div
          className={`mb-4 transition-transform duration-200 ${
            // Increased margin bottom
            showTitle ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="font-bold text-blue-500">sam@santiagosayshey.me</div>
          <div className="text-blue-500">-----------------------</div>
        </div>
        <div
          className="grid gap-2" // Increased gap between rows
          style={{
            gridTemplateColumns: "minmax(120px, max-content) 1fr",
            columnGap: "2rem", // Increased gap between columns
          }}
        >
          {info.map(({ label, value, link }: PersonalInfo, index) => (
            <React.Fragment key={label}>
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
                    className="text-blue-400 underline underline-offset-2 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 cursor-pointer transition-colors"
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
