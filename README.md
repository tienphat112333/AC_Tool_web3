# AC Tools - Token Launchpad

Chào mừng bạn đến với **AC Tools**, một nền tảng Web3 mạnh mẽ cho phép người dùng tạo và quản lý token trên mạng Ethereum (Sepolia Testnet) một cách dễ dàng mà không cần kiến thức lập trình chuyên sâu.

## 🌟 Tính Năng Chính

Dưới đây là hướng dẫn nhanh về các tính năng của ứng dụng:

### 1. Kết Nối Ví (Wallet Connection)
-   **Đăng nhập/Đăng ký**: Người dùng kết nối ví MetaMask để đăng nhập.
-   **Xác thực**: Hệ thống sử dụng cơ chế ký message (Signature) để xác thực người sở hữu ví, đảm bảo an toàn.

### 2. Token Creator (Tạo Token)
-   **Giao diện trực quan**: Điền thông tin token như Tên, Ký hiệu (Symbol), Số lượng cung (Supply), Decimals, v.v.
-   **Upload ảnh**: Kéo thả hoặc chọn ảnh logo cho token của bạn (có xem trước hình ảnh).
-   **Mạng xã hội**: Thêm link Website, Telegram, Discord, Twitter (X) cho dự án token.
-   **Tự động**: Hệ thống tự động tạo Smart Contract và deploy lên mạng Sepolia.

### 3. Dashboard & Token List
-   **Tổng quan**: Xem danh sách các token đã được tạo trên nền tảng.
-   **Chi tiết**: Xem thông tin chi tiết của từng token.

### 4. Hồ Sơ Người Dùng (Profile)
-   **Quản lý tài sản**: Xem số dư ZKN và danh sách các token/NFT bạn sở hữu.
-   **Chỉnh sửa hồ sơ**: Cập nhật thông tin cá nhân như Tên hiển thị, Bio, và các liên kết mạng xã hội.

---

## 🛠 Yêu Cầu Hệ Thống

Danh sách các công cụ cần thiết để chạy dự án:

-   **Node.js**: v22.11.0 trở lên
-   **Yarn** (hoặc npm/pnpm)
-   **Ví MetaMask**: Cài đặt extension trên trình duyệt.

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy

Làm theo các bước sau để chạy dự án trên máy của bạn:

### 1. Cài đặt dependencies
Mở terminal tại thư mục `frontend` và chạy:

```bash
yarn install
```

### 2. Biến Môi trường (.env)
Đảm bảo bạn đã cấu hình các biến môi trường cần thiết (ví dụ: `VITE_API_URL`, `VITE_WALLET_CONNECT_PROJECT_ID`...) trong file `.env`.

### 3. Khởi động Development Server
Chạy lệnh sau để bắt đầu:

```bash
yarn dev
```

Truy cập [http://localhost:5173/](http://localhost:5173/) trên trình duyệt để sử dụng.

---

## 📦 Triển Khai (Deployment)

Để build ứng dụng cho môi trường sản xuất (Production):

-   **Staging**:
    ```bash
    yarn build:staging
    ```
-   **Production**:
    ```bash
    yarn build:production
    ```

Sau khi build, thư mục `dist` sẽ được tạo ra chứa mã nguồn đã tối ưu, sẵn sàng để deploy lên Vercel, Netlify hoặc Hosting bất kỳ.

## 🤝 Đóng Góp
Mọi đóng góp đều được hoan nghênh. Vui lòng tạo Pull Request hoặc Issue nếu bạn tìm thấy lỗi.
