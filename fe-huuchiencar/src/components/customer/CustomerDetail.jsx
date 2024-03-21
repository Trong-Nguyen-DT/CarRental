import React from "react";
import { Button, Modal } from "react-bootstrap";

const CustomerDetail = ({ customer, handleClose }) => {
    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Thông tin khách hàng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="customer">
                    <div className="infoCustomer">
                        <p><strong>Tên:</strong> {customer.name}</p>
                        <p><strong>Số điện thoại:</strong> {customer.phone}</p>
                        <p><strong>CCCD:</strong> {customer.citizenId}</p>
                    </div>
                    <div className="buttonUpdate_Delete">
                        <Button variant="secondary" onClick={handleClose}>
                            Cập nhật
                        </Button>
                        <Button>
                            Xóa
                        </Button>
                    </div>
                </div>
                <label> Ảnh mặt trước CCCD</label>
                <img src={customer.citizenIdFront} alt="" />

                <img src={customer.citizenIdBack} alt="" />
                <img src={customer.driverLicenseFront} alt="" />
                <img src={customer.driverLicenseBack} alt="" />

            </Modal.Body>
            <Modal.Footer>
                {/* <Button>
                    Xóa
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button> */}
            </Modal.Footer>
        </>
    );
}

export default CustomerDetail;
