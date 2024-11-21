"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from '@/hooks/use-toast'

export default function EmailModal() {
    const [open, setOpen] = useState(false)
    const { toast } = useToast()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        const email = formData.get("email")
        const subject = formData.get("subject")
        const message = formData.get("message")

        const data = `email": "${email}", "subject": "${subject}", "message": "${message}".`

        try {

            const url = 'https://magicloops.dev/api/loop/aa440bfc-38b6-464d-940b-0b17fdc3761d/run';

            await fetch(url, {
                method: 'POST',
                body: JSON.stringify({ data }),
            });

            toast({
                title: "Email",
                description: "Email sending successfully",
            })
            setOpen(false)
        } catch (error) {
            console.log("Error sending mail", error)
        }

    }

    return (
        <div className="flex items-center justify-center bg-navy-900">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <i className="fa-solid fa-envelope" style={{ fontSize: "25px", color: "gray" }}></i>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <form onSubmit={handleSubmit}>
                        <DialogHeader>
                            <DialogTitle>Send Email</DialogTitle>
                            <DialogDescription>
                                Fill out this form to send me an email. Get back to you as soon as possible.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Your email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="subject">Subject</Label>
                                <Input
                                    id="subject"
                                    name="subject"
                                    placeholder="What is this about?"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="message">Message</Label>
                                <Textarea
                                    id="message"
                                    name="message"
                                    placeholder="Your message here..."
                                    required
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Send Message</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

