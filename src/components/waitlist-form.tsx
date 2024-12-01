"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Add your waitlist submission logic here
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated delay
    setIsSubmitting(false);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="bg-primary w-[10rem] text-primary-foreground hover:bg-primary/90 rounded-[--radius] transition-colors group flex items-center justify-center gap-2"
        >
          Join Waitlist
          <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
        </Button>
      </DialogTrigger>
      {isOpen && (
        <DialogContent className="bg-background/80 backdrop-blur-lg sm:max-w-[425px] rounded-t-[20px] sm:rounded-[20px] border shadow-lg">
          <DialogHeader>
            <DialogTitle>Join the Waitlist</DialogTitle>
            <DialogDescription>
              Be the first to know when we launch. Get early access to our platform.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-[--radius]"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-[--radius] transition-colors"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Join Waitlist"}
            </Button>
          </form>
        </DialogContent>
      )}
    </Dialog>
  );
}
