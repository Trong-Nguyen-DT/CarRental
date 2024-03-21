import { Modal } from "react-bootstrap";

const CarDetail = ({ car, showModal, onClose }) => {
    return ( 
        <Modal show={showModal} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Chi tiết xe</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {car && (
                    <div>
                        <p>Tên xe: {car.name}</p>
                        <p>Giá: {car.price} VNĐ/ngày</p>
                        <p>Biển số: {car.numberPlate}</p>
                        {/* Hiển thị thông tin khách hàng nếu có */}
                        {car.customer && (
                            <div>
                                <p>Khách hàng: {car.customer.name}</p>
                                <p>SĐT: {car.customer.phone}</p>
                            </div>
                        )}
                    </div>
                )}
            </Modal.Body>
        </Modal>
     );
}

export default CarDetail;