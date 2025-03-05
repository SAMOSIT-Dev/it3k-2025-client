'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '../components/Button'
import { Card, CardContent } from '../components/Card'
import { Input } from '../components/Input'
import AthleticService, { TAthleticServiceGET, TAthleticTeam } from '../services/AthleticService'
const initialData: TAthleticServiceGET[] = [
  {
    event: 'University Championship',
    time: '10:00 AM',
    location: 'Main Stadium',
    teams: [
      {
        id: 1,
        uniName: 'KMUTT',
        image: 'logo1.png',
        colorCode: '#FF5733',
        ranking: 1
      },
      {
        id: 2,
        uniName: 'Chula',
        image: 'logo2.png',
        colorCode: '#33FF57',
        ranking: 2
      }
    ]
  },
  {
    event: 'National League',
    time: '2:00 PM',
    location: 'City Arena',
    teams: [
      {
        id: 3,
        uniName: 'Thammasat',
        image: 'logo3.png',
        colorCode: '#3357FF',
        ranking: 3
      },
      {
        id: 4,
        uniName: 'Mahidol',
        image: 'logo4.png',
        colorCode: '#FFD700',
        ranking: 4
      }
    ]
  }
]

const AthleticAdminPage: React.FC = () => {
  const [data, setData] = useState<TAthleticServiceGET[]>(initialData)

  useEffect(() => { 
    (async () => {
      const response = await AthleticService.getScores()
      setData(response)
    })()
  }, [])

  const [editing, setEditing] = useState<{
    eventIndex: number
    id: number
    key: keyof TAthleticTeam
  } | null>(null)
  const [tempValue, setTempValue] = useState('')

  const handleEdit = (
    eventIndex: number,
    id: number,
    key: keyof TAthleticTeam
  ) => {
    setEditing({ eventIndex, id, key })
    const team = data[eventIndex].teams.find((t) => t.id === id)
    if (team) setTempValue(team[key].toString())
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempValue(e.target.value)
  }

  const handleBlur = () => {
    if (editing) {
      const newData = data.map((event, eventIndex) => {
        if (eventIndex === editing.eventIndex) {
          return {
            ...event,
            teams: event.teams.map((team) =>
              team.id === editing.id
                ? { ...team, [editing.key]: tempValue }
                : team
            )
          }
        }
        return event
      })
      setData(newData)
      setEditing(null)
    }
  }

  const handleSubmit = (eventIndex: number) => {
    console.log('Updated Data for:', data[eventIndex])
    alert(`Data for ${data[eventIndex].event} submitted successfully!`)
  }

  return (
    <Card className="p-4 w-full max-w-4xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Admin Table</h2>
      {data.map((event, eventIndex) => (
        <CardContent key={eventIndex}>
          <h3 className="text-lg font-semibold">{event.event}</h3>
          <p className="text-sm text-gray-600">
            Time: {event.time} | Location: {event.location}
          </p>
          <table className="w-full border-collapse border border-gray-300 mt-2">
            <thead>
              <tr>
                {Object.keys(event.teams[0])
                  .filter((key) => key !== 'id')
                  .map((column) => (
                    <th
                      key={column}
                      className="border border-gray-300 p-2 bg-gray-200 capitalize">
                      {column}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {event.teams.map((team) => (
                <tr key={team.id}>
                  {Object.keys(team)
                    .filter((key) => key !== 'id')
                    .map((key) => (
                      <td
                        key={key}
                        className="border border-gray-300 p-2 cursor-pointer"
                        onClick={() =>
                          handleEdit(
                            eventIndex,
                            team.id,
                            key as keyof TAthleticTeam
                          )
                        }>
                        {editing?.eventIndex === eventIndex &&
                        editing?.id === team.id &&
                        editing?.key === key ? (
                          <Input
                            autoFocus
                            value={tempValue}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="w-full"
                          />
                        ) : (
                          team[key as keyof TAthleticTeam].toString()
                        )}
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
          <Button className="mt-4" onClick={() => handleSubmit(eventIndex)}>
            Submit
          </Button>
        </CardContent>
      ))}
    </Card>
  )
}
export default AthleticAdminPage
