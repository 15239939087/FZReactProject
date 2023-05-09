import { post } from "@/utils/request";

const api = {
  userRegister: (params?: any) => post("/user/register", params) //使用get post封装
};

export default api;
