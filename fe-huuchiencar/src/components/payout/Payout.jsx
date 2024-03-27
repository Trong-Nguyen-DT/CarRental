import { useEffect, useState } from "react";
import styles from './Payout.module.css'
import { Table } from "react-bootstrap";
import { getAllPayouts } from "../../services/UserService";
import { toast } from "react-toastify";

const Payout = () => {

    const [searchText, setSearchText] = useState("");
    const [listItems, setListItems] = useState([]);
    const [originalList, setOriginalList] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        getAllPayout(); 
    }, []);

    useEffect(() => {
        handleSearchChange();
    }, [searchText, startDate, endDate]);

    const handleSearchChange = () => {
        let filterPayouts = originalList;
        // Filter by search text
        if (searchText.trim() !== "") {
            filterPayouts = filterPayouts.filter((payout) =>
                payout.carName.toLowerCase().includes(searchText.toLowerCase()) ||
                payout.customerName.toLowerCase().includes(searchText.toLowerCase()) ||
                payout.userName.toLowerCase().includes(searchText.toLowerCase())
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
            console.log(response.data);
        } catch (error) {
            toast.error('Error:', error);
        }
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
                            <th>Tên dịch vụ</th>
                            <th>Chi phí</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listItems.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.carName}</td>
                                <td>{item.nameService}</td>
                                <td>{item.totalPay.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </section>
    );
}

export default Payout;