import React, { useEffect, useState } from "react";
import { Modal, Table } from "react-bootstrap";
import { getAllCustomer } from "../../services/UserService";
import { toast } from "react-toastify";
import styles from './Customer.module.css';
import CreateCustomer from "./CreateCustomer";
import CustomerDetail from "./CustomerDetail";

function Customer() {
    const [searchText, setSearchText] = useState("");
    const [listItems, setListItems] = useState([]);
    const [originalList, setOriginalList] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [showCustomerDetailModal, setShowCustomerDetailModal] = useState(false);
    const [changeFlag, setChangeFlag] = useState(false);

    const handleCloseCustomerDetailModal = () => {
        setShowCustomerDetailModal(false);
    };

    
    useEffect(() => {
        getAllCustomers();
    }, [changeFlag]);

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

    const handleCustomerClick = (customer) => {
        setSelectedCustomer(customer);
        setShowCustomerDetailModal(true);
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
                <CreateCustomer />
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
            <Modal show={showCustomerDetailModal} onHide={handleCloseCustomerDetailModal}>
                <CustomerDetail
                            customer={selectedCustomer}
                            handleClose={handleCloseCustomerDetailModal}
                            changeFlag={setChangeFlag}
                        />
            </Modal>
        </section>
    );
}

export default Customer;
