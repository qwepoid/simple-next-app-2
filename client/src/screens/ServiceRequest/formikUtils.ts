import dayjs from "dayjs";

export const formikValidator = (values) => {
    let errors = { sampleDetails: [] } as any;
    if (!values.dateOfSR) {
      errors.dateOfSR = "This is a required field";
    }
    if (!errors.sampleDetails) errors.sampleDetails = [];
    values.sampleDetails.forEach((item, index) => {
      const itemError = {} as any;
      if (!item.sampleDescription) itemError.sampleDescription = "This is a required field";

      if (!item.rate) itemError.rate = "This is a required field";

      if (!item.testDescription)
        itemError.testDescription = "This is a required field";
      if (!item.unit) itemError.unit = "This is a required field";

      if (Object.keys(itemError).length > 0)
        errors.sampleDetails[index] = itemError;
    });
    return Object.keys(errors.sampleDetails).length > 0 ? errors : {};
}

export const initialValues = {
    title: '',
    customerDetails: {
        customerNameAddress: "",
        customerRepName: "",
        customerRepPhone: ""
    },
    sampleDetails: [
      { sampleDescription: "", samplingLocation: "", testPatameters: [], testMethod: "", quantity: "", packingDetails: "" },
    ],
    dateOfSR: dayjs(new Date()).format('YYYY-MM-DD'),
  }