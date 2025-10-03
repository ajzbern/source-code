/**
 * Calculates the project due date based on creation date and estimated time.
 * @param createdAt - The creation date in ISO 8601 format (e.g., "2025-03-22T06:04:54.250Z")
 * @param timeEstimate - The estimated time in hours
 * @param options - Optional configuration for working hours per day
 * @returns An object with the due date as a Date object and a formatted string
 */
export function calculateProjectDueDate(
  createdAt: string,
  timeEstimate: number,
  options: {
    workingHoursPerDay?: number; // Default is 24 hours (full days)
  } = {}
): {
  dueDate: Date;
  formatted: string;
} {
  const { workingHoursPerDay = 24 } = options;

  // Parse the createdAt date
  const startDate = new Date(createdAt);
  if (isNaN(startDate.getTime())) {
    throw new Error("Invalid createdAt date format");
  }

  // Convert timeEstimate (hours) to milliseconds
  const hoursInMilliseconds = timeEstimate * 60 * 60 * 1000; // hours to milliseconds

  // Calculate due date by adding timeEstimate to createdAt
  const dueDate = new Date(startDate.getTime() + hoursInMilliseconds);

  // Format the due date (e.g., "YYYY-MM-DD HH:mm:ss")
  const formatted = dueDate.toISOString().replace("T", " ").substring(0, 19);

  return {
    dueDate,
    formatted,
  };
}

// Example usage with your data
const result = calculateProjectDueDate("2025-03-22T06:04:54.250Z", 135);
console.log(result);
// {
//   dueDate: 2025-03-27T21:04:54.250Z,
//   formatted: "2025-03-27 21:04:54"
// }
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
console.log(formattedDate); // Output: March 13, 2025 at 12:16PM
