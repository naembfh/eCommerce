export type Product = {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: Variant[];
  inventory: Inventory;
};

export type Variant = {
  type: string;
  value: string;
};

export type Inventory = {
  quantity: number;
  inStock: boolean;
};
