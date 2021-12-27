import React, { useState, useEffect } from "react"
import { loadProfile } from '../../api';
import { actions } from '../../redux/user'
import { useSelector, useDispatch } from "react-redux";
import moment from 'moment';
import { Form, Input, Button, Select } from 'antd';

export default () => {
    const dispatch = useDispatch();
    const jwt = useSelector(state => state.user.jwt);
    const isLoading = useSelector(state => state.user.isFetching == true);
    const [profileData, setProfileData] = useState({});
    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const profileData = await loadProfile(jwt);
        setProfileData(profileData);
    }

    if (!Object.keys(profileData).length) {
        return <></>;
    }

    function profileUpdateFinish(values) {
        dispatch(actions.updatePorfile(values, jwt));
    }

    return (
        <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            onFinish={profileUpdateFinish}
            onFinishFailed={() => alert("error in form")}
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
                <Input />
            </Form.Item>
            <Form.Item
                label="Lang code"
                name="langCode"
            >
                <Select>
                    <Select.Option value="en">EN</Select.Option>
                    <Select.Option value="sl">SL</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label="Birth date" name="birthDate">
                <span>{moment(profileData.birthDate).format("DD.MM.yyyy")}</span>
            </Form.Item>
            <Form.Item label="Member since" name="createdAt" disabled>
                <span>{moment(profileData.createdAt).format("DD.MM.yyyy")}</span>
            </Form.Item>
            <Form.Item
                label="New password"
                name="password"
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                label="Old password"
                name="oldpassword"
                rules={[{ required: true, message: 'Enter old password to update profile!' }]}
            >
                <Input.Password autoComplete="new-password" />
            </Form.Item>
            <Form.Item label=" ">
                <Button type="primary" htmlType="submit">
                    {isLoading ? "Loading..." : "Update profile"}
                </Button>
            </Form.Item>
        </Form>
    );
}