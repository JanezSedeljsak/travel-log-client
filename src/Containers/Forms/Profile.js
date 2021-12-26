import React, { useState, useEffect } from "react"
import { loadProfile } from '../../api';
import { useSelector } from "react-redux";
import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
} from 'antd';

export default () => {
    const jwt = useSelector(state => state.user.jwt)
    const [profileData, setProfileData] = useState({});
    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const profileData = await loadProfile(jwt);
        console.log(profileData);
        setProfileData(profileData);
    }

    if (!Object.keys(profileData).length) {
        return <></>;
    }

    return (
        <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            initialValues={profileData}
        >
            <Form.Item
                label="Full name"
                name="fullname"
                rules={[{ required: true, message: 'Enter your full name' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Enter your email' }]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="Lang code"
                name="langCode"
            >
                <Select>
                    <Select.Option value="demo">Demo</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label="Birth date" name="id">
                <Input />
            </Form.Item>
            <Form.Item label="Member since" name="createdAt" disabled>
                <Input />
            </Form.Item>
            <Form.Item
                label="New password"
                name="password"
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                label="Old password"
                name="password"
                rules={[{ required: true, message: 'Enter old password to update profile!' }]}
            >
                <Input.Password autoComplete="new-password"/>
            </Form.Item>
            <Form.Item label=" ">
                <Button type="primary" htmlType="submit">
                    Update profile
                </Button>
            </Form.Item>
        </Form>
    );
}