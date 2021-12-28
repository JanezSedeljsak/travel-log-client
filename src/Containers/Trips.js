import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { List, Avatar, Input, Button, Tooltip, Switch } from 'antd';
import { loadTrips } from '../api';
import { ExpandAltOutlined } from '@ant-design/icons';

const { Search } = Input;

export default () => {
    const usrEmail = useSelector(state => state.user.email);
    const [trips, setTrips] = useState([]);
    const [tripsForDisplay, setTripsForDisplay] = useState([]);
    const [viewAllTrips, setViewAllTrips] = useState(true);
    const [filterText, setFilterText] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const trips = await loadTrips();
        setTrips(trips);
        setTripsForDisplay(trips);
    }

    function updateVisibleTrips(filtrTxt, viewTrips) {
        const tmpTrips = trips.filter(trip => {
            const containsFilterTxt = trip.tripName.toLowerCase().includes(filtrTxt.toLowerCase());
            debugger;
            const showTrip = viewTrips || trip.userList.some(user => user.email === usrEmail);
            return containsFilterTxt && showTrip;
        });

        setTripsForDisplay(tmpTrips);
    }

    function changeFilterText(val) {
        setFilterText(val);
        updateVisibleTrips(val, viewAllTrips);
    }

    function changeViewAllTrips(val) {
        setViewAllTrips(val);
        updateVisibleTrips(filterText, val);
    }

    return (
        <div className="w-100">
            <div style={{ marginBottom: 10 }}>
                <span>{"Toggle all trips:  "}</span>
                <Switch size="small" checked={viewAllTrips} onChange={changeViewAllTrips} />
            </div>
            <Search placeholder="Filter trips by title" allowClear onSearch={changeFilterText} style={{ width: '100%' }} />
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