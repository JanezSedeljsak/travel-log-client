import React, { useEffect, useState } from 'react';
import { List, Avatar, Input, Button, Tooltip, Modal } from 'antd';
import { loadMembers } from '../api';
import { ExpandAltOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Search } = Input;

export default () => {
    const [members, setMembers] = useState([]);
    const [membersForDisplay, setMembersForDisplay] = useState([]);
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
        const member = membersForDisplay[detailIndex];
        return (
            <Modal title="Member details" visible={showDetailModal} onOk={closeModal} onCancel={closeModal} width={'70vw'}>
                <p>Full name: <b>{member.fullName}</b></p>
                <p>Email: <b>{member.email}</b></p>
                <p>Birthdate: <b>{moment(member.birthdate).format("DD.MM.yyyy")}</b></p>
                <p>Joined: <b>{moment(member.createdAt).format("DD.MM.yyyy")}</b></p>

                <List
                    itemLayout="horizontal"
                    dataSource={member.trips}
                    renderItem={trip => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src="https://cdn-icons-png.flaticon.com/512/1452/1452378.png" />}
                                title={trip.tripName}
                                description={`${trip.destination} - ${moment(trip.tripDate, "YYYYMMDD").fromNow()}`}
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
                renderItem={(member, idx) => (
                    <List.Item
                        actions={[<Tooltip title="View detail">
                            <Button type="primary" shape="circle" onClick={() => openDetailmodal(idx)} icon={<ExpandAltOutlined />} size="large" />
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
            {detailModal()}
        </div>
    )
}