import { Fragment } from "react";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { AppRouter } from "./routes/RouterProvider";

function App() {
  const queryClient = new QueryClient()

  return (
    <Fragment>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
      </QueryClientProvider>
    </Fragment>
  );
}

export default App;
