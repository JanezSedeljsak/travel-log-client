import React, { useEffect, useState } from 'react';
import { List, Avatar } from 'antd';
import { loadMyTrips } from '../api';

export default () => {
    const [destinations, setDestinations] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);
    
    async function fetchData() {
        setDestinations(await loadMyTrips());
    }

    return (
        <List
            itemLayout="horizontal"
            dataSource={destinations}
            renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                        title={<a href="https://ant.design">{item.destination}</a>}
                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                </List.Item>
            )}
        />
    )
}