"use client";

import { TransitionRouter } from "next-transition-router";
import { useRef, createContext, useContext, useState, ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

interface TransitionContextType {
  transitionColor: string;
  setTransitionColor: (color: string) => void;
  isTransitioning: boolean;
}

const TransitionContext = createContext<TransitionContextType>({
  transitionColor: "#c9937a",
  setTransitionColor: () => {},
  isTransitioning: false,
});

export const useTransition = () => useContext(TransitionContext);

// Page background colors - used for the wipe overlay
// Using Luxmi brand colors
export const PAGE_COLORS = {
  home: "#c9937a", // Rose
  about: "#f0d9d0", // Blush
  services: "#c9a96e", // Gold
  contact: "#1a1410", // Dark
  default: "#c9937a", // Rose
} as const;

interface TransitionProviderProps {
  children: ReactNode;
}

export function TransitionProvider({ children }: TransitionProviderProps) {
  const pathname = usePathname();
  const [transitionColor, setTransitionColor] = useState("#c9937a");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const wipeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initialColor = getColorForPath(pathname || "/");
    setTransitionColor(initialColor);
  }, [pathname]);

  return (
    <TransitionContext.Provider value={{ transitionColor, setTransitionColor, isTransitioning }}>
      <TransitionRouter
        leave={(next, from, to) => {
          setIsTransitioning(true);
          const destinationColor = getColorForPath(to || "/");
          setTransitionColor(destinationColor);

          const wipe = wipeRef.current;
          if (!wipe) {
            next();
            return;
          }

          gsap.set(wipe, { 
            yPercent: 100,
            backgroundColor: destinationColor,
            display: "block"
          });

          gsap.to(wipe, {
            yPercent: 0,
            duration: 0.6,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.delayedCall(0.1, next);
            }
          });
        }}
        enter={(next) => {
          const wipe = wipeRef.current;
          if (!wipe) {
            setIsTransitioning(false);
            next();
            return;
          }

          gsap.to(wipe, {
            yPercent: -100,
            duration: 0.5,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.set(wipe, { display: "none" });
              setIsTransitioning(false);
              next();
            }
          });
        }}
      >
        {children}

        {/* WIPE OVERLAY */}
        <div
          ref={wipeRef}
          className="fixed inset-0 pointer-events-none"
          style={{
            zIndex: 9999,
            display: "none",
            willChange: "transform",
          }}
          aria-hidden="true"
        />

        {/* INITIAL LOAD WIPE */}
        <div 
           className="fixed inset-0 pointer-events-none"
           style={{
             zIndex: 10000,
             backgroundColor: getColorForPath(pathname || "/"),
             animation: "initial-reveal 0.8s cubic-bezier(0.65, 0, 0.35, 1) 0.2s forwards",
           }}
        />
      </TransitionRouter>
    </TransitionContext.Provider>
  );
}

function getColorForPath(pathname: string): string {
  if (pathname === "/") return PAGE_COLORS.home;
  if (pathname === "/about") return PAGE_COLORS.about;
  if (pathname === "/services") return PAGE_COLORS.services;
  if (pathname === "/contact") return PAGE_COLORS.contact;
  return PAGE_COLORS.default;
}

export default TransitionProvider;
