import React from "react";
import c from "./Navigation.module.scss";
import {NavLink} from "react-router-dom";
import viteLogo from "../../assets/vite.svg";
import reactLogo from "../../assets/react.svg";

export default function Navigation(): React.ReactElement{
    return(
        <nav className={c.nav}>
            <h2>Github Search</h2>
            <div className={c.logo_block}>
                <h4>Vite + React</h4>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className={c.logo} alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className={c.logo} alt="React logo" />
                </a>
            </div>
            <span className={c.links}>
                <NavLink
                    className={c.nav_link}
                    style={({ isActive }): { color: string } => ({
                        color: isActive ? "rgba(17, 17, 17, 0.8)" : 'rgba(17, 17, 17, 0.4)',
                    })}
                    to="/home"
                >HOME</NavLink>
                 <NavLink
                     className={c.nav_link}
                     style={({ isActive }): { color: string } => ({
                         color: isActive ? "rgba(17, 17, 17, 0.8)" : 'rgba(17, 17, 17, 0.4)',
                     })}
                     to="/search"
                 >SEARCH</NavLink>
                <NavLink
                    className={c.nav_link}
                    style={({ isActive }): { color: string } => ({
                        color: isActive ? "rgba(17, 17, 17, 0.8)" : 'rgba(17, 17, 17, 0.4)',
                    })}
                    to="/favourites"
                >FAVOURITES</NavLink>
            </span>
        </nav>
    )
}