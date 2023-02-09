import axios from "axios";
const http = axios.create({
  baseURL: 'http://localhost:3333',
  // withCredentials为true时，不允许设置Access-Control-Allow-Origin:*
  withCredentials: false, // 跨站点访问控制请求
  timeout: 20000,
});
/**
 * 请求配置
 * @see https://github.com/mzabriskie/axios
 */
http.interceptors.request.use(
  config => {
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// http.interceptors.response.use(
//   response => {
//     let { data, status, statusText: err_msg } = response;
//     return { data, status, err_msg };
//   },
//   error => {
//     // Do something with response error
//     return Promise.reject(error);
//   }
// );

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url: string, params: any) {
  return new Promise((resolve, reject) => {
    http.get(url, { params: params }).then(res => {
      res.data ? resolve(res.data) : reject(res);
    });
  });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url: string, params: any) {
  return new Promise((resolve, reject) => {
    http.post(url, params).then(res => {
      res.data ? resolve(res.data) : reject(res);
    });
  });
}


export default http;