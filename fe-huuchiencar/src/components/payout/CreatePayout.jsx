import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { createPayout, getAllCar } from "../../services/UserService";
import { toast } from "react-toastify";
import Select from 'react-select';

const CreatePayout = ({ changeFlag, setChangeFlag }) => {

    const [showCreate, setShowCreate] = useState(false);
    const [cars, setCars] = useState([]);
    const [selectedCar, setSelectedCar] = useState(null);
    const [carId, setCarId] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        numberPlate: '',
        nameService: '',
        price: '',
        date: ''
    });

    useEffect(() => {
        getAllCars();
    }, []);


    const handleShowCreate = () => {
        setShowCreate(true);
    };

    const handleCloseCreate = () => {
        setShowCreate(false);
    };

    const handleSelectCar = (selectedOption) => {
        if (selectedOption) {
            const selectedCarId = selectedOption.value;
            const selectedCarInfo = cars.find(car => car.id === selectedCarId);
            setCarId(selectedCarInfo.id);
            setSelectedCar(selectedOption);
            if (selectedCarInfo) {
                setFormData({
                    ...formData,
                    name: selectedCarInfo.name,
                    numberPlate: selectedCarInfo.numberPlate,
                });
            } else {
                setFormData({
                    ...formData,
                    name: '',
                    numberPlate: '',
                });
            }
        }
    };

    const getAllCars = async () => {
        try {
            const response = await getAllCar(localStorage.getItem('jwtToken'));
            setCars(response.data);
        } catch (error) {
            toast.error('Error:', error);
        }
    };

    const handleSubmit = async () => {
        if (!carId) {
            toast.error("Xe không được để trống");
            return;
        }

        const body = {
            carId: carId,
            nameService: formData.nameService,
            price: formData.price,
            date: formData.date ? formData.date : null
        };
        try {
            const response = await createPayout(localStorage.getItem("jwtToken"), body);
            toast.success("Tạo thành công");
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
        setShowCreate(false);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    
    return (
        <>
            <button onClick={handleShowCreate}>
                <i className="uil uil-plus"></i>
            </button>
            <Modal show={showCreate} onHide={handleCloseCreate} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Tạo chi tiêu mới</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="name">
                            <Form.Label>Tên xe</Form.Label>
                            <Select
                                options={cars.map(car => ({ value: car.id, label: car.name }))}
                                onChange={handleSelectCar}
                                value={selectedCar}
                                placeholder="Chọn xe"
                            />
                        </Form.Group>
                        <Form.Group controlId="numberPlate">
                            <Form.Label>Biển số </Form.Label>
                            <Form.Control type="text" name="numberPlate" placeholder="Nhập biển số" value={formData.numberPlate}/>
                        </Form.Group>
                        <Form.Group controlId="nameService">
                            <Form.Label>Loại dịch vụ</Form.Label>
                            <Form.Control type="text" name="nameService" placeholder="Nhập loại dịch vụ đã sử dụng" 
                            onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group controlId="date">
                            <Form.Label>Ngày sử dụng </Form.Label>
                            <Form.Control type="date" name="date" placeholder="Ngày sử dụng"
                                value={formData.date}
                                onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="price">
                            <Form.Label>Số tiên chi tiêu</Form.Label>
                            <Form.Control type="text" name="price" placeholder="Nhập số tiền đã chi" 
                            onChange={handleChange}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseCreate}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Tạo chi tiêu
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CreatePayout;