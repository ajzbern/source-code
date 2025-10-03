// import Link from "next/link"
// import { ArrowLeft, Mail, MapPin, Phone, Github } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Badge } from "@/components/ui/badge"

// export default function ContactPage() {
//   return (
//     <div className="min-h-screen flex flex-col">
//       <main className="flex-1">
//         {/* Header */}
//         <section className="w-full py-12 md:py-16 bg-muted/30">
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
//                 <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Contact Us</h1>
//                 <p className="text-muted-foreground md:text-xl/relaxed">
//                   We'd love to hear from you. Get in touch with our team.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Contact Form and Info */}
//         <section className="w-full py-12 md:py-24">
//           <div className="container px-4 md:px-6">
//             <div className="grid gap-10 lg:grid-cols-2">
//               {/* Contact Form */}
//               <div>
//                 <Badge className="mb-4">Get in Touch</Badge>
//                 <h2 className="text-2xl font-bold tracking-tighter md:text-3xl mb-4">Send Us a Message</h2>
//                 <p className="text-muted-foreground mb-6">
//                   Have questions about TaskPilot Labs? Fill out the form below and we'll get back to you as soon as
//                   possible.
//                 </p>

//                 <form className="space-y-4">
//                   <div className="grid gap-4 sm:grid-cols-2">
//                     <div className="space-y-2">
//                       <label
//                         htmlFor="first-name"
//                         className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                       >
//                         First Name
//                       </label>
//                       <Input id="first-name" placeholder="John" />
//                     </div>
//                     <div className="space-y-2">
//                       <label
//                         htmlFor="last-name"
//                         className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                       >
//                         Last Name
//                       </label>
//                       <Input id="last-name" placeholder="Doe" />
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <label
//                       htmlFor="email"
//                       className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                     >
//                       Email
//                     </label>
//                     <Input id="email" type="email" placeholder="john.doe@example.com" />
//                   </div>

//                   <div className="space-y-2">
//                     <label
//                       htmlFor="subject"
//                       className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                     >
//                       Subject
//                     </label>
//                     <Input id="subject" placeholder="How can we help you?" />
//                   </div>

//                   <div className="space-y-2">
//                     <label
//                       htmlFor="message"
//                       className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                     >
//                       Message
//                     </label>
//                     <Textarea id="message" placeholder="Tell us about your inquiry..." className="min-h-[150px]" />
//                   </div>

//                   <Button type="submit" className="w-full rounded-full">
//                     Send Message
//                   </Button>
//                 </form>
//               </div>

//               {/* Contact Info */}
//               <div className="space-y-8">
//                 <div>
//                   <Badge className="mb-4">Contact Information</Badge>
//                   <h2 className="text-2xl font-bold tracking-tighter md:text-3xl mb-4">How to Reach Us</h2>
//                   <p className="text-muted-foreground mb-6">
//                     Our team is here to help. Reach out through any of these channels and we'll respond as quickly as
//                     possible.
//                   </p>
//                 </div>

//                 <div className="grid gap-6">
//                   <Card className="border-none shadow-md">
//                     <CardContent className="p-6 flex items-start gap-4">
//                       <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
//                         <Mail className="h-5 w-5 text-primary" />
//                       </div>
//                       <div>
//                         <h3 className="font-medium mb-1">Email Us</h3>
//                         <p className="text-muted-foreground mb-2">For general inquiries:</p>
//                         <a href="mailto:info@taskpilotlabs.com" className="text-primary hover:underline">
//                           info@taskpilotlabs.com
//                         </a>
//                         <p className="text-muted-foreground mt-2 mb-2">For support:</p>
//                         <a href="mailto:support@taskpilotlabs.com" className="text-primary hover:underline">
//                           support@taskpilotlabs.com
//                         </a>
//                       </div>
//                     </CardContent>
//                   </Card>

//                   <Card className="border-none shadow-md">
//                     <CardContent className="p-6 flex items-start gap-4">
//                       <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
//                         <Phone className="h-5 w-5 text-primary" />
//                       </div>
//                       <div>
//                         <h3 className="font-medium mb-1">Call Us</h3>
//                         <p className="text-muted-foreground mb-2">Monday to Friday, 9am to 5pm PT:</p>
//                         <a href="tel:+1-555-123-4567" className="text-primary hover:underline">
//                           +1 (555) 123-4567
//                         </a>
//                       </div>
//                     </CardContent>
//                   </Card>

//                   <Card className="border-none shadow-md">
//                     <CardContent className="p-6 flex items-start gap-4">
//                       <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
//                         <MapPin className="h-5 w-5 text-primary" />
//                       </div>
//                       <div>
//                         <h3 className="font-medium mb-1">Visit Us</h3>
//                         <p className="text-muted-foreground mb-2">Our headquarters:</p>
//                         <address className="not-italic">
//                           123 Tech Street
//                           <br />
//                           San Francisco, CA 94105
//                           <br />
//                           United States
//                         </address>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </div>

//                 <div className="mt-8">
//                   <h3 className="font-medium mb-4">Follow Us</h3>
//                   <div className="flex gap-4">
//                     <Button variant="outline" size="icon" asChild>
//                       <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           width="20"
//                           height="20"
//                           viewBox="0 0 24 24"
//                           fill="none"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         >
//                           <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
//                         </svg>
//                       </Link>
//                     </Button>
//                     <Button variant="outline" size="icon" asChild>
//                       <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           width="20"
//                           height="20"
//                           viewBox="0 0 24 24"
//                           fill="none"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         >
//                           <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
//                           <rect width="4" height="12" x="2" y="9" />
//                           <circle cx="4" cy="4" r="2" />
//                         </svg>
//                       </Link>
//                     </Button>
//                     <Button variant="outline" size="icon" asChild>
//                       <Link href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
//                         <Github className="h-5 w-5" />
//                       </Link>
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Map */}
//         <section className="w-full py-12 md:py-24 bg-muted/30">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
//               <div className="space-y-2">
//                 <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">Our Location</h2>
//                 <p className="text-muted-foreground">Find us in the heart of San Francisco's tech district.</p>
//               </div>
//             </div>
//             <div className="rounded-xl overflow-hidden shadow-lg h-[400px] w-full">
//               <img
//                 src="/placeholder.svg?height=400&width=1200"
//                 alt="Map location of TaskPilot Labs office"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           </div>
//         </section>

//         {/* FAQ */}
//         <section className="w-full py-12 md:py-24">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
//               <div className="space-y-2">
//                 <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">Frequently Asked Questions</h2>
//                 <p className="text-muted-foreground max-w-[700px]">
//                   Find quick answers to common questions about contacting us.
//                 </p>
//               </div>
//             </div>

//             <div className="max-w-3xl mx-auto space-y-6">
//               <div className="space-y-2">
//                 <h3 className="text-lg font-medium">What's the typical response time for inquiries?</h3>
//                 <p className="text-muted-foreground">
//                   We aim to respond to all inquiries within 24 hours during business days. For urgent matters, please
//                   call our support line.
//                 </p>
//               </div>

//               <div className="space-y-2">
//                 <h3 className="text-lg font-medium">Do you offer demos of your platform?</h3>
//                 <p className="text-muted-foreground">
//                   Yes! You can schedule a personalized demo with our team by selecting "Schedule a Demo" on our homepage
//                   or by contacting us directly.
//                 </p>
//               </div>

//               <div className="space-y-2">
//                 <h3 className="text-lg font-medium">How can I report a bug or technical issue?</h3>
//                 <p className="text-muted-foreground">
//                   Please email support@taskpilotlabs.com with details about the issue, including steps to reproduce it
//                   and any error messages you received.
//                 </p>
//               </div>

//               <div className="space-y-2">
//                 <h3 className="text-lg font-medium">Are you hiring?</h3>
//                 <p className="text-muted-foreground">
//                   We're always looking for talented individuals to join our team! Check out our{" "}
//                   <Link href="/careers" className="text-primary hover:underline">
//                     Careers page
//                   </Link>{" "}
//                   for current openings.
//                 </p>
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

