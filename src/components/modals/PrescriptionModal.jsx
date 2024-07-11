const PrescriptionModal = ({ prescription }) => {
  return (
    <div>
      <div className="font-medium text-xl">ID: {prescription?.id}</div>
      <div className="font-medium text-xl">Medicines: </div>
      <div>
        {prescription?.data.medicines.map(({ name, dosage }, index) => (
          <div key={index}>
            Name: {name}, Dosage: {dosage}
          </div>
        ))}
      </div>

      <div className="font-medium text-xl mb-4">Images</div>
      <div>
        {prescription?.images?.map((url, index) => (
          <img key={index} src={url} width={200} height={200} />
        ))}
      </div>
    </div>
  );
};

PrescriptionModal.propTypes = {
  prescription: {},
};

export default PrescriptionModal;
