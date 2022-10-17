// import logo from "./logo.svg";
import "./App.css";
import Home from "./Pages/Home";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NotFound from "./Pages/NotFound";
import Layout from "./components/Layout/Layout";
import ShowAllCakes from "./components/cake/ShowAllCake";
import Modal from "./components/UI/Modal";
import { uiActions } from "./store/ui-slice";
import User from "./components/user/User";
import Cart from "./components/Cart/Cart";
import LoginForm from "./components/user/LoginForm";
import CakeDetail from "./components/cake_details/CakeDetail";
import AboutUs from "./components/about/AboutUs";

function App() {
    const dispatch = useDispatch();
    const showCart = useSelector((state) => state.ui.cartIsVisible);
    const showLogin = useSelector((state) => state.ui.showLogin);
    const showUserPage = useSelector((state) => state.ui.showUserPage);

    const backdropHandler = () => {
        dispatch(uiActions.setUnvisible());
    };

    return (
        <div className="App">
            {(showCart || showLogin || showUserPage) && (
                <Modal onClose={backdropHandler}>
                    {showLogin && <LoginForm />}
                    {showCart && <Cart />}
                    {showUserPage && <User />}
                </Modal>
            )}
            <Layout>
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
                    <Route path="/products/id/:cakeId">
                        <CakeDetail />
                    </Route>
                    <Route path="/user">
                        <Home />
                    </Route>
                    <Route path="/about">
                        <AboutUs />
                    </Route>
                    <Route path="*">
                        <NotFound />
                    </Route>
                </Switch>
            </Layout>
        </div>
    );
}

export default App;
