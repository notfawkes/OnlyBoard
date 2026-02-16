"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative min-h-screen">
            {/* The "Wipe" reveal layer */}
            <motion.div
                className="fixed inset-0 bg-[#FF6B00] z-[9999] pointer-events-none"
                initial={{ x: "0%" }}
                animate={{ x: "-100%" }}
                transition={{
                    duration: 0.7,
                    ease: [0.76, 0, 0.24, 1] // Slick cubic-bezier for a sharp "wipe"
                }}
            />

            {/* Content fades in slightly after the wipe starts */}
            <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                    duration: 0.5,
                    delay: 0.2,
                    ease: "easeOut"
                }}
            >
                {children}
            </motion.div>
        </div>
    );
}
