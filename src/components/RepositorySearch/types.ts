export interface Repository {
  id: string;
  nameWithOwner: string;
  url: string;
  forkCount: number;
  stargazerCount: number;
}

export interface SearchRepositoriesQueryResponse {
  search: {
    pageInfo: {
      endCursor: string;
    };
    nodes: Repository[];
  };
}
