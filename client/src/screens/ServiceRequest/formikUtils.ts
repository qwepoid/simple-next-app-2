import dayjs from "dayjs";

export const formikValidator = (values) => {
  let errors = {
    sampleDetails: [],
    customerDetails: {},
  } as any;
  /** Level 1: root */
  if (!values.dateOfSR) {
    errors.dateOfSR = "This is a required field";
  }
  if (!errors.sampleDetails) errors.sampleDetails = [];

  /** Level 2: customerDetails */
  if (!values.customerDetails.customerNameAddress) {
    errors.customerDetails.customerNameAddress = "This is a required field";
  }
  if (!values.customerDetails.customerRepName) {
    errors.customerDetails.customerRepName = "This is a required field";
  }
  if (!values.customerDetails.customerRepPhone) {
    errors.customerDetails.customerRepPhone = "This is a required field";
  }
  if (values.customerDetails.customerRepPhone.length !== 10) {
    errors.customerDetails.customerRepPhone = "Enter a valid phone number";
  }

  /** Level 2: sampleDetails */
  values.sampleDetails.forEach((item, index) => {
    const itemError = {} as any;
    if (!item.sampleDescription)
      itemError.sampleDescription = "This is a required field";

    if (!item.quantity) itemError.quantity = "This is a required field";

    if (!item.samplingLocation)
      itemError.samplingLocation = "This is a required field";

    if (Object.keys(itemError).length > 0)
      errors.sampleDetails[index] = itemError;

    /** Level 3: Test parameter Details */

    item?.testParameters.forEach((param, parameterIdx) => {
      const parameterError = {} as any;
      if (!param.parameter)
        parameterError.parameter = "This is a required field";

      if (!param.code) parameterError.code = "This is a required field";

      if (Object.keys(parameterError).length > 0) {
        errors.sampleDetails[index] = errors.sampleDetails[index] || {};
        errors.sampleDetails[index].testParameters =
          errors.sampleDetails[index].testParameters || {};
        errors.sampleDetails[index].testParameters[parameterIdx] =
          parameterError;
      }
    });
  });
  return Object.keys(errors.customerDetails).length +
    errors.sampleDetails.length >
    0
    ? errors
    : {};
};

export const initialValues = {
  title: "",
  customerDetails: {
    customerNameAddress: "",
    customerRepName: "",
    customerRepPhone: "",
  },
  sampleDetails: [
    {
      sampleDescription: "",
      clientSampleIdentifier: "",
      labSampleIdentifier: "",
      samplingLocation: "",
      testParameters: [
        {
          parameter: "",
          code: "",
        },
      ],
      quantity: "",
      packingDetails: "",
    },
  ],
  dateOfSR: dayjs(new Date()).format("YYYY-MM-DD"),
};
