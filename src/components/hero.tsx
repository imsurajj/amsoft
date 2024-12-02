"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, PartyPopper } from "lucide-react";
import dynamic from 'next/dynamic';
import Logo from "./ui/logo";

const ReactConfetti = dynamic(() => import('react-confetti'), {
  ssr: false
});

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function Hero() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  // Add state for waitlist count that can be updated
  const TOTAL_SPOTS = 100;
  const [spotsTaken, setSpotsTaken] = useState(12);
  const spotsLeft = TOTAL_SPOTS - spotsTaken;
  const progressPercentage = (spotsTaken / TOTAL_SPOTS) * 100;

  // Add countdown timer state
  const LAUNCH_DATE = useMemo(() => {
    // Check if window is defined (client-side)
    if (typeof window !== 'undefined') {
      const storedDate = localStorage.getItem('launchDate');
      if (storedDate) {
        return new Date(storedDate);
      }
      const newDate = new Date(Date.now() + 120 * 24 * 60 * 60 * 1000);
      localStorage.setItem('launchDate', newDate.toISOString());
      return newDate;
    }
    // Return default date for server-side rendering
    return new Date(Date.now() + 120 * 24 * 60 * 60 * 1000);
  }, []);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +LAUNCH_DATE - +new Date();
      
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }
      
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [LAUNCH_DATE]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      // Clear form and show success animations
      setName('');
      setEmail('');
      setShowThankYou(true);
      setShowConfetti(true);
      
      // Update spots taken count
      setSpotsTaken(prev => prev + 1);
      
      setTimeout(() => {
        setShowConfetti(false);
      }, 5000); // Stop confetti after 5 seconds
      setTimeout(() => {
        setShowThankYou(false);
      }, 3000); // Hide thank you message after 3 seconds
    } catch (error) {
      console.error('Form submission error:', error);
      if (error instanceof Error) {
        alert(`Failed to submit: ${error.message}`);
      } else {
        alert('Failed to submit. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black text-white">
      {showConfetti && (
        <ReactConfetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.2}
          colors={['#ec4899', '#8b5cf6', '#ffffff', '#f43f5e', '#a855f7']}
        />
      )}
      
      {/* Gradient backgrounds */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800/30 via-black to-black" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
      </div>

      {/* Thank You Popup */}
      <AnimatePresence>
        {showThankYou && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 px-4"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setShowThankYou(false)}
            />
            
            {/* Thank You Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", duration: 1 }}
              className="relative max-w-sm w-full mx-auto bg-black/80 backdrop-blur-xl border border-[#ec4899]/20 rounded-xl shadow-lg overflow-hidden"
            >
              {/* Content Container */}
              <div className="p-6">
                {/* Success Icon */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, -5, 5, -5, 0],
                  }}
                  transition={{ 
                    duration: 0.6,
                    times: [0, 0.2, 0.5, 0.8, 1],
                    repeat: 0
                  }}
                  className="relative w-16 h-16 mx-auto mb-6"
                >
                  <div className="h-full w-full flex items-center justify-center bg-gradient-to-r from-[#ec4899] to-[#8b5cf6] rounded-full">
                    <PartyPopper className="w-8 h-8 text-white" />
                  </div>
                </motion.div>

                {/* Text Content */}
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-semibold text-white">
                    Thank You!
                  </h3>
                  <p className="text-zinc-300">
                    We've received your details. We'll be in touch soon!
                  </p>
                </div>

                {/* Close Button */}
                <Button
                  onClick={() => setShowThankYou(false)}
                  className="w-full mt-6 bg-gradient-to-r from-[#ec4899] to-[#8b5cf6] text-white hover:opacity-90 transition-opacity"
                >
                  Got it 🎉
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="w-full max-w-lg px-6 py-10 mt-10 md: pt-0">
        <motion.div 
          {...fadeIn}
          className="text-center space-y-8"
        >
          {/* Logo */}
          <div className="mx-auto w-14 h-14 flex items-center justify-center border border-pink-500/50 rounded-2xl">
          <Logo className="text-primary" size={32} />
          </div>

          {/* Subtitle */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <p className="text-zinc-500 text-sm font-medium tracking-wider uppercase">
              LAUNCH YOU AFFILIATE PROGRAM
            </p>
          </div>

          {/* Countdown Timer */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-4 mb-1 text-lg"
          >
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-[#ec4899] to-[#8b5cf6] text-transparent bg-clip-text">
                  {timeLeft.days.toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-zinc-500">Days</span>
              </div>
              <span className="text-zinc-600 mt-[-0.8rem]">:</span>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-[#ec4899] to-[#8b5cf6] text-transparent bg-clip-text">
                  {timeLeft.hours.toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-zinc-500">Hours</span>
              </div>
              <span className="text-zinc-600 mt-[-0.8rem]">:</span>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-[#ec4899] to-[#8b5cf6] text-transparent bg-clip-text">
                  {timeLeft.minutes.toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-zinc-500">Mins</span>
              </div>
              <span className="text-zinc-600 mt-[-0.8rem]">:</span>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-[#ec4899] to-[#8b5cf6] text-transparent bg-clip-text">
                  {timeLeft.seconds.toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-zinc-500">Secs</span>
              </div>
            </div>
          </motion.div>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
            Join the waitlist for{' '}
            <span className="bg-gradient-to-r from-[#ec4899] to-[#8b5cf6] text-transparent bg-clip-text whitespace-nowrap">
             Monetization System
            </span>
          </h1>

        {/* Waitlist Status */}
        <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative mt-4"
            >
              {/* Status Bar Container */}
              <div className="bg-zinc-900/50 backdrop-blur-xl rounded-xl p-3 border border-zinc-800/50">
                <div className="space-y-2.5">
                  {/* Status Text */}
                  <div className="flex justify-between items-center">
                    <div className="space-y-0.5">
                      <h4 className="text-sm font-medium text-white flex items-center gap-2">
                        <span className="inline-block w-2 h-2 rounded-full bg-[#ec4899] animate-pulse" />
                        Beta Testing Program
                      </h4>
                      <p className="text-[11px] text-zinc-400">
                        Limited spots for early access testers
                      </p>
                    </div>
                    <div className="text-right">
                      <motion.p 
                        key={spotsLeft}
                        initial={{ scale: 1.1, color: '#ec4899' }}
                        animate={{ scale: 1, color: '#ffffff' }}
                        className="text-sm font-semibold bg-gradient-to-r from-[#ec4899] to-[#8b5cf6] text-transparent bg-clip-text"
                      >
                        {spotsLeft} spots left
                      </motion.p>
                      <p className="text-[11px] text-zinc-400">
                        of {TOTAL_SPOTS} total spots
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="relative h-2 bg-zinc-800/50 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#ec4899] to-[#8b5cf6]"
                    />
                    {/* Animated Glow Effect */}
                    <motion.div
                      animate={{
                        x: ["0%", "100%"],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "linear",
                      }}
                      className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12"
                    />
                  </div>

                  {/* Urgency Message */}
                  {spotsLeft < 100 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="flex items-center gap-1.5 mt-2"
                    >
                      <svg className="w-3.5 h-3.5 text-[#ec4899]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-[11px] text-[#ec4899] font-medium">
                        Spots are filling up quickly! Join now for early access.
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>

          {/* Form */}
          <motion.div
            {...fadeIn}
            transition={{ delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="mt-3 space-y-3">
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

          {/* Hero text that changes */}
          <p className="text-zinc-500">
            Be the first to experience the power of our  <span className="bg-gradient-to-r from-[#ec4899] to-[#8b5cf6] text-transparent bg-clip-text whitespace-nowrap">
              Monotization Platform
            </span> in your content for  <span className="bg-gradient-to-r from-[#ec4899] to-[#8b5cf6] text-transparent bg-clip-text whitespace-nowrap">
              FREE
            </span>.
          </p>

          {/* Footer text */}
          <motion.p
            {...fadeIn}
            transition={{ delay: 0.2 }}
            className="mt-6 text-sm text-zinc-500"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-[#ec4899] animate-pulse mr-2" />
            {' '}AMS is Under Development.{' '}
            <br className="my-2" />
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
