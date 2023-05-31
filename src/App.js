/*!
=========================================================
* Muse Ant Design Dashboard - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import Main from "./components/layout/Main";
import Home from "./pages/Home";
import BillHelpPage from "./pages/BillHelpPage";
import DonationPage from "./pages/DonationPage";
import EducationSupportPage from "./pages/EducationSupportPage";
import PetFoodSupport from "./pages/PetFoodSupport";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import "antd/dist/antd.min.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} />
        <Main>
          <Route exact path="/home" component={Home} />
          <Route exact path="/bills" component={BillHelpPage} />
          <Route exact path="/donation" component={DonationPage} />
          <Route exact path="/educationSupport" component={EducationSupportPage} />
          <Route exact path="/petFoodSupport" component={PetFoodSupport} />
        </Main>
      </Switch>
    </div>
  );
}
// <Redirect from="*" to="/home" />

export default App;
