import { Card, Col, Row, Table } from "antd";

import useSWR from "swr";

// Images

const userColumns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "FIRST NAME",
    dataIndex: "firstName",
    key: "firstName",
  },

  {
    title: "LAST NAME",
    key: "lastName",
    dataIndex: "lastName",
  },
  {
    title: "NUMBER OF REPORTS",
    key: "numberOfReports",
    render: (e) => e.reports.length,
    align: "center",
  },
  {
    title: "ROLE",
    key: "role",
    dataIndex: "role",
  },
];

// project table start
const prescriptionsColumns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "MEDICINES",
    key: "medicines",
    render: (e) => (
      <div>
        {e.data.medicines.map(({ name, dosage }, index) => (
          <div key={index}>
            Name: {name}, Dosage: {dosage}
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "IMAGES",
    key: "images",
    render: (e) => (
      <div>
        {e.images?.map((url, index) => (
          <img key={index} src={url} width={40} height={40} />
        ))}
      </div>
    ),
  },
];

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
    render: (e) => e.createdBy.firstName,
    align: "center",
  },
  {
    title: "REPORTED TO",
    key: "reportedTo",
    render: (e) => e.belongTo.firstName,
    align: "center",
  },
];

function Tables() {
  const { data: usersResponse } = useSWR("/users");

  const { data: prescriptionsResponse } = useSWR("/prescriptions");

  const { data: reportssResponse } = useSWR("/reports");

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Users Table"
            >
              <div className="table-responsive">
                <Table
                  columns={userColumns}
                  dataSource={usersResponse}
                  className="ant-border-space"
                />
              </div>
            </Card>

            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Prescriptions Table"
            >
              <div className="table-responsive">
                <Table
                  columns={prescriptionsColumns}
                  dataSource={prescriptionsResponse}
                  className="ant-border-space"
                />
              </div>
            </Card>

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
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Tables;
