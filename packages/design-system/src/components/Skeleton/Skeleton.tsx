import styles from "./Skeleton.module.css";

export interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
}

export const Skeleton = ({ width = "100%", height = "16px", borderRadius = "var(--radius-md)" }: SkeletonProps) => {
  return <div className={styles.skeleton} style={{ width, height, borderRadius }} />;
};
