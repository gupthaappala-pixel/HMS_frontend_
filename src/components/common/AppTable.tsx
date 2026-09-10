import React from 'react';
import { useThemeMode } from '../../theme';

export interface AppTableColumn<T> {
  header: string;
  accessor?: keyof T | ((row: T, index: number) => React.ReactNode);
  className?: string;
  align?: 'left' | 'center' | 'right';
  width?: string;
}

interface AppTableProps<T> {
  columns: AppTableColumn<T>[];
  data: T[];
  keyExtractor: (row: T, index: number) => string | number;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
  loading?: boolean;
}

export function AppTable<T>({
  columns,
  data,
  keyExtractor,
  emptyMessage = 'No records found',
  onRowClick,
  loading = false,
}: AppTableProps<T>) {
  const { isDark } = useThemeMode();

  return (
    <div
      className={`rounded-xl border overflow-hidden transition-colors ${
        isDark ? 'bg-slate-800/90 border-slate-700/80' : 'bg-white border-slate-200 shadow-sm'
      }`}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr
              className={`border-b text-[11px] font-semibold tracking-wider uppercase ${
                isDark ? 'bg-slate-900/60 border-slate-700 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'
              }`}
            >
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  style={{ width: col.width }}
                  className={`py-3.5 px-4 font-semibold ${
                    col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'
                  } ${col.className || ''}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={`divide-y text-xs sm:text-sm ${isDark ? 'divide-slate-700/60' : 'divide-slate-100'}`}>
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="py-12 text-center">
                  <div className="inline-flex items-center gap-2 text-sm text-blue-500">
                    <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>Loading data...</span>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className={`py-12 text-center font-medium ${isDark ? 'text-slate-500' : 'text-slate-400'}`}
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, rowIdx) => {
                const isClickable = Boolean(onRowClick);
                return (
                  <tr
                    key={keyExtractor(row, rowIdx)}
                    onClick={() => onRowClick && onRowClick(row)}
                    className={`transition-colors ${
                      isDark
                        ? 'hover:bg-slate-700/50 text-slate-200'
                        : 'hover:bg-slate-50 text-slate-800'
                    } ${isClickable ? 'cursor-pointer' : ''}`}
                  >
                    {columns.map((col, colIdx) => (
                      <td
                        key={colIdx}
                        className={`py-3.5 px-4 align-middle ${
                          col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'
                        } ${col.className || ''}`}
                      >
                        {typeof col.accessor === 'function'
                          ? col.accessor(row, rowIdx)
                          : col.accessor
                          ? String(row[col.accessor] ?? '')
                          : null}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
