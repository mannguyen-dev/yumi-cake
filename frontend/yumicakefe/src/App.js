// import logo from "./logo.svg";
import "./App.css";
import Home from "./Pages/Home/Home";
import { Route, Switch, Redirect } from "react-router-dom";
import NotFound from "./Pages/NotFound";
import Layout from "./components/Layout/Layout";
import ShowAllCakes from "./components/cake/ShowAllCake";
import AboutUs from "./components/about/AboutUs";
function App() {
  return (
    <Layout>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
          <Route path="/home" exact>
            <Home />
          </Route>
          <Route path="/products" exact>
            <ShowAllCakes />
          </Route>
          <Route path="/products/cat/:category">
            <Home />
          </Route>
          <Route path="/products/id/:quoteId">
            <Home />
          </Route>
          <Route path="/user">
            <Home />
          </Route>
          <Route exact path="/about">
            <AboutUs />
          </Route>
          <Route path="/login">
            <Home />
          </Route>
          <Route path="/signup">
            <Home />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Layout>
  );
}

export default App;
