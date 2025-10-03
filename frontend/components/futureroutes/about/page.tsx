// import Link from "next/link"
// import { ArrowLeft, ArrowRight, Github, Linkedin, Twitter } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"

// export default function AboutPage() {
//   const teamMembers = [
//     {
//       name: "Mohit Gajjar",
//       role: "CEO & Co-Founder",
//       bio: "Mohit Gajjar has over 4 years of experience in software development and WEB3. He previously led engineering teams at major tech projects.",
//       image: "/assets/mohit.jpg",
//       social: {
//         twitter: "https://x.com/_mohitgajjar",
//         linkedin: "https://www.linkedin.com/in/_mohitgajjar/",
//         github: "https://github.com/Gajjar-Mohit",
//       },
//     },
//     {
//       name: "Keval Solanki",
//       role: "CTO & Co-Founder",
//       bio: "Keval Solanki is an AI researcher with a Fabulous knowledge in Machine Learning. He's passionate about making AI accessible to developers.",
//       image: "/assets/keval.png",
//       social: {
//         twitter: "http://x.com/SolankiKevalS1",
//         linkedin: "https://www.linkedin.com/in/kevalsolanki3003/",
//         github: "https://github.com/solankikeval166",
//       },
//     },
//   ];

//   // Company milestones
//   const milestones = [
//     {
//       year: "2025",
//       title: "TaskPilot Labs Founded",
//       description:
//         "Keval Solanki and Mohit Gajjar founded TaskPilot Labs with a vision to revolutionize software development with AI.",
//     },
//     // {
//     //   year: "2023",
//     //   title: "Seed Funding",
//     //   description:
//     //     "Raised $2.5M in seed funding to build the first version of our AI-powered project management platform.",
//     // },
//     // {
//     //   year: "2024",
//     //   title: "Beta Launch",
//     //   description:
//     //     "Released our beta product to 500 early adopters, gathering valuable feedback and refining our platform.",
//     // },
//     // {
//     //   year: "2024",
//     //   title: "Team Expansion",
//     //   description: "Grew our team to 15 talented engineers, designers, and AI researchers from leading tech companies.",
//     // },
//     // {
//     //   year: "2025",
//     //   title: "Public Launch",
//     //   description:
//     //     "Officially launched TaskPilot Labs to the public, offering free access during our initial growth phase.",
//     // },
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
//                 <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">About TaskPilot Labs</h1>
//                 <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
//                   We're on a mission to transform software development with AI-powered automation.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Our Story */}
//         <section className="w-full py-12 md:py-24">
//           <div className="container px-4 md:px-6">
//             <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
//               <div className="space-y-4">
//                 <Badge className="mb-2">Our Story</Badge>
//                 <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
//                   From Idea to <span className="text-primary">Innovation</span>
//                 </h2>
//                 <p className="text-muted-foreground md:text-xl/relaxed">
//                   TaskPilot Labs was born from a simple observation: developers spend too much time on documentation and
//                   project management instead of doing what they love—coding and creating.
//                 </p>
//                 <p className="text-muted-foreground">
//                   Founded in 2025 by Keval Solanki and Mohit Gajjar, two software engineers frustrated with inefficient
//                   workflows, TaskPilot Labs set out to build an AI-powered solution that automates the tedious parts of
//                   software development.
//                 </p>
//                 <p className="text-muted-foreground">
//                   Our team combines expertise in artificial intelligence, software development, and project management
//                   to create tools that help development teams work smarter, not harder.
//                 </p>
//                 <div className="flex flex-col gap-2 min-[400px]:flex-row">
//                   <Button className="rounded-full" asChild>
//                     <Link href="/careers">
//                       Join Our Team
//                       <ArrowRight className="ml-2 h-4 w-4" />
//                     </Link>
//                   </Button>
//                 </div>
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

//         {/* Our Mission */}
//         <section className="w-full py-12 md:py-24 bg-muted/30">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center">
//               <div className="space-y-2 max-w-[800px]">
//                 <Badge className="mb-2">Our Mission</Badge>
//                 <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
//                   Empowering Developers Through Automation
//                 </h2>
//                 <p className="text-muted-foreground md:text-xl/relaxed">
//                   We believe that by automating routine tasks, we can free developers to focus on what matters most:
//                   building great software that solves real problems.
//                 </p>
//                 <p className="text-muted-foreground">
//                   Our mission is to create AI tools that understand the nuances of software development, learn from your
//                   team's patterns, and streamline workflows—all while maintaining the highest standards of security and
//                   privacy.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Team */}
//         <section className="w-full py-12 md:py-24">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
//               <div className="space-y-2">
//                 <Badge className="mb-2">Our Team</Badge>
//                 <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
//                   Meet the Minds Behind TaskPilot Labs
//                 </h2>
//                 <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
//                   A diverse team of engineers, designers, and AI specialists united by a passion for innovation.
//                 </p>
//               </div>
//             </div>

//             <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
//               {teamMembers.map((member, index) => (
//                 <Card key={index} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all">
//                   <div className="aspect-square overflow-hidden">
//                     <img
//                       src={member.image || "/placeholder.svg"}
//                       alt={member.name}
//                       width={300}
//                       height={300}
//                       className="object-cover w-full h-full transition-transform hover:scale-105"
//                     />
//                   </div>
//                   <CardHeader className="p-4">
//                     <h3 className="text-xl font-bold">{member.name}</h3>
//                     <p className="text-sm text-muted-foreground">{member.role}</p>
//                   </CardHeader>
//                   <CardContent className="p-4 pt-0">
//                     <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
//                     <div className="flex gap-2">
//                       <Button variant="ghost" size="icon" asChild>
//                         <Link href={member.social.twitter} aria-label="Twitter">
//                           <Twitter className="h-4 w-4" />
//                         </Link>
//                       </Button>
//                       <Button variant="ghost" size="icon" asChild>
//                         <Link href={member.social.linkedin} aria-label="LinkedIn">
//                           <Linkedin className="h-4 w-4" />
//                         </Link>
//                       </Button>
//                       <Button variant="ghost" size="icon" asChild>
//                         <Link href={member.social.github} aria-label="GitHub">
//                           <Github className="h-4 w-4" />
//                         </Link>
//                       </Button>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Milestones */}
//         <section className="w-full py-12 md:py-24 bg-muted/30">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
//               <div className="space-y-2">
//                 <Badge className="mb-2">Our Journey</Badge>
//                 <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Key Milestones</h2>
//                 <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
//                   The story of TaskPilot Labs so far, with many more chapters to come.
//                 </p>
//               </div>
//             </div>

//             <div className="max-w-3xl mx-auto">
//               <div className="relative">
//                 <div className="absolute left-[28px] top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/50 to-primary/20"></div>

//                 {milestones.map((milestone, index) => (
//                   <div key={index} className="flex mb-12 last:mb-0">
//                     <div className="absolute left-0 flex items-center justify-center z-10">
//                       <div className="h-14 w-14 rounded-full bg-background border-4 border-primary flex items-center justify-center shadow-lg">
//                         <span className="text-sm font-bold">{milestone.year}</span>
//                       </div>
//                     </div>

//                     <div className="pl-20">
//                       <div className="bg-background p-6 rounded-xl border border-border/50 shadow-md hover:shadow-lg transition-all">
//                         <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
//                         <p className="text-muted-foreground">{milestone.description}</p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* CTA */}
//         <section className="w-full py-12 md:py-24 bg-primary text-primary-foreground">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center">
//               <div className="space-y-2">
//                 <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Join Us on Our Mission</h2>
//                 <p className="max-w-[600px] text-primary-foreground/90 md:text-xl/relaxed">
//                   Whether you're looking to use our platform, join our team, or partner with us, we'd love to hear from
//                   you.
//                 </p>
//               </div>
//               <div className="flex flex-col gap-2 min-[400px]:flex-row">
//                 <Button variant="secondary" size="lg" className="rounded-full">
//                   Get Started
//                 </Button>
//                 <Button
//                   variant="outline"
//                   size="lg"
//                   className="rounded-full bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
//                 >
//                   Contact Us
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

