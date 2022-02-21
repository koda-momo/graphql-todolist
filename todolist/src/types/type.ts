export type CategoryType = { id: String; name: String };

export type TodoType = {
  id: string;
  title: string;
  finish: boolean;
  category: CategoryType;
};
