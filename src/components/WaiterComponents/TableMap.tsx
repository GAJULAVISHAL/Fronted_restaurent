import { Table, TableStatus } from "../../types";
import { TableNode } from "./TableNode";
import apiClient from "../../apiClient";

interface TableMapPageProps {
  tables: Table[];
  setTables: React.Dispatch<React.SetStateAction<Table[]>>;
  tablesLoading: boolean;
}

export const TableMapPage = ({tables, setTables, tablesLoading}:TableMapPageProps) => {
  

  const handleTableClick = async (
    tableId: number,
    currentStatus: TableStatus,
  ) => {
    // Toggle logic for demo purposes: AVAILABLE -> OCCUPIED -> AVAILABLE
    const newStatus =
      currentStatus === TableStatus.AVAILABLE
        ? TableStatus.OCCUPIED
        : TableStatus.AVAILABLE;
    try {
      await apiClient.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/table/${tableId}`,
        { status: newStatus }
      );
      // Optimistic update
      setTables((prev) =>
        prev.map((t) => (t.id === tableId ? { ...t, status: newStatus } : t)),
      );
    } catch (error) {
      console.error("Error updating table status:", error);
    }
  };

  if (tablesLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        Loading tables...
      </div>
    );
  }

  return (
    <div className="p-2">
      {/* Legend */}
      <div className="flex gap-6 mb-8 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-emerald-100 border-2 border-emerald-300 rounded-full"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-orange-100 border-2 border-orange-300 rounded-full"></div>
          <span>On Dine</span>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-10">
        {tables.map((table) => (
          <TableNode
            key={table.id}
            id={table.id}
            number={table.number}
            capacity={table.capacity}
            status={table.status}
            onClick={handleTableClick}
          />
        ))}
      </div>
    </div>
  );
};
