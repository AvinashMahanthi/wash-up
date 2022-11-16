import "./App.css";
import React, { useEffect, createContext, useReducer, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  useHistory,
  Switch,
} from "react-router-dom";

import Home from "./pages";
import SigninPage from "./pages/signin";
import SignupPage from "./pages/signup";
import AdminSigninPage from "./pages/adminSignin";
import AdminSignupPage from "./pages/adminSignup";
// import DisplayTable from "./Dashboard/displayTable";
import SearchDoctors from "./components/SearchServices";
import SlotBooking from "./SlotBooking";
import PageNotFound from "./pages/PageNotFound";
import AddCarService from "./AddCarService";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

export const UserContext = createContext();

const Routing = () => {
  // const navigate = useNavigate();
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
    } else {
      // if(!history.location.pathname.startsWith('/reset'))
      // navigate("/SignIn");
      history.push("/SignIn");
    }
  }, []);
  return 0;
};

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/signin" component={SigninPage} exact />
        <Route path="/signup" component={SignupPage} exact />
        <Route path="/adminsignin" component={AdminSigninPage} exact />
        <Route path="/adminsignup" component={AdminSignupPage} exact />
        {/* <Route path="/dashboard" component={DisplayTable} exact /> */}
        <Route path="/search" component={SearchDoctors} exact />
        <Route path="/confirm_Booking" component={SlotBooking} exact />
        <Route path="/addCarService" component={AddCarService} exact />
        <Route path="/*" component={PageNotFound} exact />
      </Switch>
    </Router>
  );
}

export default App;
