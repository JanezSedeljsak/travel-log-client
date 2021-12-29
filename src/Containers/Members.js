import React, { useEffect, useState } from 'react';
import { List, Avatar, Input, Button, Tooltip } from 'antd';
import { loadMembers } from '../api';
import { ExpandAltOutlined } from '@ant-design/icons';

const { Search } = Input;

export default () => {
    const [members, setMembers] = useState([]);
    const [membersForDisplay, setMembersForDisplay] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const members = await loadMembers();
        setMembers(members);
        setMembersForDisplay(members)
    }

    function onSearch(value) {
        setMembersForDisplay(members.filter(member => member.fullName.toLowerCase().includes(value.toLowerCase())));
    }

    return (
        <div className="w-100">
            <Search placeholder="Filter members by name" allowClear onSearch={onSearch} style={{ width: '100%' }} />
            <List
                itemLayout="horizontal"
                dataSource={membersForDisplay}
                renderItem={member => (
                    <List.Item
                        actions={[<Tooltip title="View detail">
                            <Button type="primary" shape="circle" icon={<ExpandAltOutlined />} size="large" />
                        </Tooltip>]}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png" />}
                            title={member.fullName}
                            description={member.email}
                        />
                    </List.Item>
                )}
            />
        </div>
    )
}