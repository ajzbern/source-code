import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function CaseStudiesPage() {
  // Sample case studies data
  const caseStudies = [
    {
      id: 1,
      title: "How Acme Corp Reduced Documentation Time by 75%",
      company: "Acme Corporation",
      industry: "E-commerce",
      challenge: "Managing documentation for a rapidly growing product catalog",
      solution: "Implemented TaskPilot's AI documentation system",
      results: "75% reduction in documentation time, improved accuracy",
      image: "/placeholder.svg?height=300&width=600",
    },
    {
      id: 2,
      title: "TechStart's Journey to Streamlined Project Management",
      company: "TechStart",
      industry: "SaaS",
      challenge: "Coordinating remote development teams across time zones",
      solution: "Adopted TaskPilot's automated task assignment and tracking",
      results: "40% increase in team productivity, reduced meeting time",
      image: "/placeholder.svg?height=300&width=600",
    },
    {
      id: 3,
      title: "Global Finance Transforms Their Development Workflow",
      company: "Global Finance",
      industry: "Financial Services",
      challenge: "Meeting strict compliance requirements while maintaining agility",
      solution: "Integrated TaskPilot with existing compliance tools",
      results: "Zero compliance issues, 30% faster development cycles",
      image: "/placeholder.svg?height=300&width=600",
    },
  ]

  // Industries for filter
  const industries = ["All Industries", "E-commerce", "SaaS", "Financial Services", "Healthcare", "Manufacturing"]

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Header */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Link
                  href="/"
                  className="inline-flex items-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-primary hover:text-primary/80"
                >
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Back to Home
                </Link>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Case Studies</h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  See how organizations are transforming their development processes with TaskPilot Labs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Industries */}
        <section className="w-full py-6 md:py-8">
          <div className="container px-4 md:px-6">
            <div className="flex flex-wrap gap-2 justify-center">
              {industries.map((industry) => (
                <Button
                  key={industry}
                  variant={industry === "All Industries" ? "default" : "outline"}
                  size="sm"
                  className="rounded-full"
                >
                  {industry}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Case Study */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <Badge className="mb-2">Featured Case Study</Badge>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  How Acme Corp Reduced Documentation Time by 75%
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed">
                  Learn how Acme Corporation revolutionized their documentation process and freed up developer time for
                  innovation.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="rounded-full" asChild>
                    <Link href="/case-studies/1">
                      Read Case Study
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" className="rounded-full">
                    Watch Video
                  </Button>
                </div>
              </div>
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Acme Corp Case Study"
                width={600}
                height={400}
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center"
              />
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tighter md:text-3xl/tight mb-8">More Success Stories</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {caseStudies.slice(1).map((study) => (
                <Card key={study.id} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={study.image || "/placeholder.svg"}
                      alt={study.title}
                      width={600}
                      height={300}
                      className="object-cover w-full h-full transition-transform hover:scale-105"
                    />
                  </div>
                  <CardHeader className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="rounded-full">
                        {study.industry}
                      </Badge>
                    </div>
                    <Link href={`/case-studies/${study.id}`} className="hover:underline">
                      <h3 className="text-xl font-bold">{study.title}</h3>
                    </Link>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="space-y-2">
                      <div>
                        <span className="font-medium">Challenge:</span> {study.challenge}
                      </div>
                      <div>
                        <span className="font-medium">Results:</span> {study.results}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button variant="ghost" className="p-0 h-auto" asChild>
                      <Link href={`/case-studies/${study.id}`} className="flex items-center text-primary">
                        Read full case study
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="flex justify-center mt-12">
              <Button variant="outline" className="rounded-full">
                View All Case Studies
              </Button>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full py-12 md:py-24 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to Write Your Success Story?</h2>
                <p className="max-w-[600px] text-primary-foreground/90 md:text-xl/relaxed">
                  Join the growing list of companies transforming their development process with TaskPilot Labs.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button variant="secondary" size="lg" className="rounded-full">
                  Get Started
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                >
                  Schedule a Demo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} TaskPilot Labs. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

