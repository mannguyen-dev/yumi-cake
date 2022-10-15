// import logo from "./logo.svg";
import "./App.css";
import Home from "./Pages/Home/Home";
import { Route, Switch, Redirect } from "react-router-dom";
import NotFound from "./Pages/NotFound";
import Layout from "./components/Layout/Layout";
import ShowAllCakes from "./components/cake/ShowAllCake";
import Notification from "./components/UI/Notification";
import { sendCartData, fetchCartData } from "./store/cart-actions";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Modal from "./components/UI/Modal";
import { uiActions } from "./store/ui-slice";
import User from "./components/user/User";
import Signup from "./components/user/SignupForm";
import Cart from "./components/Cart/Cart";
import LoginForm from "./components/user/LoginForm";

let isInitial = true;

function App() {
    const dispatch = useDispatch();
    const showCart = useSelector((state) => state.ui.cartIsVisible);
    const showLogin = useSelector((state) => state.ui.showLogin);
    const showUserPage = useSelector((state) => state.ui.showUserPage);
    const cart = useSelector((state) => state.cart);
    const user = useSelector((state) => state.user.user);

    console.log(user);

    useEffect(() => {
        dispatch(fetchCartData());
    }, []);

    useEffect(() => {
        if (isInitial) {
            isInitial = false;
            return;
        }

        if (cart.changed) {
            dispatch(sendCartData(cart));
        }
    }, [cart, dispatch]);

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
                    <Route path="/products/id/:quoteId">
                        <Home />
                    </Route>
                    <Route path="/user">
                        <Home />
                    </Route>
                    <Route path="/about">
                        <Home />
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
