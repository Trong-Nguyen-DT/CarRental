
import { useState } from "react";
import styles from "./CustomerDetail.module.css";
import { Button, Form, Modal } from "react-bootstrap";
import { updateImage } from "../../services/UserService";

const ImageCustomerUpdate = ({ customer, changeFlag, setChangeFlag }) => {

    const [showModal, setShowModal] = useState(false);
    const [citizenIdFrontImage, setCitizenIdFrontImage] = useState(null);
    const [showCitizenIdFrontImage, setShowCitizenIdFrontImage] = useState(customer.citizenIdFront || null);
    const [citizenIdBackImage, setCitizenIdBackImage] = useState(null);
    const [showCitizenIdBackImage, setShowCitizenIdBackImage] = useState(customer.citizenIdFront || null);
    const [driverLicenseFrontImage, setDriverLicenseFrontImage] = useState(null);
    const [showDriverLicenseFrontImage, setShowDriverLicenseFrontImage] = useState(customer.citizenIdFront || null);
    const [driverLicenseBackImage, setDriverLicenseBackImage] = useState(null);
    const [showDriverLicenseBackImage, setShowDriverLicenseBackImage] = useState(customer.citizenIdFront || null);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleCitizenIdFrontChange = (event) => {
        const file = event.target.files[0];
        setCitizenIdFrontImage(file);
        setShowCitizenIdFrontImage(URL.createObjectURL(file));
    };

    const handleCitizenIdBackChange = (event) => {
        const file = event.target.files[0];
        setCitizenIdFrontImage(file);
        setShowCitizenIdBackImage(URL.createObjectURL(file));
    };

    const handleDriverLicenseFrontChange = (event) => {
        const file = event.target.files[0];
        setCitizenIdFrontImage(file);
        setShowCitizenIdFrontImage(URL.createObjectURL(file));
    };

    const handleDriverLicenseBackChange = (event) => {
        const file = event.target.files[0];
        setCitizenIdFrontImage(file);
        setShowCitizenIdBackImage(URL.createObjectURL(file));
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("id", customer.id);
        if (citizenIdFrontImage) {
            formData.append("citizenIdFront", citizenIdFrontImage);
        }
        if (citizenIdBackImage) {
            formData.append("citizenIdBack", citizenIdBackImage);
        }
        if (driverLicenseFrontImage) {
            formData.append("driverLicenseFront", driverLicenseFrontImage);
        }
        if (driverLicenseBackImage) {
            formData.append("driverLicenseBack", driverLicenseBackImage);
        }

        try {
            const response = await updateImage(localStorage.getItem("jwtToken"), formData);
            console.log('Response from updateImage API:', response);
            setShowModal(false);
            setChangeFlag(!changeFlag);
        } catch (error) {
            console.error('Error updating customer image:', error);
            // Xử lý lỗi
        }
    };

    return (
        <>
            <Button variant="secondary" onClick={handleShowModal} className={styles.btnUpdateImage}>
                <i className="uil uil-pen" style={{ fontSize: '24pt' }}></i>
            </Button>
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton style={{backgroundColor: 'gray'}}>
                    <Modal.Title>Cập nhật ảnh của khách hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="citizenIdFront">
                            <Form.Label>Ảnh mặt trước căn cước công dân</Form.Label>
                            {showCitizenIdFrontImage && (
                                <img src={showCitizenIdFrontImage} alt="Ảnh mặt trước căn cước công dân" style={{ marginBottom: 10, maxWidth: '100%', height: 'auto' }} />
                            )}
                            <Form.Control type="file" onChange={handleCitizenIdFrontChange} defaultValue={customer.citizenIdFront ? "" : null} />
                        </Form.Group>

                        <Form.Group controlId="citizenIdBack">
                            <Form.Label>Ảnh mặt sau căn cước công dân</Form.Label>
                            {showCitizenIdBackImage && (
                                <img src={showCitizenIdBackImage} alt="Ảnh mặt sau căn cước công dân" style={{ marginBottom: 10, maxWidth: '100%', height: 'auto' }} />
                            )}
                            <Form.Control type="file" onChange={handleCitizenIdBackChange} defaultValue={customer.citizenIdBack ? "" : null} />
                        </Form.Group>

                        <Form.Group controlId="driverLicenseFront">
                            <Form.Label>Ảnh mặt trước bằng lái</Form.Label>
                            {showDriverLicenseFrontImage && (
                                <img src={showDriverLicenseFrontImage} alt="Ảnh mặt trước bằng lái" style={{ marginBottom: 10, maxWidth: '100%', height: 'auto' }} />
                            )}
                            <Form.Control type="file" onChange={handleDriverLicenseFrontChange} defaultValue={customer.driverLicenseFront ? "" : null} />
                        </Form.Group>

                        <Form.Group controlId="driverLicenseBack">
                            <Form.Label>Ảnh mặt sau bằng lái</Form.Label>
                            {showDriverLicenseBackImage && (
                                <img src={showDriverLicenseBackImage} alt="Ảnh mặt sau bằng lái" style={{ marginBottom: 10, maxWidth: '100%', height: 'auto' }} />
                            )}
                            <Form.Control type="file" onChange={handleDriverLicenseBackChange} defaultValue={customer.driverLicenseBack ? "" : null} />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
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

export default ImageCustomerUpdate;