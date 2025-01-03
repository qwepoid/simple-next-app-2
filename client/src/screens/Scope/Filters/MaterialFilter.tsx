import { useEffect, useState } from "react";
import Dropdown from "../../../components/Dropdown";
import useGetMaterialsList from "../service-hooks/useGetMaterialsList";

const MaterialFilter = ({ discipline, group, onMaterialChange }) => {
  const { data, getMaterials } = useGetMaterialsList({
    discipline: "",
    group: "",
    callByDefault: 1,
  });

  function transformMaterials(data) {
    return data?.reduce((acc, cur) => {
      acc.push({
        label: cur,
        value: cur,
      });
      return acc;
    }, []);
  }
  const items = transformMaterials(data);
  const [currentMaterials, setCurrentMaterials] = useState(items ?? []);

  async function updateMaterials({ discipline, group }) {
    const newMaterials = await getMaterials({
      discipline: discipline,
      group: group,
    });
    setCurrentMaterials(transformMaterials(newMaterials));
  }

  useEffect(() => {
    updateMaterials({ discipline, group });
  }, [discipline, group]);

  return (
    <Dropdown
      options={currentMaterials}
      selectedValue={undefined}
      placeholder={"Select Material"}
      onSelectionChange={(val) => onMaterialChange(val)}
    />
  );
};

export default MaterialFilter;
