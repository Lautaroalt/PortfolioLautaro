"use client";

import { useEffect, useMemo, useState } from "react";

type TypingTextProps = {
  texts: string[];
  speed?: number;
  deleteSpeed?: number;
  pauseTime?: number;
  className?: string;
  cursorClassName?: string;
};

export function TypingText({
  texts,
  speed = 65,
  deleteSpeed = 38,
  pauseTime = 1400,
  className,
  cursorClassName,
}: TypingTextProps) {
  const safeTexts = useMemo(() => texts.filter(Boolean), [texts]);
  const [state, setState] = useState(() => ({
    textIndex: 0,
    displayText: safeTexts[0] ?? "",
    isDeleting: false,
  }));

  useEffect(() => {
    if (safeTexts.length === 0) {
      return;
    }

    const currentText = safeTexts[state.textIndex % safeTexts.length] ?? "";

    if (!state.isDeleting && state.displayText === currentText) {
      const timer = window.setTimeout(() => {
        setState((prev) => ({ ...prev, isDeleting: true }));
      }, pauseTime);
      return () => window.clearTimeout(timer);
    }

    const nextText = state.isDeleting
      ? currentText.slice(0, state.displayText.length - 1)
      : currentText.slice(0, state.displayText.length + 1);

    const timer = window.setTimeout(
      () => {
        setState((prev) => {
          if (prev.isDeleting && prev.displayText.length === 0) {
            return {
              textIndex: (prev.textIndex + 1) % safeTexts.length,
              displayText: "",
              isDeleting: false,
            };
          }

          return {
            ...prev,
            displayText: nextText,
          };
        });
      },
      state.isDeleting ? deleteSpeed : speed,
    );

    return () => window.clearTimeout(timer);
  }, [deleteSpeed, pauseTime, safeTexts, speed, state.displayText, state.isDeleting, state.textIndex]);

  if (safeTexts.length === 0) {
    return null;
  }

  const longestText = safeTexts.reduce(
    (longest, current) => (current.length > longest.length ? current : longest),
    safeTexts[0],
  );

  return (
    <span className={`relative inline-flex ${className ?? ""}`.trim()}>
      <span className="invisible whitespace-pre">{longestText}</span>
      <span className="absolute inset-0 whitespace-pre">
        {state.displayText}
        <span
          aria-hidden="true"
          className={`ml-0.5 inline-block h-[1em] w-px animate-pulse bg-current align-[-0.12em] ${cursorClassName ?? ""}`.trim()}
        />
      </span>
    </span>
  );
}
