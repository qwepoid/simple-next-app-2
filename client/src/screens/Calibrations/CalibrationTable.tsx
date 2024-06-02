import { useRouter } from "next/router";
import { getExpiringSoonClassName } from "./data";
import { formatDateForTable } from "./utils";

const CalibrationTable = ({ columns, rows }) => {
  const router = useRouter();
  function showInstrumentDetails(id) {
    router.push(
      { pathname: `/calibrations/${id}`, query: rows[id] },
      `/calibrations/${id}`
    );
  }
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
              <tr
                className="p-2 cursor-pointer hover:bg-slate-50 text-sm"
                onClick={() => showInstrumentDetails(el.erlId.slice(8))}
              >
                <td className="border p-2">{el?.erlId}</td>
                <td className="border p-2 max-w-xs text-ellipsis overflow-hidden capitalize">
                  {el?.equipName.toLowerCase()}
                </td>
                <td className="border p-2">{el?.section}</td>
                <td className="border p-2">{el?.url || "TC91400000002015"}</td>
                <td className="border p-2">
                  {formatDateForTable(el?.calibrationFrom)}
                </td>
                <td
                  className={`border p-2 ${getExpiringSoonClassName(
                    formatDateForTable(el?.calibrationTo)
                  )}`}
                >
                  {formatDateForTable(el?.calibrationTo)}
                </td>
                <td className="border p-2 max-w-[60px] text-ellipsis overflow-hidden">
                  {el?.calibrationBy}
                </td>
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

export default CalibrationTable;
