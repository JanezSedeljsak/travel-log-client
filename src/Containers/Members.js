import React, { useEffect, useState } from 'react';
import { List, Avatar } from 'antd';
import { loadMembers } from '../api';
import { useSelector } from 'react-redux';

export default () => {
    const jwt = useSelector(state => state.user.jwt);
    const [members, setMembers] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);
    
    async function fetchData() {
        setMembers(await loadMembers(jwt));
    }

    return (
        <List
            itemLayout="horizontal"
            dataSource={members}
            renderItem={member => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                        title={member.fullName}
                        description={member.email}
                    />
                </List.Item>
            )}
        />
    )
}