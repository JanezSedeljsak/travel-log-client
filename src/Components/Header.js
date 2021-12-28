import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from 'antd';
import { Menu } from 'antd';
import { actions } from '../redux/user';
import Waves from "./Waves";

export default ({ isAuth, isAdmin }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [menuItem, setMenuItem]= useState('/');

    function routeChange(route) {
        switch (route) {
            case 'logout':
                dispatch(actions.logOut());
                return;
            case 'get-suggestion':
                alert("<<location suggestion popup>>");
                return;
            default:
                setMenuItem(route);
                history.push(`/${route}`);
                return;
        }
    }

    const common = {
        left: {
            '': 'Home',
            'trips': 'Recent trips',
            'members': 'Members'
        }
    }

    const auth = {
        left: {
            'create/trip': 'Add trip',
            'get-suggestion': 'Get suggestion'
        }, right: {
            'profile': 'Profile',
            'logout': 'Logout'
        }
    };

    const annyonymous = {
        right: {
            'login': 'Login',
            'register': 'Register'
        }
    };

    const admin = {
        left: {
            'dashboard': 'Dashboard'
        }
    };

    function buildNav() {
        console.log(isAdmin, admin.left);
        const leftNav = { ...(isAdmin ? admin.left : []), ...common.left, ...(isAuth ? auth.left : annyonymous.left) };
        const rightNav = { ...(isAdmin ? admin.right : []), ...common.right, ...(isAuth ? auth.right : annyonymous.right) };

        return (
            <Menu mode="horizontal" selectedKeys={menuItem} mode="horizontal" onClick={(e) => routeChange(e.key)}>
                {Object.keys(leftNav).map(v => (
                    <Menu.Item key={v}>
                        {leftNav[v]}
                    </Menu.Item>
                ))}

                {Object.keys(rightNav).map((v, idx) =>
                    (idx === 0) ?
                        <Menu.Item key={v} style={{ marginLeft: 'auto' }}>
                            {rightNav[v]}
                        </Menu.Item>
                        : <Menu.Item key={v}>
                            {rightNav[v]}
                        </Menu.Item>
                )}
            </Menu>
        )
    }

    return (
        <>
        <Layout.Header>
            {buildNav()}
        </Layout.Header>
        <Waves/>
        </>
    );
};