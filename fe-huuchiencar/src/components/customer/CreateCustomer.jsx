import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const CreateCustomer = () => {

    const [show, setShow] = useState(true);
    const [idCardFrontImage, setIdCardFrontImage] = useState(null);
    const [idCardBackImage, setIdCardBackImage] = useState(null);
    const [driverLicenseFrontImage, setDriverLicenseFrontImage] = useState(null);
    const [driverLicenseBackImage, setDriverLicenseBackImage] = useState(null);


    const handleClose = () => setShow(false);

    const handleIdCardFrontChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setIdCardFrontImage(reader.result);
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
            };
            reader.readAsDataURL(file);
        };
    };
    return (
        <>
            <Modal show={show}>
                <Modal.Header closeButton>
                    <Modal.Title>Tạo khách hàng mới</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="name">
                            <Form.Label>Tên khách hàng</Form.Label>
                            <Form.Control type="text" placeholder="Nhập tên khách hàng" />
                        </Form.Group>

                        <Form.Group controlId="phoneNumber">
                            <Form.Label>Số điện thoại</Form.Label>
                            <Form.Control type="text" placeholder="Nhập số điện thoại" />
                        </Form.Group>

                        <Form.Group controlId="idCard">
                            <Form.Label>Căn cước công dân</Form.Label>
                            <Form.Control type="text" placeholder="Nhập số căn cước công dân" />
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
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Tạo khách hàng
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CreateCustomer;