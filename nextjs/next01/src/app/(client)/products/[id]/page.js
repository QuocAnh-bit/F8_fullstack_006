export const generateMetadata = ({ params }) => {
  return {
    title: "Sản phẩm -" + params.id,
  };
};

export default function ProductsDetail({ params }) {
  console.log(params);
  return (
    <div>
      <h1>Chi tiết sản phẩm: {params.id}</h1>
    </div>
  );
}
