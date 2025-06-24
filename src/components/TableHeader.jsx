import React from 'react';
import { flexRender } from '@tanstack/react-table';

const TableHeader = ({ table }) => {
  return (
    <thead>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id} className="bg-[#181c2f] text-xs uppercase sticky top-0 z-50">
          {headerGroup.headers.map((header) => (
            <th
              key={header.id}
              colSpan={header.colSpan}
              className="px-1 py-3 text-center bg-[#181c2f] border-b-2 border-cyan-500/50"
              style={{ width: header.column.columnDef.size }}
            >
              {header.isPlaceholder ? null : (
                <div
                  {...{
                    className:
                      'flex items-center justify-center whitespace-nowrap overflow-hidden text-ellipsis underline',
                    onClick: header.column.getCanSort()
                      ? header.column.getToggleSortingHandler()
                      : undefined,
                  }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {header.column.getCanSort() && (
                    <span className="text-gray-400 ml-1">
                      {{
                        asc: '▲',
                        desc: '▼',
                      }[header.column.getIsSorted()] ?? '▲▼'}
                    </span>
                  )}
                </div>
              )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};

export default TableHeader;
