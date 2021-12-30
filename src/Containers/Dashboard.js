import React, { useEffect, useState } from 'react';
import { loadMostActiveuMembers, loadTopDestinations, loadTopCountries, loadAvgTripsPerMonth } from '../api';
import { Bar, Chart } from 'react-chartjs-2';
import { Row, Col } from 'antd';
import 'chart.js/auto';

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
    const options = getChartOptions({ title: 'Most active members' });
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
    const options = getChartOptions({ title: 'Most visited destinations' });
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

function TopVisitedCountriesChart({ countries }) {
    const options = getChartOptions({ title: 'Most visited countries' });
    const data = {
        labels: countries.map(dest => dest.countryName),
        datasets: [
            {
                label: 'Countries by name',
                data: countries.map(x => x.count),
                backgroundColor: '#ffbb00',
            }
        ],
    };

    return <Bar options={options} data={data} />;
}

function TripsPerMonthChart({ monthData }) {
    const data = {
        labels: monthData.map(month => month.monthName),
        datasets: [
            {
                label: 'Trips per month',
                data: monthData.map(x => x.count),
                backgroundColor: '#375e97',
            }
        ],
    };

    return <Chart type="line" data={data} />;
}

export default () => {
    const [topMembers, setTopMembers] = useState([]);
    const [topLocations, setTopLocations] = useState([]);
    const [topCountries, setTopCountries] = useState([]);
    const [avgTripsPerMonth, setAvgTripsPerMonth] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        setTopMembers(await loadMostActiveuMembers());
        setTopLocations(await loadTopDestinations());
        setTopCountries(await loadTopCountries());
        setAvgTripsPerMonth(await loadAvgTripsPerMonth());
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
                    <TopVisitedCountriesChart countries={topCountries} />
                </Col>
                <Col span={12} >
                    <TripsPerMonthChart monthData={avgTripsPerMonth} />
                </Col>
            </Row>
        </div>
    )
}
