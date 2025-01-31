interface TableRowProps {
  data: any; // change before integration
}

export const TableRow = ({ data }: TableRowProps) => {
  return data.map((row) => (
    <tr
      key={row.id}
      className="bg-gray-800 bg-opacity-30 hover:bg-opacity-50 transition-colors"
    >
      {Object.keys(row)
        .filter((key) => key !== "id")
        .map((key, index) => (
          <td key={index} className="p-4 border-b border-gray-700">
            <div className="font-medium text-gray-200">
              {row[key as keyof typeof row]}
            </div>
          </td>
        ))}
    </tr>
  ));
};
