// import * as React from 'react';
// import { useDemoData } from '@mui/x-data-grid-generator';
// import { DataGrid, GridToolbar } from '@mui/x-data-grid';

// export default function QRReports() {
//     const [gridData, setGridData] = useState([]);


//   const { data, loading } = useDemoData({
//     dataSet: 'Commodity',
//     rowLength: 20,
//     maxColumns: 10,
//   });

//   return (
//     <div style={{ height: '100%', width: '100%' }}>
//       <DataGrid {...data} loading={loading} slots={{ toolbar: GridToolbar }} />
//     </div>
//   );
// }




// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { DataGrid, GridToolbar } from '@mui/x-data-grid';

// const columns = [
//   // define your columns here
// ];

// export default function QRReports() {
//   const [gridData, setGridData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios.get('https://myserver.com/data')
//       .then(response => {
//         setGridData(response.data);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching data: ', error);
//         setLoading(false);
//       });
//   }, []);

//   const handleSave = () => {
//     axios.post('https://myserver.com/save', gridData)
//       .then(response => {
//         console.log('Data saved successfully.');
//       })
//       .catch(error => {
//         console.error('Error saving data: ', error);
//       });
//   };

//   return (
//     <div style={{ height: '100%', width: '100%' }}>
//       <DataGrid rows={gridData} columns={columns} loading={loading} slots={{ toolbar: () => <GridToolbar onExport={() => console.log('exporting...')} onSave={handleSave} /> }} />
//     </div>
//   );
// }





import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { saveAs } from 'file-saver';

const columns = [
  { field: 'DateTime', headerName: 'DateTime', width: 110 },
  { field: 'Market Type', headerName: 'Market Type', width: 130 },
  { field: 'Company Name', headerName: 'Company Name', width: 130 },
  { field: 'Amount Paid', headerName: 'Amount Paid', width: 130 },
  { field: 'GST', headerName: 'GST', type: 'number', width: 90 },
  { field: 'Commission', headerName: 'Commission', width: 130 },
  { field: 'Product Name', headerName: 'Product Name', width: 130 },
  { field: 'No.Of Products', headerName: 'No.Of Products', width: 130 },
  { field: 'Product Cost', headerName: 'Product Cost', width: 130 },
  { field: 'Batch Number', headerName: 'Batch Number', width: 130 },
  { field: 'UserID', headerName: 'UserID', width: 130 },

];

const rows = [
    { id: 1, DateTime: '05/04/2023 05:50', 'Market Type': 'Digital', 'Company Name': 'CompanyA', 'Amount Paid': 10, GST: 2, Commission: 1, 'Product Name': 'ProductA', 'No.Of Products': 1, 'Product Cost': 5, 'Batch Number': '1', 'UserID': '111' },
    { id: 2, DateTime: '06/04/2023 06:50', 'Market Type': 'Type2', 'Company Name': 'CompanyB', 'Amount Paid': 20, GST: 4, Commission: 2, 'Product Name': 'ProductB', 'No.Of Products': 2, 'Product Cost': 10, 'Batch Number': '2', 'UserID': '112' },
    { id: 3, DateTime: '07/04/2023 07:50', 'Market Type': 'Type3', 'Company Name': 'CompanyC', 'Amount Paid': 30, GST: 6, Commission: 3, 'Product Name': 'ProductC', 'No.Of Products': 3, 'Product Cost': 15, 'Batch Number': '3', 'UserID': '113' },
    { id: 4, DateTime: '08/04/2023 05:50', 'Market Type': 'Type4', 'Company Name': 'CompanyD', 'Amount Paid': 40, GST: 2, Commission: 4, 'Product Name': 'ProductA', 'No.Of Products': 1, 'Product Cost': 5, 'Batch Number': '1', 'UserID': '111' },
    { id: 5, DateTime: '09/04/2023 06:50', 'Market Type': 'Type5', 'Company Name': 'CompanyE', 'Amount Paid': 50, GST: 4, Commission: 5, 'Product Name': 'ProductB', 'No.Of Products': 2, 'Product Cost': 10, 'Batch Number': '2', 'UserID': '112' },
    { id: 6, DateTime: '10/04/2023 07:50', 'Market Type': 'Type6', 'Company Name': 'CompanyF', 'Amount Paid': 60, GST: 6, Commission: 6, 'Product Name': 'ProductC', 'No.Of Products': 3, 'Product Cost': 15, 'Batch Number': '3', 'UserID': '113' },
    { id: 7, DateTime: '11/04/2023 05:50', 'Market Type': 'Type7', 'Company Name': 'CompanG', 'Amount Paid': 70, GST: 2, Commission: 7, 'Product Name': 'ProductA', 'No.Of Products': 1, 'Product Cost': 5, 'Batch Number': '1', 'UserID': '111' },
    { id: 8, DateTime: '12/04/2023 06:50', 'Market Type': 'Type8', 'Company Name': 'CompanyH', 'Amount Paid': 80, GST: 4, Commission: 8, 'Product Name': 'ProductB', 'No.Of Products': 2, 'Product Cost': 10, 'Batch Number': '2', 'UserID': '112' },
    { id: 9, DateTime: '13/04/2023 07:50', 'Market Type': 'Type9', 'Company Name': 'CompanyI', 'Amount Paid': 30, GST: 6, Commission: 9, 'Product Name': 'ProductC', 'No.Of Products': 3, 'Product Cost': 15, 'Batch Number': '3', 'UserID': '113' },
    { id: 10, DateTime: '14/04/2023 05:50', 'Market Type': 'Type10', 'Company Name': 'CompanyJ', 'Amount Paid': 10, GST: 2, Commission: 10, 'Product Name': 'ProductA', 'No.Of Products': 1, 'Product Cost': 5, 'Batch Number': '1', 'UserID': '111' },
    { id: 11, DateTime: '15/04/2023 06:50', 'Market Type': 'Type11', 'Company Name': 'CompanyK', 'Amount Paid': 20, GST: 4, Commission: 11, 'Product Name': 'ProductB', 'No.Of Products': 2, 'Product Cost': 10, 'Batch Number': '2', 'UserID': '112' },

  ];

const handleExport = () => {
  const header = columns.map((column) => column.headerName).join(',');
  const csv = [header, ...rows.map((row) => columns.map((column) => row[column.field]).join(','))].join('\r\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, 'data.csv');
};

export default function QRReports() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        components={{
          Toolbar: GridToolbar,
        }}
        componentsProps={{
          toolbar: {
            downloadCsv: {
              onClick: handleExport,
              filename: 'my-custom-file-name.csv',
            },
          },
        }}
      />
    </div>
  );
}
