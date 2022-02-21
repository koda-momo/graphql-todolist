import { FC, memo } from "react";
import { TrashBox } from "./TrashBox";
import { Pencil } from "./Pencil";

export const TodoList: FC = memo(() => {
  return (
    <>
      <div className="border-solid border-2 border-gray-500 m-10 p-3 rounded-md">
        {/* <div className="w-full h-12 bg-teal-300 flex items-center justify-center text-xl rounded-t-md">
          やること一覧
        </div> */}
        <div className="flex items-center">
          <div className="m-5 bg-stone-100 drop-shadow-md w-60 h-12 flex items-center justify-center text-xl">
            掃除
          </div>
          <div>
            <Pencil />
          </div>
          <div className="ml-3">
            <TrashBox />
          </div>
        </div>
      </div>
    </>
  );
});
