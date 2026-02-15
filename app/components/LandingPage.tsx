'use client';

import { motion } from 'framer-motion';
import { Fjalla_One } from 'next/font/google';
import Link from 'next/link';
import { DockIcon, VerifiedIcon } from 'lucide-react';
import { Meteors } from './ui/meteors';
const fjalla = Fjalla_One({
    subsets: ['latin'],
    weight: ['400'],
});

const stagger = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1,
        },
    },
};

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
    },
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    show: {
        opacity: 1,
        scale: 1,
        transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const },
    },
};

export default function LandingPage() {
    return (
        <motion.main
            className="landing"
            variants={stagger}
            initial="hidden"
            animate="show"
        >
            {/* Decorative corner accents */}
            <motion.div className="landing-corner landing-corner-tl" variants={fadeUp} />
            <motion.div className="landing-corner landing-corner-br" variants={fadeUp} />

            {/* Background Meteors */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-[-1]">
                <Meteors number={60} minDuration={10} maxDuration={25} />
            </div>

            {/* Navigation bar — logo space reserved for shared animated logo from page.tsx */}
            <motion.nav className="landing-nav" variants={fadeUp}>
                <div className="landing-nav-logo-spacer" />
                <Link href="/login" className="landing-nav-link">
                    Sign In
                </Link>
            </motion.nav>

            {/* Hero Section */}
            <div className="landing-hero">
                {/* Hero text */}
                <motion.div className="landing-hero-text" variants={stagger}>
                    <motion.span className="landing-label" variants={fadeUp}>
                        ✦ WELCOME TO ONBOARD
                    </motion.span>

                    <motion.h1
                        className={`landing-title ${fjalla.className}`}
                        variants={fadeUp}
                    >
                        Students
                        <br />
                        <span className="landing-title-accent">onboard</span>
                    </motion.h1>

                    <motion.p className="landing-subtitle" variants={fadeUp}>
                        A seamless onboarding experience for new students. Track your
                        progress, submit documents, and get started — all in one place.
                    </motion.p>

                    <motion.div className="landing-actions" variants={fadeUp}>
                        <Link href="/login" className="landing-btn-primary">
                            Get Started
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </Link>
                        <a href="#features" className="landing-btn-secondary">
                            Learn More
                        </a>
                    </motion.div>
                </motion.div>

                {/* Hero visual */}
                <motion.div className="landing-hero-visual" variants={scaleIn}>
                    <div className="landing-card-stack">
                        {/* Main card */}
                        <motion.div
                            className="landing-card landing-card-main"
                            whileHover={{ y: -6, rotate: -1 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            <div className="landing-card-header">
                                <div className="landing-card-dot" />
                                <div className="landing-card-dot landing-card-dot-orange" />
                                <div className="landing-card-dot landing-card-dot-green" />
                            </div>
                            <div className="landing-card-body">
                                <div className="landing-card-avatar">B</div>
                                <div>
                                    <div className="landing-card-name">Bala</div>
                                    <div className="landing-card-status">
                                        <span className="landing-status-dot" />
                                        Profile Completed
                                    </div>
                                </div>
                            </div>
                            <div className="landing-card-progress">
                                <div className="landing-card-progress-label">
                                    <span>Onboarding Progress</span>
                                    <span>75%</span>
                                </div>
                                <div className="landing-card-progress-track">
                                    <motion.div
                                        className="landing-card-progress-fill"
                                        initial={{ width: 0 }}
                                        animate={{ width: '75%' }}
                                        transition={{ duration: 1.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Floating badge cards */}
                        <motion.div
                            className="landing-badge landing-badge-1"
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <span className="landing-badge-icon"><DockIcon /></span>
                            <span>Documents Verified</span>
                        </motion.div>

                        <motion.div
                            className="landing-badge landing-badge-2"
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                        >
                            <span className="landing-badge-icon"><VerifiedIcon /></span>
                            <span>Fees Paid</span>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </motion.main>
    );
}
