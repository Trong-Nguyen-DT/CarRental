import { useEffect, useState } from 'react';
import styles from './Car.module.css';
import { toast } from 'react-toastify';
import { getAllCar } from '../../services/UserService';
import CreateCar from './CreateCar';
import CarDetail from './CarDetail';
import { Modal } from 'react-bootstrap';

const Car = () => {
    const [searchText, setSearchText] = useState("");
    const [listItems, setListItems] = useState([]);
    const [originalList, setOriginalList] = useState([]);
    const [selectedCar, setSelectedCar] = useState(null);
    const [changeFlag, setChangeFlag] = useState(false);
    const [showCarDetailModal, setShowCarDetailModal] = useState(false);
    const [createSuccess, setCreateSuccess] = useState(false);

    const user = localStorage.getItem("user");
    let role = 'ROLE_USER';
    if (user) {
        role = user.role;
    }



    const handleCloseCarDetailModal = () => {
        setShowCarDetailModal(false);
    };

    const handleCreateSuccess = () => {
        setCreateSuccess(!createSuccess); // Đảo ngược giá trị để trigger useEffect
    };

    useEffect(() => {
        getAllCars();
    }, [changeFlag, createSuccess]);

    useEffect(() => {
        handleSearchChange();
    }, [searchText]);

    const handleCarClick = (car) => {
        setSelectedCar(car);
        setShowCarDetailModal(true);
    };

    const handleSearchChange = () => {
        if (searchText.trim() === "") {
            setListItems(originalList);
        } else {
            const filteredCustomers = originalList.filter((car) =>
                car.name.toLowerCase().includes(searchText.toLowerCase()) ||
                car.numberPlate.toLowerCase().includes(searchText.toLowerCase())
            );
            setListItems(filteredCustomers);
        }
    };

    const getAllCars = async () => {
        try {
            const response = await getAllCar(localStorage.getItem('jwtToken'));
            setListItems(response.data);
            setOriginalList(response.data);
        } catch (error) {
            toast.error('Error:', error);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'BOOKED':
                return styles.booked;
            case 'INACTIVE':
                return styles.inactive;
            case 'ACTIVE':
                return styles.active;
            default:
                return '';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'BOOKED':
                return 'Đã đặt';
            case 'INACTIVE':
                return 'Trống';
            case 'ACTIVE':
                return 'Hoạt động';
            default:
                return '';
        }
    };


    return (
        <section className={styles.car}>
            <div className={styles.top}>
                <div className={styles.search_box}>
                    <i className="uil uil-search"></i>
                    <input
                        type="text"
                        placeholder="Tìm kiếm"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>
                {role === 'ROLE_ADMIN' && <CreateCar handleCreateSuccess={handleCreateSuccess} />}
            </div>
            <div className={styles.itemsCar}>
                {listItems.map((car, index) => (
                    <div key={index} className={styles.itemCar} onClick={() => handleCarClick(car)}>
                        <div className={styles.imageCar}>
                            <img src={car.image} alt="Car" />
                        </div>
                        <div className={styles.car_customer}>
                            <div className={styles.infoCar}>
                                <p>Tên xe: {car.name}</p>
                                <p>Giá: {car.rentCost.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} /ngày</p>
                                <p>Biển số: {car.numberPlate}</p>
                            </div>
                            <div className={styles.infoCustomer}>
                                <p>Khách: {car.information && car.information.customer ? (car.information.customer.name) : ""}</p>
                                <p>SĐT: {car.information && car.information.customer ? (car.information.customer.phone) : ""}</p>
                                <button className={`${styles.statusButton} ${getStatusColor(car.status)}`}>
                                    {getStatusText(car.status)}
                                </button>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
            <Modal show={showCarDetailModal} onHide={handleCloseCarDetailModal}>
                <CarDetail
                    car={selectedCar}
                    handleClose={handleCloseCarDetailModal}
                    setChangeFlag={setChangeFlag}
                    changeFlag={changeFlag}
                    setSelectedCar={setSelectedCar}
                />
            </Modal>


        </section>
    );
}

export default Car;