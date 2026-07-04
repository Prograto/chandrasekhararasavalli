import React, { useRef, useEffect } from "react";
import tippy from "tippy.js";
import type { Instance } from "tippy.js";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/shift-away.css";

interface TippyProps {
  content: string;
  theme?: string;
  animation?: string;
  delay?: [number, number];
  maxWidth?: number;
  arrow?: boolean;
  children: React.ReactElement;
}

export default function Tippy({
  content,
  theme,
  animation,
  delay,
  maxWidth,
  arrow = true,
  children
}: TippyProps) {
  const ref = useRef<HTMLElement>(null);
  const instanceRef = useRef<Instance | null>(null);

  useEffect(() => {
    if (ref.current) {
      if (instanceRef.current) {
        instanceRef.current.destroy();
      }

      instanceRef.current = tippy(ref.current, {
        content,
        theme,
        animation,
        delay,
        maxWidth,
        arrow,
        allowHTML: true
      });
    }

    return () => {
      if (instanceRef.current) {
        instanceRef.current.destroy();
        instanceRef.current = null;
      }
    };
  }, [content, theme, animation, delay, maxWidth, arrow]);

  return React.cloneElement(children as React.ReactElement<any>, { ref });
}
