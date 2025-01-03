import { useEffect, useState } from "react";
import Dropdown from "../../../components/Dropdown";
import useGetGroupsList from "../service-hooks/useGetGroupsList";

const GroupFilter = ({ discipline = "", onGroupChange }) => {
  const { data, getGroups } = useGetGroupsList({
    discipline: "",
    callByDefault: 1,
  });

  function transformGroups(data) {
    return data?.reduce((acc, cur) => {
      acc.push({
        label: cur,
        value: cur,
      });
      return acc;
    }, []);
  }
  const items = transformGroups(data);
  const [currentGroups, setCurrentGroups] = useState(items ?? []);

  async function updateGroups(discipline) {
    const newGroups = await getGroups({ discipline: discipline });
    setCurrentGroups(transformGroups(newGroups));
  }

  useEffect(() => {
    updateGroups(discipline);
  }, [discipline]);
  return (
    <Dropdown
      options={currentGroups}
      selectedValue={undefined}
      placeholder={"Select Group"}
      onSelectionChange={onGroupChange}
    />
  );
};

export default GroupFilter;
