import { FC, memo } from "react";

export type Props = {
  categoryName: string;
};

export const TodoCategory: FC<Props> = memo((props) => {
  const { categoryName } = props;

  return (
    <>
      <div className="bg-gray-200 w-20 h-10 flex items-center justify-center rounded-md">
        {categoryName}
      </div>
    </>
  );
});
