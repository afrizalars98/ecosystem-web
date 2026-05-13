import styles from "./Spinner.module.css";

export interface SpinnerProps {
  size?: "sm" | "md" | "lg";
}

export const Spinner = ({ size = "md" }: SpinnerProps) => {
  return <div className={`${styles.spinner} ${styles[size]}`} role="status" aria-label="Loading" />;
};
