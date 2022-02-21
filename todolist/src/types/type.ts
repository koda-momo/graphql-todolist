export type CategoryType = { id: string; name: String };

export type TodoType = {
  id: string;
  title: string;
  finish: boolean;
  category: CategoryType;
};
