import { useState, useMemo } from 'react'
import { useReactTable, getCoreRowModel, getSortedRowModel, getFilteredRowModel, getPaginationRowModel, flexRender } from '@tanstack/react-table'

function App() {
  const [data, setData] = useState(() => 
    Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      age: Math.floor(Math.random() * 50) + 18,
      department: ['Engineering', 'Sales', 'Marketing', 'HR', 'Finance'][Math.floor(Math.random() * 5)],
      salary: Math.floor(Math.random() * 100000) + 50000,
      active: Math.random() > 0.3,
    }))
  )

  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })

  const EditableCell = ({ row, getValue, accessorKey }) => {
    const [editMode, setEditMode] = useState(false)
    const [value, setValue] = useState(getValue())

    const save = () => {
      setData(data => {
        const newData = [...data]
        newData[row.index][accessorKey] = accessorKey === 'age' ? parseInt(value) || 0 : value
        return newData
      })
      setEditMode(false)
    }

    return editMode ? (
      <input
        type={accessorKey === 'age' ? 'number' : 'text'}
        value={value}
        onChange={e => setValue(e.target.value)}
        onBlur={save}
        onKeyPress={e => e.key === 'Enter' && save()}
        className="w-full px-2 py-1 border rounded"
        autoFocus
      />
    ) : (
      <div onClick={() => setEditMode(true)} className="cursor-pointer hover:bg-gray-100 px-2 py-1">
        {value}
      </div>
    )
  }

  const columns = useMemo(() => [
    {
      accessorKey: 'id',
      header: ({ column }) => (
        <div>
          <input
            placeholder="Filter ID..."
            value={column.getFilterValue() ?? ''}
            onChange={e => column.setFilterValue(e.target.value)}
            onClick={e => e.stopPropagation()}
            className="w-full px-2 py-1 mb-2 text-xs border rounded"
          />
          <div className="cursor-pointer hover:bg-gray-100 px-1 py-1 rounded" onClick={column.getToggleSortingHandler()}>
            ID{column.getIsSorted() === 'asc' && ' ↑'}{column.getIsSorted() === 'desc' && ' ↓'}
          </div>
        </div>
      ),
      filterFn: (row, columnId, filterValue) => {
        const id = row.getValue(columnId)
        if (!filterValue) return true
        return id.toString().includes(filterValue)
      },
      size: 50,
    },
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <div>
          <input
            placeholder="Filter Name..."
            value={column.getFilterValue() ?? ''}
            onChange={e => column.setFilterValue(e.target.value)}
            onClick={e => e.stopPropagation()}
            className="w-full px-2 py-1 mb-2 text-xs border rounded"
          />
          <div className="cursor-pointer hover:bg-gray-100 px-1 py-1 rounded" onClick={column.getToggleSortingHandler()}>
            Name{column.getIsSorted() === 'asc' && ' ↑'}{column.getIsSorted() === 'desc' && ' ↓'}
          </div>
        </div>
      ),
      cell: ({ row, getValue }) => <EditableCell row={row} getValue={getValue} accessorKey="name" />,
    },
    {
      accessorKey: 'email',
      header: ({ column }) => (
        <div>
          <input
            placeholder="Filter Email..."
            value={column.getFilterValue() ?? ''}
            onChange={e => column.setFilterValue(e.target.value)}
            onClick={e => e.stopPropagation()}
            className="w-full px-2 py-1 mb-2 text-xs border rounded"
          />
          <div className="cursor-pointer hover:bg-gray-100 px-1 py-1 rounded" onClick={column.getToggleSortingHandler()}>
            Email{column.getIsSorted() === 'asc' && ' ↑'}{column.getIsSorted() === 'desc' && ' ↓'}
          </div>
        </div>
      ),
      cell: ({ row, getValue }) => <EditableCell row={row} getValue={getValue} accessorKey="email" />,
    },
    {
      accessorKey: 'age',
      header: ({ column }) => (
        <div>
          <input
            placeholder="Filter Age..."
            value={column.getFilterValue() ?? ''}
            onChange={e => column.setFilterValue(e.target.value)}
            onClick={e => e.stopPropagation()}
            className="w-full px-2 py-1 mb-2 text-xs border rounded"
          />
          <div className="cursor-pointer hover:bg-gray-100 px-1 py-1 rounded" onClick={column.getToggleSortingHandler()}>
            Age{column.getIsSorted() === 'asc' && ' ↑'}{column.getIsSorted() === 'desc' && ' ↓'}
          </div>
        </div>
      ),
      filterFn: (row, columnId, filterValue) => {
        const age = row.getValue(columnId)
        if (!filterValue) return true
        return age.toString().includes(filterValue)
      },
      cell: ({ row, getValue }) => <EditableCell row={row} getValue={getValue} accessorKey="age" />,
    },
    {
      accessorKey: 'department',
      header: ({ column }) => (
        <div>
          <input
            placeholder="Filter Dept..."
            value={column.getFilterValue() ?? ''}
            onChange={e => column.setFilterValue(e.target.value)}
            onClick={e => e.stopPropagation()}
            className="w-full px-2 py-1 mb-2 text-xs border rounded"
          />
          <div className="cursor-pointer hover:bg-gray-100 px-1 py-1 rounded" onClick={column.getToggleSortingHandler()}>
            Department{column.getIsSorted() === 'asc' && ' ↑'}{column.getIsSorted() === 'desc' && ' ↓'}
          </div>
        </div>
      ),
      filterFn: 'includesString',
    },
    {
      accessorKey: 'salary',
      header: ({ column }) => (
        <div>
          <input
            placeholder="Filter Salary..."
            value={column.getFilterValue() ?? ''}
            onChange={e => column.setFilterValue(e.target.value)}
            onClick={e => e.stopPropagation()}
            className="w-full px-2 py-1 mb-2 text-xs border rounded"
          />
          <div className="cursor-pointer hover:bg-gray-100 px-1 py-1 rounded" onClick={column.getToggleSortingHandler()}>
            Salary{column.getIsSorted() === 'asc' && ' ↑'}{column.getIsSorted() === 'desc' && ' ↓'}
          </div>
        </div>
      ),
      filterFn: (row, columnId, filterValue) => {
        const salary = row.getValue(columnId)
        if (!filterValue) return true
        return salary.toString().includes(filterValue)
      },
      cell: ({ getValue }) => `$${getValue().toLocaleString()}`,
    },
    {
      accessorKey: 'active',
      header: ({ column }) => (
        <div>
          <select
            value={column.getFilterValue() ?? ''}
            onChange={e => column.setFilterValue(e.target.value)}
            onClick={e => e.stopPropagation()}
            className="w-full px-2 py-1 mb-2 text-xs border rounded"
          >
            <option value="">All</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
          <div className="cursor-pointer hover:bg-gray-100 px-1 py-1 rounded" onClick={column.getToggleSortingHandler()}>
            Active{column.getIsSorted() === 'asc' && ' ↑'}{column.getIsSorted() === 'desc' && ' ↓'}
          </div>
        </div>
      ),
      filterFn: (row, columnId, filterValue) => {
        const active = row.getValue(columnId)
        if (!filterValue) return true
        return active.toString() === filterValue
      },
      cell: ({ row, getValue }) => (
        <input
          type="checkbox"
          checked={getValue()}
          onChange={e => {
            setData(data => {
              const newData = [...data]
              newData[row.index].active = e.target.checked
              return newData
            })
          }}
        />
      ),
    },
  ], [])

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters, pagination },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Interactive Data Table</h1>
      <div className="overflow-x-auto border rounded-lg shadow-sm">
        <table className="w-full border-collapse">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className="bg-gray-50 border-b-2 border-gray-200">
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700 min-w-[100px]">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="hover:bg-blue-50 border-b border-gray-200">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="border border-gray-300 px-4 py-2 text-gray-800">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {['First', 'Previous', 'Next', 'Last'].map(label => (
            <button
              key={label}
              onClick={() => {
                if (label === 'First') table.setPageIndex(0)
                else if (label === 'Previous') table.previousPage()
                else if (label === 'Next') table.nextPage()
                else if (label === 'Last') table.setPageIndex(table.getPageCount() - 1)
              }}
              disabled={label === 'First' || label === 'Previous' ? !table.getCanPreviousPage() : !table.getCanNextPage()}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span>Page</span>
          <strong>{table.getState().pagination.pageIndex + 1} of {table.getPageCount()}</strong>
          <span>| Go to page:</span>
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={e => table.setPageIndex(e.target.value ? Number(e.target.value) - 1 : 0)}
            className="w-16 px-2 py-1 border rounded"
          />
        </div>
        <select
          value={table.getState().pagination.pageSize}
          onChange={e => table.setPageSize(Number(e.target.value))}
          className="px-3 py-1 border rounded"
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>Show {pageSize}</option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default App
