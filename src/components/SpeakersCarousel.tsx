"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import speakersData from "@/data/speakers.json";
import type { Speaker } from "@/types/speakers";

export default function SpeakersCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const speakers: Speaker[] = speakersData;
  const maxIndex = Math.max(0, speakers.length - visibleCount);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const getSocialIcon = (platform: string) => {
    const iconProps = { className: "w-5 h-5", fill: "currentColor" };

    switch (platform) {
      case "linkedin":
        return (
          <svg {...iconProps} viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        );
      case "twitter":
        return (
          <svg {...iconProps} viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
          </svg>
        );
      case "github":
        return (
          <svg {...iconProps} viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        );
      case "behance":
        return (
          <svg {...iconProps} viewBox="0 0 24 24">
            <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 2-5.101 2-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
          </svg>
        );
      case "instagram":
        return (
          <svg {...iconProps} viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section className="py-20 px-6 bg-white dark:bg-dark-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Palestrantes
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Conheça os especialistas que vão compartilhar conhecimento no Join
            Community 2025
          </p>
          <Link
            href="/speakers"
            className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            Ver todos os palestrantes
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>

        <div className="relative">
          {/* Carousel Container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / visibleCount)
                }%)`,
              }}
            >
              {speakers
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((speaker) => (
                  <div
                    key={speaker.id}
                    className={`flex-shrink-0 px-4 ${
                      visibleCount === 1
                        ? "w-full"
                        : visibleCount === 2
                        ? "w-1/2"
                        : "w-1/3"
                    }`}
                  >
                    <div className="bg-gray-50 dark:bg-dark-800 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-200 h-full">
                      <div className="text-center">
                        <div className="relative w-32 h-32 mx-auto mb-6">
                          <Image
                            src={speaker.photo}
                            alt={speaker.name}
                            fill
                            className="rounded-full object-cover"
                          />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          {speaker.name}
                        </h3>
                        <p className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-2">
                          {speaker.talk}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                          {speaker.community}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 line-clamp-3">
                          {speaker.bio}
                        </p>

                        {/* Social Links */}
                        <div className="flex justify-center space-x-4">
                          {speaker.linkedin && (
                            <a
                              href={speaker.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-blue-600 transition-colors"
                            >
                              {getSocialIcon("linkedin")}
                            </a>
                          )}
                          {speaker.instagram && (
                            <a
                              href={speaker.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-pink-500 transition-colors"
                            >
                              {getSocialIcon("instagram")}
                            </a>
                          )}
                          {speaker.twitter && (
                            <a
                              href={speaker.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-blue-400 transition-colors"
                            >
                              {getSocialIcon("twitter")}
                            </a>
                          )}
                          {speaker.github && (
                            <a
                              href={speaker.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                            >
                              {getSocialIcon("github")}
                            </a>
                          )}
                          {speaker.behance && (
                            <a
                              href={speaker.behance}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-blue-500 transition-colors"
                            >
                              {getSocialIcon("behance")}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          {speakers.length > visibleCount && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white dark:bg-dark-700 shadow-lg rounded-full p-3 hover:bg-gray-50 dark:hover:bg-dark-600 transition-colors"
                aria-label="Palestrante anterior"
              >
                <svg
                  className="w-6 h-6 text-gray-600 dark:text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white dark:bg-dark-700 shadow-lg rounded-full p-3 hover:bg-gray-50 dark:hover:bg-dark-600 transition-colors"
                aria-label="Próximo palestrante"
              >
                <svg
                  className="w-6 h-6 text-gray-600 dark:text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}

          {/* Indicators */}
          {speakers.length > visibleCount && (
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentIndex === index
                      ? "bg-primary-600"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                  aria-label={`Ir para grupo ${index + 1} de palestrantes`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
