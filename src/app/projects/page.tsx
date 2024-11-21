"use client"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { useCallback, useEffect, useState } from "react"
import { projects } from "@/lib/projects"

export default function Projects() {
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

    return (
        <div className="min-h-screen bg-[#0F172A] text-white p-4 md:p-8 lg:p-16">
            <div
                className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
                style={{
                    background: `radial-gradient(circle 500px at ${mousePosition.x}px ${mousePosition.y}px, rgba(17,32,68,0.3), transparent 100%)`,
                }}
            />
            <Link
                href="/"
                className="inline-flex items-center font-bold text-[#64f9d7] hover:text-[#64f9d7]/80 mb-4"
            >
                <ArrowLeft /> Andres Malave
            </Link>

            <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-8">
                ALL PROJECTS
            </h1>

            {/* Desktop and Tablet View */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full border-separate border-spacing-y-0">
                    <thead>
                        <tr className="text-left text-sm">
                            <th className="pb-4 text-lg font-bold">Year</th>
                            <th className="pb-4 pl-4 text-lg font-bold">Project</th>
                            <th className="pb-4 text-lg font-bold md:table-cell hidden">Built with</th>
                            <th className="pb-4 text-lg font-bold">Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project) => (
                            <tr key={project.title} className="group">
                                <td className="py-4 align-center text-gray-400 font-semibold text-sm border-b border-[#112240]">
                                    {project.year}
                                </td>
                                <td className="py-4 pl-4 align-center font-medium border-b border-[#112240]">{project.title}</td>
                                <td className="py-4 md:table-cell hidden border-b border-[#112240]">
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech) => (
                                            <span
                                                key={tech.name}
                                                className="px-3 py-1 text-sm rounded-full bg-[#112240] text-[#64f9d7]"
                                            >
                                                {tech.name}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td className="py-4 border-b border-[#112240]">
                                    {project.url && (
                                        <Link
                                            href={project.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 text-[#64f9d7] hover:text-[#64f9d7]/80"
                                        >
                                            {project.title}
                                            <ArrowUpRight className="w-4 h-4" />
                                        </Link>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile View */}
            <div className="md:hidden space-y-4">
                {projects.map((project) => (
                    <div key={project.title} className="border-b border-[#112240] pb-4 last:border-b-0">
                        <div className="text-sm text-gray-400 mb-2">{project.year}</div>
                        <div className="text-md font-medium mb-2">{project.title}</div>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {project.technologies.map((tech) => (
                                <span
                                    key={tech.name}
                                    className="px-3 py-1 text-sm rounded-full bg-[#112240] text-[#64f9d7]"
                                >
                                    {tech.name}
                                </span>
                            ))}
                        </div>
                        <div className="font-medium flex items-center">
                            {project.url && (
                                <Link
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-[#64f9d7]"
                                >
                                    {project.title}
                                    <ArrowUpRight className="w-4 h-4" />
                                </Link>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

