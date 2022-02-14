import WebFont from 'webfontloader';
import Footer from './components/Layouts/Footer/Footer';
import Header from './components/Layouts/Header/Header';
import Login from './components/User/Login';
import Register from './components/User/Register';
import { Routes, Route, useLocation } from 'react-router-dom';
import { loadUser } from './actions/userAction';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import UpdateProfile from './components/User/UpdateProfile';
import UpdatePassword from './components/User/UpdatePassword';
import ForgotPassword from './components/User/ForgotPassword';
import ResetPassword from './components/User/ResetPassword';
import Account from './components/User/Account';
import ProtectedRoute from './Routes/ProtectedRoute';
import Home from './components/Home/Home';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import Shipping from './components/Cart/Shipping';
import OrderConfirm from './components/Cart/OrderConfirm';
import Payment from './components/Cart/Payment';
import OrderStatus from './components/Cart/OrderStatus';
import OrderSuccess from './components/Cart/OrderSuccess';
import MyOrders from './components/Order/MyOrders';
import OrderDetails from './components/Order/OrderDetails';
import Dashboard from './components/Admin/Dashboard';
import MainData from './components/Admin/MainData';
import OrderTable from './components/Admin/OrderTable';
import UpdateOrder from './components/Admin/UpdateOrder';
import ProductTable from './components/Admin/ProductTable';
import NewProduct from './components/Admin/NewProduct';
import UpdateProduct from './components/Admin/UpdateProduct';
import UserTable from './components/Admin/UserTable';
import UpdateUser from './components/Admin/UpdateUser';
import ReviewsTable from './components/Admin/ReviewsTable';
import Wishlist from './components/Wishlist/Wishlist';
import NotFound from './components/NotFound';

function App() {

  const dispatch = useDispatch();
  const { pathname } = useLocation();
  // const [stripeApiKey, setStripeApiKey] = useState("");

  // async function getStripeApiKey() {
  //   const { data } = await axios.get('/api/v1/stripeapikey');
  //   setStripeApiKey(data.stripeApiKey);
  // }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto:300,400,500,600,700"]
      },
    });
  });

  useEffect(() => {
    dispatch(loadUser());
    // getStripeApiKey();
  }, [dispatch]);

  // always scroll to top on route/path change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }, [pathname])

  // disable right click
  window.addEventListener("contextmenu", (e) => e.preventDefault());
  window.addEventListener("keydown", (e) => {
    if (e.keyCode == 123) e.preventDefault();
    if (e.ctrlKey && e.shiftKey && e.keyCode === 73) e.preventDefault();
    if (e.ctrlKey && e.shiftKey && e.keyCode === 74) e.preventDefault();
  });
  
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />

        <Route path="/cart" element={<Cart />} />

        {/* order process */}
        <Route path="/shipping" element={
          <ProtectedRoute>
            <Shipping />
          </ProtectedRoute>
        } ></Route>

        <Route path="/order/confirm" element={
          <ProtectedRoute>
            <OrderConfirm />
          </ProtectedRoute>
        } ></Route>

        <Route path="/process/payment" element={
          <ProtectedRoute>
            {/* // stripeApiKey && ( */}
            {/* // <Elements stripe={loadStripe(stripeApiKey)}> */}
            <Payment />
            {/* // </Elements> */}
            {/* ) */}
          </ProtectedRoute>
        } ></Route>

        <Route path="/orders/success" element={<OrderSuccess success={true} />} />
        <Route path="/orders/failed" element={<OrderSuccess success={false} />} />
        {/* order process */}

        <Route path="/order/:id" element={
          <ProtectedRoute>
            <OrderStatus />
          </ProtectedRoute>
        } ></Route>

        <Route path="/orders" element={
          <ProtectedRoute>
            <MyOrders />
          </ProtectedRoute>
        }></Route>

        <Route path="/order_details/:id" element={
          <ProtectedRoute>
            <OrderDetails />
          </ProtectedRoute>
        }></Route>

        <Route path="/account" element={
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        } ></Route>

        <Route path="/account/update" element={
          <ProtectedRoute>
            <UpdateProfile />
          </ProtectedRoute>
        } ></Route>

        <Route path="/password/update" element={
          <ProtectedRoute>
            <UpdatePassword />
          </ProtectedRoute>
        } ></Route>

        <Route path="/password/forgot" element={<ForgotPassword />} />

        <Route path="/password/reset/:token" element={<ResetPassword />} />

        <Route path="/wishlist" element={
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/dashboard" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={0}>
              <MainData />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/orders" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={1}>
              <OrderTable />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/order/:id" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={1}>
              <UpdateOrder />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/products" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={2}>
              <ProductTable />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/new_product" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={3}>
              <NewProduct />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/product/:id" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={2}>
              <UpdateProduct />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/users" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={4}>
              <UserTable />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/user/:id" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={4}>
              <UpdateUser />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/reviews" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={5}>
              <ReviewsTable />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="*" element={<NotFound />}></Route>

      </Routes>
      <Footer />
    </>
  );
}

export default App;
