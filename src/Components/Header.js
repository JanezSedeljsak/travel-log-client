import React from "react";
import { Layout } from 'antd';
import { Menu } from 'antd';

export default () => {
    const isAuth = true;
    const isAdmin = isAuth && false;

    const common = {
        left: {
            'home': 'Home',
            'popular-destinations': 'Popular destinations'
        }
    }

    const auth = {
        left: {
            'my-trips': 'My trips',
            'add-trip': 'Add trip',
            'get-suggestion': 'Get suggestion'
        }, right: {
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
            <Menu mode="horizontal">
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