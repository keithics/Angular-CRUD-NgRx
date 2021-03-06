export interface ProductInterface {
  _id: string;
  name: string;
  image: string;
  price: number;
}

export interface ProductPageInterface {
  docs: ProductInterface[];
  totalDocs: number;
}
