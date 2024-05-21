import React from 'react'
import { RangeDatepicker } from 'chakra-dayzed-datepicker'
import useThemeMode from '@renderer/hooks/useThemeMode'

type SelectDateRangePropTypes = {
  selectedDates: Date[]
  setSelectedDates: (date: Date[]) => void
}

export default function SelectDateRange(props: SelectDateRangePropTypes) {
  const { mode10, mode80, modeBrandAlt } = useThemeMode()

  const [selectedDates, setSelectedDates] = React.useState(props.selectedDates)

  function onDateChange(values: any) {
    setSelectedDates(values)

    if (values?.length === 2) {
      props.setSelectedDates(values)
    }
  }

  return (
    <RangeDatepicker
      name="date-range-input"
      selectedDates={selectedDates}
      onDateChange={onDateChange}
      configs={{
        dateFormat: 'MMM dd, yyyy'
      }}
      propsConfigs={{
        dateNavBtnProps: {
          padding: 2,
          colorScheme: 'gray',
          variant: 'outline'
        },
        dayOfMonthBtnProps: {
          defaultBtnProps: {
            color: mode80,
            fontWeight: 400,
            padding: 2,
            _hover: {
              background: 'brand.300'
            }
          },
          isInRangeBtnProps: {
            background: modeBrandAlt
          },
          selectedBtnProps: {
            background: 'green.300'
          },
          todayBtnProps: {
            background: 'brand.200'
          }
        },
        inputProps: {
          size: 'sm',
          backgroundColor: mode10
        },
        calendarPanelProps: {
          wrapperProps: {
            borderColor: 'green'
          },
          contentProps: {
            padding: 0,
            borderRadius: 0,
            borderWidth: 0
          },
          headerProps: {
            padding: '5px'
          },
          dividerProps: {
            display: 'none'
          }
        },
        weekdayLabelProps: {
          fontSize: 'sm'
        }
      }}
    />
  )
}
