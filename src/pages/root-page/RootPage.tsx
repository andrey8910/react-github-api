import React from 'react';
import { Outlet } from "react-router-dom";
import Navigation from "../../components/navigation/Navigation.tsx";
import c from './RootPage.module.scss';

const RootPage: React.FC = (): React.ReactElement => {
    return(
        <div className={c.root_page}>
            <div className={c.area} >
                <ul className={c.circles}>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div >
            <div className={c.root_page_content}>
                <Navigation />
                <Outlet />
            </div>
        </div>
    )
}

export default RootPage;