import { getFrontmatter } from "next-mdx-remote-client/utils";

import { Frontmatter } from "@/types";

/******************************************************/

export function getRandomInteger(min: number, max: number): number {
  min = Math.max(0, min);

  const randomFraction = Math.random();

  const randomInteger = Math.floor(randomFraction * (max - min + 1)) + min;

  return randomInteger;
}

/******************************************************/

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const obtainFrontmatter = (source: string): Frontmatter => {
  const frontmatter = getFrontmatter<Frontmatter>(source).frontmatter;

  return frontmatter;
};

/**
 * Returns the Title Case of a given string
 * https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
 */
export function toTitleCase(str: string | undefined) {
  if (!str) return;

  return str.replace(/\b\w+('\w{1})?/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
  });
}

/******************************************************/

export function replaceLastDotWithDash(str: string): string {
  var lastDotIndex = str.lastIndexOf(".");
  if (lastDotIndex !== -1) {
    return str.slice(0, lastDotIndex) + "-" + str.slice(lastDotIndex + 1);
  }
  return str;
}

/******************************************************/

export function replaceLastDashWithDot(str: string): string {
  var lastDotIndex = str.lastIndexOf("-");
  if (lastDotIndex !== -1) {
    return str.slice(0, lastDotIndex) + "." + str.slice(lastDotIndex + 1);
  }
  return str;
}

/******************************************************/

export function getMarkdownExtension(
  fileName: `${string}.md` | `${string}.mdx`
): "md" | "mdx" {
  const match = fileName.match(/\.mdx?$/);

  return match![0].substring(1) as "md" | "mdx";
}

/******************************************************/

export function validateExports(
  format: "md" | "mdx" | undefined,
  mod: Record<string, unknown>,
  isExportsDisabled: boolean
) {
  const isEmptyExport = Object.keys(mod).length === 0;

  if (format === "md" && isEmptyExport)
    return "Markdown doesn't support exports";

  // "It has been proven that the exports from the mdx are validated."
  const proofForValidatedExports =
    (mod as any).factorial?.((mod as any).num) === 720
      ? "validated exports"
      : "invalidated exports";

  // "It has been proven that all exports in the mdx document are removed."
  const proofForNoExports = isEmptyExport
    ? "all exports removed"
    : "invalidated removed exports";

  return isExportsDisabled ? proofForNoExports : proofForValidatedExports;
}
