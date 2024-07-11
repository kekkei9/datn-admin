import { Button, Card, Popconfirm, Table, Modal } from "antd";
import { deletePrescription } from "../services/backend/PrescriptionService";

import useSWR, { mutate } from "swr";
import { useState } from "react";

import PrescriptionModal from "../components/modals/PrescriptionModal";

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
  {
    title: "ACTION",
    key: "action",
    render: (e) => (
      <Popconfirm
        title="Delete prescription"
        description="Would you like to delete this prescription?"
        onConfirm={() => {
          deletePrescription(e.id);
          mutate("/prescriptions");
        }}
      >
        <Button danger onClick={(event) => event.stopPropagation()}>
          Delete
        </Button>
      </Popconfirm>
    ),
  },
];

const PrescriptionTable = () => {
  const [currentPrescription, setCurrentPrescription] = useState(null);

  const { data: prescriptionsResponse } = useSWR("/prescriptions");
  return (
    <>
      <Modal
        title="Prescription information"
        open={!!currentPrescription}
        onClose={() => setCurrentPrescription(null)}
        onCancel={() => setCurrentPrescription(null)}
        onOk={() => {
          // save
          setCurrentPrescription(null);
        }}
        okText="Save"
      >
        <PrescriptionModal prescription={currentPrescription} />
      </Modal>
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
            onRow={(record) => {
              return {
                onClick: () => {
                  setCurrentPrescription(record);
                },
              };
            }}
          />
        </div>
      </Card>
    </>
  );
};

export default PrescriptionTable;
