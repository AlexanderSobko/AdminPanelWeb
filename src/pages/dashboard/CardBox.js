import React, {useState} from "react";
import Card from './Card';
import './CardBox.styles.css';

const CardBox = (props) => {

    const [mesageCount, setMesageCount] = useState(0);
    const [profit, steProfit] = useState(0);

    return (
        <div class="cardBox">
            <Card amound={props.customers.length} name="Customers" icon="groups"/>
            <Card amound={mesageCount} name="Messages" icon="forum"/>
            <Card amound={props.orders.length} name="Seles" icon="shopping_bag"/>
            <Card amound={`$${profit}`} name="Earning" icon="savings"/>
        </div>
    )
}

export default CardBox;