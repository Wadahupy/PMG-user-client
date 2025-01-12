import { IconButton, Tooltip } from "@material-tailwind/react";
import React from "react";
import { BsPencilSquare } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import { FaTrash, FaRegFilePdf } from "react-icons/fa6";

const MyTable = ({
  data,
  columnsConfig,
  handleView,
  handleEdit,
  handleDelete,
  handlePdf,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-collapse border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            {columnsConfig.map((col) => (
              <th
                key={col.key}
                className="px-4 py-2 text-left border border-gray-300"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row._id} className="hover:bg-gray-50">
              {columnsConfig.map((col) => (
                <td key={col.key} className="px-4 py-2 border border-gray-300">
                  {col.key === "actions" ? (
                    <div className="flex space-x-2">
                      {handleEdit && (
                        <Tooltip content="Edit Schedule">
                          <IconButton
                            color="blue"
                            className="w-16 h-10 border border-black rounded-full"
                            onClick={() => handleEdit(row)}
                          >
                            <BsPencilSquare className="w-5 h-5" />
                          </IconButton>
                        </Tooltip>
                      )}
                      {handleView && (
                        <Tooltip content="View">
                          <IconButton
                            color="blue"
                            className="w-16 h-10 border border-black rounded-full"
                            onClick={() => handleView(row)}
                          >
                            <FaEye className="w-5 h-5" />
                          </IconButton>
                        </Tooltip>
                      )}
                      {handlePdf && (
                        <Tooltip content="View">
                          <IconButton
                            color="orange"
                            className="w-16 h-10 border border-black rounded-full"
                            onClick={() => handlePdf(row._id)}
                          >
                            <FaRegFilePdf className="w-5 h-5" />
                          </IconButton>
                        </Tooltip>
                      )}
                      {handleDelete && (
                        <Tooltip content="Delete Schedule">
                          <IconButton
                            color="red"
                            className="w-16 h-10 border border-black rounded-full"
                            onClick={() => handleDelete(row._id)}
                          >
                            <FaTrash className="w-5 h-5" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </div>
                  ) : col.key === "createdAt" || col.key === "scheduledDate" ? (
                    // Format the date to show only the date part
                    new Date(row[col.key]).toLocaleDateString()
                  ) : col.key === "status" ? (
                    <span
                      className={`text-sm px-2 py-1 rounded-full border-2 ${
                        row[col.key] === "declined" ||
                        row[col.key] === "cancelled" ||
                        row[col.key] === "expired"
                          ? "text-red-600 bg-red-100 border-red-300"
                          : row[col.key] === "approved" ||
                            row[col.key] === "done" ||
                            row[col.key] === "active"
                          ? "text-green-600 bg-green-100 border-green-300"
                          : "text-yellow-600 bg-yellow-100 border-yellow-300"
                      }`}
                    >
                      {row[col.key]}
                    </span>
                  ) : col.key === "isVerified" ? (
                    <span
                      className={`text-sm px-2 py-1 rounded-full border-2 ${
                        row[col.key] === false
                          ? "text-red-600 bg-red-100 border-red-300"
                          : "text-green-600 bg-green-100 border-green-300"
                      }`}
                    >
                      {row[col.key] === true ? "verified" : "not verified"}
                    </span>
                  ) : (
                    row[col.key]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyTable;
