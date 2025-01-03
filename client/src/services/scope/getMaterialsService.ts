const getMaterialsService = async ({ discipline = "", group = "" }) => {
  let finalUrl;
  if (discipline === "" && group === "") {
    finalUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}/scope/getMaterials`;
  } else if (discipline !== "" && group !== "") {
    finalUrl = `${
      process.env.NEXT_PUBLIC_BASE_API_URL
    }/scope/getMaterials?discipline=${discipline}&group=${encodeURIComponent(
      group
    )}`;
  } else {
    finalUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}/scope/getMaterials?${
      discipline
        ? "discipline=" + discipline
        : "group=" + encodeURIComponent(group)
    }`;
  }
  const data = await fetch(finalUrl).then((res) => res.json());
  console.log("data: ", data);
  return data;
};

export default getMaterialsService;
