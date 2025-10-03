import { motion } from 'framer-motion';
import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import Link from 'next/link';
import { Twitter, Linkedin, Github, Badge } from 'lucide-react';

export const TeamComponenet = () => {
  // Team members data from about page
  const teamMembers = [
    {
      name: "Mohit Gajjar",
      role: "Co-Founder",
      bio: "Mohit Gajjar has over 4 years of experience in software development and WEB3. He previously led engineering teams at major tech projects.",
      image: "/assets/mohit.jpg",
      social: {
        twitter: "https://x.com/_mohitgajjar",
        linkedin: "https://www.linkedin.com/in/_mohitgajjar/",
        github: "https://github.com/Gajjar-Mohit",
      },
    },
    {
      name: "Keval Solanki",
      role: "Co-Founder",
      bio: "Keval Solanki is an AI researcher with a Fabulous knowledge in Machine Learning. He's passionate about making AI accessible to developers.",
      image: "/assets/keval.png",
      social: {
        twitter: "http://x.com/SolankiKevalS1",
        linkedin: "https://www.linkedin.com/in/kevalsolanki3003/",
        github: "https://github.com/solankikeval166",
      },
    },
  ];
  return (
    <div>
      <div id="team">
        <motion.h3
          className="text-2xl md:text-3xl font-bold tracking-tight mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Meet the Minds Behind TaskPilot Labs
        </motion.h3>

        <div className="grid gap-8 md:grid-cols-2 max-w-[900px] mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -5 }}
            >
              <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all h-full bg-background/60 backdrop-blur-sm">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3">
                    <motion.div
                      className="aspect-square overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                    >
                      <img
                        src={
                          member.image ||
                          "/placeholder.svg?height=300&width=300" ||
                          "/placeholder.svg"
                        }
                        alt={member.name}
                        width={300}
                        height={300}
                        className="object-cover w-full h-full transition-transform hover:scale-105"
                      />
                    </motion.div>
                  </div>
                  <div className="md:w-2/3">
                    <CardHeader className="p-4 pb-2">
                      <h3 className="text-xl font-bold">{member.name}</h3>
                      <p className="text-sm text-primary font-medium">
                        {member.role}
                      </p>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground mb-4">
                        {member.bio}
                      </p>
                      <div className="flex gap-3">
                        <motion.div
                          whileHover={{ scale: 1.2, y: -3 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full bg-background/80 border-primary/20 hover:bg-primary/10 hover:border-primary/30 transition-all duration-300"
                            asChild
                          >
                            <Link
                              href={member.social.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="Twitter"
                            >
                              <Twitter className="h-4 w-4 text-primary" />
                            </Link>
                          </Button>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.2, y: -3 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full bg-background/80 border-primary/20 hover:bg-primary/10 hover:border-primary/30 transition-all duration-300"
                            asChild
                          >
                            <Link
                              href={member.social.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="LinkedIn"
                            >
                              <Linkedin className="h-4 w-4 text-primary" />
                            </Link>
                          </Button>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.2, y: -3 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full bg-background/80 border-primary/20 hover:bg-primary/10 hover:border-primary/30 transition-all duration-300"
                            asChild
                          >
                            <Link
                              href={member.social.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="GitHub"
                            >
                              <Github className="h-4 w-4 text-primary" />
                            </Link>
                          </Button>
                        </motion.div>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-muted-foreground mb-4">
            Founded in 2025, TaskPilot Labs is just getting started.
          </p>
          <Badge className="bg-primary/10 text-primary border-primary/20">
            Join us on our journey
          </Badge>
        </motion.div>
      </div>
    </div>
  );
}

export default TeamComponenet
