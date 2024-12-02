"use client";

import { motion, useScroll, useTransform, useInView, animate } from "framer-motion";
import { Button } from "../ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";

// Animated Counter component
const Counter = ({ value, duration = 2 }: { value: string; duration?: number }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true });

  useEffect(() => {
    if (!nodeRef.current || !inView) return;

    const node = nodeRef.current;
    const num = parseInt(value.replace(/\D/g, ""));

    const controls = animate(0, num, {
      duration,
      onUpdate: (value) => {
        if (value === num) {
          node.textContent = value.toString() + (value === 95 ? "%" : "+");
        } else {
          node.textContent = Math.floor(value).toString() + (value === 95 ? "%" : "+");
        }
      },
      ease: "easeOut",
    });

    return () => controls.stop();
  }, [value, duration, inView]);

  return <span ref={nodeRef}>0</span>;
};

// Modern Gradient Background
const ModernBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
      
      {/* Animated gradient orbs */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-primary/20 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.2, 1] }}
          transition={{ duration: 8, delay: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/20 rounded-full blur-3xl"
        />
      </div>

      {/* Mesh overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDEwMywgMjMyLCAyNDksIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />
    </div>
  );
};

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background/50 min-h-screen pt-24 md:pt-32 pb-4">
      <ModernBackground />

      {/* Main Content */}
      <div className="container relative mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-primary mb-8 shadow-lg"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Revolutionary Affiliate Marketing Platform</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="relative text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              Transform Your Business with
              <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary">
                Smart Affiliate Marketing
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto"
          >
            Empower your platform with advanced affiliate tracking, real-time analytics, 
            and automated payouts. Join thousands of successful businesses scaling their revenue.
          </motion.p>
        </div>

        {/* Content */}
        <div>
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Button size="lg" className="rounded-full group relative overflow-hidden bg-primary hover:bg-primary/90">
              <span className="relative z-10">Start Free Trial</span>
              <motion.div
                className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"
                initial={false}
                animate={{ scale: [1, 2], x: [0, 100] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="rounded-full border-primary/20 hover:bg-primary/5"
            >
              Watch Demo
            </Button>
          </motion.div>

          {/* Stats */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto"
          >
            {[
              { label: "Active Users", value: "10000" },
              { label: "Monthly Revenue", value: "2000" },
              { label: "Success Rate", value: "95" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-primary/5 rounded-2xl blur-xl group-hover:bg-primary/10 transition-colors" />
                <div className="relative bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-primary/10 hover:border-primary/30 transition-colors">
                  <p className="text-3xl font-bold text-primary">
                    {stat.label === "Monthly Revenue" ? "$" : ""}
                    <Counter value={stat.value} />
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div> */}
        </div>
      </div>
    </section>
  );
}
