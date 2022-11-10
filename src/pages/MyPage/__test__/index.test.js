import React from "react";
import MyPage, { getName } from "..";

describe("分期试算页", () => {
  test("传入非 false 值，是数组", () => {
    expect(getName(["Name", "Age"])).toEqual([]);
  });
  test("传入非 false 值，但不是数组", () => {
    expect(getName("Leopard")).toEqual(["Leopard"]);
  });
  test("传入false", () => {
    expect(getName(false)).toEqual([]);
  });
});