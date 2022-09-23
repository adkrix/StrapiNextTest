type ImageFormat = {
  ext: string;
  hash: string;
  height: number;
  mime: string;
  name: string;
  path: string;
  size: number;
  url: string;
  width: number;
};


type ProductImageAttributes = {
  alternativeText: string;
  caption: string;
  createdAt: string;
  ext: string;
  formats: {
    large: ImageFormat;
    medium: ImageFormat;
    small: ImageFormat;
    thumbnail: ImageFormat;
  }
  hash: string;
  height: number;
  mime: string;
  name: string;
  previewUrl: string;
  provider: string;
  size: number;
  updatedAt: string;
  url: string;
  width: number;
}

type ProductImage = {
  data: {
    id: number;
    attributes: ProductImageAttributes;
  }
}


type LocalProduct = {
  id: number;
  createdAt: string;
  image: ProductImage;
  price: number;
  publishedAt: string;
  title: string;
  type: string;
  updatedAt: string;
}

type ServerProduct = {
  id: number;
  attributes: {
    createdAt: string;
    image: ProductImage;
    price: number;
    publishedAt: string;
    title: string;
    type: string;
    updatedAt: string;
  }
}
