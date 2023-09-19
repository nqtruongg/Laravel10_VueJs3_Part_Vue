//sử dụng thư viện Axios để tạo một instance của đối tượng Axios có cấu hình cụ thể.
import axios from "axios";

// Đối tượng Axios này được cấu hình để gửi các yêu cầu HTTP đến một API cụ thể có URL là "http://localhost:8000/api/v1".
const api = axios.create({
    baseURL: "http://localhost:8000/api/v1",
});

// bạn có thể sử dụng các phương thức của Axios như get, post, put, delete để gửi các yêu cầu HTTP đến API đích.

export default api;