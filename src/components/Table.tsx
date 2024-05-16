import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import { useState } from "react";
import Download from "./Download";
import Search_Input from "./Serach_Input";
import { USERS } from "../data";

//((((((ratings_average)))))), ((((((author name)))))), title, ((((first_publish_year)))), subject,
// (((((author_birth_date))))), author_top_work

const Table = () => {
  const [data] = useState(() => [...USERS]);
  const [globalFilter, setGlobalFilter] = useState("");
  const columnHelper = createColumnHelper();
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = [
    columnHelper.accessor("author_name", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Author Name",
      sortUndefined: "last",
      sortDescFirst: false,
    }),
    columnHelper.accessor("title", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Title",
    }),
    columnHelper.accessor("first_publish_year", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Year Published",
    }),
    columnHelper.accessor("author_birth_date", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "DOB",
    }),
    columnHelper.accessor("ratings_average", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Rating",
    }),
    columnHelper.accessor("author_top_work", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Author Top Work",
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
      globalFilter,
    },
    getPaginationRowModel: getPaginationRowModel(),
    sortingFns: {
      myCustomSortingFn: (rowA, rowB, columnId) => {
        return rowA.original[columnId] > rowB.original[columnId]
          ? 1
          : rowA.original[columnId] < rowB.original[columnId]
          ? -1
          : 0;
      },
    },
  });

  return (
    <div className="p-2 w-full flex items-center justify-center h-full text-white bg-black">
      <div className="w-[90%]">
        <div className="flex justify-between mb-2">
          <div className="w-full flex items-center gap-1 py-4">
            <Search_Input
              value={globalFilter ?? ""}
              onChange={(value) => setGlobalFilter(String(value))}
            />
          </div>
          <Download data={data} />
        </div>
        <table className=" w-full text-left">
          <thead className="bg-black border-2 border-white h-[70px] rounded-md">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div
                        className={
                          header.column.getCanSort()
                            ? "cursor-pointer select-none flex gap-2 p-4"
                            : ""
                        }
                        onClick={header.column.getToggleSortingHandler()}
                        title={
                          header.column.getCanSort()
                            ? header.column.getNextSortingOrder() === "asc"
                              ? "Sort ascending"
                              : header.column.getNextSortingOrder() === "desc"
                              ? "Sort descending"
                              : "Clear sort"
                            : undefined
                        }
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18"
                              />
                            </svg>
                          ),
                          desc: (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"
                              />
                            </svg>
                          ),
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row, i) => (
                <tr key={row.id} className="border border-white rounded-md">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-3.5 py-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr className="text-center h-32">
                <td colSpan={12}>No Recoard Found!</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex items-center justify-end mt-4 gap-10">
          <button
            onClick={() => {
              table.previousPage();
            }}
            disabled={!table.getCanPreviousPage()}
            className="p-1 border-white border rounded-md px-2 disabled:hidden"
          >
            <div className="flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
                />
              </svg>
              Previous
            </div>
          </button>
          <button
            onClick={() => {
              table.nextPage();
            }}
            disabled={!table.getCanNextPage()}
            className="p-1 border border-white rounded-md px-2 disabled:hidden"
          >
            <div className="flex gap-2">
              Next
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                />
              </svg>
            </div>
          </button>

          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>

          <span className="flex items-center gap-2">
            Go to page:
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                if (Number(e.target.value) < 1) {
                  return;
                }
                const page =
                  Number(e.target.value) >= 2 ? Number(e.target.value) - 1 : 1;
                table.setPageIndex(page);
              }}
              className="border p-1 rounded w-16 bg-transparent"
            />
          </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            className="p-2 bg-transparent border border-white rounded-md"
          >
            {[10, 20, 30, 50, 100].map((pageSize) => (
              <option
                key={pageSize}
                value={pageSize}
                className="bg-black border-white rounded-md"
              >
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
export default Table;
