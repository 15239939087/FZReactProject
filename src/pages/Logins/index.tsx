import React, { useEffect } from "react";
import { useState } from "react";

export default function App() {
  const [func, setFunc] = useState(() => () => alert(1));

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const p1 = Promise.resolve("p1");

    const p2 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("p2 延时一秒");
      }, 1000);
    });

    const p3 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("p3 延时两秒");
      }, 2000);
    });
    const res = await Promise.all([p1, p2, p3]);
    console.log(res);
  };

  return (
    <div className="App">
      <button onClick={func}>执行方法</button>
    </div>
  );
}
