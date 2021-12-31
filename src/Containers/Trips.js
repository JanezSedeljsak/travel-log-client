import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { List, Avatar, Input, Button, Tooltip, Switch, Modal } from 'antd';
import { loadTrips } from '../api';
import { ExpandAltOutlined } from '@ant-design/icons';

const { Search } = Input;

export default () => {
    const usrEmail = useSelector(state => state.user.email);
    const [trips, setTrips] = useState([]);
    const [tripsForDisplay, setTripsForDisplay] = useState([]);
    const [viewAllTrips, setViewAllTrips] = useState(true);
    const [filterText, setFilterText] = useState("");
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [detailIndex, setDetailIndex] = useState(-1);

    useEffect(() => {
        fetchData();
    }, []);

    function closeModal() {
        setShowDetailModal(false);
        setDetailIndex(-1);
    }

    function detailModal() {
        if (detailIndex == -1) return <></>;
        const trip = tripsForDisplay[detailIndex];
        return (
            <Modal title="Trip details" visible={showDetailModal} onOk={closeModal} onCancel={closeModal} width={'70vw'}>
                <p>Name: <b>{trip.tripName}</b></p>
                <p>Destination: <b>{trip.destination}</b></p>
                <p>Country: <b>{trip.countryName}</b></p>
                <p>Trip date: <b>{moment(trip.tripDate).format("DD.MM.yyyy")}</b></p>

                <List
                    itemLayout="horizontal"
                    dataSource={trip.userList}
                    renderItem={member => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png" />}
                                title={member.fullName}
                                description={member.email}
                            />
                        </List.Item>
                    )}
                />
            </Modal>
        )
    }

    function openDetailmodal(idx) {
        setDetailIndex(idx);
        setShowDetailModal(true);
    }

    async function fetchData() {
        const trips = await loadTrips();
        setTrips(trips);
        setTripsForDisplay(trips);
    }

    function updateVisibleTrips(filtrTxt, viewTrips) {
        const tmpTrips = trips.filter(trip => {
            const containsFilterTxt = trip.tripName.toLowerCase().includes(filtrTxt.toLowerCase());
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
                renderItem={(trip, idx) => (
                    <List.Item
                        actions={[<Tooltip title="View detail">
                            <Button type="primary" shape="circle" onClick={() => openDetailmodal(idx)} icon={<ExpandAltOutlined />} size="large" />
                        </Tooltip>]}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src="https://cdn-icons-png.flaticon.com/512/1452/1452378.png" />}
                            title={trip.tripName}
                            description={`${trip.destination} - ${moment(trip.tripDate, "YYYYMMDD").fromNow()}`}
                        />
                    </List.Item>
                )}
            />
            {detailModal()}
        </div>
    )
}