
import { useFormik, FormikProvider } from "formik";

const useNewQuotationFormik = () => {
    const formik = useFormik({
        initialValues: {
            useNabl: null,
          quotationId: "", //for non-nabl reports
          quotationSubject: "",
          title: "",
          issuedTo: "",
          bank: "pnb",
          notes: `1. Work will be taken up immediately after issue of valid Work Order.
2. First 50% payment to be advanced with the Work Order.
3. Balance 50% payment to be released on issue of Reports.
4. TDS deductible @ 1.5% as per section 194C`,
          clientPhone: "",
          clientEmail: "",
          issueDate: new Date(),
          reportPdf: null,

          items: [{item: '', qty: '', rate: ''}],
        },
        // validationSchema,
        // onSubmit: submitReportData,
        onSubmit: (values) => {
          alert(JSON.stringify(values, null, 2));
          console.log(values);
          console.log("just before final then");
          //   submitNABLReportData(values).then((response) => {
          //     console.log("form submit response is: ", response);
          //     if (response) {
          //       alert("form submitted successfully");
          //       const doc = generateReportDoc(values);
          //       saveReportDoc(doc);
          //       navigate("/dashboard");
          //     } else {
          //       alert("something wrong with form");
          //     }
          //   });
          // submitNABLReportData
          //validateAndupdateValuesInDB(values);
        },
      });
      
      return {
       formik
      }
    }

export default useNewQuotationFormik;