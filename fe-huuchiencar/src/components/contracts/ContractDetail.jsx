import { useRef } from 'react';
import styles from './ContractDetail.module.css'
import { PDFExport } from '@progress/kendo-react-pdf';


const ContractDetail = ({ contract }) => {

    const pdfExportComponent = useRef(null);

    const exportToPDF = () => {
        if (pdfExportComponent.current) {
            pdfExportComponent.current.save();
        }
    };

    return (
        <>
            <div id='contract_detail'>
                <PDFExport ref={pdfExportComponent} paperSize="A4">
                    <div style={{ width: '210mm', margin: '0 auto', padding: '20mm', fontSize: '12pt', fontFamily: 'Arial, sans-serif', backgroundColor: 'white', boxSizing: 'border-box', border: '1px solid black' }}>
                        <div style={{ marginBottom: '10px' }}>
                            <p style={{ fontSize: '16px', fontFamily: 'Arial' }}>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
                            <p style={{ fontSize: '14px', fontFamily: 'Arial' }}><u>Độc Lập - Tự Do - Hạnh Phúc</u></p>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <p style={{ fontSize: '14px', fontFamily: 'Arial' }}>HỢP ĐỒNG THUÊ XE</p>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>Hôm nay, ngày ...  tháng ... năm ... . Chúng tôi gồm có: </p>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>BÊN CHO THUÊ XE (BÊN A)</p>
                            <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>Đại diện: Ông {contract.templateContract.name}</p>
                            <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>Địa chỉ: {contract.templateContract.address}</p>
                            <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>ĐT: {contract.templateContract.phone}</p>
                            <br />
                            <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>BÊN THUÊ XE (BÊN B)</p>
                            <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>Ông/Bà: {contract.customerName}</p>
                            <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>Số CCCD: {contract.customerCitizenId}</p>
                            <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>SĐT: {contract.customerPhone}</p>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>"Hai bên cùng thỏa thuận ký hợp đồng với những nội dung sau</p>
                            <br />
                            <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>ĐIỀU 1: ĐỐI TƯỢNG VÀ NỘI DUNG</p>
                            <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>Bên A cho bên B thuê 01 chiếc xe: {contract.carName} Biển số: {contract.carNumberPlate}</p>
                            <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>Xe cho thuê được đảm bảo đầy đủ tiện nghi và giấy tờ lưu hành. Toàn bộ máy, bảng táp lô, gầm xe và chi tiết khác của xe đều được dám tem đảm bảo</p>
                            <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>ĐIỀU 2: GIÁ TRỊ HỢP ĐỒNG, PHƯƠNG THỨC THANH TOÁN</p>
                            <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>2.1.Đơn giá thuê: {contract.rentCostCar} đồng/ ngày </p>
                            <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>Các khoảng chi như: Phí cầu đường, tiền đầu bên thuê xe tự chi trả</p>
                            <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>2.2.Thời gian thuê: ngày</p>
                            <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>2.3.Hình thức thanh toán:Bên B thanh toán cho bên A: {contract.prePay} đồng sau khi hợp đồng được ký. Số còn lại đồng cùng với các chi phí phát sinh bên B có trách nhiệm thanh toán cho bên A ngay sau khi sử dụng dịch vụ.</p>
                            <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>2.4.Đi theo lộ trình</p>
                            <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>Khống chế: 250km/ngày</p>
                            <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>Phụ trội 2 000 đồng/Km</p>
                            <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>KM xăng ban đầu: </p>
                            <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>Cây số ban đầu</p>
                            <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>ĐIỀU 3: TRÁCH NHIỆM CỦA CÁC BÊN:</p>
                            <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>3.1.Trách nhiệm của bên A:</p>
                            <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>Giao xe và toàn bộ giấy tờ liên quan đến xe đúng chất lượng và thời gian - Giấy tờ liên</p>
                            <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>quần tới xe gồm: Giấy đăng ký xe, giấy kiểm định, giấy bảo hiểm xe - Chịu trách nhiệm pháp lý về nguồn gốc và quyền sở hữu xe.</p>
                            <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>-Bên A có quyền báo cho công an khi bên B không liên lạc với bên A. -Bên A có quyền đơn phương chấm dứt hợp đòng nếu bên B vi phạm các điều khoản trong hợp đồng.</p>
                            <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>3.2.Trách nhiệm của bên B:</p>
                            <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>-Kiểm tra kỹ xe trước khi nhận.</p>
                            <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>-Thanh toán tiền thuê xe cho bên A đúng hạn.</p>
                            <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>-Chịu toàn bộ chi phí bảo dưỡng xe theo định kỳ.</p>
                            <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>Bên B phải tự sữa chữa nếu có xảy ra hỏng hóc.</p>
                            <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>*Điều cấmL Bên B không được sử dụng xe vào các mục đích mà vi phạm pháp luật: chở hàng quốc cấm, hàng lậu, hay sử dụng vào mục đích xấu. -Cấm đem xe đi cầm đồ, thế chấp, giao xe cho người khác.</p>
                            <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>-Cấm đi vào đường ngập nước. -Mọi sự cố bẹp, nứt, vỡ, móp méo các chi tiết của xe do bên B gây ra thì bên B phải mua đồ của hãng thay thế(không chấp nhận gò, hàn).</p>
                            <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>-Nếu bên B vi phạm luật giao thông hoặc gây tai nạn giao thông, hoặc sử dụng xe trái mục đích( cầm cố, cho mượn, cho thuê lại...) thì phải chịu hoàn toàn trách nhiệm trước pháp luật về hành vi vi phạm của mình.</p>
                            <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>ĐIỀU 4: ĐIỀU KHOẢN CHUNG</p>
                            <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>-Trong quá trình thực hiện hợp đồng, nếu có đề nghị điều chỉnh thì phải thông báo cho nhau được biết.</p>
                            <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>-Nếu bên B muốn hủy việc sử dụng dịch vụ thì phải báo cho bên A trước 24 tiếng.Nếu sau thời gian 24 tiếng bên B hủy sử dụng dịch vụ thì bên B chịu phí 30% hợp đồng</p>
                            <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>-Hai bên cam kết thi hành đúng các điều khoản của hợp đồng, không bên nào tự ý đơn phương sửa đổi, dình chỉ hoặc hủy bỏ hợp đồng. Mọi sự vi phạm phải được xử lý theo pháp luật.</p>
                            <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>-Hợp đồng được lập thành 02 bản, mỗi bên giữ một bản và có giá trị như sau:</p>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <h4 style={{ fontSize: '12px', fontFamily: 'Arial' }}>ĐẠI DIỆN BÊN A</h4>
                            <div style={{ width: '100%' }}>
                                <img src='http://18.212.213.232:8080/api/images/1711425650920-4d298bd91621c07f9930.jpg' alt="" style={{ width: '100%' }} />
                            </div>
                            <h4 style={{ fontSize: '12px', fontFamily: 'Arial' }}>ĐẠI DIỆN BÊN B</h4>
                        </div>
                    </div>
                </PDFExport>
            </div>
            <button onClick={exportToPDF}>
                Xuất PDF
            </button>
        </>
    );
}

export default ContractDetail;