import { useEffect, useState } from 'react';
import styles from './Car.module.css';
import { toast } from 'react-toastify';
import { getAllCar } from '../../services/UserService';
import CreateCar from './CreateCar';
import CarDetail from './CarDetail';

const Car = () => {
    const [searchText, setSearchText] = useState("");
    const [listItems, setListItems] = useState([]);
    const [originalList, setOriginalList] = useState([]);
    const [showModalCarDetail, setShowModalCarDetail] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);

    useEffect(() => {
        getAllCars();
    }, []);

    useEffect(() => {
        handleSearchChange();
    }, [searchText]);

    const handleCarClick = (car) => {
        setSelectedCar(car);
        setShowModalCarDetail(true);
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
                <CreateCar />
            </div>
            {listItems.map((car, index) => (
                <div key={index} className={styles.itemCar} onClick={() => handleCarClick(car)}>
                    <div className={styles.imageCar}>
                        <img src={car.image} alt="Car" />
                    </div>
                    <div className={styles.car_customer}>
                        <div className={styles.infoCar}>
                            <p>Tên xe: {car.name}</p>
                            <p>Giá: {car.price} VNĐ/ngày</p>
                            <p>Biển số: {car.numberPlate}</p>
                        </div>
                        {car.customer && (
                            <div className={styles.infoCustomer}>
                                <p>Khách hàng: {car.customer.name}</p>
                                <p>SĐT: {car.customer.phone}</p>
                            </div>
                        )}
                        <div className={styles.carStatus}>
                            <button className={`${styles.statusButton} ${getStatusColor(car.status)}`}>
                                {getStatusText(car.status)}
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            <CarDetail car={selectedCar} showModal={showModalCarDetail} onClose={() => setShowModalCarDetail(false)} />
        </section>
    );
}

export default Car;