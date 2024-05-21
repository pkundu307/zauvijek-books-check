import React from 'react'
import DashboardView from '../view/dashboard.view'

export default function DashboardController() {
  const [selectedDates, setSelectedDates] = React.useState<Date[]>([
    new Date('2023-04-01'),
    new Date('2024-03-31')
  ])

  function handleSelectedDates(value: Date[]) {
    setSelectedDates(value)
  }

  return <DashboardView selectedDates={selectedDates} handleSelectedDates={handleSelectedDates} />
}
