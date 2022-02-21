import { FC, memo } from "react";

export const TodoList: FC = memo(() => {
  return (
    <>
      <div className="bg-stone-300 m-10 pb-3 rounded-md">
        <div className="w-full h-12 bg-teal-300 flex items-center justify-center text-xl rounded-t-md">
          やること一覧
        </div>
        <div className="m-5 bg-stone-100 drop-shadow-md w-60 h-12 flex items-center justify-center text-xl">
          掃除
        </div>
        <div className="m-5 bg-stone-100 drop-shadow-md w-60 h-12 flex items-center justify-center text-xl">
          掃除
        </div>
        <div className="m-5 bg-stone-100 drop-shadow-md w-60 h-12 flex items-center justify-center text-xl">
          掃除
        </div>
      </div>
    </>
  );
});
