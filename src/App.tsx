import React, { useState } from "react";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import Lock from "./pages/Lock";
import {
  Routes,
  Route,
  Link,
  useLocation,
  BrowserRouter,
} from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import store from "@/models/index";
import { Provider } from "react-redux";
import Register from "./pages/Register";

const App = () => {
  const location = useLocation();
  console.log(location);

  return (
    <Provider store={store}>
      <TransitionGroup component={null}>
        <CSSTransition key={location.key} classNames="fade" timeout={300}>
          <Routes location={location}>
            {/* <Route path="/" element={<Lock />} /> */}
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/welcome" element={<Welcome />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </Provider>
  );
};

export default App;
