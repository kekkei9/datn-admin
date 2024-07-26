import { Button, Card, Popconfirm, Table, Tag } from "antd";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import { responseDoctorRequest } from "../services/backend/UserService";
import { doctorSpecialties } from "../constants/DoctorSpecialties";

const doctorRequestColumns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    align: "right",
  },
  {
    title: "REQUESTED BY",
    key: "requestedBy",
    render: (e) => (
      <div>
        {e.requestUser.lastName} {e.requestUser?.firstName}
      </div>
    ),
  },
  {
    title: "METADATA",
    key: "metadata",
    render: (e) => <pre>{JSON.stringify(e.metadata)}</pre>,
  },
  {
    title: "SPECIALTIES",
    key: "specialties",
    render: (e) => (
      <div>
        {e.specialties.map((specialty) => (
          <Tag key={specialty} color="">
            {doctorSpecialties.find((spec) => spec.id === specialty)?.label}
          </Tag>
        ))}
      </div>
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
            responseDoctorRequest(e.id, false);
            mutate("/users/doctor-register/requests");
          }}
          danger
        >
          Decline
        </Button>

        <Popconfirm
          title="Accept doctor request"
          description="Would you like to accept this doctor request?"
          onConfirm={(event) => {
            event.stopPropagation();
            responseDoctorRequest(e.id, true);
            mutate("/users/doctor-register/requests");
            mutate("/users");
          }}
        >
          <Button type="primary" onClick={(event) => event.stopPropagation()}>
            Accept
          </Button>
        </Popconfirm>
      </div>
    ),
    align: "center",
  },
];

const DoctorRequestTable = () => {
  const [currentDoctorRequest, setCurrentDoctorRequest] = useState(null);

  const { data: doctorRequestsResponse } = useSWR(
    "/users/doctor-register/requests"
  );
  return (
    <Card
      bordered={false}
      className="criclebox tablespace mb-24"
      title="Doctor Requests Table"
    >
      <div className="table-responsive">
        <Table
          columns={doctorRequestColumns}
          dataSource={doctorRequestsResponse}
          className="ant-border-space"
          onRow={(record) => {
            return {
              onClick: () => {
                setCurrentDoctorRequest(record);
              }, // click row
            };
          }}
        />
      </div>
    </Card>
  );
};

export default DoctorRequestTable;
