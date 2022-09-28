import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { Button, Col, Input, Row, Space, Typography } from "antd";

import { Repository, SearchRepositoriesQueryResponse } from "./types";
import { SEARCH_REPOSITORIES_QUERY } from "./queries";
import RepositoryTable from "./components/RepositoryTable";

const DEFAULT_SEARCH = "react";

function RepositorySearch() {
  const [searchQuery, setSearchQuery] = useState(DEFAULT_SEARCH);
  const [lastCursor, setLastCursor] = useState<null | string>(null);
  const [repositories, setRepositories] = useState<Repository[]>([]);

  const { loading, error, data } = useQuery<SearchRepositoriesQueryResponse>(
    SEARCH_REPOSITORIES_QUERY,
    {
      variables: {
        query: searchQuery,
        after: lastCursor,
      },
    }
  );

  useEffect(() => {
    const newRepositories = data?.search.nodes;
    if (!newRepositories) return;

    setRepositories((oldRepositories) => {
      const isDataStale = oldRepositories.includes(newRepositories[0]);
      if (isDataStale) return oldRepositories;

      return [...oldRepositories, ...newRepositories];
    });
  }, [data]);

  const onSearch = (searchValue: string) => {
    if (searchValue === searchQuery) return;

    setRepositories([]);
    setLastCursor(null);
    setSearchQuery(searchValue);
  };

  const onLoadMore = () => {
    const lastCursor = data?.search.pageInfo.endCursor;
    if (!lastCursor) return;

    setLastCursor(lastCursor);
  };

  return (
    <Space direction="vertical" size="large">
      <Typography.Title style={{ textAlign: "center" }}>
        GitHub repository search (GraphQL API v4)
      </Typography.Title>

      <Input.Search defaultValue={DEFAULT_SEARCH} onSearch={onSearch} />

      {repositories.length ? (
        <>
          <RepositoryTable repositories={repositories} />

          {(loading || data?.search.pageInfo.hasNextPage) && (
            <Row justify="center">
              <Col>
                <Button disabled={loading} onClick={onLoadMore}>
                  Load more
                </Button>
              </Col>
            </Row>
          )}
        </>
      ) : (
        <Row justify="center">
          <Col>
            {loading ? (
              <Typography.Text type="secondary">Loading...</Typography.Text>
            ) : error ? (
              <Typography.Text type="danger">{error.message}</Typography.Text>
            ) : // Even though it's the same render when 'repositories' is set, the message pops up for a brief moment.
            !data?.search.nodes.length ? (
              <Typography.Text>
                Search query "{searchQuery}" yielded no results.
              </Typography.Text>
            ) : null}
          </Col>
        </Row>
      )}
    </Space>
  );
}

export default RepositorySearch;
