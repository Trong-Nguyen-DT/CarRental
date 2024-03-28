import React, { useEffect, useState } from "react";
import styles from "./Contract.module.css";
import { getAllContract } from "../../services/UserService";
import { toast } from "react-toastify";
import ContractDetail from "./ContractDetail";
import CreateContract from "./CreateContract";
import { Modal } from "react-bootstrap";

const Contract = () => {
    const [searchText, setSearchText] = useState("");
    const [listItems, setListItems] = useState([]);
    const [originalList, setOriginalList] = useState([]);
    const [contractSelected, setContractSelected] = useState(null);
    const [showContractDetail, setShowContractDetail] = useState(false);
    const [changeFlag, setChangeFlag] = useState(false);
    const [createSuccess, setCreateSuccess] = useState(false);

    

    useEffect(() => {
        getAllContracts();
    }, [changeFlag,createSuccess]);

    const handleCreateSuccess = () => {
        setCreateSuccess(!createSuccess); // Đảo ngược giá trị để trigger useEffect
    };

    useEffect(() => {
        handleSearchChange();
    }, [searchText]);

    const handleSearchChange = () => {
        if (searchText.trim() === "") {
            setListItems(originalList);
        } else {
            const filteredCustomers = originalList.filter((contract) =>
                contract.carName.toLowerCase().includes(searchText.toLowerCase()) ||
                contract.carNumberPlate.toLowerCase().includes(searchText.toLowerCase()) ||
                contract.customerName.toLowerCase().includes(searchText.toLowerCase())
            );
            setListItems(filteredCustomers);
        }
    };

    const handleContractChange = (item) => {
        setContractSelected(item);
        if (contractSelected) {
            setShowContractDetail(true);
        }
        
    };

    const getAllContracts = async () => {
        try {
            const response = await getAllContract(localStorage.getItem('jwtToken'));
            setListItems(response.data);
            setOriginalList(response.data);
        } catch (error) {
            toast.error('Error:', error);
        }
    };

    const handleCloseContractDetail = () => {
        setShowContractDetail(false);
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
                <CreateContract onCreateSuccess={handleCreateSuccess} />
            </div>
            <div className={styles.itemsContract}>
                {listItems.map((item, index) => (
                    <div className={styles.itemContract} key={index} onClick={() => handleContractChange(item)}>
                        <div className={styles.imageCar}>
                            <img src={item.carImage} alt="Logo" />
                        </div>
                        <div className={styles.car_customer}>
                            <div className={styles.infoCar}>
                                <p style={{ marginBottom: '5px' }}>Tên xe: {item.carName}</p>
                                <p style={{ marginBottom: '5px' }}>Biển số: {item.carNumberPlate}</p>
                                <p style={{ marginBottom: '5px' }}>Khách hàng: {item.customerName}</p>
                                <p style={{ marginBottom: '5px' }}>SĐT: {item.customerPhone}</p>
                            </div>
                        </div>
                        
                    </div>
                ))}
            </div>
            <Modal show={showContractDetail} onHide={handleCloseContractDetail}>
                <Modal.Header closeButton style={{ backgroundColor: 'gray' }}>
                    <Modal.Title style={{ fontSize: '20pt', color: 'white' }}>Thông tin hợp đồng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ContractDetail contract={contractSelected}
                            setChangeFlag={setChangeFlag}
                            changeFlag={changeFlag}
                            setContractSelected={setContractSelected}
                    />
                </Modal.Body>
                
            </Modal>
        </section>

    );
}

export default Contract;
