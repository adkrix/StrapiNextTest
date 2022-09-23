import useSWR from 'swr'
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import Section from '@/components/Section';

const dataUrl = 'http://localhost:1337/api/products?populate=image';

const titles: any = {
  shirt: 'Polo shirts',
  underwear: 'Trousers & Shorts',
};

const fetcher = (...args: any[]) => fetch(...args)
  .then((res) => res.json())
  .then((list: { data: ServerProduct[] }) => {
    const data = list.data.reduce((acc: any, item: ServerProduct) => {
      const { type } = item.attributes;
      if (!acc[type]) {
        acc[type] = [];
      }
      const product: LocalProduct = { id: item.id, ...item.attributes};
      acc[type] = [...acc[type], product];
      return acc;
    }, {});
    console.log('e', data);
    return Object.keys(data).reduce((acc: any[], name: string) => {
      return [
        ...acc,
        {
          name,
          title: titles[name],
          data: data[name],
        },
      ]
    }, []);
  })

const Index = () => {

  const { data, error } = useSWR(dataUrl, fetcher)

  let content = null;

  if (error) {
    content = (<div>Failed to load</div>);
  } else if (!data) {
    content = (<div>Loading...</div>);
  }
  console.log(data)
  return (
    <Main
      meta={
        <Meta
          title="Product page title"
          description="Product page description"
        />
      }
    >
      {content}
      {!content && data?.map((section: ProductSection) => (<Section data={section} />)) }
    </Main>
  );
};

export default Index;
