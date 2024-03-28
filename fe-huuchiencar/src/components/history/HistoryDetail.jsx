import { Button, Modal } from "react-bootstrap";
import styles from './HistoryDetail.module.css'

const HistoryDetail = ({ history, handleClose }) => {

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }

    return (
        <>
            <Modal.Header closeButton style={{ backgroundColor: 'gray' }}>
                <Modal.Title style={{ fontSize: '20pt', color: 'white' }}>Thông tin đơn hàng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={styles.history}>
                    <div className={styles.content}>
                        <label>Xe: </label>
                        <span>{history.carName}</span>
                    </div>
                    <div className={styles.content}>
                        <label>Khách hàng: </label>
                        <span>{history.customerName}</span>
                    </div>
                    <div className={styles.content}>
                        <label>Nhân viên: </label>
                        <span>{history.userName}</span>
                    </div>
                    <div className={styles.content}>
                        <label>Ngày thanh toán: </label>
                        <span>{formatDate(history.dateTime)}</span>
                    </div>
                    <div className={styles.content}>
                        <label>Chi phí xe: </label>
                        <span>{history.carCost.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                    </div>
                    <div className={styles.content}>
                        <label>Chi phí phụ: </label>
                        <span>{history.surcharge.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                    </div>
                    <div className={styles.content}>
                        <label>Tổng tiền: </label>
                        <span>{history.totalRevenue.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                    </div>
                </div>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                <i className="uil uil-lock" style={{ fontSize: '24pt' }}></i>
                </Button>
            </Modal.Footer>
        </>
    );
}

export default HistoryDetail;