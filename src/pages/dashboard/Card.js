import React from "react";
import './Card.styles.css';

export default function Card(props) {

    return (
        <div class="card">
            <div>
                <div class="numbers">{props.amound}</div>
                <div class="cardName">{props.name}</div>
            </div>
            <div class="iconBx">
                <span class="material-icons-round">{props.icon}</span>
            </div>
        </div>
    )

}