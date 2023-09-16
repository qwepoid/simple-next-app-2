const TableData = (items) => {
  return items
    .map(
      (item, idx) => `
         <tr>
            <td style="border: 1px solid #000; 
               width: 1rem; 
               font-size: 0.6rem;
               line-height: 1rem; 
               ">${idx + 1}</td>
            <td style="border: 1px solid #000;
               max-width: 200px;     
               ">
               <span style="white-space: pre-line;
               margin-top: -20px;
               display:block;
               font-size: 0.6rem;
               line-height: 1rem; ">
               ${item.testDescription}
               </span>
            </td>
            <td style="border: 1px solid #000; 
               width: 2rem; 
               font-size: 0.6rem;
               line-height: 1rem; ">${item.quantity}</td>
            <td style="border: 1px solid #000; 
               font-size: 0.6rem;
               line-height: 1rem; 
               max-width: 250px;">
               ${item.unit}
            </td>
            <td style="border: 1px solid #000; 
               font-size: 0.6rem;
               line-height: 1rem; 
               max-width: 250px">
               ₹${item.rate.toLocaleString("en-IN")}
            </td>
            <td style="border: 1px solid #000; 
               font-size: 0.6rem;
               line-height: 1rem; 
               max-width: 250px">
               ₹${
                 (Number(item.quantity) * Number(item.rate)).toLocaleString(
                   "en-IN"
                 ) || Number(item.rate).toLocaleString("en-IN")
               }
            </td>
         </tr>
      `
    )
    .join("");
};

export default TableData;
