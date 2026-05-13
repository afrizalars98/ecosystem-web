import styles from "./Avatar.module.css";

export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg";
  fallback?: string;
}

export const Avatar = ({ src, alt = "", size = "md", fallback }: AvatarProps) => {
  const initials = fallback || alt.charAt(0).toUpperCase();

  return (
    <div className={`${styles.avatar} ${styles[size]}`}>
      {src ? (
        <img src={src} alt={alt} className={styles.image} />
      ) : (
        <span className={styles.fallback}>{initials}</span>
      )}
    </div>
  );
};
