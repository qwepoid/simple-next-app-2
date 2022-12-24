// import { TextField } from "@mui/material";
import useNewQuotationFormik from "./custom-hooks/useNewQuotationFormik";

export const QTextField = () => {
  const { formik } = useNewQuotationFormik();
  //   return (
  //     <TextField
  //       id="title"
  //       autoComplete="off"
  //       placeholder="eg: SPT for Piscesia at Poonch (For internal reference)"
  //       variant="standard"
  //       label="Title*"
  //       value={formik.values.title}
  //       onChange={formik.handleChange}
  //       error={formik.touched.title && Boolean(formik.errors.title)}
  //       helperText={formik.touched.title && formik.errors.title}
  //     ></TextField>
  //   );
};
