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
              className="px-1 py-3 text-center bg-[#181c2f] border-b-2 border-cyan-500/50 underline"
              style={{ width: header.column.columnDef.size }}
            >
              {header.isPlaceholder ? null : (
                <div
                  {...{
                    className: header.column.getCanSort()
                      ? 'cursor-pointer select-none flex items-center justify-center gap-1'
                      : 'flex items-center justify-center',
                    onClick: header.column.getToggleSortingHandler(),
                  }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {header.column.getCanSort() && (
                    <span className="text-gray-400">
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
