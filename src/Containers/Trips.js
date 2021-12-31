import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { List, Avatar, Input, Button, Switch, Modal } from 'antd';
import { loadTrips, deleteTrip } from '../api';
import { ExpandAltOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';
import { useToasts } from 'react-toast-notifications';

const { Search } = Input;

export default () => {
    const jwt = useSelector(state => state.user.jwt);
    const usrEmail = useSelector(state => state.user.email);
    const usrId = useSelector(state => state.user.userId);
    const isAdmin = useSelector(state => state.user.isAdmin);
    const history = useHistory();
    const { addToast } = useToasts();

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

    function getToastSettings(type) {
        return {
            appearance: type,
            autoDismiss: true,
            autoDismissTimeout: 2500
        }
    };

    function detailModal() {
        if (detailIndex === -1) return <></>;
        const trip = tripsForDisplay[detailIndex];
        return (
            <Modal title="Trip details" visible={showDetailModal} onOk={closeModal} onCancel={closeModal} width={'70vw'}>
                <p>Name: <b>{trip.tripName}</b></p>
                <p>Destination: <b>{trip.destination}</b></p>
                <p>Country: <b>{trip.countryName}</b></p>
                {trip.avgRating !== -1 && <p>Avg rating: <b>{trip.avgRating}</b></p>}
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

    function openEdit(idx) {
        history.push(`/edit/trip/${idx}`);
    }

    async function removeRecord(idx, jwt) {
        const response = await deleteTrip(idx, jwt);
        if (response && response.data.status) {
            addToast(`Succesfully deleted record!`, getToastSettings('success'));
            fetchData();
        } else {
            addToast(`Failed to deleted record!`, getToastSettings('error'));
        }
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
                        actions={[<>
                            <Button type="primary" shape="circle" onClick={() => openDetailmodal(idx)} icon={<ExpandAltOutlined />} size="large" />
                            {(isAdmin || (usrId && usrId === trip.createdBy)) && (
                                <>
                                    <Button type="danger" shape="circle" onClick={() => removeRecord(trip.id, jwt)} icon={<DeleteOutlined />} size="large" />
                                    <Button shape="circle" onClick={() => openEdit(idx)} icon={<EditOutlined />} size="large" />
                                </>
                            )}
                        </>]}
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