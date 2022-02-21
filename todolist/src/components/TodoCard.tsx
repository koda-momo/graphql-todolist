import { FC, memo } from "react";
import { TrashBox } from "./TrashBox";
import { Pencil } from "./Pencil";
import { TodoType } from "../types/type";

export type Props = {
  title: string;
};

export const TodoCard: FC<Props> = memo((props) => {
  const { title } = props;

  return (
    <>
      <div className="flex items-center">
        <div className="mx-5 my-3 bg-stone-100 drop-shadow-md w-60 h-12 flex items-center justify-center text-xl">
          {title}
        </div>
        <div>
          <Pencil />
        </div>
        <div className="ml-3">
          <TrashBox />
        </div>
      </div>
    </>
  );
});
