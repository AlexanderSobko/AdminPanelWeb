import React, {useState, useEffect} from "react";
import CardBox from "./CardBox.js";
import OrdersBar from "./OrdersBar";
import CustomersBar from "./CustomersBar";
import ApiDataService from "../../api/ApiDataService.js";

const Dashboard = () => {

    const [customers, setCustomers] = useState([]);

    const [orders, setOrders] = useState([])

    useEffect(() => {
        ApiDataService.getCustomers()
            .then(responce => setCustomers(responce.data))
            .catch(err => ApiDataService.handleError(err));
    }, []);

    useEffect(() => {
        ApiDataService.getOrders()
            .then(responce => {
                setOrders(responce.data)
                console.log(responce)
            })
            .catch(err => ApiDataService.handleError(err));
    }, [])

    return (
        <div>
            <CardBox customers={customers} orders={orders}/>
            <div class="details">
                <OrdersBar orders={orders}/>
                <CustomersBar customers={customers}/>
            </div>
        </div>
    )
}

export default Dashboard;