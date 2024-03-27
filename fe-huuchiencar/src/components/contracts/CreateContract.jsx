import { useEffect, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { createContract, getAllCar , getAllCustomer} from "../../services/UserService";
import { toast } from "react-toastify";
import Select from 'react-select';
import ReactSignatureCanvas from "react-signature-canvas";

function CreateContract() {
    const [show, setShow] = useState(false);
    const [cars, setCars] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [selectedCar, setSelectedCar] = useState(null);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [signatureImage, setSignatureImage] = useState(null);
    let signatureRef = useRef(null);

    const [formData, setFormData] = useState({
        name: "",
        startDate: "",
        endDate: "",
        signatureImageCustomer: null,
        showSignatureImageCustomer: null
    });

    const [formDataImage, setFormDataImage] = useState(new FormData());



    useEffect(() => {
        getAllCars();
    }, []);

    useEffect(() => {
        getAllCustomers();
    }, []);


    const getAllCars = async () => {
        try {
            const response = await getAllCar(localStorage.getItem('jwtToken'));
            setCars(response.data);
        } catch (error) {
            toast.error('Error:', error);
        }
    };
    const getAllCustomers = async () => {
        try {
            const response = await getAllCustomer(localStorage.getItem('jwtToken'));
            setCustomers(response.data);
        } catch (error) {
            toast.error('Error:', error);
        }
    };

    const handleCarChange = (selectedOption) => {
        if (selectedOption) {
            const selectedCarId = selectedOption.value;
            const selectedCarInfo = cars.find(car => car.id === selectedCarId);
            setSelectedCar(selectedCarInfo);
            if (selectedCarInfo) {
                setFormData({
                    ...formData,
                    name: selectedCarInfo.name,
                    carId: selectedCarInfo.id,

                });
            } else {
                setFormData({
                    ...formData,
                    customerName: '',
                    customerPhone: '',
                    customerCitizenId: '',
                });
            }
        }
    };
    const handleCustomerChange = (selectedCustomerOption) => {
        if (selectedCustomerOption) {
            // Truy cập giá trị của lựa chọn được chọn
            const selectedCustomerId = selectedCustomerOption.value;
            // Tiếp tục xử lý dựa trên selectedCustomerId
            const selectedCustomerInfo = customers.find(customer => customer.id === selectedCustomerId);
            // Cập nhật giá trị của state selectedCustomer
            setSelectedCustomer(selectedCustomerInfo);
            // Kiểm tra xem selectedCustomerInfo có tồn tại không trước khi cập nhật formData
            if (selectedCustomerInfo) {
                // Cập nhật giá trị số điện thoại trong state formData nếu selectedCustomerInfo tồn tại
                setFormData({
                    ...formData,
                    customerId: selectedCustomerInfo.id,
                    customerPhone: selectedCustomerInfo.phone,
                    customerName: selectedCustomerInfo.name || '',
                    customerCitizenId: selectedCustomerInfo.citizenId || '',
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


    const handleShowCreateModal = () => {
        setShow(true);
    };

    const handleClose = () => {
        setShow(false);
    }

    const handleSubmit = async () => {
        const formDataToSend = new FormData();
        formDataToSend.append("carId", formData.carId);
        formDataToSend.append("customerId", formData.customerId);
        formDataToSend.append("startDate", formData.startDate);
        formDataToSend.append("endDate", formData.endDate);
        formDataToSend.append("signatureImageCustomer", formData.signatureImageCustomer);

        try {
            const response = await createContract(localStorage.getItem("jwtToken"), formDataToSend);
            console.log('Response from createCustomer API:', response);
        } catch (error) {
            for (let i = 0; i < error.response.data.message.length; i++) {
                toast.error(error.response.data.message[i].defaultMessage + '. Please try again.');
                console.log("lỗi")
            }
        }
    };

    const handleSaveSignature = () => {
        if (!signatureRef.current.isEmpty()) {
            const signatureData = signatureRef.current.toDataURL();
            setSignatureImage(signatureData);
            setFormData({ ...formData, showSignatureImageCustomer: signatureData });
        
            signatureRef.current.getCanvas().toBlob((blob) => {
                // Create a File object from the Blob
                const file = new File([blob], `${formData.customerName}.png`, { type: 'image/png' });
                setFormData({ ...formData, signatureImageCustomer: file});

            });
        } else {
            // Handle the case where the canvas is empty
            console.log("Canvas is empty. Please provide a signature.");
        }
        
    };

    const handleClearSignature = () => {
        signatureRef.current.clear(); // Xóa nội dung chữ ký trên canvas
        setFormData({ ...formData, signatureImageCustomer: null }); // Cập nhật trạng thái chữ ký về null
    };

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
                        <Form.Group controlId="carName">
                            <Form.Label>Chọn xe</Form.Label>
                            <Select
                                options={cars.map(car => ({ value: car.id, label: car.name }))}
                                onChange={handleCarChange}
                                placeholder="Chọn xe"
                            />
                        </Form.Group>

                        <Form.Group controlId="customerName">
                            <Form.Label>Chọn khách hàng</Form.Label>
                            <Select
                                options={customers.map(customer => ({ value: customer.id, label: customer.name }))}
                                onChange={handleCustomerChange}
                                placeholder="Chọn khách hàng"
                            />
                        </Form.Group>

                        <Form.Group controlId="customerPhone">
                            <Form.Label>Số điện thoại </Form.Label>
                            <Form.Control type="phone" name="customerPhone" placeholder="Nhập số điện thoại" value={formData.customerPhone} onChange={handleCarChange} />
                        </Form.Group>

                        <Form.Group controlId="customerCitizenId">
                            <Form.Label>Căn cước công dân</Form.Label>
                            <Form.Control type="text" name="customerCitizenId" placeholder="Nhập số căn cước công dân" value={formData.customerCitizenId} onChange={handleInputChange} />
                        </Form.Group>

                        <Form.Group controlId="startDate">
                            <Form.Label>Ngày nhận xe</Form.Label>
                            <Form.Control type="date" name="startDate" placeholder="Nhập ngày nhận xe" onChange={handleInputChange} />
                        </Form.Group>

                        <Form.Group controlId="endDate">
                            <Form.Label>Ngày trả xe</Form.Label>
                            <Form.Control type="date" name="endDate" placeholder="Nhập ngày trả xe" onChange={handleInputChange} />
                        </Form.Group>

                        <Form.Group controlId="signatureImageCustomer">
                            <Form.Label>Chữ ký khách hàng</Form.Label>
                            <ReactSignatureCanvas
                                penColor='black'
                                canvasProps={{ width: 500, height: 200, className: 'signature-canvas' }}
                                ref={signatureRef}
                            />
                            <Button onClick={handleSaveSignature}>Lưu chữ ký</Button>
                            <Button onClick={handleClearSignature}>Xóa chữ ký</Button>
                            {formData.signatureImageCustomer && (
                                <div>
                                    <p>Chữ ký đã ký:</p>
                                    <img src={formData.showSignatureImageCustomer} alt="Chữ ký khách hàng" />
                                </div>
                            )}
                        </Form.Group>
                    </Form>
                    <Button variant="primary" onClick={handleSubmit}>
                        Lưu
                    </Button>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default CreateContract;