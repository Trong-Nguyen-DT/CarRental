import { Button, Form, Modal } from "react-bootstrap";
import styles from "./CustomerDetail.module.css";
import { useState } from "react";
import { updateCustomer } from "../../services/UserService";
import { toast } from "react-toastify";


const CustomerUpdate = ({ customer, changeFlag, setChangeFlag }) => {
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState(customer.name);
    const [phone, setPhone] = useState(customer.phone);
    

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    const handleSubmit = async () => {
        const body = {
            id : customer.id,
            name : name,
            phone : phone
        }
        try {
            const response = await updateCustomer(localStorage.getItem("jwtToken"), body);
            console.log('Response from createCustomer API:', response);
        } catch (error) {
            for (let i = 0; i < error.response.data.message.length; i++) {
                toast.error(error.response.data.message[i].defaultMessage + '. Vui lòng nhập lại.');
            }
        }
        setShowModal(false);
        if (changeFlag) {
            setChangeFlag(false);
        } else {
            setChangeFlag(true);
        }
    };


    return (
        <>
            <Button variant="secondary" onClick={handleShowModal} className={styles.btnUpdate}>
                Cập nhật
            </Button>
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật khách hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                    <Form.Group controlId="name">
                            <Form.Label>Tên khách hàng</Form.Label>
                            <Form.Control type="text" name="name" placeholder="Nhập tên khách hàng" value={name} onChange={handleNameChange} />
                        </Form.Group>

                        <Form.Group controlId="phoneNumber">
                            <Form.Label>Số điện thoại</Form.Label>
                            <Form.Control type="text" name="phone" placeholder="Nhập số điện thoại" value={phone} onChange={handlePhoneChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CustomerUpdate;