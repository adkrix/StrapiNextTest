type IProductProps = {
  data: LocalProduct;
};


const Product = (props: IProductProps) => {
  const { data } = props;
  const imageStyle = { backgroundImage: data.image.data.attributes.url };
  return (
    <div>
      <div className="product__image" style={imageStyle}></div>
      <div>{data.title}</div>
    </div>
  );
}

export default Product;
