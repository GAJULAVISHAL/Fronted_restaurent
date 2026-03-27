import React from "react";
import { TableStatus } from "../../types";

interface TableNodeProps {
  id: number;
  number: number;
  capacity: number;
  status: TableStatus;
  onClick: (id: number, status: TableStatus) => void;
}

export const TableNode: React.FC<TableNodeProps> = ({
  id,
  number,
  capacity,
  status,
  onClick,
}) => {
  // Determine Table Shape and Dimensions based on capacity
  const isLarge = capacity > 4;
  const isExtraLarge = capacity > 8;

  // Base Dimensions
  const tableWidth = isExtraLarge ? "w-48" : isLarge ? "w-32" : "w-20";
  const tableHeight = isExtraLarge || isLarge ? "h-20" : "h-20";

  // Status Colors
  const getStatusColors = () => {
    switch (status) {
      case TableStatus.OCCUPIED:
        return {
          table: "bg-orange-100 border-orange-300",
          text: "text-orange-600",
          chair: "bg-orange-200 border-orange-400",
        };
      case TableStatus.NEEDS_ATTENTION: // Using as "Reserved" proxy or similar high alert
        return {
          table: "bg-red-100 border-red-300",
          text: "text-red-600",
          chair: "bg-red-200 border-red-400",
        };
      case TableStatus.AVAILABLE:
      default:
        return {
          table: "bg-emerald-100 border-emerald-300", // "Main Dining" green vibe from image
          text: "text-emerald-700",
          chair: "bg-emerald-200 border-emerald-400",
        };
    }
  };

  const colors = getStatusColors();

  // Chair Rendering Logic
  const getChairLayout = () => {
    const chairClass = `absolute w-8 h-8 rounded-full border-2 ${colors.chair} shadow-sm transition-all duration-300`;

    // Positioning logic (simplified for polish)
    // We'll create specific layouts for common capacities

    // Dynamic positioning is hard with Tailwind classes alone for arbitrary numbers.
    // Let's use a simpler visual approach:
    // Top row, Bottom row, Left/Right for larger tables?

    // Actually, let's just place them evenly around.

    // For polished look, hardcoded layouts for common sizes work best.
    if (capacity <= 2) {
      // 1 Left, 1 Right
      return (
        <>
          <div
            className={`${chairClass} -left-5 top-1/2 -translate-y-1/2 rounded-r-none rounded-l-lg`}
          />
          <div
            className={`${chairClass} -right-5 top-1/2 -translate-y-1/2 rounded-l-none rounded-r-lg`}
          />
        </>
      );
    }

    if (capacity <= 4) {
      // 1 Top, 1 Bottom, 1 Left, 1 Right? Or 2 Top, 2 Bottom?
      // Let's do 1 on each side for square
      return (
        <>
          <div
            className={`${chairClass} -top-5 left-1/2 -translate-x-1/2 rounded-b-none rounded-t-lg`}
          />
          <div
            className={`${chairClass} -bottom-5 left-1/2 -translate-x-1/2 rounded-t-none rounded-b-lg`}
          />
          <div
            className={`${chairClass} -left-5 top-1/2 -translate-y-1/2 rounded-r-none rounded-l-lg`}
          />
          <div
            className={`${chairClass} -right-5 top-1/2 -translate-y-1/2 rounded-l-none rounded-r-lg`}
          />
        </>
      );
    }

    if (capacity <= 6) {
      // Rectangle: 2 Top, 2 Bottom, 1 Left, 1 Right
      return (
        <>
          {/* Top Row - Spaced */}
          <div
            className={`${chairClass} -top-5 left-4 rounded-b-none rounded-t-lg`}
          />
          <div
            className={`${chairClass} -top-5 right-4 rounded-b-none rounded-t-lg`}
          />

          {/* Bottom Row - Spaced */}
          <div
            className={`${chairClass} -bottom-5 left-4 rounded-t-none rounded-b-lg`}
          />
          <div
            className={`${chairClass} -bottom-5 right-4 rounded-t-none rounded-b-lg`}
          />

          {/* Sides */}
          <div
            className={`${chairClass} -left-5 top-1/2 -translate-y-1/2 rounded-r-none rounded-l-lg`}
          />
          <div
            className={`${chairClass} -right-5 top-1/2 -translate-y-1/2 rounded-l-none rounded-r-lg`}
          />
        </>
      );
    }

    if (capacity > 6) {
      // Large Rectangle: Distribute evenly-ish
      // 3 Top, 3 Bottom, 1 Left, 1 Right (Total 8)
      // If 10, maybe 4 top/bottom

      return (
        <>
          <div className="absolute -top-5 w-full flex justify-between px-2">
            {[...Array(Math.ceil((capacity - 2) / 2))].map((_, i) => (
              <div
                key={`t-${i}`}
                className={`w-8 h-8 rounded-t-lg border-2 ${colors.chair} bg-white/50`}
              />
            ))}
          </div>

          <div className="absolute -bottom-5 w-full flex justify-between px-2">
            {[...Array(Math.floor((capacity - 2) / 2))].map((_, i) => (
              <div
                key={`b-${i}`}
                className={`w-8 h-8 rounded-b-lg border-2 ${colors.chair} bg-white/50`}
              />
            ))}
          </div>

          <div
            className={`${chairClass} -left-5 top-1/2 -translate-y-1/2 rounded-r-none rounded-l-lg`}
          />
          <div
            className={`${chairClass} -right-5 top-1/2 -translate-y-1/2 rounded-l-none rounded-r-lg`}
          />
        </>
      );
    }

    return null;
  };

  return (
    <div
      className="relative m-8 transform transition-transform hover:scale-105"
      onClick={() => onClick(id, status)}
    >
      {/* Table Surface */}
      <div
        className={`${tableWidth} ${tableHeight} ${colors.table} border-2 rounded-2xl shadow-md flex flex-col items-center justify-center cursor-pointer relative z-10`}
      >
        <span
          className={`font-bold text-lg ${colors.text} pointer-events-none`}
        >
          Table #{number}
        </span>
        <div className="flex items-center gap-1 mt-1 opacity-75">
          <span className="text-xs font-semibold text-gray-500">
            👤 {capacity}
          </span>
        </div>
      </div>

      {/* Chairs */}
      {getChairLayout()}
    </div>
  );
};
