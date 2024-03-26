import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import styles from './CustomerDetail.module.css';
import CustomerUpdate from "./CustomerUpdate";
import { deleteCustomer } from "../../services/UserService";
import { toast } from "react-toastify";
import HistoryCustomer from "./HistoryCustomer";

const CustomerDetail = ({ customer, handleClose, changeFlag }) => {

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleShowDeleteModal = () => {
        setShowDeleteModal(true);
    };

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
                            <p><strong>Số điện thoại:</strong> {customer.phone}</p>
                            <p><strong>CCCD:</strong> {customer.citizenId}</p>
                        </div>
                        <div className={styles.history}>
                           <HistoryCustomer customer={customer}/>
                        </div>
                    </div>

                    <div className={styles.buttonUpdate_Delete}>
                        <CustomerUpdate customer={customer}
                            changeFlag={changeFlag}
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

                </div>
            </Modal.Body>
            <Modal.Footer>
                {/* <Button>
                    Xóa
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button> */}
            </Modal.Footer>
        </>
    );
}

export default CustomerDetail;
