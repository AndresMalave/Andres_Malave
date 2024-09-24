'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ExternalLink } from 'lucide-react'
import { experience } from '@/lib/experience'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { projects } from '@/lib/projects'

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('about')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [handleMouseMove])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['ABOUT', 'EXPERIENCE', 'PROJECTS']
      const scrollPosition = window.scrollY

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop - 100 && scrollPosition < offsetTop + offsetHeight - 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    // Llama a la función para establecer la sección activa al cargar
    const handleInitialScroll = () => {
      const sections = ['ABOUT', 'EXPERIENCE', 'PROJECTS']
      const scrollPosition = window.scrollY

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop - 100 && scrollPosition < offsetTop + offsetHeight - 100) {
            setActiveSection(section)
            break
          }
        }
      }
    };

    // Llama a la función para establecer la sección activa al cargar
    handleInitialScroll();

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[#0F172A] text-gray-100 relative overflow-hidden lg:pt-20 lg:pl-20">
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 300px at ${mousePosition.x}px ${mousePosition.y}px, rgba(17,32,68,0.3), transparent 100%)`,
        }}
      />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar (Mobile) / Left Sidebar (Desktop) */}
        <div className="lg:fixed lg:left-0 lg:top-0 lg:bottom-0 lg:w-2/5 lg:overflow-y-auto">
          <div className="py-8 lg:pl-20 lg:py-20 flex flex-col justify-between h-full">
            <div>
              <h1 className="text-3xl lg:text-5xl font-bold mb-2">Andres Malave</h1>
              <h2 className="text-lg lg:text-xl text-[#64ffda] mb-4">Front End | Web Developer</h2>
              <p className="text-md mb-8 text-gray-300">Building more beautiful, intuitive and functional applications every day.</p>

              {/* Navigation Menu (Hidden on mobile) */}
              <nav className="hidden lg:block space-y-4">
                {['ABOUT', 'EXPERIENCE', 'PROJECTS'].map((section) => (
                  <Link
                    key={section}
                    href={`#${section}`}
                    className={`block py-1 px-4 rounded transition-all duration-300 relative ${activeSection === section ? 'text-white text-sm font-bold pl-16' : 'text-gray-400 text-sm font-bold pl-10'
                      }`}
                  >
                    <span
                      className={`absolute left-0 top-1/2 transform -translate-y-1/2 rounded-full transition-all duration-300 ${activeSection === section ? 'bg-white h-[1px] w-14 scale-y-100' : 'bg-gray-600 h-1 w-7 scale-y-50'
                        }`}
                      aria-hidden="true"
                    ></span>
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 mt-8 lg:mt-0">
              <Button variant="ghost" size="icon">
                <i className="fa-solid fa-envelope" style={{ fontSize: "25px", color: "gray" }}></i>
              </Button>
              <Button variant="ghost" size="icon">
                <a href={"https://discord.com/users/503681045846163458"} target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-discord" style={{ fontSize: "25px", color: "gray" }}></i>
                </a>
              </Button>
              <Button variant="ghost" size="icon">
                <a href={"https://t.me/andres_malave"} target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-telegram" style={{ fontSize: "25px", color: "gray" }}></i>
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="lg:w-3/5 lg:ml-[40%] pt-2">
          {/* About Me Section */}
          <section id="ABOUT" className="mb-16 flex items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">ABOUT ME</h2>
              <p className='text-md'>Web developer with 2 years of experience building web applications. Passionate about technology and committed to delivering high-quality projects. Constantly looking for new opportunities to learn and grow.</p>
            </div>
          </section>

          {/* Experience Section */}
          <section id="EXPERIENCE" className="mb-16 flex items-center">
            <div className="w-full">
              <h2 className="text-2xl font-bold mb-4">EXPERIENCE</h2>
              <div className="grid grid-cols-1 gap-4">
                {experience.map((item, index) => {
                  return (
                    <Card key={index} className="bg-navy-900 text-white border-none transition-all duration-300 hover:bg-[#17274B] hover:bg-opacity-60">
                      <CardContent className="p-2">
                        <div className="flex justify-between items-start">
                          <div className="text-sm text-gray-400 w-28 font-bold text-start">{item.date}</div>
                          <div className="flex-1 ml-6">
                            <CardHeader className="p-0 mb-2">
                              <h3 className="text-xl font-semibold">{item.title}</h3>
                            </CardHeader>
                            <p className="text-sm text-gray-300 mb-4">{item.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {item.technologies.map((item, index) => {
                                return (
                                  <Badge key={index} variant="default" className="bg-[rgba(25,55,86,1)] text-white pointer-events-none">
                                    {item.name}
                                  </Badge>
                                )
                              })}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section id="PROJECTS" className="mb-16 flex items-center">
            <div className="w-full">
              <h2 className="text-2xl font-bold mb-4">PROJECTS</h2>
              <div className="grid grid-cols-1 gap-4">
                {projects.map((item, index) => {
                  return (
                    <a key={index} href={item.url} target="_blank" rel="noopener noreferrer">
                      <Card className="bg-navy-900 text-white border-none transition-all duration-300 hover:bg-[#17274B] hover:bg-opacity-60">
                        <CardContent className="p-2">
                          <div className="flex justify-between items-start">
                            <div className="w-28">
                              <Image
                                src={item.image}
                                alt={item.title}
                                width={200}
                                height={200}
                                className="object-cover rounded"
                              />
                            </div>
                            <div className="flex-1 ml-6">
                              <CardHeader className="p-0 mb-2">
                                <h3 className="text-xl font-semibold">{item.title}</h3>
                              </CardHeader>
                              <p className="text-sm text-gray-300 mb-4">{item.description}</p>
                              <div className="flex flex-wrap gap-2">
                                {item.technologies.map((tech, index) => {
                                  return (
                                    <Badge key={index} variant="default" className="bg-[rgba(25,55,86,1)] text-white pointer-events-none">
                                      {tech.name}
                                    </Badge>
                                  )
                                })}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </a>
                  )
                })}

                <div>
                  <a href={"/"} target="_blank" rel="noopener noreferrer">
                    <Button variant="link" className='inline-flex items-center gap-2 px-0'>
                      See all projects <ExternalLink size={15} />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16 flex items-center">
            <p>Designed and built with ❤, using <a href="https://nextjs.org/" className='font-bold text-[#64ffda]'>NextJs</a> and <a href="https://ui.shadcn.com/" className='font-bold text-[#64ffda]'>Shadcn</a>, deployed on <a href="https://vercel.com/" className='font-bold text-[#64ffda]'>Vercel</a>.</p>
          </section>
        </div>
      </div>
    </div>
  )
}