import './App.css';
import React, {useState} from "react";
import NavBar from './components/UI/navbar/NavBar';
import {Routes, Route} from "react-router-dom";
import Dashboard from './pages/dashboard/dashboard';
import OrderList from './pages/orders/OrderList';
import CustomerList from './pages/customers/CustomerList';
import EditCustomer from './pages/customers/EditCustomer';
import AddCustomer from './pages/customers/AddCustomer';
import EditOrder from './pages/orders/EditOrder'
import ProductList from './pages/products/ProductList';
import AddProduct from './pages/products/AddProduct';
import EditProduct from './pages/products/EditProduct';
import MessageList from './pages/messages/MessageList';
import PostList from './pages/posts/PostList';
import AddPost from './pages/posts/AddPost';
import Statistics from './pages/statistics/Statistics';
import Login from './pages/login/Login';
import ApiDataService from './api/ApiDataService';

function App() {

    const [isActive, setActive] = useState(false);

    const token = ApiDataService.useToken()


    if (!token.token) {
        return <Login/>;
    }

    return (
        <div>
            <div>
                <NavBar set={setActive} isOpen={isActive}/>
                <div className={isActive ? "main" : 'main open'}>
                    <Routes>
                        <Route path="/" element={<Dashboard/>}/>
                        <Route path="/customers" element={<CustomerList/>}/>
                        <Route path='/add-customer' element={<AddCustomer/>}/>
                        <Route path='/customer/:id' element={<EditCustomer/>}/>
                        <Route path="/orders" element={<OrderList/>}/>
                        <Route path='/order/:id' element={<EditOrder/>}/>
                        <Route path='/products' element={<ProductList/>}/>
                        <Route path='/add-product' element={<AddProduct/>}/>
                        <Route path='/product/:id' element={<EditProduct/>}/>
                        <Route path='/messages' element={<MessageList/>}/>
                        <Route path='/posts' element={<PostList/>}/>
                        <Route path='/add-post' element={<AddPost/>}/>
                        <Route path='/statistics' element={<Statistics/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;
