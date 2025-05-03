// This function formattings a ISO 8601 date string to a more readable format.

export function formatDate(dateStr: string): string {
  const match = dateStr.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);

  // 2025-1-1T00:00:00Z等の形式に対応
  // YYYY-MM-DD形式の文字列を正規表現でマッチさせる
  if (match) {
    const [, year, month, day] = match;
    const paddedMonth = month.padStart(2, "0");
    const paddedDay = day.padStart(2, "0");
    dateStr = dateStr.replace(
      /^(\d{4})-(\d{1,2})-(\d{1,2})/,
      `${year}-${paddedMonth}-${paddedDay}`,
    );
  }

  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1)
    .toString()
    .padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}/${month}/${day}`;
}
