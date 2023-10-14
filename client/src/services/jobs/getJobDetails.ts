const getJobDetails = (id: number) => {
  return fetch(`http://localhost:5001/api/getJobDetails?id=${id}`).then((res) =>
    res.json()
  );
};
export default getJobDetails;
