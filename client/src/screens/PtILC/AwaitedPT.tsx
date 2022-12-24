const AwaitedPT = () => {
  return (
    <>
      <div className="mb-4 font-bold underline text-stone-600 text-xl">
        Awaited Results
      </div>
      <table>
        <tr>
          <th className="p-2 border">S.No.</th>
          <th className="p-2 border">Agency</th>
          <th className="p-2 border">Ref. No</th>
          <th className="p-2 border">Discipline</th>
          <th className="p-2 border">Material</th>
          <th className="p-2 border">Status</th>
        </tr>
        <tr>
          <td className="p-2 border">1</td>
          <td className="p-2 border">CIMEC</td>
          <td className="p-2 border">CIL/PT-22M/C.AGG/A-02</td>
          <td className="p-2 border">Chemical</td>
          <td className="p-2 border">Coarse Aggregate</td>
          <td className="p-2 border">Results Awaited</td>
        </tr>
      </table>
    </>
  );
};

export default AwaitedPT;
