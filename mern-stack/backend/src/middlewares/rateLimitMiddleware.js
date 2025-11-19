import rateLimit from 'express-rate-limit';

// Định nghĩa Limiter cho các API chung (Global API Limiter)
// Mục đích: Chống DDoS cấp độ nhẹ
export const apiLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // Thời gian: 5 phút
    max: 100, // Số lượng request tối đa trong 5 phút
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Bạn đã gửi quá nhiều yêu cầu đến API. Vui lòng thử lại sau 5 phút.'
});

// Định nghĩa Limiter cho các API Authentication (Đăng nhập/Đăng ký)
// Mục đích: Chống Brute-force
export const authLimiter = rateLimit({
    windowMs: 2 * 60 * 1000, // Thời gian: 2 phút
    max: 50, // Số lượng lần thử tối đa trong 5 phút
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Quá nhiều lần thử đăng nhập/đăng ký không thành công. Vui lòng thử lại sau 2 phút.'
});