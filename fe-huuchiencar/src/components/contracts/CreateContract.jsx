import { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function CreateContract() {
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        phoneNumber: "",
        idCard: ""
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleShowCreateModal = () => {
        setShow(true);
    };

    const handleClose = () => {
        setShow(false);
    }
    return ( 
        <>
            <button onClick={handleShowCreateModal}>
                    <i className="uil uil-plus"></i>
            </button>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Tạo hợp đồng mới</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="name">
                            <Form.Label>Tên khách hàng</Form.Label>
                            <Form.Control type="text" name="name" placeholder="Nhập tên khách hàng" onChange={handleInputChange} />
                        </Form.Group>

                        <Form.Group controlId="phoneNumber">
                            <Form.Label>Số điện thoại</Form.Label>
                            <Form.Control type="text" name="phoneNumber" placeholder="Nhập số điện thoại" onChange={handleInputChange} />
                        </Form.Group>

                        <Form.Group controlId="idCard">
                            <Form.Label>Căn cước công dân</Form.Label>
                            <Form.Control type="text" name="idCard" placeholder="Nhập số căn cước công dân" onChange={handleInputChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
     );
}

export default CreateContract;