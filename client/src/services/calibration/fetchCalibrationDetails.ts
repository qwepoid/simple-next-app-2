const getCalibrationsService = async (searchString = '') => {
  let finalUrl;
  console.log('search string here is: ', searchString);
  
  if (searchString) {
    finalUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/getEquipments?q=${searchString}`
  } else {
    finalUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/getEquipments`
  }
  const data = await fetch(finalUrl).then((res) => res.json());
  return data
  };

// const fetchCalibrationDetails = async () => {
//     const a = await fetch('/api/calibration/details')
//     return { ...a }
// }

export default getCalibrationsService