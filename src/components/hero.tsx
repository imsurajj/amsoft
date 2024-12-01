"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function Hero() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Add your waitlist submission logic here
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setName("");
    setEmail("");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black text-white">
      {/* Gradient backgrounds */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800/30 via-black to-black" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
      </div>

      {/* Content */}
      <div className="w-full max-w-lg px-6 py-10 mt-10">
        <motion.div 
          {...fadeIn}
          className="text-center space-y-8"
        >
          {/* Logo */}
          <div className="mx-auto w-14 h-14 bg-gradient-to-br from-pink-500 to-violet-600 rounded-2xl flex items-center justify-center">
            <span className="text-2xl font-bold">A</span>
          </div>

          {/* Subtitle */}
          <p className="text-zinc-500 text-sm font-medium tracking-wider uppercase">
            ASSET MANAGEMENT SYSTEM
          </p>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
            Join the waitlist for the{' '}
            <span className="bg-gradient-to-r from-[#ec4899] to-[#8b5cf6] text-transparent bg-clip-text whitespace-nowrap">
              Design System!
            </span>
          </h1>

          {/* Form */}
          <motion.div
            {...fadeIn}
            transition={{ delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div className="space-y-3">
                <Input
                  type="text"
                  placeholder="Full name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-zinc-900/50 border-zinc-800 text-white placeholder:text-zinc-500 rounded-xl h-12 px-4"
                />
                <Input
                  type="email"
                  placeholder="Email address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-900/50 border-zinc-800 text-white placeholder:text-zinc-500 rounded-xl h-12 px-4"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-gradient-to-r from-[#ec4899] to-[#8b5cf6] text-white rounded-xl font-medium transition-all duration-200 relative overflow-hidden group hover:shadow-[0_0_20px_rgba(236,72,153,0.3)]"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? "Joining..." : "Join Waitlist"}
                  <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                </span>
                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
              </Button>
            </form>
          </motion.div>

          {/* Footer text */}
          <motion.p
            {...fadeIn}
            transition={{ delay: 0.2 }}
            className="mt-6 text-sm text-zinc-500"
          >
            AMS is Under Development.<br />
            Building by{' '}
            <a href="#" className="text-zinc-400 hover:text-white transition-colors">
              @suraj
            </a>
            {' '}for all creators.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
