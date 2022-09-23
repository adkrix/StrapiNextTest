type IProductProps = {
  data: LocalProduct;
};


const Product = (props: IProductProps) => {
  const { data } = props;
  const {url, width, height} = data.image.data.attributes.formats.large;
  const imageUrl = `http://localhost:1337${url}?width=${width}&height=${height}`;
  const imageStyle = {backgroundImage: `url('${imageUrl}')`};
  console.log(imageStyle)
  return (
    <div className="product">
      <div className="product__image" style={imageStyle}></div>
      <div className="product__title">{data.title}</div>
      <div className="product__price">USD {data.price.toFixed(2)}</div>
    </div>
  );
}

export default Product;
