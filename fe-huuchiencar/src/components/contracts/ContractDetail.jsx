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
                    <h5>KM xăng ban đầu: </h5>
                    <h5>Cây số ban đầu</h5>
                    <h1>ĐIỀU 3: TRÁCH NHIỆM CỦA CÁC BÊN:</h1>
                    <h5>3.1.Trách nhiệm của bên A:</h5>
                    <h5>Giao xe và toàn bộ giấy tờ liên quan đến xe đúng chất lượng và thời gian - Giấy tờ liên quan tới xe gồm: Giấy đăng ký xe, giấy kiểm định, giấy bảo hiểm xe - Chịu trách nhiệm pháp lý về nguồn gốc và quyền sở hữu xe.</h5>
                    <h5>-Bên A có quyền báo cho công an khi bên B không liên lạc với bên A. -Bên A có quyền đơn phương chấm dứt hợp đòng nếu bên B vi phạm các điều khoản trong hợp đồng.</h5>
                    <h5>3.2.Trách nhiệm của bên B:</h5>
                    <h5>-Kiểm tra kỹ xe trước khi nhận.</h5>
                    <h5>-Thanh toán tiền thuê xe cho bên A đúng hạn.</h5>
                    <h5>-Chịu toàn bộ chi phí bảo dưỡng xe theo định kỳ.</h5>
                    <h5>Bên B phải tự sữa chữa nếu có xảy ra hỏng hóc.</h5>
                    <h5>
                        *Điều cấmL Bên B không được sử dụng xe vào các mục đích mà vi phạm pháp luật: chở hàng quốc cấm, hàng lậu, hay sử dụng vào mục đích xấu. -Cấm đem xe đi cầm đồ, thế chấp, giao xe cho người khác.
                    </h5>
                    <h5>
                    -Cấm đi vào đường ngập nước. -Mọi sự cố bẹp, nứt, vỡ, móp méo các chi tiết của xe do bên B gây ra thì bên B phải mua đồ của hãng thay thế(không chấp nhận gò, hàn).
                    </h5>
                    <h5>
                        -Nếu bên B vi phạm luật giao thông hoặc gây tai nạn giao thông, hoặc sử dụng xe trái mục đích( cầm cố, cho mượn, cho thuê lại...) thì phải chịu hoàn toàn trách nhiệm trước pháp luật về hành vi vi phạm của mình.
                    </h5>
                    <h1>ĐIỀU 4: ĐIỀU KHOẢN CHUNG</h1>
                    <h5>-Trong quá trình thực hiện hợp đồng, nếu có đề nghị điều chỉnh thì phải thông báo cho nhau được biết.</h5>
                    <h5>-Nếu bên B muốn hủy việc sử dụng dịch vụ thì phải báo cho bên A trước 24 tiếng.Nếu sau thời gian 24 tiếng bên B hủy sử dụng dịch vụ thì bên B chịu phí 30% hợp đồng</h5>
                    <h5>-Hai bên cam kết thi hành đúng các điều khoản của hợp đồng, không bên nào tự ý đơn phương sửa đổi, dình chỉ hoặc hủy bỏ hợp đồng. Mọi sự vi phạm phải được xử lý theo pháp luật.</h5>
                    <h5>-Hợp đồng được lập thành 02 bản, mỗi bên giữ một bản và có giá trị như sau:</h5>
                    <h4>ĐẠI DIỆN BÊN A</h4>
                    <h4>ĐẠI DIỆN BÊN B</h4>
                </div>


            </div>
        </div>
    );
}

export default ContractDetail;