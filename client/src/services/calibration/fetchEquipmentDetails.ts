const fetchEquipmentDetails = async (equipmentId = '') => {
  console.log('equipmentId here is: ', equipmentId);
  let url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/equipments/getEquipmentDetails/${equipmentId}`
  console.log(`fetch url is: ${url}`);
  const data = await fetch(url).then((res) => res.json());
  return data[0]
};

export default fetchEquipmentDetails