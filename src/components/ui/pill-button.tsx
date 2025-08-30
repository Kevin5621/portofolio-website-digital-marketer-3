import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

export interface PillButtonProps {
  children: React.ReactNode;
  variant?: "dark-to-light" | "light-to-dark";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  href?: string;
  target?: string;
  rel?: string;
}

const PillButton: React.FC<PillButtonProps> = ({
  children,
  variant = "dark-to-light",
  className = "",
  onClick,
  disabled = false,
  type = "button",
  href,
  target,
  rel,
}) => {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const circleRef = useRef<HTMLSpanElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const activeTweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const circle = circleRef.current;
    if (!button || !circle) return;

    const layout = () => {
      const rect = button.getBoundingClientRect();
      const { width: w, height: h } = rect;
      
      const R = ((w * w) / 4 + h * h) / (2 * h);
      const D = Math.ceil(2 * R) + 2;
      const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
      const originY = D - delta;

      circle.style.width = `${D}px`;
      circle.style.height = `${D}px`;
      circle.style.bottom = `-${delta}px`;

      gsap.set(circle, {
        xPercent: -50,
        scale: 0,
        transformOrigin: `50% ${originY}px`,
        opacity: 1,
        visibility: "visible",
        backgroundColor: variant === "dark-to-light" ? "#F3F2F2" : "#282828",
      });

      tlRef.current?.kill();
      const tl = gsap.timeline({ paused: true });

      tl.to(circle, {
        scale: 1.2,
        xPercent: -50,
        duration: 0.9,
        ease: "power2.easeOut",
        overwrite: "auto",
        opacity: 1,
        visibility: "visible",
      }, 0);

      tlRef.current = tl;
    };

    layout();
    const onResize = () => layout();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      tlRef.current?.kill();
    };
  }, []);

  const handleEnter = () => {
    const tl = tlRef.current;
    if (!tl) return;
    activeTweenRef.current?.kill();
    activeTweenRef.current = tl.tweenTo(tl.duration(), {
      duration: 0.55,
      ease: "power2.easeOut",
      overwrite: "auto",
    });
  };

  const handleLeave = () => {
    const tl = tlRef.current;
    if (!tl) return;
    activeTweenRef.current?.kill();
    activeTweenRef.current = tl.tweenTo(0, {
      duration: 0.3,
      ease: "power2.easeOut",
      overwrite: "auto",
    });
  };

  const baseClasses = cn(
    "pill-button relative overflow-hidden rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
      "pill-button-dark-to-light": variant === "dark-to-light",
      "pill-button-light-to-dark": variant === "light-to-dark",
    },
    className
  );

  const circleClasses = cn(
    "pill-button-circle absolute left-1/2 bottom-0 rounded-full z-10 pointer-events-none will-change-transform",
    {
      "pill-button-circle-dark": variant === "dark-to-light",
      "pill-button-circle-light": variant === "light-to-dark",
    }
  );

  if (href) {
    return (
      <a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        className={baseClasses}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <span className={circleClasses} ref={circleRef} aria-hidden="true">
          {/* Debug content */}
        </span>
        <span className="relative z-10">{children}</span>
      </a>
    );
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      type={type}
      className={baseClasses}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <span className={circleClasses} ref={circleRef} aria-hidden="true">
        {/* Debug content */}
      </span>
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export { PillButton }; 
