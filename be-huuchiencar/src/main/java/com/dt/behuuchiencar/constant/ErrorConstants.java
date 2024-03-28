package com.dt.behuuchiencar.constant;

public class ErrorConstants {

    public static final int INVALID_CREDENTIALS_CODE = 401;
    public static final String INVALID_CREDENTIALS_MESSAGE = "Tên đăng nhập hoặc mật khẩu không đúng";

    public static final int INVALID_DATA_CODE = 400;
    public static final String INVALID_DATA_MESSAGE = "Data không đúng định dạng";

    public static final int NOT_FOUND_CODE = 404;
    public static final String NOT_FOUND_MESSAGE = "Không tìm thấy dữ liệu";

    public static final int INTERNAL_SERVER_ERROR_CODE = 500;
    public static final String INTERNAL_SERVER_ERROR_MESSAGE = "Server xảy ra lỗi. Vui lòng truy cập lại.";

    public static final int UNAUTHORIZED_CODE = 401;
    public static final String UNAUTHORIZED_MESSAGE = "Truy cập trái phép. Vui lòng đăng nhập để tiếp tục.";

    public static final int FORBIDDEN_CODE = 403;
    public static final String FORBIDDEN_MESSAGE = "Truy cập bị cấm. Bạn không có đủ quyền để thực hiện hành động này.";

    public static final int EMAIL_ALREADY_EXISTS_CODE = 409;
    public static final String EMAIL_ALREADY_EXISTS_MESSAGE = "Tên người dùng đã tồn tại trong hệ thống";

    public static final int INVALID_CITIZENID_CODE = 401;
    public static final String INVALID_CITIZENID_MESSAGE = "Người dùng đã tồn tại trong hệ thống";
    
}
