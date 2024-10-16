import React, { useMemo, useState } from 'react';
import MaterialReactTable from 'material-react-table';
import { Slider } from '@mui/material';

const sampleData = [
  
];

const TableComponent = () => {
  const [columnVisibility, setColumnVisibility] = useState({});
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activePanel, setActivePanel] = useState('');

  const columns = useMemo(
    () => [
      { accessorKey: 'id', header: 'ID' },
      { accessorKey: 'name', header: 'Name' },
      { accessorKey: 'category', header: 'Category' },
      { accessorKey: 'subcategory', header: 'Subcategory' },
      {
        accessorKey: 'createdAt',
        header: 'Created At',
        Cell: ({ cell }) => new Date(cell.getValue()).toLocaleString(),
      },
      {
        accessorKey: 'updatedAt',
        header: 'Updated At',
        Cell: ({ cell }) => new Date(cell.getValue()).toLocaleString(),
      },
      { accessorKey: 'price', header: 'Price' },
      { accessorKey: 'sale_price', header: 'Sale Price' },
    ],
    []
  );

  const handleOpenDrawer = (panel) => {
    setActivePanel(panel);
    setIsDrawerOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-end space-x-4 mb-4">
        <button
          className="p-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => handleOpenDrawer('columns')}
        >
          View Columns
        </button>
        <button
          className="p-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => handleOpenDrawer('filters')}
        >
          Filters
        </button>
      </div>

      <MaterialReactTable
        columns={columns}
        data={sampleData}
        enableColumnFilters
        enableSorting
        enablePagination
        columnVisibility={columnVisibility}
        enableRowSelection
        enableGlobalFilter
        onColumnVisibilityChange={setColumnVisibility}
        onSortingChange={setSort}
      />

      {isDrawerOpen && (
        <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg p-4">
          <button
            className="p-2 mb-4 bg-red-500 text-white rounded"
            onClick={() => setIsDrawerOpen(false)}
          >
            Close
          </button>
          {activePanel === 'columns' && (
            <div>
              <h3 className="font-bold text-lg">View/Hide Columns</h3>
              {columns.map((col) => (
                <div key={col.accessorKey} className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    checked={columnVisibility[col.accessorKey] !== false}
                    onChange={() => {
                      setColumnVisibility((prev) => ({
                        ...prev,
                        [col.accessorKey]: !prev[col.accessorKey],
                      }));
                    }}
                  />
                  <span className="ml-2">{col.header}</span>
                </div>
              ))}
            </div>
          )}
          {activePanel === 'filters' && (
            <div>
              <h3 className="font-bold text-lg">Filters</h3>
              {/* Implement Filters for each column */}
              <Slider
                min={0}
                max={500}
                valueLabelDisplay="auto"
                onChange={(e, newValue) => console.log('Price range:', newValue)}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TableComponent;
