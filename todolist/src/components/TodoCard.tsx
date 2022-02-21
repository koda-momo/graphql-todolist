import { FC, memo } from "react";
import { Pencil } from "./Pencil";
import { TodoCategory } from "./TodoCategory";
import { TrashBox } from "./TrashBox";

export type Props = {
  title: string;
  todoId: string;
  categoryName: string;
  finish: boolean;
};

export const TodoCard: FC<Props> = memo((props) => {
  const { title, todoId, categoryName, finish } = props;

  return (
    <>
      <div className={`${finish && "opacity-25"} flex items-center`}>
        <div>
          <TodoCategory categoryName={categoryName} />
        </div>
        <div className="mx-5 my-3 bg-stone-100 drop-shadow-md w-60 h-12 flex items-center justify-center text-xl">
          {title}
        </div>
        <div>
          <Pencil />
        </div>
        <div className="ml-3">
          <TrashBox todoId={todoId} />
        </div>
      </div>
    </>
  );
});
