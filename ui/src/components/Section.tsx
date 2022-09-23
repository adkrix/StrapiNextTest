import Product from '@/components/Product';

type ISectionProps = {
  data: ProductSection;
};


const Section = (props: ISectionProps) => {
  const { data } = props;
  return (
    <div>
      <h2>{data.title}</h2>
      <div>{data.data.map((product: LocalProduct) => <Product data={product} />)}</div>
    </div>
  );
}

export default Section;
