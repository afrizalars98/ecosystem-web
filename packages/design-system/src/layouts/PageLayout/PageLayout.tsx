import { ReactNode } from "react";
import styles from "./PageLayout.module.css";

export interface PageLayoutProps {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
}

export const PageLayout = ({ children, header, footer }: PageLayoutProps) => {
  return (
    <div className={styles.layout}>
      {header && <div className={styles.header}>{header}</div>}
      <main className={styles.content}>{children}</main>
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
};
