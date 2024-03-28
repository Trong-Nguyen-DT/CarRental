import { useEffect, useState } from 'react';
import styles from './History.module.css'
import { Modal, Table } from 'react-bootstrap';
import { getAllHistory } from '../../services/UserService';
import { toast } from 'react-toastify';
import HistoryDetail from './HistoryDetail';

function History() {
    const [searchText, setSearchText] = useState("");
    const [listItems, setListItems] = useState([]);
    const [originalList, setOriginalList] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectedHistory, setSelectedHistory] = useState(null);
    const [showHistoryDetailModal, setShowHistoryDetailModal] = useState(false);

    useEffect(() => {
        getAllHistories();
    }, []);

    useEffect(() => {
        handleSearchChange();
    }, [searchText, startDate, endDate]);

    const handleSearchChange = () => {
        let filteredHistories = originalList;
        // Filter by search text
        if (searchText.trim() !== "") {
            filteredHistories = filteredHistories.filter((history) =>
                history.carName.toLowerCase().includes(searchText.toLowerCase()) ||
                history.customerName.toLowerCase().includes(searchText.toLowerCase()) ||
                history.userName.toLowerCase().includes(searchText.toLowerCase())
            );
        }

        // Filter by date range
        if (startDate && endDate) {
            filteredHistories = filteredHistories.filter((history) =>
                new Date(history.dateTime) >= startDate && new Date(history.dateTime) <= endDate
            );
        }

        setListItems(filteredHistories);
    };

    const getAllHistories = async () => {
        try {
            const response = await getAllHistory(localStorage.getItem('jwtToken'));
            setListItems(response.data);
            setOriginalList(response.data);
        } catch (error) {
            toast.error('Error:', error);
        }
    };

    const handleHistoryClick = (history) => {
        setSelectedHistory(history);
        setShowHistoryDetailModal(true);
    };

    const handleCloseHistoryDetailModal = () => {
        setShowHistoryDetailModal(false);
    };

    return (
        <section className={styles.dashboard}>
            <div className={styles.top}>
                <div className={styles.search_box}>
                    <i className="uil uil-search"></i>
                    <input
                        type="text"
                        placeholder="Tìm kiếm"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>
            </div>
            <div className={styles.search_time}>
                <div className={styles.search_date}>
                    <label>Từ:</label>
                    <input
                        type="date"
                        value={startDate ? startDate.toISOString().split('T')[0] : ''}
                        onChange={(e) => setStartDate(new Date(e.target.value))}
                    />
                </div>
                <div className={styles.search_date}>
                    <label>Đến:</label>
                    <input
                        type="date"
                        value={endDate ? endDate.toISOString().split('T')[0] : ''}
                        onChange={(e) => setEndDate(new Date(e.target.value))}
                    />
                </div>
            </div>

            <div className={styles.dash_content}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên Xe</th>
                            <th>Tên khách</th>
                            <th>Tổng tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listItems.map((item, index) => (
                            <tr key={index} onClick={() => handleHistoryClick(item)}>
                                <td>{index + 1}</td>
                                <td>{item.carName}</td>
                                <td>{item.customerName}</td>
                                <td>{item.totalRevenue.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <Modal show={showHistoryDetailModal} onHide={handleCloseHistoryDetailModal}>
                <HistoryDetail
                            history={selectedHistory}
                            handleClose={handleCloseHistoryDetailModal}
                        />
            </Modal>
        </section>
    );
}

export default History;
