import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import styles from "./ContractDetail.module.css";
import { updateContract } from "../../services/UserService";

const ContractUpdate = ({contract, changeFlag, setChangeFlag}) => {
    console.log(contract)

    const [showModal, setShowModal] = useState(false);
    const [startDate, setStartDate] = useState(contract.startDate);
    const [endDate, setEndDate] = useState(contract.endDate);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
        console.log(e.target.value)
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    const handleSubmit = async () => {
        const body = {
            id : contract.id,
           startDate : startDate,
           endDate : endDate
        }
        console.log("a: " ,body)
        try {
            const response = await updateContract
            (localStorage.getItem("jwtToken"), body);
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
                    <Modal.Title>Cập nhật hợp đồng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="startDate">
                            <Form.Label>Ngày thuê</Form.Label>
                            <Form.Control type="date" name="startDate" placeholder="Nhập tên xe" value={startDate} onChange={handleStartDateChange} />
                        </Form.Group>

                        <Form.Group controlId="endDate">
                            <Form.Label>Ngày trả xe</Form.Label>
                            <Form.Control type="date" name="endDate" placeholder="Nhập biển số" value={endDate} onChange={handleEndDateChange} />
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

export default ContractUpdate ;