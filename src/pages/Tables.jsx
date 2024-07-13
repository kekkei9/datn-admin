import { Col, Row } from "antd";

import PrescriptionTable from "../containers/PrescriptionTable";
import ReportTable from "../containers/ReportTable";
import UserTable from "../containers/UserTable";
import DoctorRequestTable from "../containers/DoctorRequestTable";

function Tables() {
  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <UserTable />

            <DoctorRequestTable />

            <PrescriptionTable />

            <ReportTable />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Tables;
