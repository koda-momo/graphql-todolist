import { FC, memo } from "react";
import Link from "next/link";

export type Props = {
  todoId: string;
};

export const Pencil: FC<Props> = memo((props) => {
  const { todoId } = props;
  return (
    <>
      <Link href={`/${todoId}`}>
        <a className="bg-yellow-400 w-10 h-10 flex items-center justify-center rounded-md text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </a>
      </Link>
    </>
  );
});
