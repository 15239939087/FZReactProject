import React from "react";

type Props = {
  extends: {
    [key: string]: string;
  };
};
const Logins = (props: Props) => {
  console.log(props, 8989);
  return (
    <>
      <div>123</div>
    </>
  );
};

export default Logins;
