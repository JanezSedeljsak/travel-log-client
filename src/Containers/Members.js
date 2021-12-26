import React, { useEffect, useState } from 'react';
import { List, Avatar } from 'antd';
import { loadMembers } from '../api';

export default () => {
    const [members, setMembers] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);
    
    async function fetchData() {
        setMembers(await loadMembers());
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