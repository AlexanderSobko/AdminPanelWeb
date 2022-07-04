import axios from "axios";
import {useState} from "react";

const baseUrl = "http://217.74.242.13:3001/api"

const baseReq = axios.create({
    baseURL: baseUrl,
    headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}
});

const useToken = () => {
    const getToken = () => {
        return localStorage.getItem('token');
    }

    const [token, setToken] = useState(getToken());

    const saveToken = (value) => {
        localStorage.setItem('token', value)
        setToken(value);
    }

    return {token, saveToken};
}

const login = (username, password) => {
    const conf = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const url = `${baseUrl}/login`;
    const params = new URLSearchParams();   
    params.append('username', username);
    params.append('password', password);
    return axios.post(url, params, conf)
};

const logout = () => {
    localStorage.removeItem('token');
    window.location.reload(false);
};

const handleError = (err) => {
    if (err.message.includes('403')) {
        localStorage.removeItem('token');
    }
};

const getCustomers = () => {
    return baseReq.get(`/customer`);
};

const deleteCustomer = id => {
    return baseReq.delete(`/customer/${id}`);
};

const addCustomer = data => {
    return baseReq.post(`/customer`, data);
};

const editCustomer = (data) => {
    console.log(data);
    return baseReq.put(`customer/`, data)
};

const getCustomer = id => {
    return baseReq.get(`customer/${id}`);
}

const getOrders = () => {
    return baseReq.get('/order/recent');
};

const deleteOrder = props => {
    return baseReq.delete(`/order/${props.id}`);
};

const addOrder = props => {
    return baseReq.post(`/order`, props.data);
};

const editOrder = (id, data) => {
    return baseReq.put(`order/${id}`, data)
};

const getOrder = id => {
    return baseReq.get(`order/${id}`);
};

const ApiDataService = {
    useToken,
    login,
    logout,
    getCustomers,
    deleteCustomer,
    addCustomer,
    editCustomer,
    getCustomer,
    getOrders,
    deleteOrder,
    addOrder,
    editOrder,
    getOrder,
    handleError
};

export default ApiDataService;
