// import Link from "next/link"
// import { ArrowLeft, ArrowRight, Briefcase, Globe, MapPin, Users } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"

// export default function CareersPage() {
//   // Sample job openings
//   const jobOpenings = [
//     {
//       id: 1,
//       title: "Senior AI Engineer",
//       department: "Engineering",
//       location: "San Francisco, CA",
//       type: "Full-time",
//       remote: true,
//       description:
//         "Join our AI team to develop cutting-edge machine learning models for our project management platform.",
//     },
//     {
//       id: 2,
//       title: "Product Manager",
//       department: "Product",
//       location: "New York, NY",
//       type: "Full-time",
//       remote: true,
//       description: "Lead product development initiatives and work closely with engineering and design teams.",
//     },
//     {
//       id: 3,
//       title: "UX/UI Designer",
//       department: "Design",
//       location: "Austin, TX",
//       type: "Full-time",
//       remote: true,
//       description: "Create intuitive and beautiful user experiences for our AI-powered project management platform.",
//     },
//     {
//       id: 4,
//       title: "DevOps Engineer",
//       department: "Engineering",
//       location: "Remote",
//       type: "Full-time",
//       remote: true,
//       description: "Build and maintain our cloud infrastructure and CI/CD pipelines.",
//     },
//     {
//       id: 5,
//       title: "Technical Content Writer",
//       department: "Marketing",
//       location: "Remote",
//       type: "Contract",
//       remote: true,
//       description: "Create engaging technical content about AI and project management for our blog and documentation.",
//     },
//   ]

//   // Departments for filter
//   const departments = ["All Departments", "Engineering", "Product", "Design", "Marketing", "Sales"]

//   // Company values
//   const values = [
//     {
//       title: "Innovation First",
//       description: "We push boundaries and embrace new technologies to solve complex problems.",
//       icon: Briefcase,
//     },
//     {
//       title: "Customer Obsession",
//       description: "We put our customers at the center of everything we do.",
//       icon: Users,
//     },
//     {
//       title: "Remote-Friendly",
//       description: "We believe great work can happen anywhere, with flexible work arrangements.",
//       icon: Globe,
//     },
//   ]

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
//                 <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Join Our Team</h1>
//                 <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
//                   Help us build the future of AI-powered project management and software development.
//                 </p>
//               </div>
//               <Button size="lg" className="rounded-full">
//                 View Open Positions
//               </Button>
//             </div>
//           </div>
//         </section>

//         {/* Why Join Us */}
//         <section className="w-full py-12 md:py-24">
//           <div className="container px-4 md:px-6">
//             <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
//               <div className="space-y-4">
//                 <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
//                   Why Join <span className="text-primary">TaskPilot Labs</span>
//                 </h2>
//                 <p className="text-muted-foreground md:text-xl/relaxed">
//                   We're a team of passionate innovators building AI tools that transform how software is developed. Join
//                   us to work on cutting-edge technology that makes a real impact.
//                 </p>
//                 <ul className="space-y-2">
//                   <li className="flex items-start">
//                     <div className="mr-2 h-5 w-5 text-primary">✓</div>
//                     <span>Competitive salary and equity packages</span>
//                   </li>
//                   <li className="flex items-start">
//                     <div className="mr-2 h-5 w-5 text-primary">✓</div>
//                     <span>Comprehensive health, dental, and vision benefits</span>
//                   </li>
//                   <li className="flex items-start">
//                     <div className="mr-2 h-5 w-5 text-primary">✓</div>
//                     <span>Flexible work arrangements and remote-first culture</span>
//                   </li>
//                   <li className="flex items-start">
//                     <div className="mr-2 h-5 w-5 text-primary">✓</div>
//                     <span>Professional development budget and learning opportunities</span>
//                   </li>
//                   <li className="flex items-start">
//                     <div className="mr-2 h-5 w-5 text-primary">✓</div>
//                     <span>Regular team retreats and social events</span>
//                   </li>
//                 </ul>
//               </div>
//               <img
//                 src="/placeholder.svg?height=400&width=600"
//                 alt="TaskPilot Labs Team"
//                 width={600}
//                 height={400}
//                 className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center"
//               />
//             </div>
//           </div>
//         </section>

//         {/* Our Values */}
//         <section className="w-full py-12 md:py-24 bg-muted/30">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
//               <div className="space-y-2">
//                 <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Our Values</h2>
//                 <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
//                   The principles that guide our work and culture.
//                 </p>
//               </div>
//             </div>
//             <div className="grid gap-8 md:grid-cols-3">
//               {values.map((value, index) => (
//                 <Card key={index} className="bg-background/60 backdrop-blur-sm border-none shadow-md">
//                   <CardHeader>
//                     <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
//                       <value.icon className="h-6 w-6 text-primary" />
//                     </div>
//                     <h3 className="text-xl font-bold">{value.title}</h3>
//                   </CardHeader>
//                   <CardContent>
//                     <p className="text-muted-foreground">{value.description}</p>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Open Positions */}
//         <section id="open-positions" className="w-full py-12 md:py-24">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
//               <div className="space-y-2">
//                 <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Open Positions</h2>
//                 <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
//                   Find your next opportunity at TaskPilot Labs.
//                 </p>
//               </div>
//             </div>

//             {/* Departments */}
//             <div className="flex flex-wrap gap-2 justify-center mb-8">
//               {departments.map((department) => (
//                 <Button
//                   key={department}
//                   variant={department === "All Departments" ? "default" : "outline"}
//                   size="sm"
//                   className="rounded-full"
//                 >
//                   {department}
//                 </Button>
//               ))}
//             </div>

//             {/* Job Listings */}
//             <div className="space-y-4">
//               {jobOpenings.map((job) => (
//                 <Card key={job.id} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all">
//                   <CardHeader className="p-6">
//                     <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//                       <div>
//                         <div className="flex items-center gap-2 mb-2">
//                           <Badge variant="secondary" className="rounded-full">
//                             {job.department}
//                           </Badge>
//                           <Badge variant="outline" className="rounded-full">
//                             {job.type}
//                           </Badge>
//                           {job.remote && (
//                             <Badge variant="outline" className="rounded-full">
//                               Remote
//                             </Badge>
//                           )}
//                         </div>
//                         <h3 className="text-xl font-bold">{job.title}</h3>
//                         <div className="flex items-center text-muted-foreground mt-1">
//                           <MapPin className="mr-1 h-4 w-4" />
//                           <span>{job.location}</span>
//                         </div>
//                       </div>
//                       <Button className="rounded-full" asChild>
//                         <Link href={`/careers/${job.id}`}>
//                           Apply Now
//                           <ArrowRight className="ml-2 h-4 w-4" />
//                         </Link>
//                       </Button>
//                     </div>
//                   </CardHeader>
//                   <CardContent className="px-6 pb-6 pt-0">
//                     <p className="text-muted-foreground">{job.description}</p>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>

//             <div className="mt-8 text-center">
//               <p className="text-muted-foreground mb-4">
//                 Don't see the right position? We're always looking for talented people.
//               </p>
//               <Button variant="outline" className="rounded-full">
//                 Send Speculative Application
//               </Button>
//             </div>
//           </div>
//         </section>

//         {/* CTA */}
//         <section className="w-full py-12 md:py-24 bg-primary text-primary-foreground">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center">
//               <div className="space-y-2">
//                 <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Join Us in Shaping the Future</h2>
//                 <p className="max-w-[600px] text-primary-foreground/90 md:text-xl/relaxed">
//                   Be part of a team that's revolutionizing software development with AI.
//                 </p>
//               </div>
//               <div className="flex flex-col gap-2 min-[400px]:flex-row">
//                 <Button variant="secondary" size="lg" className="rounded-full" asChild>
//                   <Link href="#open-positions">View Open Positions</Link>
//                 </Button>
//                 <Button
//                   variant="outline"
//                   size="lg"
//                   className="rounded-full bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
//                 >
//                   Learn About Our Culture
//                 </Button>
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

