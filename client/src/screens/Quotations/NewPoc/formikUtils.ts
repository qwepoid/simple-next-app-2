export const formikValidator = (values) => {
    let errors = { quotationItems: [] } as any;
    if (!values.quotationTo) {
      errors.quotationTo = "This is a required field";
    }

    if (!values.subject) {
      errors.subject = "This is a required field";
    }
    if (!values.dateOfQuotation) {
      errors.dateOfQuotation = "This is a required field";
    }
    if (!errors.quotationItems) errors.quotationItems = [];
    values.quotationItems.forEach((item, index) => {
      const itemError = {} as any;
      if (!item.quantity) itemError.quantity = "This is a required field";

      if (!item.rate) itemError.rate = "This is a required field";

      if (!item.testDescription)
        itemError.testDescription = "This is a required field";
      if (!item.unit) itemError.unit = "This is a required field";

      if (Object.keys(itemError).length > 0)
        errors.quotationItems[index] = itemError;
    });
    return Object.keys(errors.quotationItems).length > 0 ? errors : {};
}

export const initialValues = {
    quotationTo: "",
    subject: "",
    reference: "",
    quotationItems: [
      { testDescription: "", quantity: "", unit: "", rate: "" },
    ],
    dateOfQuotation: "",
  }