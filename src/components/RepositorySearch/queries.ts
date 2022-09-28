import { gql } from "@apollo/client";

const SEARCH_TYPE = "REPOSITORY";
const RESULTS_PER_PAGE = 10;

export const SEARCH_REPOSITORIES_QUERY = gql`
  query SearchRepositoriesQuery($query: String!, $after: String) {
    search(query: $query, type: ${SEARCH_TYPE}, first: ${RESULTS_PER_PAGE}, after: $after) {
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        ... on Repository {
          id
          nameWithOwner
          url
          stargazerCount
          forkCount
        }
      }
    }
  }
`;
