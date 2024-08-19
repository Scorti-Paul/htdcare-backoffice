export interface Category {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface IDynamicInput {
  unit: string;
  price: string;
}

export interface IDynamicProps {
  inputs: IDynamicInput[];
  setInputs: React.Dispatch<React.SetStateAction<IDynamicInput[]>>;
}
