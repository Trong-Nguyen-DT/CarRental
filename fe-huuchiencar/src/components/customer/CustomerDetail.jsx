const CustomerDetail = ({ customer }) => {

    console.log(customer);

    return ( 
        <>
            <h2>Thông tin khách hàng</h2>
            <p><strong>Tên:</strong> {customer.name}</p>
            <p><strong>Số điện thoại:</strong> {customer.phone}</p>
            <p><strong>CCCD:</strong> {customer.citizenId}</p>
            <img src={customer.citizenIdFront} alt="" />
        </>
     );
}

export default CustomerDetail;