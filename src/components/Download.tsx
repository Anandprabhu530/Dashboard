import * as XLSX from "xlsx";

const Download = ({ data }) => {
  console.log(data);
  return (
    <button
      className="border border-white p-2 h-fit rounded-md flex"
      onClick={() => {
        const datas = data?.length ? data : [];
        const worksheet = XLSX.utils.json_to_sheet(datas);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "data.xlsx");
      }}
    >
      Download
    </button>
  );
};

export default Download;
