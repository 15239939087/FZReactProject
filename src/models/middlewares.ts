import { createLogger } from "redux-logger";

const isDebuggingInChrome = !!window.navigator.userAgent;
// logger middleware
const logger = createLogger({
  predicate: () => isDebuggingInChrome,
  collapsed: true,
  duration: true,
});

const middlewares = isDebuggingInChrome ? [logger] : [logger];

export default middlewares;
