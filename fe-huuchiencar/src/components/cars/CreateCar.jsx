import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { createCar } from '../../services/UserService';
import { toast } from 'react-toastify';

const CreateCar = () => {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        numberPlate: '',
        odo: 0,
        rentCost: '',
        image: null
    });
    const [imagePreview, setImagePreview] = useState(null);

    const handleClose = () => {
        setShowModal(false);
        setImagePreview(null);
    };

    const handleShow = () => setShowModal(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'image') {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setFormData({ ...formData, [name]: file });
            };
            if (file) {
                reader.readAsDataURL(file);
            }
        } else {
            setFormData({ ...formData, [name]: name === 'rentCost' ? formatPrice(value) : value });
        }
    };

    const formatPrice = (price) => {
        return price.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const validateForm = () => {
        const errors = {};
    
        // Validate name
        if (!formData.name.trim()) {
            errors.name = 'Tên xe không được để trống';
        }
    
        // Validate numberPlate
        if (!formData.numberPlate.trim()) {
            errors.numberPlate = 'Biển số xe không được để trống';
        }
    
        // Validate odo
        if (!String(formData.odo).trim()) {
            errors.odo = 'Odo không được để trống';
        }
    
        // Validate rentCost
        if (!formData.rentCost.trim()) {
            errors.rentCost = 'Giá thuê không được để trống';
        }
    
        // Validate image
        if (!formData.image) {
            errors.image = 'Ảnh xe không được để trống';
        }
    
        return errors;
    };
    

    const handleSubmit = async () => {
        const errors = validateForm();
        
        if (Object.keys(errors).length === 0) {
            // Không có lỗi, tiếp tục gửi dữ liệu
            const rentCostLong = formData.rentCost.replace(/\./g, '');
            const formDataToSend = new FormData();
            formDataToSend.append("name", formData.name);
            formDataToSend.append("numberPlate", formData.numberPlate);
            formDataToSend.append("odo", formData.odo);
            formDataToSend.append("rentCost", rentCostLong);   
            formDataToSend.append("image", formData.image);
    
            try {
                const response = await createCar(localStorage.getItem("jwtToken"), formDataToSend);
                console.log('Response from createCustomer API:', response);
            } catch (error) {
                for (let i = 0; i < error.response.data.message.length; i++) {
                    toast.error(error.response.data.message[i].defaultMessage + '. Vui lòng nhập lại.');
                }
            }
            handleClose();
        } else {
            // Có lỗi, hiển thị thông báo lỗi
            Object.values(errors).forEach(errorMsg => {
                toast.error(errorMsg);
            });
        }
    };
    

    return (    
        <>
            <button onClick={handleShow}>
                    <i className="uil uil-plus"></i>
            </button>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Tạo xe mới</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formName">
                            <Form.Label>Tên xe</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập tên xe"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formNumberPlate">
                            <Form.Label>Biển số xe</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập biển số xe"
                                name="numberPlate"
                                value={formData.numberPlate}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formOdo">
                            <Form.Label>Odo đã chạy</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Nhập số odo"
                                name="odo"
                                value={formData.odo}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPricePerDay">
                            <Form.Label>Giá tiền thuê : ?/VNĐ</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập giá tiền"
                                name="rentCost"
                                value={formData.rentCost}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formImage">
                            <Form.Label>Ảnh xe</Form.Label>
                            <Form.Control
                                type="file"
                                name="image"
                                onChange={handleChange}
                            />
                        </Form.Group>
                        {imagePreview && (
                            <div>
                                <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%' }} />
                            </div>
                        )}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Tạo
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CreateCar;
