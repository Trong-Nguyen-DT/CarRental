import { useState } from 'react';
import styles from './Car.module.css';

const Car = () => {
    const [searchText, setSearchText] = useState("");
    const [listItems, setListItems] = useState([]);
    const [originalList, setOriginalList] = useState([]);

    const handleSearchChange = () => {
        if (searchText.trim() === "") {
            setListItems(originalList);
        } else {
            const filteredCustomers = originalList.filter((customer) =>
                customer.name.toLowerCase().includes(searchText.toLowerCase()) ||
                customer.phone.includes(searchText) ||
                customer.citizenId.includes(searchText)
            );
            setListItems(filteredCustomers);
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
                <div className={styles.buttonAdd}>
                    <button >
                        <i className="uil uil-plus"></i>
                    </button>
                </div>
            </div>
            <div className={styles.itemCar}>
                <div className={styles.imageCar}>
                    <img src={require('../../assets/image/car.jpg')} alt="Logo" />
                </div>
                <div className={styles.car_customer}>
                    <div className={styles.infoCar}>
                        <p>Tên xe : jhsgfgss </p>
                        <p>Gía : 500 000 VND </p>
                        <p>Biển số : 43A-56 378 </p>
                    </div>
                    <div className={styles.infoCustomer}>
                        <p>Khách hàng : Minh Sương</p>
                        <p> SĐT : 0898 244 624</p>
                    </div>
                    <div className={styles.carStatus}>
                        <button>
                            Đã đặt
                        </button>
                    </div>
                </div>
            </div>
            
        </section>
    );
}

export default Car;