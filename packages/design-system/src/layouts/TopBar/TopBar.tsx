import styles from "./TopBar.module.css";

export interface TopBarProps {
  title: string;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}

export const TopBar = ({ title, onBack, rightAction }: TopBarProps) => {
  return (
    <div className={styles.topbar}>
      {onBack ? (
        <button className={styles.backButton} onClick={onBack} aria-label="Back">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      ) : (
        <div className={styles.spacer} />
      )}
      <h1 className={styles.title}>{title}</h1>
      {rightAction ? <div className={styles.right}>{rightAction}</div> : <div className={styles.spacer} />}
    </div>
  );
};
