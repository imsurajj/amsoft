"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./ui/logo";

const navigation = [
  { name: "Features", href: "#" },
  { name: "Pricing", href: "#" },
  { name: "About", href: "#" },
  { name: "Contact", href: "#" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-between p-4 lg:px-8 max-w-7xl mx-auto" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/">
          <div className="mx-auto w-10 h-10 flex items-center justify-center border border-pink-500/50 rounded-2xl">
          <Logo className="text-primary" size={32} />
          </div>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="text-zinc-400 hover:text-white inline-flex items-center justify-center rounded-lg p-2"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors relative group"
            >
              {item.name}
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-[#ec4899] to-[#8b5cf6] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Button
            className="bg-gradient-to-r from-[#ec4899] to-[#8b5cf6] text-white rounded-xl font-medium transition-all duration-200 relative overflow-hidden group hover:shadow-[0_0_20px_rgba(236,72,153,0.3)]"
          >
            <span className="relative z-10">Sign in</span>
            <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/90 z-40"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-y-0 right-0 z-50 w-full bg-black px-4 py-4 sm:max-w-sm"
            >
              <div className="flex items-center justify-between">
                <Link href="/" className="-m-1.5 p-1.5">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#ec4899] to-[#8b5cf6] rounded-lg flex items-center justify-center">
                    <span className="text-lg font-bold text-white">A</span>
                  </div>
                </Link>
                <button
                  type="button"
                  className="text-zinc-400 hover:text-white rounded-lg p-2 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6">
                  <div className="space-y-1 py-6">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-medium text-zinc-400 hover:text-white hover:bg-zinc-900/50 transition-all"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <div className="py-6">
                    <Button
                      className="w-full bg-gradient-to-r from-[#ec4899] to-[#8b5cf6] text-white rounded-xl font-medium transition-all duration-200 relative overflow-hidden group hover:shadow-[0_0_20px_rgba(236,72,153,0.3)]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="relative z-10">Sign in</span>
                      <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
