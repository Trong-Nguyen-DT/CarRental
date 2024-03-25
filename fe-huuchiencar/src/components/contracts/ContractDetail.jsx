import styles from './ContractDetail.module.css'
const ContractDetail = () => {
    return (
        <div className={styles.contract}>
            <div className={styles.reportHeader}>
                <div className={styles.quochieu}>
                    <h1>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h1>
                    <h2><u>Độc Lập - Tự Do - Hạnh Phúc</u></h2>
                </div>
                <div className={styles.title}>
                    <h1>HỢP ĐỒNG THUÊ XE</h1>
                </div>
                <div>
                    <h5>Hôm nay, ngày ...  tháng ... năm ... . Chúng tôi gồm có: </h5>
                </div>
                <div className={styles.info}>
                    <h1>BÊN CHO THUÊ XE (BÊN A)</h1>
                    <h5>Đại diện: Ông Nguyễn Hữu Chiến</h5>
                    <h5>Địa chỉ: Đường Hoàng Sa, DUy Phước, Duy Xuyên, Quảng Nam</h5>
                    <h5>ĐT: 0707 101 111 - 0789 101 111</h5>
                    <br />
                    <h1>BÊN THUÊ XE (BÊN B)</h1>
                    <h5>Ông/Bà: Tên khách</h5>
                    <h5>Số CCCD: </h5>
                    <h5>SĐT: </h5>
                </div>
                <div className="content">
                    <h5>"Hai bên cùng thỏa thuận ký hợp đồng với những nội dung sau</h5>
                    <br />
                    <h1>ĐIỀU 1: ĐỐI TƯỢNG VÀ NỘI DUNG</h1>
                    <h5>Bên A cho bên B thuê 01 chiếc xe: Tên xe: Biển số: </h5>
                    <h5>Xe cho thuê được đảm bảo đầy đủ tiện nghi và giấy tờ lưu hành. Toàn bộ máy, bảng táp lô, gầm xe và chi tiết khác của xe đều được dám tem đảm bảo</h5>
                    <h1>ĐIỀU 2: GIÁ TRỊ HỢP ĐỒNG, PHƯƠNG THỨC THANH TOÁN</h1>
                    <h5>2.1.Đơn giá thuê: đồng/ ngày </h5>
                    <h5>Các khoảng chi như: Phí cầu đường, tiền đầu bên thuê xe tự chi trả</h5>
                    <h5>2.2.Thời gian thuê: ngày</h5>
                    <h5>2.3.Hình thức thanh toán:Bên B thanh toán cho bên A: đồng sau khi hợp đồng được ký. Số còn lại đồng cùng với các chi phí phát sinh bên B có trách nhiệm thanh toán cho bên A ngay sau khi sử dụng dịch vụ.</h5>
                    <h5>2.4.Đi theo lộ trình</h5>
                    <h5>Khống chế: 250km/ngày</h5>
                    <h5>Phụ trội 2 000 đồng/Km</h5>
                    <h5>KM xăng ban đầu</h5>
                </div>


            </div>
        </div>
    );
}

export default ContractDetail;