"use client";

import { useState } from "react";
import styles from "@/styles/modules/auth.module.css";

export default function OnBoarding() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className={styles["onboarding_container"]}>
      <div className={styles["onboarding_slide"]}>
        {slides.map((item, id) => {
          return (
            <div
              key={id}
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div>
          );
        })}
      </div>

      <div>
        {slides.map((_, index) => (
          <span
            key={index}
            className={styles["progress_dot"]}
            onClick={() => setCurrentSlide(index)}
            style={{
              background:
                currentSlide === index ? "var(--primary)" : "var(--foreground)",
            }}
          />
        ))}
      </div>

      <button onClick={nextSlide}>
        {currentSlide === slides.length - 1 ? "Finish" : "Next"}
      </button>
    </div>
  );
}

const slides = [
  {
    title: "Welcome to NextAuth Demo",
    description:
      "NextAuth is a authentication and authorization solution for Next.js",
  },
  {
    title: "Lorem ipsum dolor sit amet, officia",
    description:
      "Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit",
  },
  {
    title: "Sed ullamcorper elit",
    description: "Sed ullamcorper elit id fuga impedit aperiam.",
  },
];
