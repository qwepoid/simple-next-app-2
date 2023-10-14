const TaxesAndTotals = (items) => {
  const netTotal = items.reduce((acc, cur) => {
    acc += cur.quantity * cur.rate || cur.rate;
    return acc;
  }, 0);

  const gst = 0.18;

  const gstTotal = netTotal * gst;
  const grossTotal = netTotal + gstTotal;
  return `
    <tr>
        <td colspan="5" style="border: 1px solid #000; 
            font-size: 0.6rem;
            line-height: 1rem;
            padding-right: 12px;
            text-align: right;
            ">Total</td>
        <td style="border: 1px solid #000; 
            font-size: 0.6rem;
            line-height: 1rem; ">₹${netTotal.toLocaleString("en-IN")}</td>
    </tr>
    <tr>
        <td colspan="5" style="border: 1px solid #000; 
            font-size: 0.6rem;
            line-height: 1rem;
            padding-right: 12px;
            text-align: right;
            ">GST @ 18%</td>
        <td style="border: 1px solid #000; 
            font-size: 0.6rem;
            line-height: 1rem; ">₹${gstTotal.toLocaleString("en-IN")}</td>
    </tr>
    <tr>
        <td colspan="5" style="border: 1px solid #000; 
            font-size: 0.6rem;
            line-height: 1rem;
            text-align: right;
            padding-right: 12px;
            ">Grand total</td>
        <td style="border: 1px solid #000; 
            font-size: 0.6rem;
            line-height: 1rem; ">₹${grossTotal.toLocaleString("en-IN")}</td>
    </tr>
`;
};

export default TaxesAndTotals;
