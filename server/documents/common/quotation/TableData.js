const TableData = () => {
  return Array(30)
    .fill()
    .map(
      (_, i) => `
    <tr>
    <td style="border: 1px solid #000; 
       width: 1rem; 
       font-size: 0.6rem;
       line-height: 1rem; 
       ">${i + 1}</td>
    <td style="border: 1px solid #000; 
       font-size: 0.6rem;
       line-height: 1rem; 
       max-width: 200px;">
       This includes the finest quality of Standard Penetration Test (SPT), along with mobilization and site labour.
    </td>
    <td style="border: 1px solid #000; 
       width: 2rem; 
       font-size: 0.6rem;
       line-height: 1rem; ">12</td>
    <td style="border: 1px solid #000; 
       font-size: 0.6rem;
       line-height: 1rem; 
       max-width: 250px;">
       Boreholes
    </td>
    <td style="border: 1px solid #000; 
       font-size: 0.6rem;
       line-height: 1rem; 
       max-width: 250px">
       $ 20,000
    </td>
    <td style="border: 1px solid #000; 
       font-size: 0.6rem;
       line-height: 1rem; 
       max-width: 250px">
       $ 1,20,000
    </td>
 </tr>
`
    )
    .join("");
};

export default TableData;
