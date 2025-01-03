const getScopeService = async (
  searchString = "",
  discipline = "",
  group = "",
  material = ""
) => {
  let finalUrl;
  finalUrl = `${
    process.env.NEXT_PUBLIC_BASE_API_URL
  }/scope/getScope?search=${searchString}&discipline=${discipline}&group=${encodeURIComponent(
    group
  )}&material=${material}`;
  const data = await fetch(finalUrl).then((res) => res.json());
  return data;
};

export default getScopeService;
