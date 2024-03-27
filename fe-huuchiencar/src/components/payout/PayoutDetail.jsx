import { Button, Modal } from "react-bootstrap";
import styles from './PayoutDetail.module.css'

const PayoutDetail = ({ payout, handleClose }) => {

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
                <Modal.Title style={{ fontSize: '20pt', color: 'white' }}>Thông tin chi tiêu</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={styles.content}>
                    <label>Xe: </label>
                    <span>{payout.carName}</span>
                </div>
                <div className={styles.content}>
                    <label>Khách hàng: </label>
                    <span>{payout.nameService}</span>
                </div>
                <div className={styles.content}>
                    <label>Ngày sử dụng: </label>
                    <span>{formatDate(payout.payDate)}</span>
                </div>
                <div className={styles.content}>
                    <label>Tổng tiền: </label>
                    <span>{payout.totalPay.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
            </Modal.Footer>
        </>
     );
}

export default PayoutDetail;