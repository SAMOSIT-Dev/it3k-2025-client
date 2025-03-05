'use client'
import React, { useState } from 'react'
import { Button } from '../components/Button'
import { Card, CardContent } from '../components/Card'
import { Input } from '../components/Input'

const initialData = [
  { id: 1, name: 'John Doe', age: 25, role: 'Admin' },
  { id: 2, name: 'Jane Smith', age: 30, role: 'Editor' },
  { id: 3, name: 'Alice Johnson', age: 28, role: 'Viewer' }
]

const columns = Object.keys(initialData[0]).filter((key) => key !== 'id')

const BasketballAdminPage: React.FC = () => {
  const [data, setData] = useState(initialData)
  const [editing, setEditing] = useState<{ id: number; key: string } | null>(
    null
  )
  const [tempValue, setTempValue] = useState<string>('')

  const handleEdit = (id: number, key: string) => {
    setEditing({ id, key })
    setTempValue(data.find((item) => item.id === id)?.[key as keyof typeof initialData[0]] as string)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempValue(e.target.value)
  }

  const handleBlur = () => {
    if (editing) {
      const newData = data.map((item) =>
        item.id === editing.id ? { ...item, [editing.key]: tempValue } : item
      )
      setData(newData)
      setEditing(null)
    }
  }

  const handleSubmit = () => {
    console.log('Updated Data:', data)
    alert('Data submitted successfully!')
  }

  return (
    <Card className="p-4 w-full max-w-3xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Admin Table</h2>
      <CardContent>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="border border-gray-300 p-2 bg-gray-200">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                {columns.map((key, colIndex) => (
                  <td
                    key={colIndex}
                    className="border border-gray-300 p-2 cursor-pointer"
                    onClick={() => handleEdit(row.id, key)}>
                    {editing?.id === row.id && editing?.key === key ? (
                      <Input
                        autoFocus
                        value={tempValue}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full"
                      />
                    ) : (
                      row[key as keyof (typeof initialData)[0]]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <Button className="mt-4" onClick={handleSubmit}>
          Submit
        </Button>
      </CardContent>
    </Card>
  )
}

export default BasketballAdminPage
