"use client";

import { useEffect, useRef } from "react";
import { logEvent } from "@/lib/firebase";

/**
 * Scroll depth tracker using Intersection Observer.
 *
 * Fires a `section_view` event once per section per session when the section
 * becomes visible in the viewport (at least 30% visible).
 *
 * Also tracks overall scroll depth in 25% increments (scroll_depth_25, _50, _75, _100).
 *
 * Usage:
 *   const { sectionRef } = useScrollTracking();
 *   <section ref={sectionRef("hero")}> ...
 *
 * Or wrap sections automatically using <TrackedSection name="hero">
 */

const SEEN_SECTIONS_KEY = "sw_sections_seen";
const SEEN_DEPTH_KEY = "sw_depth_seen";

export function useScrollTracking() {
  const observers = useRef([]);
  const seenSections = useRef(new Set());
  const seenDepths = useRef(new Set());
  const refs = useRef({});

  useEffect(() => {
    // Restore from session to avoid duplicate events on soft navigations
    try {
      const saved = sessionStorage.getItem(SEEN_SECTIONS_KEY);
      if (saved) seenSections.current = new Set(JSON.parse(saved));
      const savedDepth = sessionStorage.getItem(SEEN_DEPTH_KEY);
      if (savedDepth) seenDepths.current = new Set(JSON.parse(savedDepth));
    } catch {}

    // Section observer - fires when 30% of section is visible
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const name = entry.target.dataset.trackSection;
            if (name && !seenSections.current.has(name)) {
              seenSections.current.add(name);
              logEvent(`sv_${name}`, {
                section_name: name,
                page: "startup_weekend",
              });
              try {
                sessionStorage.setItem(
                  SEEN_SECTIONS_KEY,
                  JSON.stringify([...seenSections.current])
                );
              } catch {}
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    // Observe all tracked sections
    Object.values(refs.current).forEach((el) => {
      if (el) sectionObserver.observe(el);
    });
    observers.current.push(sectionObserver);

    // Scroll depth tracking (25%, 50%, 75%, 100%)
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const pct = Math.round((scrollTop / docHeight) * 100);

      [25, 50, 75, 100].forEach((threshold) => {
        if (pct >= threshold && !seenDepths.current.has(threshold)) {
          seenDepths.current.add(threshold);
          logEvent(`scroll_depth_${threshold}`, {
            page: "startup_weekend",
            depth_percent: threshold,
          });
          try {
            sessionStorage.setItem(
              SEEN_DEPTH_KEY,
              JSON.stringify([...seenDepths.current])
            );
          } catch {}
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observers.current.forEach((obs) => obs.disconnect());
      observers.current = [];
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Returns a ref callback for a named section
  const sectionRef = (name) => (el) => {
    if (el) {
      el.dataset.trackSection = name;
      refs.current[name] = el;
    }
  };

  return { sectionRef };
}

/**
 * Wrapper component for easy section tracking.
 *
 * Usage:
 *   <TrackedSection name="hero" className="...">
 *     <h1>...</h1>
 *   </TrackedSection>
 */
export function TrackedSection({ name, children, as: Tag = "div", ...props }) {
  const ref = useRef(null);
  const hasFired = useRef(false);

  useEffect(() => {
    if (!ref.current || hasFired.current) return;

    // Check session storage
    try {
      const saved = sessionStorage.getItem(SEEN_SECTIONS_KEY);
      if (saved) {
        const seen = new Set(JSON.parse(saved));
        if (seen.has(name)) {
          hasFired.current = true;
          return;
        }
      }
    } catch {}

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasFired.current) {
          hasFired.current = true;
          logEvent(`sv_${name}`, {
            section_name: name,
            page: "startup_weekend",
          });
          try {
            const saved = sessionStorage.getItem(SEEN_SECTIONS_KEY);
            const seen = saved ? new Set(JSON.parse(saved)) : new Set();
            seen.add(name);
            sessionStorage.setItem(
              SEEN_SECTIONS_KEY,
              JSON.stringify([...seen])
            );
          } catch {}
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [name]);

  return (
    <Tag ref={ref} data-track-section={name} {...props}>
      {children}
    </Tag>
  );
}
