import { get } from "@/utils/request";

const api = {
  // home_api: params => post("/table", stringify(params)), //不使用get post封装 stringify看需求使用
  getArticleInfo: (params?: any) => get("/api/article/list", params) //使用get post封装
};

export default api;
