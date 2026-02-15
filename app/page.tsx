// app/page.tsx
import { Fjalla_One } from "next/font/google";
import Link from "next/link";
import styles from "./page.module.css";

const lexend = Fjalla_One({
  subsets: ["latin"],
  weight: ["400"],
});

export default function HomePage() {
  return (
    <main className={styles.container}>
      <h1 className={`${styles.title} ${lexend.className}`}>
        Students onboard
      </h1>

      <div className={styles.bgImage} />

      {/* Get Started CTA */}
      <div className={styles.cta}>
        <Link
          href="/login"
          className={styles.ctaButton}
        >
          Get Started
        </Link>
      </div>
    </main>
  );
}
