import { Button, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { Repository } from "../../types";

const columns: ColumnsType<Repository> = [
  {
    title: "Repository",
    dataIndex: "nameWithOwner",
    key: "nameWithOwner",
    sorter: (a, b) => {
      if (a.nameWithOwner < b.nameWithOwner) return -1;
      if (a.nameWithOwner > b.nameWithOwner) return 1;

      return 0;
    },
    render: (_, row) => (
      <Button type="link" href={row.url} target="_blank">
        {row.nameWithOwner}
      </Button>
    ),
  },
  {
    title: "Stars 🌟",
    dataIndex: "stargazerCount",
    key: "stargazerCount",
    sorter: (a, b) => a.stargazerCount - b.stargazerCount,
  },
  {
    title: "Forks 🍴",
    dataIndex: "forkCount",
    key: "forkCount",
    sorter: (a, b) => a.forkCount - b.forkCount,
  },
];

type Props = {
  repositories: Repository[];
};

function RepositoryTable({ repositories }: Props) {
  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={repositories}
      pagination={false}
    />
  );
}

export default RepositoryTable;
