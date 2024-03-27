import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import styles from './CustomerDetail.module.css';
import CustomerUpdate from "./CustomerUpdate";
import { deleteCustomer, getAllHistoryByCustomer } from "../../services/UserService";
import { toast } from "react-toastify";

const CustomerDetail = ({ customer, handleClose, changeFlag, setChangeFlag }) => {

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [historyByCustomer, setHistoryByCustomer] = useState([]);
    const [revenue, setRevenue] = useState(0);
    const [showImageModal, SetShowImageModal] = useState(null);

    const handleCloseImageModal = () => {
        SetShowImageModal(false);
    };

    const handleShowImageModal = () => {
        SetShowImageModal(true);
    };

    const handleShowDeleteModal = () => {
        setShowDeleteModal(true);
    };

    useEffect(() => {
        getAllHistoryByCustomers();
    }, []);

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
    };

    const handleConfirmDelete = async () => {
        try {
            const response = await deleteCustomer(localStorage.getItem("jwtToken"), customer.id);
            console.log('Response from createCustomer API:', response);
        } catch (error) {
            for (let i = 0; i < error.response.data.message.length; i++) {
                toast.error(error.response.data.message[i].defaultMessage + '. Vui lòng nhập lại.');
            }
        }
        handleCloseDeleteModal();
        handleClose();
        changeFlag(true);
    };



    const getAllHistoryByCustomers = async () => {
        try {
            const response = await getAllHistoryByCustomer(localStorage.getItem("jwtToken"), customer.id);
            if (response.data) {
                setHistoryByCustomer(response.data.histories);
                setRevenue(response.data.revenue)
            } else {
                toast.error('Không có dữ liệu trả về từ API. Vui lòng thử lại.');
            }
        } catch (error) {
            console.error('Error:', error);
            for (let i = 0; i < error.response.data.message.length; i++) {
                toast.error(error.response.data.message[i].defaultMessage + '. Vui lòng thử lại.');
            }
        }
    };



    return (
        <>
            <Modal.Header closeButton style={{ backgroundColor: 'gray' }}>
                <Modal.Title style={{ fontSize: '20pt', color: 'white' }}>Thông tin khách hàng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={styles.customer}>
                    <div className={styles.infoCustomer}>
                        <div className="info">
                            <p><strong>Tên:</strong> {customer.name}</p>
                            <p><strong>SĐT:</strong> {customer.phone}</p>
                            <p><strong>CCCD:</strong> {customer.citizenId}</p>
                            <p><strong>Doanh thu từ khách:</strong> {revenue.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                        </div>
                        <div className={styles.history}>
                            <button onClick={handleShowImageModal}>
                                <i className="uil uil-info" style={{ fontSize: '24pt' }}></i>
                            </button>
                        </div>
                    </div>

                    <div className={styles.buttonUpdate_Delete}>
                        <CustomerUpdate customer={customer}
                            changeFlag={changeFlag}
                            setChangeFlag={setChangeFlag}
                        />
                        <Button className={styles.btnDelete} onClick={handleShowDeleteModal}>
                            Xóa
                        </Button>
                        <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
                            <Modal.Header closeButton>
                                <Modal.Title>Xác nhận xóa</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                Bạn có chắc chắn muốn xóa khách hàng này không?
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseDeleteModal}>
                                    Hủy
                                </Button>
                                <Button variant="danger" onClick={handleConfirmDelete}>
                                    Xóa
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>

                </div>
            </Modal.Body>

            <br />
            <br />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên Xe</th>
                        <th>Tên khách hàng</th>
                        <th>Tổng tiền</th>
                    </tr>
                </thead>
                <tbody>
                    {historyByCustomer.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.carName}</td>
                            <td>{item.customerName}</td>
                            <td>{item.totalRevenue.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showImageModal} onHide={handleCloseImageModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Hình ảnh khách hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={styles.photo}>
                        <label> Ảnh mặt trước CCCD</label>
                        <img src={customer.citizenIdFront} alt="" />

                        <label> Ảnh mặt sau CCCD</label>
                        <img src={customer.citizenIdBack} alt="" />

                        <label> Ảnh mặt trước bằng lái xe</label>
                        <img src={customer.driverLicenseFront} alt="" />

                        <label> Ảnh mặt sau bằng lái xe</label>
                        <img src={customer.driverLicenseBack} alt="" />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleCloseImageModal}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CustomerDetail;
