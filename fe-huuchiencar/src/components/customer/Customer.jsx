import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { getAllCustomer } from "../../services/UserService";
import { toast } from "react-toastify";
import styles from './Customer.module.css';
import CreateCustomer from "./CreateCustomer";

function Customer() {
    const [searchText, setSearchText] = useState("");
    const [listItems, setListItems] = useState([]);
    const [originalList, setOriginalList] = useState([]);

    useEffect(() => {
        getAllCustomers();
    }, []);

    useEffect(() => {
        handleSearchChange();
    }, [searchText]);

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

    const getAllCustomers = async () => {
        try {
            const response = await getAllCustomer(localStorage.getItem('jwtToken'));
            setListItems(response.data);
            setOriginalList(response.data);
        } catch (error) {
            toast.error('Error:', error);
        }
    };

    return (
        <section className={styles.dashboard}>
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
            <div className={styles.dash_content}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên</th>
                            <th>SĐT</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listItems.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.phone}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <CreateCustomer/>
        </section>
    );
}

export default Customer;
