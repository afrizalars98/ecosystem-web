import { InputHTMLAttributes } from "react";
import styles from "./SearchBar.module.css";

export interface SearchBarProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  onClear?: () => void;
}

export const SearchBar = ({ value, onClear, className = "", ...props }: SearchBarProps) => {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      <svg className={styles.icon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
      <input type="search" className={styles.input} value={value} {...props} />
      {value && onClear && (
        <button className={styles.clearButton} onClick={onClear} aria-label="Clear search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};
