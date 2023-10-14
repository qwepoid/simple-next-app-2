const TestParameters = ({ isEditMode, formik, index }) => {
  const addParameter = (e, index) => {
    e.preventDefault();
    formik.setFieldValue(`sampleDetails.${index}.testParameters`, [
      ...formik.values.sampleDetails[index]?.testParameters,
      {
        parameter: "",
        code: "",
      },
    ]);
  };

  const removeParameter = (e, index, parameterIdx) => {
    e.preventDefault();
    const oldValues = formik.values.sampleDetails[index]?.testParameters;
    const newValues = [
      ...oldValues.slice(0, parameterIdx),
      ...oldValues.slice(parameterIdx + 1),
    ];
    formik.setFieldValue(`sampleDetails.${index}.testParameters`, newValues);
  };

  return (
    <div className="w-full flex flex-col">
      <label
        htmlFor={`sampleDetails.${index}.testParameters`}
        className="text-xs text-gray-400"
      >
        Test Parameters*
      </label>
      <div className="gap-2 flex flex-col">
        {formik.values.sampleDetails[index]?.testParameters.map(
          (_, parameterIndex) => (
            <>
              {isEditMode ? (
                <div className="flex justify-between gap-2">
                  <div className="flex flex-col">
                    <input
                      className="outline-none border-2 rounded-lg p-2 w-full col-span-2"
                      id={`sampleDetails.${index}.testParameters.${parameterIndex}.parameter`}
                      name={`sampleDetails.${index}.testParameters.${parameterIndex}.parameter`}
                      onChange={formik.handleChange}
                      value={
                        formik.values.sampleDetails[index].testParameters[
                          parameterIndex
                        ].parameter
                      }
                      placeholder="eg: Compressive Strength"
                    />
                    <div>
                      {formik.touched.sampleDetails?.[index]?.testParameters?.[
                        parameterIndex
                      ]?.parameter &&
                      formik.errors.sampleDetails?.[index]?.testParameters?.[
                        parameterIndex
                      ]?.parameter ? (
                        <div className="text-xs text-red-500 font-semibold">
                          {
                            formik.errors.sampleDetails?.[index]
                              ?.testParameters?.[parameterIndex].parameter
                          }
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <input
                      className="outline-none border-2 rounded-lg p-2 w-full col-span-2"
                      id={`sampleDetails.${index}.testParameters.${parameterIndex}.code`}
                      name={`sampleDetails.${index}.testParameters.${parameterIndex}.code`}
                      onChange={formik.handleChange}
                      value={
                        formik.values.sampleDetails[index].testParameters[
                          parameterIndex
                        ]?.code
                      }
                      placeholder="IS / ASTM / BS"
                    />
                    <div>
                      {formik.touched.sampleDetails?.[index]?.testParameters?.[
                        parameterIndex
                      ]?.code &&
                      formik.errors.sampleDetails?.[index]?.testParameters?.[
                        parameterIndex
                      ]?.code ? (
                        <div className="text-xs text-red-500 font-semibold">
                          {
                            formik.errors.sampleDetails?.[index]
                              ?.testParameters?.[parameterIndex]?.code
                          }
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="w-44 border flex justify-center">
                    <>
                      {formik.values.sampleDetails[index].testParameters
                        .length > 1 && (
                        <button
                          className="w-full bg-red-500 text-white rounded-lg"
                          onClick={(e) =>
                            removeParameter(e, index, parameterIndex)
                          }
                        >
                          -
                        </button>
                      )}
                      {parameterIndex ===
                        formik.values.sampleDetails[index].testParameters
                          .length -
                          1 && (
                        <button
                          onClick={(e) => addParameter(e, index)}
                          className="w-full bg-green-500 text-white rounded-lg"
                        >
                          +
                        </button>
                      )}
                    </>
                  </div>
                </div>
              ) : (
                <div className="flex gap-4">
                  <span>
                    {
                      formik.values.sampleDetails[index]?.testParameters[
                        parameterIndex
                      ].parameter
                    }
                  </span>
                  <span>
                    {
                      formik.values.sampleDetails[index]?.testParameters[
                        parameterIndex
                      ].code
                    }
                  </span>
                </div>
              )}
            </>
          )
        )}
      </div>
    </div>
  );
};

export default TestParameters;
