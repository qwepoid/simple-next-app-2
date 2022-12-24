const getJobs = () => {
    return fetch(`http://localhost:5000/api/getJobs`).then((res) =>
      res.json()
    )
}
export default getJobs;