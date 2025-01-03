import Dropdown from "../../../components/Dropdown";

const DisciplineFilter = ({ onDisciplineChange }) => {
  const items = [
    {
      label: "Chemical",
      value: "CHEMICAL",
    },
    {
      label: "Mechanical",
      value: "MECHANICAL",
    },
    {
      label: "Non-Destructive",
      value: "NON-DESTRUCTIVE",
    },
  ];

  return (
    <Dropdown
      options={items}
      selectedValue={undefined}
      placeholder={"Select Discipline"}
      onSelectionChange={(value) => onDisciplineChange(value)}
    />
  );
};

export default DisciplineFilter;
