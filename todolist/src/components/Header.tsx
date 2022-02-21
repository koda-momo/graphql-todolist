import { FC, memo } from "react";

export const Header: FC = memo(() => {
  return (
    <>
      <header className="w-full bg-stone-400 h-20 flex items-center text-3xl pl-10 text-white">
        Todoリスト
      </header>
    </>
  );
});
