import { TableRow } from "./TableRow";

export default function Table() {
  const data = [
    {
      id: 1,
      currency: "AI Integration",
      value: "Quantum Computing",
      date: "Blockchain Security",
    },
    { id: 2, currency: "99.9%", value: "10^6 qubits", date: "Unhackable" },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {["Technology", "Performance", "Security"].map((header, index) => (
              <th
                key={index}
                className="p-4 text-left border-b border-gray-700 bg-gray-800 bg-opacity-50"
              >
                <span className="text-sm font-medium uppercase tracking-wider text-gray-400">
                  {header}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <TableRow data={data} />
        </tbody>
      </table>
    </div>
  );
}
