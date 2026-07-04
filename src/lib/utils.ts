import { clsx, type ClassValue } from "clsx";

/** Merge conditional classNames. Thin wrapper so call sites read cleanly. */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
