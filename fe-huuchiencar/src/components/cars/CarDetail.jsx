import { Button, Form, Modal } from "react-bootstrap";
import styles from './CarDetail.module.css';
import { useEffect, useState } from "react";
import { deleteCar, getAllCustomer, createOrder } from "../../services/UserService";
import { toast } from "react-toastify";
import CarUpdate from "./CarUpdate";
import Select from 'react-select';

const CarDetail = ({ car, handleClose, changeFlag }) => {

    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        getAllCustomers();
    }, [changeFlag]);

    const getAllCustomers = async () => {
        try {
            const response = await getAllCustomer(localStorage.getItem('jwtToken'));
            setCustomers(response.data);
        } catch (error) {
            toast.error('Error:', error);
        }
    };


    const [formData, setFormData] = useState({
        id: "",
        name: "",
        phone: "",
        rentDate: "",
        originalOdo: "",
        endedOdo: "",
        surcharge: "",
        totalPrice: "",
    });

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showOrderModal, setShowOderModal] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

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
        console.log("a" + formData);
    };



    const handleInputChange = (event) => {
        console.log("yes")
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleShowDeleteModal = () => {
        setShowDeleteModal(true);
    };

    // const handleShowOrderModal = () => {
    //     setShowOderModal(true);
    // };

    const handleCloseOrderModal = () => {
        setShowOderModal(false);
    }

    const handleOrderSubmit = async () => {
        const body = {
            id: car.id,
            status: car.status === "INACTIVE" ? "BOOKED" : (car.status === "BOOKED" ? "ACTIVE" : "INACTIVE"),
            customerId: selectedCustomer.id,
            info: {
                startDate: formData.startDate,
                expectedDate: formData.expectedDate,
                originalOdo: car.status !== "ACTIVE" ? formData.originalOdo || null : formData.originalOdo,
                endedOdo: car.status !== "ACTIVE" ? formData.endedOdo || null : formData.endedOdo,
                surcharge: car.status !== "ACTIVE" ? formData.surcharge || null : formData.surcharge,
                totalPrice: car.status !== "ACTIVE" ? formData.totalPrice || null : formData.totalPrice,
                endDate: car.status === "ACTIVE" ? formData.endDate || null : formData.endDate
            }
        }

        try {
            const response = await createOrder(localStorage.getItem("jwtToken"), body);
            console.log('Response from createOrder API:', response);
        } catch (error) {
            for (let i = 0; i < error.response.data.message.length; i++) {
                toast.error(error.response.data.message[i].defaultMessage + '. Please try again.');
            }
        }
    };


    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
    };

    const handleConfirmDelete = async () => {
        try {
            const response = await deleteCar(localStorage.getItem("jwtToken"), car.id);
            console.log('Response from createCustomer API:', response);
        } catch (error) {
            for (let i = 0; i < error.response.data.message.length; i++) {
                toast.error(error.response.data.message[i].defaultMessage + '. Vui lòng nhập lại.');
            }
        }
        handleCloseDeleteModal();
        handleClose();
        changeFlag(true);
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
                                <button>
                                    <i className="uil uil-history" style={{ fontSize: '24pt' }}></i>
                                </button>
                                <button onClick={handleShowOrderModal}>
                                    {car.status && (
                                        <>
                                            {car.status === "INACTIVE" && (
                                                <>
                                                    <button>
                                                        <i className="uil uil-user-plus" style={{ fontSize: '24pt' }}></i>
                                                    </button>
                                                </>
                                            )
                                            }

                                            {car.status === "ACTIVE" && (
                                                <button >
                                                    <i className="uil uil-bill" style={{ fontSize: '24pt' }}></i>
                                                </button>
                                            )}

                                            {car.status === "BOOKED" && (
                                                <button>
                                                    <i className="uil uil-notes" style={{ fontSize: '24pt' }}></i>
                                                </button>
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
                                                            <Form.Control type="text" name="phone" placeholder="Nhập số điện thoại" value={formData.phone} onChange={handleInputChange} />
                                                        </Form.Group>

                                                        <Form.Group controlId="startDate">
                                                            <Form.Label>Ngày nhận xe </Form.Label>
                                                            <Form.Control type="date" name="startDate" placeholder="Ngày nhận xe" onChange={handleInputChange} />
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
                                                    <Button variant="primary" onClick={handleOrderSubmit}>
                                                        Lưu
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>
                                        )}
                                </button>
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
                            <div className="form">
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
                                        <Form.Control type="text" name="phone" placeholder="Nhập số điện thoại" value={formData.phone} onChange={handleInputChange} />
                                    </Form.Group>

                                    <Form.Group controlId="startDate">
                                        <Form.Label>Ngày nhận xe </Form.Label>
                                        <Form.Control type="date" name="startDate" placeholder="Ngày nhận xe" onChange={handleInputChange} />
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
                            </div>
                        )}


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