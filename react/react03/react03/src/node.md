Context Api :

- Tạo đối tượng context : React.createContext
- Provider : Component có sẵn của Context, dùng để gửi giữ liệ tới các Component con
- Consumer: Nhân dữ liệ từ Provider ( có thể sử dụng hook useContext)

Context nâng cao xây dựng State Manager kết hợp với useReducer

State: 
1. local state -> state nội bộ trong 1 component
2. Global state -> Kho lưu trữ các state mà các component có thể sử dụng 