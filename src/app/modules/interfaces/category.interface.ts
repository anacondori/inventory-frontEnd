import { Metadatum } from "./metadata.interface";

export interface Category {
  metadata:         Metadatum[];
  categoryResponse: CategoryResponse;
}

export interface CategoryResponse {
  category: CategoryElement[];
}

export interface CategoryElement {
  id:          number;
  name:        string;
  description: string;
}

