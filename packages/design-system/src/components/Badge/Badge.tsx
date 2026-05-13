import { HTMLAttributes } from "react";
import styles from "./Badge.module.css";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "accent" | "lime" | "neutral" | "success" | "error";
}

export const Badge = ({ variant = "primary", className = "", children, ...props }: BadgeProps) => {
  return (
    <span className={`${styles.badge} ${styles[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
};
