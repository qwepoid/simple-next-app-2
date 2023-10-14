import React from "react";
// import {
//   Grid,
//   Paper,
//   RadioGroup,
//   Radio,
//   FormControlLabel,
//   FormLabel,
//   FormHelperText,
//   MenuItem,
//   Typography,
//   TextField,
// } from "@mui/material";

// import Button from "@material-ui/core/Button";
import { FormikProvider, FieldArray, Field } from "formik";
// import { makeStyles } from "@material-ui/core";
// import DateAdapter from "@mui/lab/AdapterDayjs";
// import Select, { Option } from "react-select";

// import TextField from "@material-ui/core/TextField";
// import { DatePicker } from "@mui/lab";
// import { LocalizationProvider } from "@mui/lab";
import useNewQuotationFormik from "../custom-hooks/useNewQuotationFormik";

const NewQuotation: React.FC = () => {
  const { formik } = useNewQuotationFormik();
  const options = [
    { value: "pnb", label: "PNB" },
    { value: "jkb", label: "JK Bank" },
  ];
  // const useStyles = makeStyles((theme) => ({
  //   root: {
  //     "& .MuiFormControl-root": {
  //       width: "80%",
  //       margin: theme.spacing(1),
  //     },
  //     "& .MuiInputLabel-outlined": {
  //       transform: "translate(14px, 8px) scale(1)",
  //       "&.MuiInputLabel-shrink": {
  //         transform: "translate(14px, -7px) scale(0.75)",
  //       },
  //     },
  //     // '& .MuiInputLabel-outlined': {
  //     //     transform: 'translate(13px, 10px) scale(1)'
  //     // }
  //   },
  // }));
  // const classes = useStyles();
  return (
    <main className="form-screen-c">
      <div className="flex flex-col">
        <pre>{JSON.stringify(formik.values)}</pre>
        {/* <Paper style={{ borderRadius: "20px" }}>
          <Grid container spacing={2} style={{ padding: "44px" }}>
            <FormikProvider value={formik}>
              <form
                // className={classes.root}
                onSubmit={formik.handleSubmit}
              >
                <Grid
                  container
                  item
                  display="flex"
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Grid item style={{ width: "50%" }}>
                    <LocalizationProvider dateAdapter={DateAdapter}>
                      <DatePicker
                        id="issueDate"
                        inputFormat="DD/MM/YYYY"
                        label="Issued On*"
                        variant="standard"
                        value={formik.values.issueDate}
                        size="small"
                        onChange={(newValue) =>
                          formik.setFieldValue("issueDate", newValue)
                        }
                        renderInput={(props) => <TextField {...props} />}
                      />
                    </LocalizationProvider>
                  </Grid>
                </Grid>

                <div className="flex flex-col">
                  <RadioGroup
                    row
                    style={{
                      alignItems: "center",
                      marginLeft: "8px",
                      color:
                        formik.touched.useNabl && !formik.values.useNabl
                          ? "red"
                          : "",
                    }}
                    aria-label="useNabl"
                    // defaultValue={false}
                    name="radio-buttons-group"
                    value={formik.values.useNabl}
                    onChange={(event) => {
                      formik.setFieldValue("useNabl", event.target.value);
                      // if (event.target.value === "true") {
                      //   setNextNABLReportNumber();
                      //   var blob = null;
                      //   var xhr = new XMLHttpRequest();
                      //   xhr.open("GET", nablLogo);
                      //   xhr.responseType = "blob"; //force the HTTP response, response-type header to be blob
                      //   xhr.onload = function () {
                      //     blob = xhr.response; //xhr.response is now a blob object
                      //     var file = new File([blob], "logo.png", {
                      //       type: "image/png",
                      //       lastModified: Date.now(),
                      //     });
                      //     console.log(file);
                      //     formik.setFieldValue("reportPdf", file);
                      //   };
                      //   xhr.send();
                      // } else {
                      //   setNextNonNABLReportNumber();
                      //   formik.setFieldValue("reportPdf", null);
                      // }
                    }}
                  >
                    <FormLabel
                      component="legend"
                      style={{
                        marginRight: "12px",
                        color:
                          formik.touched.useNabl && !formik.values.useNabl
                            ? "red"
                            : "",
                      }}
                    >
                      {" "}
                      Use Nabl
                    </FormLabel>
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label="Yes"
                      sx={
                        formik.touched.useNabl && !formik.values.useNabl
                          ? {
                              "& .MuiSvgIcon-root": {
                                color: "red",
                              },
                            }
                          : ""
                      }
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label="No"
                      sx={
                        formik.touched.useNabl && !formik.values.useNabl
                          ? {
                              "& .MuiSvgIcon-root": {
                                color: "red",
                              },
                            }
                          : ""
                      }
                    />
                    <FormHelperText style={{ color: "red" }}>
                      {formik.touched.useNabl && !formik.values.useNabl
                        ? "Please select a valid input"
                        : ""}
                    </FormHelperText>
                  </RadioGroup>
                  <TextField
                    id="title"
                    autoComplete="off"
                    placeholder="eg: SPT for Piscesia at Poonch (For internal reference)"
                    variant="standard"
                    label="Title*"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                  ></TextField>
                  <TextField
                    id="quotationSubject"
                    autoComplete="off"
                    placeholder="eg: SPT for Piscesia at Poonch (For internal reference)"
                    variant="standard"
                    label="Subject*"
                    value={formik.values.quotationSubject}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.quotationSubject &&
                      Boolean(formik.errors.quotationSubject)
                    }
                    helperText={
                      formik.touched.quotationSubject &&
                      formik.errors.quotationSubject
                    }
                  ></TextField>
                  <TextField
                    id="issuedTo"
                    variant="standard"
                    placeholder="eg: KRCL"
                    label="Issued To*"
                    value={formik.values.issuedTo}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.issuedTo && Boolean(formik.errors.issuedTo)
                    }
                    helperText={
                      formik.touched.issuedTo && formik.errors.issuedTo
                    }
                  ></TextField>{" "}
                  <Select
                    options={options}
                    // value={formik.values.bank}
                    // name={field.name}
                    value={
                      options
                        ? options.find(
                            (option) => option.value === formik.values.bank
                          )
                        : ""
                    }
                    onChange={(option: Option) =>
                      formik.setFieldValue("bank", option.value)
                    }
                    // onBlur={formik.handleBlur}
                    // onChange={formik.handleChange}
                  >
                    <MenuItem className="w-full justify-start" value="pnb">
                      PNB
                    </MenuItem>
                    <MenuItem className="w-full justify-start" value="jkb">
                      JK Bank
                    </MenuItem>
                  </Select>
                  <FieldArray
                    onChange={formik.handleChange}
                    name="items"
                    render={(arrayHelpers) => (
                      <div>
                        {formik.values.items?.map((friend, index) => (
                          <div key={index}>
                            <Grid
                              container
                              display="flex"
                              item
                              direction="column"
                            >
                              <Grid
                                item
                                display="flex"
                                direction="row"
                                style={{ alignItems: "baseline" }}
                              >
                                <Typography>{index + 1}</Typography>
                                <TextField
                                  multiline
                                  variant="standard"
                                  label="Item Description*"
                                  name={`items[${index}].item`}
                                  value={formik.values.items[index].item}
                                  onChange={formik.handleChange}
                                />
                                {formik.errors.items?.item ? (
                                  <div>{formik.errors.items?.item}</div>
                                ) : null}
                              </Grid>
                              <Grid container item alignItems="end">
                                <Grid item>
                                  <TextField
                                    variant="standard"
                                    label="Quantity*"
                                    type="number"
                                    name={`items[${index}].qty`}
                                    value={formik.values.items[index].qty}
                                    onChange={formik.handleChange}
                                  />
                                  {formik.errors.items?.qty ? (
                                    <div>{formik.errors.items?.qty}</div>
                                  ) : null}
                                </Grid>
                                <Grid item>
                                  <TextField
                                    variant="standard"
                                    label="Price/Unit (₹)*"
                                    type="number"
                                    name={`items[${index}].rate`}
                                    value={formik.values.items[index].rate}
                                    onChange={formik.handleChange}
                                  />
                                  {formik.errors.items?.rate ? (
                                    <div>{formik.errors.items?.rate}</div>
                                  ) : null}
                                </Grid>
                                <Grid item>
                                  <TextField
                                    disabled
                                    variant="standard"
                                    label="Amount"
                                    name={`items[${index}].amount`}
                                    value={
                                      +formik.values.items[index].rate *
                                      +formik.values.items[index].qty
                                    }
                                    onChange={formik.handleChange}
                                  />
                                </Grid>
                                {index > 0 && (
                                  <Grid item>
                                    <Button
                                      onClick={() => arrayHelpers.remove(index)}
                                    >
                                      Delete
                                    </Button>
                                  </Grid>
                                )}
                              </Grid>
                            </Grid>
                          </div>
                        ))}
                        <Grid item>
                          <Button
                            onClick={() =>
                              arrayHelpers.push({ item: "", qty: "", rate: "" })
                            }
                          >
                            Add Item
                          </Button>
                        </Grid>
                      </div>
                    )}
                  />
                  <TextField
                    id="notes"
                    disabled
                    multiline
                    placeholder="(For internal reference)"
                    variant="standard"
                    label="Notes"
                    value={formik.values.notes}
                    onChange={formik.handleChange}
                  ></TextField>
                </div>
                <Grid
                  container
                  item
                  justifyContent="space-around"
                  width="80%"
                  marginTop="20px"
                ></Grid>

                <TextField
                  id="remarks"
                  multiline
                  placeholder="(For internal reference)"
                  variant="standard"
                  label="Remarks"
                  value={formik.values.remarks}
                  onChange={formik.handleChange}
                ></TextField>
                {formik.errors.remarks ? (
                  <div>{formik.errors.remarks}</div>
                ) : null}
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </form>
            </FormikProvider>
          </Grid>
          {
            //<Button onClick={downloadReport}>Download Report</Button>
            //<Button onClick={deleteCollection}>Master DELETE</Button>
          }
        </Paper> */}
      </div>
    </main>
  );
};

export default NewQuotation;
