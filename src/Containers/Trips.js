import React, { useEffect, useState } from 'react';
import { List, Avatar } from 'antd';
import { loadTrips } from '../api';
import moment from 'moment';

export default () => {
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);
    
    async function fetchData() {
        const trips = await loadTrips();
        setTrips(trips);
    }

    return (
        <List
            itemLayout="horizontal"
            dataSource={trips}
            renderItem={trip => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                        title={trip.destination}
                        description={`${trip.tripName} - ${moment(trip.tripDate, "YYYYMMDD").fromNow()}`}
                    />
                </List.Item>
            )}
        />
    )
}