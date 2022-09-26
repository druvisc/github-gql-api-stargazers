import { Alert } from "antd";

import ApolloGitHub from "./providers/ApolloGitHub";
import RepositorySearch from "./components/RepositorySearch";

function App() {
  return (
    <div style={{ maxWidth: "600px", margin: "24px auto" }}>
      <Alert.ErrorBoundary>
        <ApolloGitHub>
          <RepositorySearch />
        </ApolloGitHub>
      </Alert.ErrorBoundary>
    </div>
  );
}

export default App;
