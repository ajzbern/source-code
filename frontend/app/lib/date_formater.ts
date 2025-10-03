/**
 * Formats an ISO 8601 date string into the format: "Month Day, Year at HH:MMAM/PM"
 * @param isoDateString - ISO 8601 formatted date string (e.g., '2025-03-13T12:16:32.504Z')
 * @returns Formatted date string like "March 13, 2024 at 12:45PM"
 */
export function formatISODate(isoDateString: string): string {
  const date = new Date(isoDateString);

  // Get month name, day, and year
  const month = date.toLocaleString("en-US", { month: "long" });
  const day = date.getDate();
  const year = date.getFullYear();

  // Get hours and minutes with AM/PM
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // Convert 0 to 12

  // Build the formatted string
  return `${month} ${day}, ${year} at ${hours}:${minutes}${ampm}`;
}

// Example usage
const formattedDate = formatISODate("2025-03-13T12:16:32.504Z");


/**
 * Formats an ISO date string to a more readable format
 * @param isoString ISO date string
 * @returns Formatted date string
 */
// export function formatISODate(isoString: string): string {
//   if (!isoString) return "N/A"

//   try {
//     const date = new Date(isoString)
//     return new Intl.DateTimeFormat("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     }).format(date)
//   } catch (error) {
//     console.error("Error formatting date:", error)
//     return "Invalid date"
//   }
// }
