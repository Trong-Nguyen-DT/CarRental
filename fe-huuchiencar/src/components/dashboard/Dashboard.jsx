import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import styles from './Dashboard.module.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getInfoDashboards } from '../../services/UserService';


ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
    const currentDay = new Date();

    const [listItems, setListItems] = useState([]);
    const [selectedOption, setSelectedOption] = useState('month');
    const [selectedDay, setSelectedDay] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [revenueData, setRevenueData] = useState(null);

    useEffect(() => {
        switch (selectedOption) {
            case 'day':
                fetchData(selectedOption, selectedDay);
                break;
            case 'month':
                fetchData(selectedOption, selectedMonth);
                break;
            case 'year':
                fetchData(selectedOption, selectedYear);
                break;
            default:
                break;
                
        }
    }, [selectedOption, selectedDay, selectedMonth, selectedYear]);

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleDateChange = (e) => {
        setSelectedDay(e.target.value);
    };

    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
    };

    const handleYearChange = (e) => {
        setSelectedYear(e.target.value);
    };

    const fetchData = async (option, value) => {
        let day, month, year;
        switch (option) {
            case 'day':
                if (!value) {
                    day = String(currentDay.getDate()).padStart(2, '0');
                    month = String(currentDay.getMonth() + 1).padStart(2, '0');
                    year = String(currentDay.getFullYear());
                } else {
                    day = value.split('-')[2];
                    month = value.split('-')[1];
                    year = value.split('-')[0];
                }
                break;
            case 'month':
                if (!value) {
                    month = String(currentDay.getMonth() + 1).padStart(2, '0');
                    year = String(currentDay.getFullYear());
                } else {
                    month = value.split('-')[1];
                    year = value.split('-')[0];
                }
                break;
            case 'year':
                if (!value) {
                    year = String(currentDay.getFullYear());
                } else {
                    year = value.split('-')[0];
                }
                break;
            default:
                break;
                
        }
        try {
            const response = await getInfoDashboards(localStorage.getItem('jwtToken'), day, month, year);
            setRevenueData(response.data.revenue);
            setListItems(response.data.cars);
        } catch (error) {
            toast.error('Error:', error);
        }
    };
    

    const labels = listItems.map(car => car.name);
    const data = listItems.map(car => ((car.revenue / revenueData) * 100).toFixed(2));
    const carRevenueData = {
        labels: labels,
        datasets: [{
            data: data,
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
            ],
            hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
            ]
        }]
    };
    
    

    const years = [];
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= 2020; i--) {
        years.push(i);
    }

    return (
        <section className={styles.dashboard}>
            <div className={styles.options}>
                <div>
                    <input type="radio" id="day" name="option" value="day" checked={selectedOption === 'day'} onChange={handleOptionChange} />
                    <label htmlFor="day">Ngày</label>
                </div>
                <div>
                    <input type="radio" id="month" name="option" value="month" checked={selectedOption === 'month'} onChange={handleOptionChange} />
                    <label htmlFor="month">Tháng</label>
                </div>
                <div>
                    <input type="radio" id="year" name="option" value="year" checked={selectedOption === 'year'} onChange={handleOptionChange} />
                    <label htmlFor="year">Năm</label>
                </div>
            </div>
            {selectedOption === 'day' && (
                <div className={styles.datePicker}>
                    <label htmlFor="date">Chọn ngày:</label>
                    <input type="date" id="date" name="date" value={selectedDay} onChange={handleDateChange} />
                </div>
            )}
            {selectedOption === 'month' && (
                <div className={styles.datePicker}>
                    <label htmlFor="month">Chọn tháng:</label>
                    <input type="month" id="month" name="month" value={selectedMonth} onChange={handleMonthChange} />
                </div>
            )}
            {selectedOption === 'year' && (
                <div className={styles.datePicker}>
                    <label htmlFor="year">Chọn năm:</label>
                    <select id="year" name="year" value={selectedYear} onChange={handleYearChange}>
                        {years.map((year, index) => (
                            <option key={index} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
            )}
            <div className={styles.dash_content}>
                <i className="uil uil-document-layout-left"></i>
                <span className="text">Doanh thu ...</span>
                <span className="number">{revenueData}</span>
            </div>
            <div className={`${styles.revenue_car_chart} ${styles.dash_content}`}>
                <Pie data={carRevenueData} />
            </div>
            <div className={styles.dash_content}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên</th>
                            <th>Doanh thu</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listItems.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.revenue.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </section>
    );
}

export default Dashboard;
