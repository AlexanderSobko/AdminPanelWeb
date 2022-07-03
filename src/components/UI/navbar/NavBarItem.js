import React from "react";
import {NavLink} from "react-router-dom";
import './NavBarItem.styles.css'

export default function NavBarItem(props) {
    return (
        <li>
            <NavLink 
                to={props.route}
                className={({ isActive }) =>
                    isActive ? "activNavLink" : undefined
                }
            >
                <span class="material-icons-round">{props.iconName}</span>
                <span class="title">{props.name}</span>
            </NavLink>
            <span class="tooltip">{props.name}</span>
        </li>
    )
}
