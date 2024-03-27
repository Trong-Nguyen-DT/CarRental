import { useEffect, useState } from "react";
import styles from './Payout.module.css'
import { Modal, Table } from "react-bootstrap";
import { getAllPayouts } from "../../services/UserService";
import { toast } from "react-toastify";
import CreatePayout from "./CreatePayout";
import PayoutDetail from "./PayoutDetail";

const Payout = () => {

    const [searchText, setSearchText] = useState("");
    const [listItems, setListItems] = useState([]);
    const [originalList, setOriginalList] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [changeFlag, setChangeFlag] = useState(false);
    const [selectedPayout, setSelectedPayout] = useState(null);
    const [showPayoutDetailModal, setShowPayoutDetailModal] = useState(false);


    useEffect(() => {
        getAllPayout(); 
    }, [changeFlag]);

    useEffect(() => {
        handleSearchChange();
    }, [searchText, startDate, endDate]);

    const handleSearchChange = () => {
        let filterPayouts = originalList;
        // Filter by search text
        if (searchText.trim() !== "") {
            filterPayouts = filterPayouts.filter((payout) =>
                payout.carName.toLowerCase().includes(searchText.toLowerCase()) ||
                payout.nameService.toLowerCase().includes(searchText.toLowerCase())
            );
        }

        // Filter by date range
        if (startDate && endDate) {
            filterPayouts = filterPayouts.filter((payout) =>
                new Date(payout.payDate) >= startDate && new Date(payout.payDate) <= endDate
            );
        }

        setListItems(filterPayouts);
    };

    const getAllPayout = async () => {
        try {
            const response = await getAllPayouts(localStorage.getItem('jwtToken'));
            setListItems(response.data);
            setOriginalList(response.data);
        } catch (error) {
            toast.error('Error:', error);
        }
    };

    const handlePayoutClick = (payout) => {
        setSelectedPayout(payout);
        setShowPayoutDetailModal(true);
    };

    const handleClosePayoutDetailModal = () => {
        setShowPayoutDetailModal(false);
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
                <CreatePayout
                    changeFlags={changeFlag}
                    setChangeFlag={setChangeFlag}
                />
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
                            <th>Tên dịch vụ</th>
                            <th>Chi phí</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listItems.map((item, index) => (
                            <tr key={index} onClick={() => handlePayoutClick(item)}>
                                <td>{index + 1}</td>
                                <td>{item.carName}</td>
                                <td>{item.nameService}</td>
                                <td>{item.totalPay.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <Modal show={showPayoutDetailModal} onHide={handleClosePayoutDetailModal}>
                <PayoutDetail
                            payout={selectedPayout}
                            handleClose={handleClosePayoutDetailModal}
                        />
            </Modal>
        </section>
    );
}

export default Payout;