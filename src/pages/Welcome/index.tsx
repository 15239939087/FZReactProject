import React, { useEffect } from "react";
import Footer from "@/components/Footer";
import styles from "./style/index.module.less";
function Welcome() {
  useEffect(() => {
    document.body.setAttribute("arco-theme", "light");
  }, []);

  return <div className={styles.container}>welcome</div>;
}
Welcome.displayName = "WelcomePage";

export default Welcome;
