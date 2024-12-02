"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/button";

export default function CTASection() {
  return (
    <section className="relative isolate overflow-hidden bg-primary py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-xl lg:max-w-lg"
          >
            <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
              Ready to boost your revenue?
            </h2>
            <p className="mt-4 text-lg leading-8 text-primary-foreground/80">
              Join thousands of creators who are already monetizing their platforms with our affiliate marketing software.
            </p>
            <div className="mt-6 flex max-w-md gap-x-4">
              <Button
                variant="secondary"
                size="lg"
                className="rounded-full"
              >
                Start Free Trial
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Contact Sales
              </Button>
            </div>
          </motion.div>
          <motion.dl
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2"
          >
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-primary-foreground/10 p-2 ring-1 ring-primary-foreground/20">
                <div className="h-6 w-6 text-primary-foreground text-2xl font-bold">$</div>
              </div>
              <dt className="mt-4 font-semibold text-primary-foreground">No setup fees</dt>
              <dd className="mt-2 leading-7 text-primary-foreground/80">
                Get started immediately with zero upfront costs
              </dd>
            </div>
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-primary-foreground/10 p-2 ring-1 ring-primary-foreground/20">
                <div className="h-6 w-6 text-primary-foreground text-2xl font-bold">%</div>
              </div>
              <dt className="mt-4 font-semibold text-primary-foreground">Pay as you grow</dt>
              <dd className="mt-2 leading-7 text-primary-foreground/80">
                Only pay for what you use as your affiliate program grows
              </dd>
            </div>
          </motion.dl>
        </div>
      </div>
    </section>
  );
}
