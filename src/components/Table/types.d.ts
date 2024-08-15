type Type = "action" | "text" | "date";
type KeyType = "text" | "date" | "currency";
interface ActionType {
  onClick: (e, dataFromTable = null) => void;
  name: "view" | "edit" | "suspend";
}

interface Column {
  type?: Type;
  headerText: string;
  capitalize?: boolean;

  keys?: {
    value?: string[];
    type?: KeyType;
  };
  actions?: ActionType[];
  format?: string;
}

export interface TableProps {
  columns: Column[];
  data: any;
}
