import React from "react";

interface IShowResponse {
  totalDuplicateRecordInCSV: number,
  totalDuplicateRecordInDB: number,
  totalRecordsInserted: number,
}

const ShowResponse: React.FC<IShowResponse> = ({ totalRecordsInserted, totalDuplicateRecordInCSV, totalDuplicateRecordInDB }) => {
  return (
    <div>
      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-2 ...">Total Records Inserted: </div>
        <div className="text-right font-bold text-[20px]">{totalRecordsInserted}</div>
        <div className="col-span-2 ...">Total Duplicate Record In CSV</div>
        <div className="text-right font-bold text-[20px]">{totalDuplicateRecordInCSV}</div>
        <div className="col-span-2 ...">Total Duplicate Record In DB</div>
        <div className="text-right font-bold text-[20px]">{totalDuplicateRecordInDB}</div>
      </div>
    </div>
  );
};

export default ShowResponse;