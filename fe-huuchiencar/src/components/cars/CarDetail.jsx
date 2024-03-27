import { Button, Form, Modal } from "react-bootstrap";
import styles from './CarDetail.module.css';
import { useEffect, useState } from "react";
import { deleteCar, getAllCustomer, createOrder } from "../../services/UserService";
import { toast } from "react-toastify";
import CarUpdate from "./CarUpdate";
import Select from 'react-select';
import HistoryCar from "./HistoryCar";

const CarDetail = ({ car, handleClose, setChangeFlag, changeFlag, setSelectedCar }) => {

    const [customers, setCustomers] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState(car.status);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [customerId, setCustomerId] = useState(null);


    useEffect(() => {
        setSelectedStatus(car.status);
    }, [car.status]);

    useEffect(() => {
        if (car.information !== null && car.information.customer !== null) {
            setCustomerId(car.information.customer.id);
        }
        
    }, []);

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    };


    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        startDate: '',
        expectedDate: '',
        endDate: '',
        originalOdo: '',
        endedOdo: '',
        surcharge: 0,
        totalPrice: ''
    });

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        getAllCustomers();
    }, []);


    useEffect(() => {
        if (car.information && car.information.customer) {
            setSelectedCustomer({
                value: car.information.customer.id,
                label: car.information.customer.name
            });
        }
    }, [car.information]);

    useEffect(() => {
        if (car.information) {
            const { customer, startDate, expectedDate, endDate, originalOdo, endedOdo, carCost, surcharge, totalPrice } = car.information;
            setFormData({
                ...formData,
                name: customer ? customer.name : null,
                phone: customer ? customer.phone : null, 
                startDate: startDate || null,
                expectedDate: expectedDate || null,
                endDate: endDate || null,
                originalOdo: originalOdo || null,
                endedOdo: endedOdo || null,
                carCost: carCost || null,
                surcharge: surcharge || 0,
                totalPrice: totalPrice || null
            });
        }
    }, []);

    const getAllCustomers = async () => {
        try {
            const response = await getAllCustomer(localStorage.getItem('jwtToken'));
            setCustomers(response.data);
        } catch (error) {
            toast.error('Error:', error);
        }
    };

    const handleShowDeleteModal = () => {
        setShowDeleteModal(true);
    };


    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
    };

    const handleConfirmDelete = async () => {
        try {
            const response = await deleteCar(localStorage.getItem("jwtToken"), car.id);

        } catch (error) {
            for (let i = 0; i < error.response.data.message.length; i++) {
                toast.error(error.response.data.message[i].defaultMessage + '. Vui lòng nhập lại.');
            }
        }
        handleCloseDeleteModal();
        handleClose();
        setChangeFlag(true);
    };

    const handleSubmit = async () => {
        if (!customerId) {
            toast.error("Khách hàng không được để trống");
            return;
        }
        const convertEmptyToNull = (value) => {
            return value === "" || value === undefined ? null : value;
        };
    
        const body = {
            id: car.id,
            status: selectedStatus,
            customerId: customerId,
            info: selectedStatus !== 'INACTIVE' ? {
                startDate: convertEmptyToNull(formData.startDate),
                endDate: convertEmptyToNull(formData.endDate),
                originalOdo: convertEmptyToNull(formData.originalOdo),
                endedOdo: convertEmptyToNull(formData.endedOdo),
                carCost: convertEmptyToNull(formData.carCost),
                surcharge: convertEmptyToNull(formData.surcharge),
                totalPrice: convertEmptyToNull(formData.totalPrice)
            } : null 
        };
        try {
            const response = await createOrder(localStorage.getItem("jwtToken"), body);
            toast.success("Cập nhật thành công");
        } catch (error) {
            for (let i = 0; i < error.response.data.message.length; i++) {
                toast.error(error.response.data.message[i].defaultMessage + '. Vui lòng nhập lại.');
            }
        }
        if (changeFlag) {
            setChangeFlag(false);
        } else {
            setChangeFlag(true);
        }
        
    };

    

    const handleSelectCustomer = (selectedOption) => {
        if (selectedOption) {
            const selectedCustomerId = selectedOption.value;
            const selectedCustomerInfo = customers.find(customer => customer.id === selectedCustomerId);
            setCustomerId(selectedCustomerInfo.id);
            setSelectedCustomer(selectedOption);
            if (selectedCustomerInfo) {
                setFormData({
                    ...formData,
                    name: selectedCustomerInfo.name,
                    phone: selectedCustomerInfo.phone,
                });
            } else {
                setFormData({
                    ...formData,
                    name: '',
                    phone: '',
                });
            }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        let updatedFormData = {
            ...formData,
            [name]: value
        };
    
        if (name === 'carCost' || name === 'surcharge') {
            const carCost = parseFloat(updatedFormData.carCost) || 0; 
            const surcharge = parseFloat(updatedFormData.surcharge) || 0;
            const totalPrice = carCost + surcharge;
            updatedFormData = {
                ...updatedFormData,
                totalPrice: totalPrice
            };
        }
    
        setFormData(updatedFormData);
    };

    function validateInfo(formData) {
        const errors = [];
    
        if (!formData.startDate) {
            errors.push("Ngày nhận xe không được để trống");
        }
    
        if (!formData.originalOdo) {
            errors.push("Số kilomet bắt đầu không được để trống");
        }
    
        if (!formData.endedOdo) {
            errors.push("Số kilomet kết thúc không được để trống");
        }
        
        if (!formData.carCost) {
            errors.push("Chi phí xe không được để trống");
        }
    
        if (!formData.endDate) {
            errors.push("Ngày trả xe không được để trống");
        }
    
        return errors;
    }

    const handlePayment = async () => {
        const infoErrors = validateInfo(formData);
        if (infoErrors.length > 0) {
            infoErrors.forEach(error => toast.error(error));
            return;
        }

        const convertEmptyToNull = (value) => {
            return value === "" || value === undefined ? null : value;
        };
    
        const body = {
            id: car.id,
            status: "INACTIVE",
            customerId: customerId,
            info: selectedStatus !== 'INACTIVE' ? {
                startDate: convertEmptyToNull(formData.startDate),
                endDate: convertEmptyToNull(formData.endDate),
                originalOdo: convertEmptyToNull(formData.originalOdo),
                endedOdo: convertEmptyToNull(formData.endedOdo),
                carCost: convertEmptyToNull(formData.carCost),
                surcharge: convertEmptyToNull(formData.surcharge),
                totalPrice: convertEmptyToNull(formData.totalPrice)
            } : null 
        };
        try {
            const response = await createOrder(localStorage.getItem("jwtToken"), body);
            toast.success("Thanh toán thành công");
        } catch (error) {
            for (let i = 0; i < error.response.data.message.length; i++) {
                toast.error(error.response.data.message[i].defaultMessage + '. Vui lòng nhập lại.');
            }
        }
        if (changeFlag) {
            setChangeFlag(false);
        } else {
            setChangeFlag(true);
        }
        handleClose(true);
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
                                <p><strong>Giá:</strong> {car.rentCost.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} /ngày</p>
                                <p><strong>Biển số:</strong> {car.numberPlate}</p>
                            </div>
                            <div className={styles.history}>
                                <HistoryCar car={car} />
                            </div>
                        </div>

                        <div className={styles.buttonUpdate_Delete}>
                            <CarUpdate car={car}
                                changeFlag={changeFlag}
                                setChangeFlag={setChangeFlag}
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
                        <div className={styles.radio_status}>
                            <label>
                                <input
                                    type="radio"
                                    name="status"
                                    value="BOOKED"
                                    checked={selectedStatus === 'BOOKED'}
                                    onChange={handleStatusChange}
                                />
                                Đã đặt
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="status"
                                    value="ACTIVE"
                                    checked={selectedStatus === 'ACTIVE'}
                                    onChange={handleStatusChange}
                                />
                                Hoạt động
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="status"
                                    value="INACTIVE"
                                    checked={selectedStatus === 'INACTIVE'}
                                    onChange={handleStatusChange}
                                />
                                Trống
                            </label>
                        </div>

                        {selectedStatus === 'BOOKED' || selectedStatus === 'ACTIVE' ? (
                            <Form className={styles.formData}>
                                <Form.Group controlId="name">
                                        <Form.Label>Tên khách hàng</Form.Label>
                                        <Select
                                            options={customers.map(customer => ({ value: customer.id, label: customer.name }))}
                                            onChange={handleSelectCustomer}
                                            value={selectedCustomer}
                                            placeholder="Chọn khách hàng"
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="phone">
                                        <Form.Label>Số điện thoại </Form.Label>
                                        <Form.Control type="text" name="phone" placeholder="Nhập số điện thoại" value={formData.phone} />
                                    </Form.Group>
                                    <Form.Group controlId="startDate">
                                        <Form.Label>Ngày nhận xe </Form.Label>
                                        <Form.Control type="date" name="startDate" placeholder="Ngày nhận xe"
                                        value={formData.startDate}
                                        onChange={handleChange} />
                                    </Form.Group>

                                    <Form.Group controlId="endDate">
                                        <Form.Label>Ngày trả xe </Form.Label>
                                        <Form.Control type="date" name="endDate" placeholder="Ngày trả xe"
                                        value={formData.endDate}
                                        onChange={handleChange} />
                                    </Form.Group>

                                    <Form.Group controlId="originalOdo">
                                        <Form.Label>Số kilomet bắt đầu (km)</Form.Label>
                                        <Form.Control type="text" name="originalOdo" placeholder="0"
                                        value={formData.originalOdo}
                                        onChange={handleChange} />
                                    </Form.Group>

                                    <Form.Group controlId="endedOdo">
                                        <Form.Label>Số kilomet kêt thúc(km)</Form.Label>
                                        <Form.Control type="text" name="endedOdo" placeholder="0"
                                        value={formData.endedOdo}
                                        onChange={handleChange} />
                                    </Form.Group>

                                    <span>Đã đi hết: {formData.endedOdo - formData.originalOdo} km</span>

                                    <Form.Group controlId="carCost">
                                        <Form.Label>Chi phí xe</Form.Label>
                                        <Form.Control type="text" name="carCost" placeholder="0"
                                        value={formData.carCost}
                                        onChange={handleChange} />
                                    </Form.Group>

                                    <Form.Group controlId="surcharge">
                                        <Form.Label>Chi phí phát sinh</Form.Label>
                                        <Form.Control type="text" name="surcharge" placeholder="0"
                                        value={formData.surcharge}
                                        onChange={handleChange} />
                                    </Form.Group>

                                    <Form.Group controlId="totalPrice">
                                        <Form.Label>Tổng thanh toán</Form.Label>
                                        <Form.Control type="text" name="totalPrice" placeholder="0"
                                        value={formData.totalPrice}
                                        onChange={handleChange}
                                            readOnly />
                                    </Form.Group>
                            </Form>
                        ) : null}

                    </div >
                )}
            </Modal.Body >
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Lưu
                </Button>
            </Modal.Footer>
            {selectedStatus === "ACTIVE" ? (
                <button className={styles.payment} onClick={handlePayment}>Thanh toán</button>
            ) : null}
        </>
    );
}

export default CarDetail;
