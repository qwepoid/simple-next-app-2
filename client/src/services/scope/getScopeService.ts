const getScopeService = async (searchString = "") => {
  let finalUrl;
  if (searchString) {
    finalUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}/scope/getScope?q=${searchString}`;
  } else {
    finalUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}/scope/getScope`;
  }
  const data = await fetch(finalUrl).then((res) => res.json());
  return data;
};

export default getScopeService;
