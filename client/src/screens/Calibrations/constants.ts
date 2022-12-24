export const columns = [
    { field: "id", headerName: "Instrument No.", width: 130 },
    {
      field: "insName",
      headerName: "Instrument Name",
      width: 130,
      editable: true,
    },
    { field: "section", headerName: "Section", width: 130 },
    { field: "ulr", headerName: "Certificate No.", width: 210 },
    {
      field: "lastCalibDate",
      headerName: "Last Calib Date",
      type: "date",
      width: 190,
      headerAlign: "center",
      // cellClassName: (params: GridCellParams<number>) =>
      // clsx('super-app', {
      //   negative: params.value < 0,
      //   positive: params.value > 0,
      // }),
    },
    {
      field: "calibDueDate",
      type: "date",
      headerName: "Calib Due Date",
      description: "This column has a value getter and is not sortable.",
      width: 160,
      // valueGetter: (params: GridValueGetterParams) =>
      //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    { field: "calibratedBy", headerName: "Calibrated By", width: 130 },
  ];