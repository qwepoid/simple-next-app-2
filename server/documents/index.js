import {
  Header,
  QuotationTableData,
  QuotationTableHeader,
  Reference,
  Subject,
} from "./common/index.js";
import { formatDate } from "./common/utils.js";

const pdfTemplate = ({
  quotationTo = "",
  subject = "",
  dateOfQuotation = new Date(),
  reference = "",
}) => {
  const showHeader = false;
  const formattedDate = formatDate(dateOfQuotation);
  return `
  <!doctype html>
  <html>
     <head>
        <meta charset="utf-8">
        <title>PDF Result Template</title>
     </head>
     <body>
       ${showHeader ? Header : ""}
        <div style="max-width: 800px;
           display: flex;
           flex-direction: column;
           justify-content: center
           margin-top: 0px;
           padding: 10px;
           border: 1px solid #eee;
           box-shadow: 0 0 10px rgba(0, 0, 0, .15);
           font-size: 16px;
           line-height: 24px;
           font-family: 'Helvetica Neue', 'Helvetica';
           color: #000;">
           <div style="display: flex; 
              flex-direction: column; 
              justify-content: flex-start; ">
              <div style="display: flex; 
                 text-align: end;x ">
                 <span style="margin-right: 0.25rem; 
                    font-size: 0.75rem;
                    line-height: 1rem; 
                    font-weight: 500; ">Date: </span>
                 <span style="font-size: 0.75rem;
                    line-height: 1rem; ">${formattedDate}</span>
              </div>
              <div>
                 <span style="display: block; 
                    font-size: 0.875rem;
                    line-height: 1.25rem;">To</span>
                 <span style="display: block; 
                    font-size: 0.75rem;
                    line-height: 1rem; 
                    line-height: 1rem; 
                    white-space: pre-line;
                    max-width: 150px">
                 ${quotationTo}
                 </span>
              </div>
              <div style="text-align: center; 
                 font-weight: 600;
                 font-size: 0.8rem;
                 text-decoration: underline; 
                 ">
                 QUOTATION
              </div>
              ${Subject({ subject })}              
              ${Reference({ reference })}
              <table style="width: 100%;
                 text-align: center; gap:0;">
                  ${QuotationTableHeader}
                  ${QuotationTableData()}
              </table>
           </div>
        </div>
     </body>
  </html>
  `;
  //   return `
  //     <!doctype html>
  //     <html>
  //        <head>
  //           <meta charset="utf-8">
  //           <title>PDF Result Template</title>
  //           <style>
  //              .invoice-box {
  //              max-width: 800px;
  //              margin: auto;
  //              padding: 30px;
  //              border: 1px solid #eee;
  //              box-shadow: 0 0 10px rgba(0, 0, 0, .15);
  //              font-size: 16px;
  //              line-height: 24px;
  //              font-family: 'Helvetica Neue', 'Helvetica',
  //              color: #555;
  //              }
  //              .margin-top {
  //              margin-top: 50px;
  //              }
  //              .justify-center {
  //              text-align: center;
  //              }
  //              .invoice-box table {
  //              width: 100%;
  //              line-height: inherit;
  //              text-align: left;
  //              }
  //              .invoice-box table td {
  //              padding: 5px;
  //              vertical-align: top;
  //              }
  //              .invoice-box table tr td:nth-child(2) {
  //              text-align: right;
  //              }
  //              .invoice-box table tr.top table td {
  //              padding-bottom: 20px;
  //              }
  //              .invoice-box table tr.top table td.title {
  //              font-size: 45px;
  //              line-height: 45px;
  //              color: #333;
  //              }
  //              .invoice-box table tr.information table td {
  //              padding-bottom: 40px;
  //              }
  //              .invoice-box table tr.heading td {
  //              background: #eee;
  //              border-bottom: 1px solid #ddd;
  //              font-weight: bold;
  //              }
  //              .invoice-box table tr.details td {
  //              padding-bottom: 20px;
  //              }
  //              .invoice-box table tr.item td {
  //              border-bottom: 1px solid #eee;
  //              }
  //              .invoice-box table tr.item.last td {
  //              border-bottom: none;
  //              }
  //              .invoice-box table tr.total td:nth-child(2) {
  //              border-top: 2px solid #eee;
  //              font-weight: bold;
  //              }
  //              @media only screen and (max-width: 600px) {
  //              .invoice-box table tr.top table td {
  //              width: 100%;
  //              display: block;
  //              text-align: center;
  //              }
  //              .invoice-box table tr.information table td {
  //              width: 100%;
  //              display: block;
  //              text-align: center;
  //              }
  //              }
  //           </style>
  //        </head>
  //        <body>
  //           <div class="invoice-box">
  //              <table cellpadding="0" cellspacing="0">
  //                 <tr class="top">
  //                    <td colspan="2">
  //                       <table>
  //                          <tr>
  //                             <td class="title"><img  src="https://i2.wp.com/cleverlogos.co/wp-content/uploads/2018/05/reciepthound_1.jpg?fit=800%2C600&ssl=1"
  //                                style="width:100%; max-width:156px;"></td>
  //                             <td>
  //                                Datum: ${`${today.getDate()}. ${
  //                                  today.getMonth() + 1
  //                                }. ${today.getFullYear()}.`}
  //                             </td>
  //                          </tr>
  //                       </table>
  //                    </td>
  //                 </tr>
  //                 <tr class="information">
  //                    <td colspan="2">
  //                       <table>
  //                          <tr>
  //                             <td>
  //                                Customer name: ${name}
  //                             </td>
  //                             <td>
  //                                Receipt number: ${receiptId}
  //                             </td>
  //                          </tr>
  //                       </table>
  //                    </td>
  //                 </tr>
  //                 <tr class="heading">
  //                    <td>Bought items:</td>
  //                    <td>Price</td>
  //                 </tr>
  //                 <tr class="item">
  //                    <td>First item:</td>
  //                    <td>${price1}$</td>
  //                 </tr>
  //                 <tr class="item">
  //                    <td>Second item:</td>
  //                    <td>${price2}$</td>
  //                 </tr>
  //              </table>
  //              <br />
  //              <h1 class="justify-center">Total price: ${
  //                parseInt(price1) + parseInt(price2)
  //              }$</h1>
  //           </div>
  //        </body>
  //     </html>
  //     `;
};

export default pdfTemplate;
