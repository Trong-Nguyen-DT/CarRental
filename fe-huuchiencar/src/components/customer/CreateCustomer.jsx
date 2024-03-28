import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { createCustomer, getAllCustomer } from "../../services/UserService";
import { toast } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const CreateCustomer = ({onCreateSuccess}) => {
    const [formData, setFormData] = useState({
        name: "",
        phoneNumber: "",
        idCard: "",
        idCardFrontImage: null,
        idCardBackImage: null,
        driverLicenseFrontImage: null,
        driverLicenseBackImage: null,
    });

    const [show, setShow] = useState(false);
    const [idCardFrontImage, setIdCardFrontImage] = useState(null);
    const [idCardBackImage, setIdCardBackImage] = useState(null);
    const [driverLicenseFrontImage, setDriverLicenseFrontImage] = useState(null);
    const [driverLicenseBackImage, setDriverLicenseBackImage] = useState(null);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleIdCardFrontChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setIdCardFrontImage(reader.result);
                setFormData({
                    ...formData,
                    idCardFrontImage: file,
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleIdCardBackChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setIdCardBackImage(reader.result);
                setFormData({
                    ...formData,
                    idCardBackImage: file,
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDriverLicenseFrontChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setDriverLicenseFrontImage(reader.result);
                setFormData({
                    ...formData,
                    driverLicenseFrontImage: file,
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDriverLicenseBackChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setDriverLicenseBackImage(reader.result);
                setFormData({
                    ...formData,
                    driverLicenseBackImage: file,
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        if (!formData.name || !formData.phoneNumber || !formData.idCard ||
            !formData.idCardFrontImage || !formData.idCardBackImage ||
            !formData.driverLicenseFrontImage || !formData.driverLicenseBackImage) {
            if (!formData.name) {
                toast.error("Tên không thể trống. Vui lòng nhập tên.");
            }
            if (!formData.phoneNumber) {
                toast.error("Số điện thoại không thể trống. Vui lòng nhập số điện thoại.");
            }
            if (!formData.idCard) {
                toast.error("Căn cước công dân không thể trống. Vui lòng nhập số căn cước công dân.");
            }

            // Ensure images are uploaded
            if (!formData.idCardFrontImage || !formData.idCardBackImage || !formData.driverLicenseFrontImage || !formData.driverLicenseBackImage) {
                toast.error("Vui lòng tải lên tất cả các ảnh cần thiết.");
            }
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("phone", formData.phoneNumber);
        formDataToSend.append("citizenId", formData.idCard);
        formDataToSend.append("citizenIdFront", formData.idCardFrontImage);
        formDataToSend.append("citizenIdBack", formData.idCardBackImage);
        formDataToSend.append("driverLicenseFront", formData.driverLicenseFrontImage);
        formDataToSend.append("driverLicenseBack", formData.driverLicenseBackImage);

        try {
            const response = await createCustomer(localStorage.getItem("jwtToken"), formDataToSend);
            console.log('Response from createCustomer API:', response);
            handleClose();
            onCreateSuccess();
        } catch (error) {
            for (let i = 0; i < error.response.data.message.length; i++) {
                toast.error(error.response.data.message[i].defaultMessage + '. Please try again.');
            }
        }

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
                <Modal.Header closeButton style={{backgroundColor: 'gray'}}>
                    <Modal.Title>Tạo khách hàng mới</Modal.Title>
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

                        <Form.Group controlId="idCardFront">
                            <Form.Label>Ảnh mặt trước căn cước công dân</Form.Label>
                            <Form.Control type="file" onChange={handleIdCardFrontChange} />
                            {idCardFrontImage && (
                                <img src={idCardFrontImage} alt="Ảnh mặt trước căn cước công dân" style={{ marginTop: 10, maxWidth: '100%', height: 'auto' }} />
                            )}
                        </Form.Group>

                        <Form.Group controlId="idCardBack">
                            <Form.Label>Ảnh mặt sau căn cước công dân</Form.Label>
                            <Form.Control type="file" onChange={handleIdCardBackChange} />
                            {idCardBackImage && (
                                <img src={idCardBackImage} alt="Ảnh mặt sau căn cước công dân" style={{ marginTop: 10, maxWidth: '100%', height: 'auto' }} />
                            )}
                        </Form.Group>

                        <Form.Group controlId="driverLicenseFront">
                            <Form.Label>Ảnh mặt trước bằng lái</Form.Label>
                            <Form.Control type="file" onChange={handleDriverLicenseFrontChange} />
                            {driverLicenseFrontImage && (
                                <img src={driverLicenseFrontImage} alt="Ảnh mặt trước bằng lái" style={{ marginTop: 10, maxWidth: '100%', height: 'auto' }} />
                            )}
                        </Form.Group>

                        <Form.Group controlId="driverLicenseBack">
                            <Form.Label>Ảnh mặt sau bằng lái</Form.Label>
                            <Form.Control type="file" onChange={handleDriverLicenseBackChange} />
                            {driverLicenseBackImage && (
                                <img src={driverLicenseBackImage} alt="Ảnh mặt sau bằng lái" style={{ marginTop: 10, maxWidth: '100%', height: 'auto' }} />
                            )}
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    <i className="uil uil-lock" style={{ fontSize: '24pt' }}></i>
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                    <i className="uil uil-bookmark" style={{ fontSize: '24pt' }}></i>
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CreateCustomer;
