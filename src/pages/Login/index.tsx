import React, { useEffect } from "react";
import Footer from "@/components/Footer";
import LoginForm from "./form";
import LoginBanner from "./banner";
import styles from "./style/index.module.less";
import { IconXiguaColor } from "@arco-design/web-react/icon";
import { useDispatch, useSelector } from "react-redux";
import { selectTodayFeedCount } from "@/models/modules/feedRecordslice";
import Api from './service';

function Login() {
  useEffect(() => {
    document.body.setAttribute("arco-theme", "light");
  }, []);
  const dispatch = useDispatch();
  const storeData = useSelector(selectTodayFeedCount);
  console.log(storeData);

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <IconXiguaColor
          style={{
            fontSize: 24,
            marginLeft: 20,
            marginRight: 10,
            color: "#ffcd00",
          }}
        />
        <div className={styles["logo-text"]}>Arco Design</div>
      </div>
      <div className={styles.banner}>
        <div className={styles["banner-inner"]}>
          <LoginBanner />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles["content-inner"]}>
          <LoginForm />
        </div>
        <div className={styles.footer}>
          <Footer />
        </div>
      </div>
    </div>
  );
}
Login.displayName = "LoginPage";

export default Login;
