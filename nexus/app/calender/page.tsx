import CalendarPage from "@/components/calender-page";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Calendar | Project Management",
  description: "View your project schedule and deadlines in calendar format.",
};

export default function Page() {
  return <CalendarPage />;
}
