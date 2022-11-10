import React from "react";
export const getName = (name: string[]) => {
  if (Array.isArray(name)) {
    return name;
  } else if (!name) {
    return [];
  } else {
    return [name];
  }
};
const MyPage = (props: any) => {
  const getTitle = () => {
    if (props.from === "cardDetail") {
      return "cardDetail";
    } else if (props.from === "cardHome") {
      return "cardHome";
    } else {
      return "other";
    }
  };
  return <div>{getTitle()}</div>;
};
export default MyPage;
