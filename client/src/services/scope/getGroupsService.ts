const getGroupsService = async ({ discipline = "" }) => {
  let finalUrl;
  if (discipline !== "") {
    finalUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}/scope/getGroups?discipline=${discipline}`;
  } else {
    finalUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}/scope/getGroups`;
  }
  const data = await fetch(finalUrl).then((res) => res.json());
  return data;
};

export default getGroupsService;
