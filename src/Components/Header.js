import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { loadTripSuggestion } from "../api";
import { Modal, Menu, Layout, List, Avatar } from 'antd';
import { actions } from '../redux/user';
import Waves from "./Waves";

export default ({ isAuth, isAdmin }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [menuItem, setMenuItem] = useState('/');
    const [showSuggestionModal, setShowSuggestionModal] = useState(false);
    const [tripSuggestions, setTripSuggestions] = useState([]);

    const jwt = useSelector(state => state.user.jwt);

    function closeModal() {
        setShowSuggestionModal(false);
    }

    async function routeChange(route) {
        switch (route) {
            case 'logout':
                dispatch(actions.logOut());
                return;
            case 'get-suggestion':
                const suggestions = await loadTripSuggestion(jwt);
                setTripSuggestions(suggestions);
                setShowSuggestionModal(true);
                return;
            default:
                setMenuItem(route);
                history.push(`/travel-log-client/${route}`);
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
            <Waves />
            <Modal title="Destination suggestions" visible={showSuggestionModal} onOk={closeModal} onCancel={closeModal}>
                <List
                    itemLayout="horizontal"
                    dataSource={tripSuggestions}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src="https://cdn-icons-png.flaticon.com/512/1452/1452378.png" />}
                                title={<a target="_blank" href={`http://images.google.com/images?q=${item.name}`}>{item.name}</a>}
                                description={item.country}
                            />
                        </List.Item>
                    )}
                />
            </Modal>
        </>
    );
};