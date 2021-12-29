import React, { useEffect, useState } from 'react';
import { loadMostActiveuMembers, loadTopDestinations } from '../api';
import { Bar } from 'react-chartjs-2';
import { Row, Col } from 'antd';

const getChartOptions = ({ title }) => ({
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: title,
        },
    },
});

function TopMembersChart({ members }) {
    const options = getChartOptions({ title: 'Top members' });
    const data = {
        labels: members.map(member => member.user.fullname),
        datasets: [
            {
                label: 'Members by full name',
                data: members.map(x => x.count),
                backgroundColor: '#3f681c',
            }
        ],
    };

    return <Bar options={options} data={data} />;
}

function TopDestinationsChart({ destinations }) {
    const options = getChartOptions({ title: 'Top destinations' });
    const data = {
        labels: destinations.map(dest => dest.name),
        datasets: [
            {
                label: 'Destinations by name',
                data: destinations.map(x => x.count),
                backgroundColor: '#fb6542',
            }
        ],
    };

    return <Bar options={options} data={data} />;
}

export default () => {
    const [topMembers, setTopMembers] = useState([]);
    const [topLocations, setTopLocations] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        setTopMembers(await loadMostActiveuMembers());
        setTopLocations(await loadTopDestinations());
    }

    return (
        <div style={{ flex: 1 }}>
            <Row gutter={[16, 24]}>
                <Col span={12} >
                    <TopMembersChart members={topMembers} />
                </Col>
                <Col span={12} >
                    <TopDestinationsChart destinations={topLocations} />
                </Col>
            </Row>
            <Row gutter={[16, 24]}>
                <Col span={12} >
                    <TopMembersChart members={topMembers} />
                </Col>
                <Col span={12} >
                    <TopDestinationsChart destinations={topLocations} />
                </Col>
            </Row>
        </div>
    )
}
