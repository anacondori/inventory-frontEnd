import { CategoryElement } from "./category.interface";
import { Metadatum } from "./metadata.interface";

export interface Products {
  metadata:  Metadatum[];
  product:   ProductResponse;
}

export interface ProductResponse {
  product: ProductElement[];
}

export interface ProductElement {
  id:       number;
  name:     string;
  price:    number;
  account:  number;
  category: CategoryElement;
  categName?: string;
  picture:  string;
}
