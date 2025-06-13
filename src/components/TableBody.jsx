import React from 'react';
import { flexRender } from '@tanstack/react-table';

const TableBody = ({ table }) => {
  return (
    <tbody>
      {table.getRowModel().rows.map((row) => (
        <tr key={row.id} className="border-b border-[#23243a] hover:bg-[#1a1f35] transition-colors">
          {row.getVisibleCells().map((cell) => (
            <td 
              key={cell.id} 
              className="px-1 py-2 text-left"
              style={{ width: cell.column.columnDef.size }}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;

