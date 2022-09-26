import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Typography } from "antd";

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  cache: new InMemoryCache(),
  headers: {
    Authorization: `bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`,
  },
});

function ApolloGitHub({ children }: React.PropsWithChildren) {
  if (!process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div>
          <Typography.Text type="danger">
            Missing "REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN" environment
            variable.
          </Typography.Text>
        </div>

        <div>
          <Typography.Link
            href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token"
            target="_blank"
          >
            Create your PAT.
          </Typography.Link>
        </div>
      </div>
    );
  }

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default ApolloGitHub;
