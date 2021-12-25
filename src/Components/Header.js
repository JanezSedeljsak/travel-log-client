import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { Layout } from 'antd';
import { Menu } from 'antd';
import { actions } from '../redux/user';

export default ({ isAuth }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [menuItem, setMenuItem]= useState('/');
    const isAdmin = isAuth && false;

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
            'popular-destinations': 'Popular destinations'
        }
    }

    const auth = {
        left: {
            'my-trips': 'My trips',
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

        }
    };

    function buildNav() {
        const leftNav = { ...common.left, ...(isAuth ? auth.left : annyonymous.left), ...(isAdmin ? admin.left : []) };
        const rightNav = { ...common.right, ...(isAuth ? auth.right : annyonymous.right), ...(isAdmin ? admin.right : []) };

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
        <Layout.Header>
            {buildNav()}
        </Layout.Header>
    );
};