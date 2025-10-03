// import { redirect } from "next/navigation"

// // List of paths that should not be redirected
// const validPaths = [
//   "coming-soon",
//   // "about",
//   // "careers",
//   // "contact",
//   // "blog",
//   // "contact",
//   // "cookies",
//   // "case-studies",
//   // "privacy",
//   // "terms",
// ]

// export default function CatchAllPage({ params }: { params: { slug: string[] } }) {
//   // Get the current path from the slug
//   const currentPath = params.slug.join("/")

//   // Check if the current path is in our list of valid paths
//   if (validPaths.includes(currentPath)) {
//     // If we're already trying to access a valid path like 'coming-soon',
//     // we should not redirect to avoid a loop
//     throw new Error(`Page ${currentPath} should exist but was caught by catch-all route`)
//   }

//   // For all other undefined routes, redirect to the coming soon page
//   redirect("/coming-soon")
// }

