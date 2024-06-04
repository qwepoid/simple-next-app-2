const ScopeTable = ({ columns, rows }) => {
  if (!rows.length) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <span>No items to be displayed here</span>
      </div>
    );
  }
  return (
    <div className="overflow-scroll">
      <table>
        <thead className="sticky top-0 bg-white">
          <tr>
            {columns.map((col) => (
              <th className="p-2 border-2 border-black">{col.headerName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows ? (
            rows.map((el) => (
              <tr className="p-2 cursor-pointer hover:bg-slate-50 text-sm">
                <td className="border p-2">{el?.serial}</td>
                <td className="border p-2 text-ellipsis overflow-hidden capitalize">
                  {el?.discipline.toLowerCase()}
                </td>
                <td className="border p-2">{el?.group}</td>
                <td className="border p-2">{el?.material}</td>
                <td className="border p-2">{el?.parameter}</td>
                <td className="border p-2">{el?.method}</td>
              </tr>
            ))
          ) : (
            <div>Loading...</div>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ScopeTable;
