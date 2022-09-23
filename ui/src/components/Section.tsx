import Product from '@/components/Product';

type ISectionProps = {
  data: ProductSection;
};


const Section = (props: ISectionProps) => {
  const { data } = props;
  return (
    <div className="section">
      <h2 className="section__title">{data.title}</h2>
      <div className="section__data">{data.data.map(
        (product: LocalProduct, i: number) => <Product data={product} key={i} />
      )}</div>
    </div>
  );
}

export default Section;
