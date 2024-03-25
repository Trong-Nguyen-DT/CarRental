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
            <div className={styles.contract}>
                <div className={styles.contract_items}>
                    <div className={styles.contract_item}>
                        <div className={styles.info_contract}>
                            <span>Tên xe: Vin Fast</span>
                            <span>Giá: Vin Fast VNĐ/ngày</span>
                            <span>Tên khách hàng: Sương Điên</span>
                            <span>SĐT: 0999999999</span>
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>
    );
}

export default Contract;
