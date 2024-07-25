import { Card, Table, Tag, Button, Popconfirm, Modal, Pagination } from "antd";
import { deactivateUser, deleteUser } from "../services/backend/UserService";
import useSWR, { mutate } from "swr";
import { useState } from "react";
import UserModal from "../components/modals/UserModal";

const userColumns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    align: "right",
  },
  {
    title: "LAST NAME",
    key: "lastName",
    dataIndex: "lastName",
  },
  {
    title: "FIRST NAME",
    dataIndex: "firstName",
    key: "firstName",
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
    render: (e) => (
      <Tag color={e.role === "patient" ? "#2db7f5" : "#87d068"}>
        {e?.role.toUpperCase()}
      </Tag>
    ),
  },
  {
    title: "ACTION",
    key: "action",
    render: (e) => (
      <div
        style={{
          display: "flex",
          gap: "8px",
          justifyContent: "center",
        }}
      >
        <Button
          onClick={(event) => {
            event.stopPropagation();
            deactivateUser(e.id, !e.deactivated);
            mutate("/users");
          }}
          danger
          type={
            !e.deactivated
              ? e.reports.length >= 3
                ? "primary"
                : "default"
              : "default"
          }
        >
          {e.deactivated ? "Unban" : "Ban"}
        </Button>

        <Popconfirm
          title="Delete user"
          description="Would you like to delete this user?"
          onConfirm={(event) => {
            event.stopPropagation();
            deleteUser(e.id);
            mutate("/users");
          }}
        >
          <Button danger onClick={(event) => event.stopPropagation()}>
            Delete
          </Button>
        </Popconfirm>
      </div>
    ),
    align: "center",
  },
];

const PAGE_SIZE = 10;

const UserTable = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { data: usersResponse } = useSWR(
    `/users?page=${currentPage}&pageSize=${PAGE_SIZE}`
  );

  return (
    <>
      <Modal
        title="User information"
        open={!!currentUser}
        onClose={() => setCurrentUser(null)}
        onCancel={() => setCurrentUser(null)}
        onOk={() => {
          // save
          setCurrentUser(null);
        }}
        okText="Save"
      >
        <UserModal user={currentUser} />
      </Modal>
      <Card
        bordered={false}
        className="criclebox tablespace mb-24"
        title="Users Table"
      >
        <div className="table-responsive flex flex-col">
          <Table
            columns={userColumns}
            dataSource={usersResponse}
            className="ant-border-space"
            onRow={(record) => {
              return {
                onClick: () => {
                  setCurrentUser(record);
                }, // click row
              };
            }}
            pagination={false}
          />
          <div className="self-end my-5">
            <Pagination
              onChange={setCurrentPage}
              pageSize={PAGE_SIZE}
              total={30}
            />
          </div>
        </div>
      </Card>
    </>
  );
};

export default UserTable;
