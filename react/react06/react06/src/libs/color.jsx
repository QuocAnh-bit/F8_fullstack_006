export const color = (Component) => {
  const color = "#" + Math.random().toString(16).slice(-6);
  return function MyComponent(props) {
    return (
      <div className="color" style={{ color }}>
        <Component {...props} />
      </div>
    );
  };
};

// Tạo ra 1 components mới bên trong hàm khác
// Hàm color -> hàm bọc ( hàm cấp cao hơn )
