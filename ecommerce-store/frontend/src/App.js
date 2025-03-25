import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/loginRegister/Login";
import Register from "./components/loginRegister/Register";
import { ProtectedRoute } from "./routing/ProtectedRoute.js";
import PublicRoute from "./routing/PublicRoute";
import ProductHomeUser from "./components/productCatalogeHomeUser/ProductHomeUser";
import { useEffect, useState } from "react";
import Header from "./components/header/Header";
import MyProfile from "./components/myProfile/MyProfile.js";
import { useDispatch } from "react-redux";
import { setUserAction } from "./redux/actions/UserActions.js";
import Footer from "./components/footer/Footer.js";
import ProductDetails from "./components/productDetail/ProductDetails.js";
import CategoryWiseProducts from "./components/categoryWiseProducts/CategoryWiseProducts.js";
import CartPage from "./components/cartPage/CartPage.js";
import WishListPage from "./components/wishlist/WishListPage.js";
import PageNotFound from "./components/pageNotFound/PageNotFound.js";
import OrderPageUser from "./components/orderPageUser/OrderPageUser.js";
import SearchProducts from "./components/searchProducts/SearchProducts.js";

function App() {
  const [showHeader, setShowHeader] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUserAction(currentUser));
  }, [currentUser]);

  return (
    <div className="App">
      <Router>
        {showHeader && (
          <Header
            isLogged={isLogged}
            setIsLogged={setIsLogged}
            setCurrentUser={setCurrentUser}
          />
        )}
        <Routes>
          <Route
            exact
            path="/login"
            element={
              <PublicRoute>
                <Login
                  setShowHeader={setShowHeader}
                  setIsLogged={setIsLogged}
                />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="/register"
            element={
              <PublicRoute>
                <Register setShowHeader={setShowHeader} />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="/"
            element={
              <ProtectedRoute
                setCurrentUser={setCurrentUser}
                setIsLogged={setIsLogged}
              >
                <ProductHomeUser setShowHeader={setShowHeader} />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/my-profile"
            element={
              <ProtectedRoute
                setCurrentUser={setCurrentUser}
                setIsLogged={setIsLogged}
              >
                <MyProfile />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/my-addresses"
            element={
              <ProtectedRoute
                setCurrentUser={setCurrentUser}
                setIsLogged={setIsLogged}
              >
                <MyProfile />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/products-by-category/:category"
            element={
              <ProtectedRoute
                setCurrentUser={setCurrentUser}
                setIsLogged={setIsLogged}
              >
                <CategoryWiseProducts />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/search/:category"
            element={
              <ProtectedRoute
                setCurrentUser={setCurrentUser}
                setIsLogged={setIsLogged}
              >
                <SearchProducts />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/product/:id"
            element={
              <ProtectedRoute
                setCurrentUser={setCurrentUser}
                setIsLogged={setIsLogged}
              >
                <ProductDetails />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/cart"
            element={
              <ProtectedRoute
                setCurrentUser={setCurrentUser}
                setIsLogged={setIsLogged}
              >
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/my-wishlist"
            element={
              <ProtectedRoute
                setCurrentUser={setCurrentUser}
                setIsLogged={setIsLogged}
              >
                <WishListPage />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/my-orders"
            element={
              <ProtectedRoute
                setCurrentUser={setCurrentUser}
                setIsLogged={setIsLogged}
              >
                <OrderPageUser />
              </ProtectedRoute>
            }
          />
          <Route exact path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
