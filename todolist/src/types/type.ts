export type CategoryType = { id: string; name: string };

export type TodoType = {
  id: string;
  title: string;
  finish: boolean;
  category: CategoryType;
};
