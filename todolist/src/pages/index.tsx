import type {
  NextPage,
  GetServerSidePropsContext,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import { TodoList } from "../components/TodoList";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;
const Home: NextPage<Props> = (props) => {
  const { initialData } = props;
  return (
    <>
      <div>
        <TodoList todoList={initialData} />
      </div>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const initialData = await "aaa";
  return {
    props: { initialData },
  };
};
