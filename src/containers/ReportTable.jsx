import { Card, Table } from "antd";

import useSWR from "swr";

const reportsColumns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    align: "center",
  },
  {
    title: "REASON",
    dataIndex: "reason",
    key: "reason",
  },
  {
    title: "REPORTED BY",
    key: "reportedBy",
    render: (e) => e.createdBy?.firstName,
    align: "center",
  },
  {
    title: "REPORTED TO",
    key: "reportedTo",
    render: (e) => e.belongTo?.firstName,
    align: "center",
  },
];

const ReportTable = () => {
  const { data: reportssResponse } = useSWR("/reports");
  return (
    <Card
      bordered={false}
      className="criclebox tablespace mb-24"
      title="Reports Table"
    >
      <div className="table-responsive">
        <Table
          columns={reportsColumns}
          dataSource={reportssResponse}
          className="ant-border-space"
        />
      </div>
    </Card>
  );
};

export default ReportTable;
