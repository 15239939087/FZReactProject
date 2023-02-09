import React, { useEffect } from "react";
import Footer from "@/components/Footer";
import styles from "./style/index.module.less";
function Lock() {
  useEffect(() => {
    document.body.setAttribute("arco-theme", "light");
  }, []);

  return <div className={styles.container}>Lock</div>;
}
Lock.displayName = "LockPage";

export default Lock;
