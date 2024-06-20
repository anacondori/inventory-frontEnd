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

export interface Metadatum {
  date: string;
  code: string;
  type: string;
}
