import { useState } from "react";
import styles from "./CarDetail.module.css";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { updateCar } from "../../services/UserService";

const CarUpdate = ({car , changeFlag, setChangeFlag}) => {

    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState(car.name);
    const [numberPlate, setNumberPlate] = useState(car.numberPlate);
    const [rentCost, setRentCost] = useState(car.rentCost);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleNumberPlateChange = (e) => {
        setNumberPlate(e.target.value);
    };

    const handleRentCostChange = (e) => {
        setRentCost(e.target.value);
    };

    const handleSubmit = async () => {
        const body = {
            id : car.id,
            name : name,
            numberPlate : numberPlate,
            rentCost : rentCost
        }
        try {
            const response = await updateCar(localStorage.getItem("jwtToken"), body);
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
            <i className="uil uil-pen" style={{ fontSize: '24pt' }}></i>
            </Button>
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật xe</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="name">
                            <Form.Label>Tên xe</Form.Label>
                            <Form.Control type="text" name="name" placeholder="Nhập tên xe" value={name} onChange={handleNameChange} />
                        </Form.Group>

                        <Form.Group controlId="numberPlate">
                            <Form.Label>Biển số</Form.Label>
                            <Form.Control type="text" name="phone" placeholder="Nhập biển số" value={numberPlate} onChange={handleNumberPlateChange} />
                        </Form.Group>

                        <Form.Group controlId="rentCost">
                            <Form.Label>Gía xe</Form.Label>
                            <Form.Control type="text" name="phone" placeholder="Nhập giá xe" value={rentCost} onChange={handleRentCostChange} />
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

export default CarUpdate;