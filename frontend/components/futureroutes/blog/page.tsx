// import Link from "next/link"
// import { ArrowLeft, Calendar, User } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"

// export default function BlogPage() {
//   // Sample blog posts data
//   const blogPosts = [
//     {
//       id: 1,
//       title: "Automating Software Documentation with AI",
//       excerpt: "Learn how AI can save your team hours of documentation work and improve accuracy.",
//       date: "April 1, 2025",
//       author: "Jane Smith",
//       category: "AI",
//       readTime: "5 min read",
//       image: "/placeholder.svg?height=200&width=400",
//     },
//     {
//       id: 2,
//       title: "The Future of Project Management: AI-Driven Insights",
//       excerpt: "Discover how artificial intelligence is transforming project management for development teams.",
//       date: "March 28, 2025",
//       author: "John Doe",
//       category: "Project Management",
//       readTime: "7 min read",
//       image: "/placeholder.svg?height=200&width=400",
//     },
//     {
//       id: 3,
//       title: "5 Ways to Improve Developer Productivity",
//       excerpt: "Practical strategies to help your development team work more efficiently without burnout.",
//       date: "March 20, 2025",
//       author: "Alex Johnson",
//       category: "Productivity",
//       readTime: "4 min read",
//       image: "/placeholder.svg?height=200&width=400",
//     },
//     {
//       id: 4,
//       title: "Integrating TaskPilot with Your Existing Workflow",
//       excerpt: "A step-by-step guide to seamlessly incorporating TaskPilot into your development process.",
//       date: "March 15, 2025",
//       author: "Sarah Lee",
//       category: "Tutorials",
//       readTime: "6 min read",
//       image: "/placeholder.svg?height=200&width=400",
//     },
//     {
//       id: 5,
//       title: "The ROI of AI in Software Development",
//       excerpt: "Analyzing the return on investment when implementing AI tools in your development workflow.",
//       date: "March 10, 2025",
//       author: "Michael Chen",
//       category: "Business",
//       readTime: "8 min read",
//       image: "/placeholder.svg?height=200&width=400",
//     },
//     {
//       id: 6,
//       title: "Building a Culture of Documentation",
//       excerpt: "How to encourage better documentation practices across your development team.",
//       date: "March 5, 2025",
//       author: "Emily Wilson",
//       category: "Team Culture",
//       readTime: "5 min read",
//       image: "/placeholder.svg?height=200&width=400",
//     },
//   ]

//   // Categories for filter
//   const categories = ["All", "AI", "Project Management", "Productivity", "Tutorials", "Business", "Team Culture"]

//   return (
//     <div className="min-h-screen flex flex-col">
//       <main className="flex-1">
//         {/* Header */}
//         <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center">
//               <div className="space-y-2">
//                 <Link
//                   href="/"
//                   className="inline-flex items-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-primary hover:text-primary/80"
//                 >
//                   <ArrowLeft className="mr-1 h-4 w-4" />
//                   Back to Home
//                 </Link>
//                 <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">TaskPilot Labs Blog</h1>
//                 <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
//                   Insights, tutorials, and updates on AI-powered project management and software development.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Categories */}
//         <section className="w-full py-6 md:py-8">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-wrap gap-2 justify-center">
//               {categories.map((category) => (
//                 <Button
//                   key={category}
//                   variant={category === "All" ? "default" : "outline"}
//                   size="sm"
//                   className="rounded-full"
//                 >
//                   {category}
//                 </Button>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Blog Posts */}
//         <section className="w-full py-12 md:py-16">
//           <div className="container px-4 md:px-6">
//             <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
//               {blogPosts.map((post) => (
//                 <Card key={post.id} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all">
//                   <div className="aspect-video overflow-hidden">
//                     <img
//                       src={post.image || "/placeholder.svg"}
//                       alt={post.title}
//                       width={400}
//                       height={200}
//                       className="object-cover w-full h-full transition-transform hover:scale-105"
//                     />
//                   </div>
//                   <CardHeader className="p-4">
//                     <div className="flex items-center gap-2 mb-2">
//                       <Badge variant="secondary" className="rounded-full">
//                         {post.category}
//                       </Badge>
//                       <span className="text-xs text-muted-foreground">{post.readTime}</span>
//                     </div>
//                     <Link href={`/blog/${post.id}`} className="hover:underline">
//                       <h3 className="text-xl font-bold">{post.title}</h3>
//                     </Link>
//                   </CardHeader>
//                   <CardContent className="p-4 pt-0">
//                     <p className="text-muted-foreground">{post.excerpt}</p>
//                   </CardContent>
//                   <CardFooter className="p-4 pt-0 flex items-center text-sm text-muted-foreground">
//                     <div className="flex items-center">
//                       <Calendar className="mr-1 h-3 w-3" />
//                       <span>{post.date}</span>
//                     </div>
//                     <div className="flex items-center ml-4">
//                       <User className="mr-1 h-3 w-3" />
//                       <span>{post.author}</span>
//                     </div>
//                   </CardFooter>
//                 </Card>
//               ))}
//             </div>
//             <div className="flex justify-center mt-12">
//               <Button variant="outline" className="rounded-full">
//                 Load More Articles
//               </Button>
//             </div>
//           </div>
//         </section>

//         {/* Newsletter */}
//         <section className="w-full py-12 md:py-24 bg-muted/30">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center">
//               <div className="space-y-2">
//                 <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Stay Updated</h2>
//                 <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
//                   Subscribe to our newsletter for the latest articles, tutorials, and updates.
//                 </p>
//               </div>
//               <div className="w-full max-w-sm space-y-2">
//                 <form className="flex space-x-2">
//                   <input
//                     className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1"
//                     placeholder="Enter your email"
//                     type="email"
//                   />
//                   <Button type="submit">Subscribe</Button>
//                 </form>
//                 <p className="text-xs text-muted-foreground">We respect your privacy. Unsubscribe at any time.</p>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>

//       {/* Footer */}
//       <footer className="w-full py-6 bg-muted/50">
//         <div className="container px-4 md:px-6">
//           <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//             <p className="text-sm text-muted-foreground">
//               © {new Date().getFullYear()} TaskPilot Labs. All rights reserved.
//             </p>
//             <div className="flex gap-6">
//               <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
//                 Privacy Policy
//               </Link>
//               <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
//                 Terms of Service
//               </Link>
//               <Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
//                 Cookie Policy
//               </Link>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   )
// }

