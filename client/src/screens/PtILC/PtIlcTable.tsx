const PtIlcTable = () => {
  return (
    <table>
      <tr>
        <th className="border p-2">Section</th>
        <th className="border p-2">Discipline</th>
        <th className="border p-2">Parameter</th>
        <th className="border p-2">2023</th>
        <th className="border p-2">2024</th>
        <th className="border p-2">Status</th>
      </tr>
      <tr>
        <td className="border p-2  row-span-2">Chemical</td>
        <td className="border p-2">Construction Water</td>
        <td className="border p-2">Alkalinity</td>
        <td className="border p-2">PT</td>
        <td className="border p-2">-</td>
      </tr>
      <tr>
        <td className="border p-2">Chemical</td>
        <td className="border p-2">Construction Water</td>
        <td className="border p-2">Acidity</td>
        <td className="border p-2">-</td>
        <td className="border p-2">PT</td>
      </tr>
    </table>
  );
};

export default PtIlcTable;
