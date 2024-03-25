import { Button, Form, Modal } from "react-bootstrap";
import styles from './CarDetail.module.css';
import { useState } from "react";
import { deleteCar } from "../../services/UserService";
import { toast } from "react-toastify";
import CarUpdate from "./CarUpdate";

const CarDetail = ({ car, handleClose, changeFlag }) => {

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showOrderModal, setShow] = useState(false);

    const handleShowDeleteModal = () => {
        setShowDeleteModal(true);
    };

    const handleShowOrderModal = () => {
        setShow(true);
    };

    const handleOrderClose = () => {
        setShow(false);
    }

    const handleOrderSubmit = async () => {
        const formDataToSend = new FormData();
        // formDataToSend.append("name", formData.name);
        // formDataToSend.append("phone", formData.phoneNumber);
        // formDataToSend.append("origi", formData.idCard);
        // formDataToSend.append("citizenIdFront", formData.idCardFrontImage);
        // formDataToSend.append("citizenIdBack", formData.idCardBackImage);
        // formDataToSend.append("driverLicenseFront", formData.driverLicenseFrontImage);
        // formDataToSend.append("driverLicenseBack", formData.driverLicenseBackImage);

        // try {
        //     const response = await createCustomer(localStorage.getItem("jwtToken"), formDataToSend);
        //     console.log('Response from createCustomer API:', response);
        // } catch (error) {
        //     for (let i = 0; i < error.response.data.message.length; i++) {
        //         toast.error(error.response.data.message[i].defaultMessage + '. Please try again.');
        //     }
        // }
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
    };

    const handleConfirmDelete = async () => {
        try {
            const response = await deleteCar(localStorage.getItem("jwtToken"), car.id);
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
                <Modal.Title style={{ fontSize: '20pt', color: 'white' }}>Thông tin xe</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {car && (
                    <div className={styles.car}>
                        <div className={styles.infoCar}>
                            <div className={styles.info}>
                                <p><strong>Tên xe:</strong> {car.name}</p>
                                <p><strong>Giá:</strong> {car.rentCost} VNĐ/ngày</p>
                                <p><strong>Biển số:</strong> {car.numberPlate}</p>
                            </div>
                            <div className={styles.history}>
                                <button>
                                    <i className="uil uil-history" style={{ fontSize: '24pt' }}></i>
                                </button>
                                <button onClick={handleShowOrderModal}>
                                    {car.status && (
                                        <>
                                            {car.status === "INACTIVE" && (
                                                <>
                                                    <button>
                                                        <i className="uil uil-user-plus" style={{ fontSize: '24pt' }}></i>
                                                    </button>
                                                </>
                                            )
                                            }

                                            {car.status === "ACTIVE" && (
                                                <button >
                                                    <i className="uil uil-bill" style={{ fontSize: '24pt' }}></i>
                                                </button>
                                            )}

                                            {car.status === "BOOKED" && (
                                                <button>
                                                    <i className="uil uil-notes" style={{ fontSize: '24pt' }}></i>
                                                </button>
                                            )}
                                        </>
                                    )}
                                    <Modal show={showOrderModal} onHide={handleOrderClose} centered>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Tạo khách hàng mới</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleOrderClose}>
                                                Đóng
                                            </Button>
                                            <Button variant="primary">
                                                Tạo khách hàng
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>

                                </button>
                            </div>
                        </div>

                        <div className={styles.buttonUpdate_Delete}>
                            <CarUpdate car={car}
                                changeFlag={changeFlag}
                            />
                            <Button className={styles.btnDelete} onClick={handleShowDeleteModal}>
                                <i className="uil uil-trash" style={{ fontSize: '24pt' }}></i>
                            </Button>
                            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
                                <Modal.Header closeButton>
                                    <Modal.Title>Xác nhận xóa</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    Bạn có chắc chắn muốn xóa xe này không?
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
                        <div className={styles.infoCustomer}>
                            {/* Hiển thị thông tin khách hàng nếu có */}
                            {car.customer && (
                                <div>
                                    <p><strong>Khách hàng: </strong>{car.customer.name}</p>
                                    <p><strong>SĐT:</strong> {car.customer.phone}</p>
                                </div>
                            )}
                        </div>

                        <div className={styles.photo}>
                            <img src={car.image} alt="" />
                        </div>
                    </div>
                )}
            </Modal.Body>
        </>
    );
}

export default CarDetail;