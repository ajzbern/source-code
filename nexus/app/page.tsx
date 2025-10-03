import { redirect } from "next/navigation";

export default function Home() {
  // In a real app, check if user is authenticated
  // For demo purposes, redirect to login
  redirect("/login");

  return null;
}
