import Link from "@/components/Link";

import styles from "./Logo.module.css";

const Logo = (props: React.ComponentPropsWithoutRef<"a">) => {
  return (
    <Link href="/" style={{ textDecoration: "none" }} {...props}>
      <div id={styles.container}>
        <div id={styles.logo}>
          <div id={styles.mask} />
          <div id={styles.curve4} className={styles.left} />
          <div id={styles.curve3} className={styles.left} />
          <div id={styles.curve2} className={styles.right} />
          <div id={styles.curve1} className={styles.right} />
          <div id={styles.curve5} />
        </div>
        <span>&nbsp;ipikuka</span>
      </div>
    </Link>
  );
};

export default Logo;
