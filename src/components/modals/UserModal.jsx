const UserModal = ({ user }) => {
  return (
    <div className="flex">
      <img src={user?.avatar} width={200}></img>
      <div>
        <div>ID: {user?.id}</div>
        <div>Address: {user?.address}</div>
        <div>Birthdate: {user?.birthdate}</div>
        <div>Email: {user?.email}</div>
        <div>First name: {user?.firstName}</div>
        <div>Last name: {user?.lastName}</div>
        <div>Gender: {user?.gender}</div>
        <div>Weight: {user?.weight}</div>
        <div>Height: {user?.height}</div>
        <div>Role: {user?.role}</div>
        <div> Reports:</div>
        <ul>
          {user?.reports.map((report) => (
            <li key={report.id}>{report.reason}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

UserModal.propTypes = {
  user: {},
};

export default UserModal;
