import type { AppProps } from "next/app";
import { Layout } from "../components/Layout";
import "../styles/global.css";
//ApolloClient
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

//GraphQLのURL
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </Layout>
  );
}

export default MyApp;
