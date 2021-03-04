type RecordItem = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
  createdAt?: Date; //类/构造函数  ？可存在也可不存在
}
type Tag = {
  id: string;
  name: string;
}
type TagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  create: (name: string) => 'success' | 'duplicated';
  update: (id: string, name: string) => 'success' | 'duplicated' | 'not found';
  remove: (id: string) => boolean;
  save: () => void;
}
type RecordItem={
  tags: string[];
  notes: string;
  type: string;
  amount: number;
  createdAt?: Date; //类/构造函数  ？可存在也可不存在
}
// interface Window {
//
//
// }