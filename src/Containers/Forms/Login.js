import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Link as RouterLink } from 'react-router-dom'
import { actions } from '../../redux/user'
import { Form, Input, Button } from 'antd'

export default () => {
    const isLoggedIn = useSelector(state => state.user.isLoggedIn && state.user.jwt !== null);
    const dispatch = useDispatch();

    const loginFinish = values => {
        dispatch(actions.login(values));
    }

    useEffect(() => {
        dispatch(actions.logOut()) //reset state and clear any errors
    }, [dispatch])

    if (isLoggedIn) return <Redirect to="/travel-log-client/" />

    return (
        <div className="basic-form-container">
            <h1>Welcome back!</h1>
            <Form
                name="basic"
                layout="vertical"
                onFinish={loginFinish}
                onFinishFailed={() => console.log("errr")}
                autoComplete="off"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </div>

    )
}