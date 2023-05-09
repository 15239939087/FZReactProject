import { get, post } from "@/utils/request";

const Api = {
  home_api: (params: any) => post("/user/login", params), //不使用get post封装 stringify看需求使用
  getArticleInfo: (params?: any) => get("/article/list", params) //使用get post封装
};

export default Api;
