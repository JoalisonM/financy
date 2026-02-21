import { RouterProvider } from "react-router";
import { router } from "./routes/router";
import { ApolloProvider } from "@apollo/client/react";
import { apolloClient } from "./lib/apollo";

export function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <RouterProvider router={router} />
    </ApolloProvider>
  );
}
