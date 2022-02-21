import { ReactNode, FC, memo } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

type Props = {
  children: ReactNode;
};

export const Layout: FC<Props> = memo(({ children }) => {
  return (
    <>
      <div>
        <Header />
        <main> {children} </main>
        <Footer />
      </div>
    </>
  );
});
