import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { getAllCustomer } from "../../services/UserService";
import { toast } from "react-toastify";
import styles from './Customer.module.css';
import CreateCustomer from "./CreateCustomer";
import CustomerDetail from "./CustomerDetail";

function Customer() {
    const [searchText, setSearchText] = useState("");
    const [listItems, setListItems] = useState([]);
    const [originalList, setOriginalList] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

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

    const handleShowCreateModal = () => {
        setShowCreateModal(true);
    };

    const handleCustomerClick = (customer) => {
        setSelectedCustomer(customer);
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
                    <button onClick={handleShowCreateModal}>
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
                        </tr>
                    </thead>
                    <tbody>
                        {listItems.map((item, index) => (
                            <tr key={index} onClick={() => handleCustomerClick(item)}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.phone}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <div className={styles.createModal}>
                <CreateCustomer show={showCreateModal} handleClose={() => setShowCreateModal(false)} />
            </div>
            {selectedCustomer && (
                <CustomerDetail customer={selectedCustomer} handleClose={() => setSelectedCustomer(null)} />
            )}
        </section>
    );
}

export default Customer;
