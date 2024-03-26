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
    const [orderResponse, setOrderResponse] = useState(car);

    const [formData, setFormData] = useState({
        name: '',
        startDate: '',
        expectedDate: '',
        endDate: '',
        originalOdo: '',
        endedOdo: '',
        surcharge: '',
        totalPrice: ''
    });

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showOrderModal, setShowOderModal] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    useEffect(() => {
        getAllCustomers();
    }, [showOrderModal]);

    useEffect(() => {
        setSelectedCar(orderResponse);
    }, [orderResponse]);

    const getAllCustomers = async () => {
        try {
            const response = await getAllCustomer(localStorage.getItem('jwtToken'));
            setCustomers(response.data);
        } catch (error) {
            toast.error('Error:', error);
        }
    };

    const handleShowOrderModal = () => {
        // Nếu status là INACTIVE, mở modal để hiển thị form
        if (car.status === 'INACTIVE') {
            setShowOderModal(true);
        } else {
            // Nếu status không phải INACTIVE, hiển thị form trực tiếp ở class form
            setShowOderModal(false);
        }
    };

    const handleCustomerChange = (selectedOption) => {
        if (selectedOption) {
            // Truy cập giá trị của lựa chọn được chọn
            const selectedCustomerId = selectedOption.value;
            // Tiếp tục xử lý dựa trên selectedCustomerId
            const selectedCustomerInfo = customers.find(customer => customer.id === selectedCustomerId);
            // Cập nhật giá trị của state selectedCustomer
            setSelectedCustomer(selectedCustomerInfo);
            // Kiểm tra xem selectedCustomerInfo có tồn tại không trước khi cập nhật formData
            if (selectedCustomerInfo) {
                // Cập nhật giá trị số điện thoại trong state formData nếu selectedCustomerInfo tồn tại
                setFormData({
                    ...formData,
                    phone: selectedCustomerInfo.phone,
                });
            } else {
                // Nếu không có khách hàng nào được chọn, đặt giá trị phone trong formData thành ''
                setFormData({
                    ...formData,
                    phone: '',
                });
            }
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleShowDeleteModal = () => {
        setShowDeleteModal(true);
    };


    const handleCloseOrderModal = () => {
        setShowOderModal(false);
    }

    const handleOrderSubmitBooked = async () => {
        const body = {
            id: car.id,
            status: 'BOOKED',
            customerId: selectedCustomer.id,
            info: {
                startDate: formData.startDate,
                expectedDate: formData.expectedDate,
                originalOdo: formData.originalOdo !== '' ? formData.originalOdo : null,
                endedOdo: formData.originalOdo !== '' ? formData.endedOdo : null,
                surcharge: formData.originalOdo !== '' ? formData.surcharge : null,
                totalPrice: formData.originalOdo !== '' ? formData.totalPrice : null,
                endDate: formData.originalOdo === '' ? formData.endDate : null
            }
        };

        try {
            const response = await createOrder(localStorage.getItem("jwtToken"), body);
            // Kiểm tra response.data trước khi cập nhật orderResponse
            if (response.data) {
                console.log("re: " + response.data)
                setOrderResponse(response.data);
            } else {
                console.error('Response data is invalid:', response);
                toast.error('Không có dữ liệu trả về từ API. Vui lòng thử lại.');
            }
            console.log('Response from createOrder API:', response);
        } catch (error) {
            console.error('Error:', error);
            for (let i = 0; i < error.response.data.message.length; i++) {
                toast.error(error.response.data.message[i].defaultMessage + '. Vui lòng thử lại.');
            }
        }
        setShowOderModal(false);
        setChangeFlag(true);
    };

    const handleUpdateInfo = async () => {
        const body = {
            id: car.id,
            status: orderResponse.status,
            customerId: orderResponse.information.customer.id,
            info: {
                startDate: orderResponse.information.startDate,
                expectedDate: orderResponse.information.expectedDate,
                originalOdo: orderResponse.information.originalOdo,
                endedOdo: orderResponse.information.endedOdo,
                surcharge: orderResponse.information.surcharge,
                totalPrice: orderResponse.information.totalPrice,
                endDate: orderResponse.information.endDate
            }
        };

        try {
            const response = await createOrder(localStorage.getItem("jwtToken"), body);
            if (response.data) {
                console.log("re: " + response.data)
                setOrderResponse(response.data);
                toast.success("Cập nhật thành công");
            } else {
                console.error('Response data is invalid:', response);
                toast.error('Không có dữ liệu trả về từ API. Vui lòng thử lại.');
            }
            console.log('Response from createOrder API:', response);
        } catch (error) {
            console.error('Error:', error);
            for (let i = 0; i < error.response.data.message.length; i++) {
                toast.error(error.response.data.message[i].defaultMessage + '. Vui lòng thử lại.');
            }
        }

        if (changeFlag) {
            setChangeFlag(false);
        } else {
            setChangeFlag(true);
        }
    };

    const handleOrderSubmitActive = async () => {
        const body = {
            id: car.id,
            status: 'ACTIVE',
            customerId: orderResponse.information.customer.id,
            info: {
                startDate: orderResponse.information.startDate,
                expectedDate: orderResponse.information.expectedDate,
                originalOdo: orderResponse.information.originalOdo,
                endedOdo: orderResponse.information.endedOdo,
                surcharge: orderResponse.information.surcharge,
                totalPrice: orderResponse.information.totalPrice,
                endDate: orderResponse.information.endDate
            }
        };

        try {
            const response = await createOrder(localStorage.getItem("jwtToken"), body);
            if (response.data) {
                console.log("re: " + response.data)
                setOrderResponse(response.data);
                toast.success("Bắt đàu hoạt động thành công");
            } else {
                console.error('Response data is invalid:', response);
                toast.error('Không có dữ liệu trả về từ API. Vui lòng thử lại.');
            }
            console.log('Response from createOrder API:', response);
        } catch (error) {
            console.error('Error:', error);
            for (let i = 0; i < error.response.data.message.length; i++) {
                toast.error(error.response.data.message[i].defaultMessage + '. Vui lòng thử lại.');
            }
        }

        if (changeFlag) {
            setChangeFlag(false);
        } else {
            setChangeFlag(true);
        }

    };

    const handleOrderSubmitCancel = async () => {
        const body = {
            id: car.id,
            status: 'INACTIVE'
        };

        try {
            const response = await createOrder(localStorage.getItem("jwtToken"), body);
            if (response.data) {
                console.log("re: " + response.data)
                toast.success("Hủy thành công");
            } else {
                console.error('Response data is invalid:', response);
                toast.error('Không có dữ liệu trả về từ API. Vui lòng thử lại.');
            }
            console.log('Response from createOrder API:', response);
        } catch (error) {
            console.error('Error:', error);
            for (let i = 0; i < error.response.data.message.length; i++) {
                toast.error(error.response.data.message[i].defaultMessage + '. Vui lòng thử lại.');
            }
        }

        if (changeFlag) {
            setChangeFlag(false);
        } else {
            setChangeFlag(true);
        }
        handleClose();
    };

    const handleOrderSubmitInActive = async () => {
        const infoErrors = validateInfo(orderResponse.information);
        if (infoErrors.length > 0) {
            // Nếu có lỗi, hiển thị thông báo lỗi và không gọi API
            infoErrors.forEach(error => toast.error(error));
            return;
        }
        const body = {
            id: car.id,
            status: 'INACTIVE',
            customerId: orderResponse.information.customer.id,
            info: {
                startDate: orderResponse.information.startDate,
                expectedDate: orderResponse.information.expectedDate,
                originalOdo: orderResponse.information.originalOdo,
                endedOdo: orderResponse.information.endedOdo,
                surcharge: orderResponse.information.surcharge,
                totalPrice: orderResponse.information.totalPrice,
                endDate: orderResponse.information.endDate
            }
        };

        try {
            const response = await createOrder(localStorage.getItem("jwtToken"), body);
            if (response.data) {
                console.log("re: " + response.data)
                setOrderResponse(response.data);
                toast.success("Thanh toán thành công");
            } else {
                toast.error('Không có dữ liệu trả về từ API. Vui lòng thử lại.');
            }
            console.log('Response from createOrder API:', response);
        } catch (error) {
            console.error('Error:', error);
            for (let i = 0; i < error.response.data.message.length; i++) {
                toast.error(error.response.data.message[i].defaultMessage + '. Vui lòng thử lại.');
            }
        }

        if (changeFlag) {
            setChangeFlag(false);
        } else {
            setChangeFlag(true);
        }
        setOrderResponse(null);
        handleClose();

    };

    function validateInfo(info) {
        const errors = [];
    
        if (!info.startDate) {
            errors.push("Ngày nhận xe không được để trống");
        }
    
        if (!info.expectedDate) {
            errors.push("Ngày dự kiến trả xe không được để trống");
        }
    
        if (!info.originalOdo) {
            errors.push("Số kilomet bắt đầu không được để trống");
        }
    
        if (!info.endedOdo) {
            errors.push("Số kilomet kết thúc không được để trống");
        }
    
        if (!info.surcharge) {
            errors.push("Chi phí phát sinh không được để trống");
        }
    
        if (!info.totalPrice) {
            errors.push("Tổng thanh toán không được để trống");
        }
    
        if (!info.endDate) {
            errors.push("Ngày trả xe không được để trống");
        }
    
        return errors;
    }
    

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
        changeFlag(true);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setOrderResponse(prevState => ({
            ...prevState,
            information: {
                ...prevState.information,
                [name]: value
            }
        }));
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
                                <HistoryCar car={car}/>
                                {car.status && (
                                    <>
                                        {car.status === "INACTIVE" && (
                                            <>
                                                <button onClick={handleShowOrderModal}>
                                                    <i className="uil uil-user-plus" style={{ fontSize: '24pt' }}></i>
                                                </button>
                                            </>
                                        )
                                        }

                                        {car.status === "ACTIVE" && (
                                            <button onClick={handleOrderSubmitInActive}>
                                                <i className="uil uil-bill" style={{ fontSize: '24pt' }}></i>
                                            </button>
                                        )}

                                        {car.status === "BOOKED" && (
                                            <><button onClick={handleOrderSubmitActive}>
                                                <i className="uil uil-notes" style={{ fontSize: '24pt' }}></i>
                                            </button>
                                            <button onClick={handleOrderSubmitCancel}>
                                                <i className="uil uil-cancel" style={{ fontSize: '24pt' }}></i>
                                            </button></>
                                        )}
                                    </>
                                )}
                                {
                                    showOrderModal && car.status === 'INACTIVE' && (
                                        <Modal show={showOrderModal} onHide={handleCloseOrderModal} centered>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Đặt lịch</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <Form>
                                                    <Form.Group controlId="name">
                                                        <Form.Label>Tên khách hàng</Form.Label>
                                                        <Select
                                                            options={customers.map(customer => ({ value: customer.id, label: customer.name }))}
                                                            onChange={handleCustomerChange}
                                                            placeholder="Chọn khách hàng"
                                                        />
                                                    </Form.Group>


                                                    <Form.Group controlId="phone">
                                                        <Form.Label>Số điện thoại </Form.Label>
                                                        <Form.Control type="text" name="phone" placeholder="Nhập số điện thoại" value={formData.phone} onChange={handleCustomerChange} />
                                                    </Form.Group>

                                                    <Form.Group controlId="startDate">
                                                        <Form.Label>Ngày nhận xe </Form.Label>
                                                        <Form.Control type="date" name="startDate" onChange={handleInputChange} />
                                                    </Form.Group>

                                                    <Form.Group controlId="expectedDate">
                                                        <Form.Label>Ngày dự kiến trả xe </Form.Label>
                                                        <Form.Control type="date" name="expectedDate" placeholder="Ngày nhận xe" onChange={handleInputChange} />
                                                    </Form.Group>


                                                    <Form.Group controlId="endDate">
                                                        <Form.Label>Ngày trả xe </Form.Label>
                                                        <Form.Control type="date" name="endDate" placeholder="Ngày trả xe" onChange={handleInputChange} />
                                                    </Form.Group>

                                                    <Form.Group controlId="originalOdo">
                                                        <Form.Label>Số kilomet bắt đầu (km)</Form.Label>
                                                        <Form.Control type="text" name="originalOdo" placeholder="0" onChange={handleInputChange} />
                                                    </Form.Group>

                                                    <Form.Group controlId="endedOdo">
                                                        <Form.Label>Số kilomet kêt thúc(km)</Form.Label>
                                                        <Form.Control type="text" name="endedOdo" placeholder="0" onChange={handleInputChange} />
                                                    </Form.Group>


                                                    <Form.Group controlId="surcharge">
                                                        <Form.Label>Chi phí phát sinh</Form.Label>
                                                        <Form.Control type="text" name="surcharge" placeholder="0" onChange={handleInputChange} />
                                                    </Form.Group>

                                                    <Form.Group controlId="totalPrice">
                                                        <Form.Label>Tổng thanh toán</Form.Label>
                                                        <Form.Control type="text" name="totalPrice" placeholder="0" onChange={handleInputChange} />
                                                    </Form.Group>
                                                </Form>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleCloseOrderModal}>
                                                    Đóng
                                                </Button>
                                                <Button variant="primary" onClick={handleOrderSubmitBooked}>
                                                    Lưu
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                    )}
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
                        {car.status === 'INACTIVE' ? (
                            <button onClick={handleShowOrderModal}>
                                <i className="uil uil-notes" style={{ fontSize: '24pt' }}></i>
                            </button>
                        ) : (
                            orderResponse && (
                                <div className="form">
                                    <Form>
                                        <Form.Group controlId="customerId" style={{ display: 'none' }}>
                                            <Form.Control type="text" name="customerId" value={orderResponse.information.customer.id} />
                                        </Form.Group>
                                        <Form.Group controlId="name">
                                            <Form.Label>Tên khách hàng</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={orderResponse.information.customer.name}
                                                readOnly
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="phone">
                                            <Form.Label>Số điện thoại </Form.Label>
                                            <Form.Control type="text" name="phone" value={orderResponse.information.customer.phone} />
                                        </Form.Group>


                                        <Form.Group controlId="startDate">
                                            <Form.Label>Ngày nhận xe </Form.Label>
                                            <Form.Control type="date" name="startDate" placeholder="Ngày nhận xe" value={orderResponse.information.startDate}
                                                onChange={handleChange} />
                                        </Form.Group>

                                        <Form.Group controlId="expectedDate">
                                            <Form.Label>Ngày dự kiến trả xe </Form.Label>
                                            <Form.Control type="date" name="expectedDate" placeholder="Ngày dự kiến trả xe" value={orderResponse.information.expectedDate}
                                                onChange={handleChange} />
                                        </Form.Group>


                                        <Form.Group controlId="endDate">
                                            <Form.Label>Ngày trả xe </Form.Label>
                                            <Form.Control type="date" name="endDate" placeholder="Ngày trả xe" value={orderResponse.information.endDate} onChange={handleChange} />
                                        </Form.Group>

                                        <Form.Group controlId="originalOdo">
                                            <Form.Label>Số kilomet bắt đầu (km)</Form.Label>
                                            <Form.Control type="text" name="originalOdo" placeholder="0" value={orderResponse.information.originalOdo} onChange={handleChange} />
                                        </Form.Group>

                                        <Form.Group controlId="endedOdo">
                                            <Form.Label>Số kilomet kêt thúc(km)</Form.Label>
                                            <Form.Control type="text" name="endedOdo" placeholder="0" value={orderResponse.information.endedOdo} onChange={handleChange} />
                                        </Form.Group>


                                        <Form.Group controlId="surcharge">
                                            <Form.Label>Chi phí phát sinh</Form.Label>
                                            <Form.Control type="text" name="surcharge" placeholder="0" value={orderResponse.information.surcharge} onChange={handleChange} />
                                        </Form.Group>

                                        <Form.Group controlId="totalPrice">
                                            <Form.Label>Tổng thanh toán</Form.Label>
                                            <Form.Control type="text" name="totalPrice" placeholder="0" value={orderResponse.information.totalPrice} onChange={handleChange} />
                                        </Form.Group>
                                        <Button variant="secondary" onClick={handleCloseOrderModal}>
                                            Đóng
                                        </Button>
                                        <Button variant="primary" onClick={handleUpdateInfo}>
                                            Lưu
                                        </Button>

                                    </Form>
                                </div>
                            ))}


                        <div className={styles.photo}>
                            <img src={car.image} alt="" />
                        </div>
                    </div >
                )}
            </Modal.Body >
        </>
    );
}

export default CarDetail;