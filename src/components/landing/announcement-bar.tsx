"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function AnnouncementBar() {
  return (
    <div className="fixed top-0 inset-x-0 z-50 bg-primary text-primary-foreground">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto flex items-center justify-center gap-2 text-sm font-medium h-10"
      >
        <span>🎉 Launch Special: Get 30% off on annual plans</span>
        <ArrowRight className="h-4 w-4" />
      </motion.div>
    </div>
  );
}
