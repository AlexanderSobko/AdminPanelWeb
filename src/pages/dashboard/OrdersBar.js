import './OrdersBar.styles.css';
import {Link} from "react-router-dom";


const OrdersBar = (props) => {

    return (
        <div className="recentOrders">
            <div className="cardHeader">
                <h2>Recent Orders</h2>
                <Link to='orders' class="btn">View All</Link>
            </div>
            <table>
                <thead>
                <tr>
                    <td>Id</td>
                    <td>Customer</td>
                    <td>Delivery Method</td>
                    <td>Price</td>
                    <td>Status</td>
                </tr>
                </thead>
                {props.orders.map(order =>
                    <tbody key={order.id}>
                    <tr>
                        <td>{order.id}</td>
                        <td>{order.firstName} {order.lastName}</td>
                        <td>{order.deliveryMethod}</td>
                        <td>{order.totalPrice}</td>
                        <td><span className="status_delivered">Delivered</span>
                        </td>
                    </tr>
                    </tbody>
                )}
            </table>
        </div>
    )
}

export default OrdersBar;