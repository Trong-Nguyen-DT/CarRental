import { useRef } from 'react';
import styles from './ContractDetail.module.css'
import ReactToPrint from 'react-to-print';
import ContractUpdate from './ContractUpdate';

const ContractDetail = ({ contract, setChangeFlag, changeFlag, setContractSelected }) => {

    const pdfExportComponent = useRef(null);

    const startDate = new Date(contract.startDate);
    const dayStart = startDate.getDate();
    const monthStart = startDate.getMonth() + 1;
    const yearStart = startDate.getFullYear();
    const hoursStart = startDate.getHours();
    const minutesStart = startDate.getMinutes();
    const user = localStorage.getItem("user");
    let role = 'ROLE_USER';
    if (user) {
        role = user.role;
    }


    let dayEnd, monthEnd, yearEnd, hoursEnd, minutesEnd;
    if (contract.endDate) {
        const endDate = new Date(contract.endDate);
        dayEnd = endDate.getDate();
        monthEnd = endDate.getMonth() + 1;
        yearEnd = endDate.getFullYear();
        hoursEnd = endDate.getHours();
        minutesEnd = endDate.getMinutes();
    } else {
        dayEnd = null;
        monthEnd = null;
        yearEnd = null;
        hoursEnd = null;
        minutesEnd = null;
    }

    return (
        <>
            <div id='contract_detail' style={{ width: '100%' }}>
                <div ref={pdfExportComponent} paperSize="A4">
                    <div style={{ width: '100%', justifyContent: 'center', margin: '10px auto', fontSize: '12pt', fontFamily: 'Arial, sans-serif', backgroundColor: 'white', boxSizing: 'border-box', border: '1px solid black' }}>
                        <div className="content" style={{ margin: '5%', fontWeight: 'bold' }}>
                            <div >
                                <br></br>
                                <p style={{ textAlign: 'center', fontSize: '15px', fontFamily: 'Arial', fontWeight: 'bolder' }}>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
                                <p className={styles.text_content} style={{ fontSize: '14px', fontFamily: 'Arial', alignContent: 'center' }}><u>Độc Lập - Tự Do - Hạnh Phúc</u></p>
                            </div>
                            <div>
                                <br />
                                <p className={styles.text_content} style={{ color: 'red', fontSize: '14px', fontFamily: 'Arial', fontWeight: 'bolder' }}>HỢP ĐỒNG CHO THUÊ XE TỰ LÁI</p>
                                <br />
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>Hôm nay, ngày {dayStart} tháng {monthStart} năm {yearStart} . Chúng tôi gồm có: </p>
                            </div>
                            <div>
                                <p style={{ color: 'red', fontSize: '12px', fontFamily: 'Arial' }}>BÊN CHO THUÊ XE (BÊN A)</p>
                                <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>Đại diện: Ông {contract.templateContract.name}</p>
                                <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>Địa chỉ: {contract.templateContract.address}</p>
                                <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>ĐT: {contract.templateContract.phone}</p>
                                <br />
                                <p style={{ color: 'red', fontSize: '12px', fontFamily: 'Arial' }}>BÊN THUÊ XE (BÊN B)</p>
                                <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>Ông/Bà: {contract.customerName}</p>
                                <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>Số CCCD: {contract.customerCitizenId}</p>
                                <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>SĐT: {contract.customerPhone}</p>
                            </div>
                            <div>
                                <p style={{ textAlign: 'center', fontSize: '12px', fontFamily: 'Arial' }}>"Hai bên cùng thỏa thuận ký hợp đồng với những nội dung sau</p>
                                <br />
                                <p style={{ color: 'red', fontSize: '12px', fontFamily: 'Arial' }}>ĐIỀU 1: ĐỐI TƯỢNG VÀ NỘI DUNG</p>
                                <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>Bên A cho bên B thuê 01 chiếc xe: {contract.carName} Biển số: {contract.carNumberPlate}</p>
                                <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>Xe cho thuê được đảm bảo đầy đủ tiện nghi và giấy tờ lưu hành. Toàn bộ máy, bảng táp lô, gầm xe và chi tiết khác của xe đều được dám tem đảm bảo</p>
                                <p style={{ color: 'red', fontSize: '12px', fontFamily: 'Arial' }}>ĐIỀU 2: GIÁ TRỊ HỢP ĐỒNG, PHƯƠNG THỨC THANH TOÁN</p>
                                <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>2.1.Đơn giá thuê:............... đồng/ ngày </p>
                                <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>Các khoảng chi như: Phí cầu đường, tiền đầu bên thuê xe tự chi trả</p>
                                <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>2.2.Thời gian thuê:........... ngày.</p>
                                <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>(Từ {hoursStart} giờ {minutesStart} phút, ngày {dayStart} tháng {monthStart} năm {yearStart}. Đến {hoursEnd || '...'} giờ {minutesEnd || '...'} phút, ngày {dayEnd || '...'} tháng {monthEnd || '...'} năm {yearEnd || '...'}</p>
                                <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>2.3.Hình thức thanh toán:Bên B thanh toán cho bên A: ............. đồng sau khi hợp đồng được ký. Số còn lại ............. đồng cùng với các chi phí phát sinh bên B có trách nhiệm thanh toán cho bên A ngay sau khi sử dụng dịch vụ.</p>
                                <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>2.4.Đi theo lộ trình: ...................</p>
                                <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>Khống chế: 250km/ngày</p>
                                <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>Phụ trội 2 000 đồng/Km</p>
                                <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>KM xăng ban đầu:................. </p>
                                <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>Cây số ban đầu:.................</p>
                                <p style={{ color: 'red', fontSize: '12px', fontFamily: 'Arial' }}>ĐIỀU 3: TRÁCH NHIỆM CỦA CÁC BÊN:</p>
                                <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>3.1.Trách nhiệm của bên A:</p>
                                <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>Giao xe và toàn bộ giấy tờ liên quan đến xe đúng chất lượng và thời gian - Giấy tờ liên</p>
                                <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>quần tới xe gồm: Giấy đăng ký xe, giấy kiểm định, giấy bảo hiểm xe - Chịu trách nhiệm pháp lý về nguồn gốc và quyền sở hữu xe.</p>
                                <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>-Bên A có quyền báo cho công an khi bên B không liên lạc với bên A. -Bên A có quyền đơn phương chấm dứt hợp đòng nếu bên B vi phạm các điều khoản trong hợp đồng.</p>
                                <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>3.2.Trách nhiệm của bên B:</p>
                                <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>-Kiểm tra kỹ xe trước khi nhận.</p>
                                <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>-Thanh toán tiền thuê xe cho bên A đúng hạn.</p>
                                <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>-Chịu toàn bộ chi phí bảo dưỡng xe theo định kỳ.</p>
                                <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>Bên B phải tự sữa chữa nếu có xảy ra hỏng hóc.</p>
                                <p style={{ color: 'red', fontSize: '12px', fontFamily: 'Arial' }}>*Điều cấmL Bên B không được sử dụng xe vào các mục đích mà vi phạm pháp luật: chở hàng quốc cấm, hàng lậu, hay sử dụng vào mục đích xấu. -Cấm đem xe đi cầm đồ, thế chấp, giao xe cho người khác.</p>
                                <p style={{ color: 'red', fontSize: '12px', fontFamily: 'Arial' }}>-Cấm đi vào đường ngập nước. -Mọi sự cố bẹp, nứt, vỡ, móp méo các chi tiết của xe do bên B gây ra thì bên B phải mua đồ của hãng thay thế(không chấp nhận gò, hàn).</p>
                                <p style={{ color: 'red', fontSize: '12px', fontFamily: 'Arial' }}>-Nếu bên B vi phạm luật giao thông hoặc gây tai nạn giao thông, hoặc sử dụng xe trái mục đích( cầm cố, cho mượn, cho thuê lại...) thì phải chịu hoàn toàn trách nhiệm trước pháp luật về hành vi vi phạm của mình.</p>
                                <p style={{ color: 'red', fontSize: '12px', fontFamily: 'Arial' }}>ĐIỀU 4: ĐIỀU KHOẢN CHUNG</p>
                                <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>-Trong quá trình thực hiện hợp đồng, nếu có đề nghị điều chỉnh thì phải thông báo cho nhau được biết.</p>
                                <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>-Nếu bên B muốn hủy việc sử dụng dịch vụ thì phải báo cho bên A trước 24 tiếng.Nếu sau thời gian 24 tiếng bên B hủy sử dụng dịch vụ thì bên B chịu phí 30% hợp đồng</p>
                                <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>-Hai bên cam kết thi hành đúng các điều khoản của hợp đồng, không bên nào tự ý đơn phương sửa đổi, dình chỉ hoặc hủy bỏ hợp đồng. Mọi sự vi phạm phải được xử lý theo pháp luật.</p>
                                <p style={{ fontSize: '12px', fontFamily: 'Arial' }}>-Hợp đồng được lập thành 02 bản, mỗi bên giữ một bản và có giá trị như sau:</p>
                            </div>
                            <div className={styles.bottom}>
                                <div className={styles.image} style={{ width: '50%' }}>
                                    <h4 style={{ fontSize: '12px', fontFamily: 'Arial' }}>ĐẠI DIỆN BÊN A</h4>
                                    <img src={contract.templateContract.signatureImage} alt="" style={{ width: '100%' }} />
                                    <h5 style={{ marginTop: '10px' }}>{contract.templateContract.name}</h5>
                                </div>

                                <div className={styles.image} style={{ width: '50%' }}>
                                    <h4 style={{ fontSize: '12px', fontFamily: 'Arial' }}>ĐẠI DIỆN BÊN B</h4>
                                    <img src={contract.signatureImageCustomer} alt="" style={{ width: '100%' }} />
                                    <h5 style={{ textAlign: 'center', marginTop: '10px' }}>{contract.customerName}</h5>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {contract && role === 'ROLE_ADMIN' && (
                <ContractUpdate
                    contract={contract}
                    changeFlag={changeFlag}
                    setChangeFlag={setChangeFlag}
                    setContractSelected={setContractSelected}
                />
            )}

            <ReactToPrint
                trigger={() => <button>Xuất PDF</button>}
                content={() => pdfExportComponent.current}
            />
        </>
    );

};
export default ContractDetail;