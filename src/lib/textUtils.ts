export function truncateText(text: string, maxChars: number) {
  if (!text) return '';
  if (text.length <= maxChars) return text;

  // Reserve 3 chars for "..."
  const sliceLen = Math.max(0, maxChars - 3);
  return `${text.slice(0, sliceLen).trimEnd()}...`;
}

