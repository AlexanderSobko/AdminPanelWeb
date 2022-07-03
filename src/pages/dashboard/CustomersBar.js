import './CustomersBar.styles.css';

const CustomersBar = (props) => {

    console.log(props);

    return (
        <div class="recentCustomers">
            <div class="cardHeader">
                <h2>Rescent Customers</h2>
            </div>
            <table>
                <tbody>
                {props.customers.map(customer =>
                    <tr key={customer.id}>
                        <td width="60px">
                            <div class="imgBx"><img src={`data:image/jpg;base64,${customer.photo}`} alt=""/></div>
                        </td>
                        <td>
                            <h4>{customer.firstName}<br/><span>{customer.lastName}</span></h4>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}

export default CustomersBar;