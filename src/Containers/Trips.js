import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { List, Avatar, Input, Button, Tooltip } from 'antd';
import { loadTrips } from '../api';
import { ExpandAltOutlined } from '@ant-design/icons';

const { Search } = Input;

export default () => {
    const [trips, setTrips] = useState([]);
    const [tripsForDisplay, setTripsForDisplay] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const trips = await loadTrips();
        setTrips(trips);
        setTripsForDisplay(trips);
    }

    function onSearch(value) {
        setTripsForDisplay(trips.filter(trip => trip.tripName.toLowerCase().includes(value.toLowerCase())));
    }

    return (
        <div className="w-100">
            <Search placeholder="Filter trips by title" allowClear onSearch={onSearch} style={{ width: '100%' }} />
            <List
                itemLayout="horizontal"
                dataSource={tripsForDisplay}
                renderItem={trip => (
                    <List.Item
                        actions={[<Tooltip title="View detail">
                            <Button type="primary" shape="circle" icon={<ExpandAltOutlined />} size="large" />
                        </Tooltip>]}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                            title={trip.tripName}
                            description={`${trip.destination} - ${moment(trip.tripDate, "YYYYMMDD").fromNow()}`}
                        />
                    </List.Item>
                )}
            />
        </div>
    )
}