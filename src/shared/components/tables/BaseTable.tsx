import React from "react";

export function BaseTable() {
  return (
    <div className="w-full overflow-x-auto border rounded-lg">
      <table className="w-full text-sm text-left">
        <thead className="bg-muted text-muted-foreground uppercase text-xs">
          <tr>
            <th className="px-6 py-3">Column 1</th>
            <th className="px-6 py-3">Column 2</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="px-6 py-4">Data 1</td>
            <td className="px-6 py-4">Data 2</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
