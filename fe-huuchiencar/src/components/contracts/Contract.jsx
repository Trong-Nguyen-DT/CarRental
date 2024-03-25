import React, { useEffect, useState } from "react";
import styles from "./Contract.module.css";

const Contract = () => {
    const [searchText, setSearchText] = useState("");
    const [listItems, setListItems] = useState([]);
    const [originalList, setOriginalList] = useState([]);


    useEffect(() => {
        handleSearchChange();
    }, [searchText]);

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

    return (
        <section className={styles.contract}>
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
            </div>
            <div className={styles.itemsContract}>
                <div className={styles.itemContract}>
                    <div className={styles.imageCar}>
                        <img src={require('../../assets/image/car.jpg')} alt="Logo" />
                    </div>
                    <div className={styles.car_customer}>
                        <div className={styles.infoCar}>
                            <p style={{ marginBottom: '0px' }}>Tên xe: hjbjhb</p>
                            <p style={{ marginBottom: '0px' }}>Giá: hhuhuihui VNĐ/ngày</p>
                            <p style={{ marginBottom: '0px' }}>Biển số: uyihjnkjnkj</p>
                            <p style={{ marginBottom: '0px' }}>Khách hàng: hjvbghvhj</p>
                            <p style={{ marginBottom: '0px' }}>SĐT: 0897878678</p>

                            {/* <button className={`${styles.statusButton} ${getStatusColor(car.status)}`}>
                                    {getStatusText(car.status)}
                                </button> */}
                        </div>
                    </div>
                </div>

            </div>
        </section>

    );
}

export default Contract;
