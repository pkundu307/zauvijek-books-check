import { SingleDatepicker } from 'chakra-dayzed-datepicker'
import useThemeMode from '@renderer/hooks/useThemeMode'

type SelectDatePropType = {
  value?: Date
  isDisabled?: boolean
  onChange: (date: Date) => void
}

export default function SelectDate(props: SelectDatePropType) {
  const { mode10, mode80, modeBrandAlt } = useThemeMode()
  return (
    <SingleDatepicker
      name="date-input"
      date={new Date(props?.value ? props?.value : '2023-01-01')}
      onDateChange={(date) => props.onChange(date)}
      configs={{
        dateFormat: 'dd MMM yyyy'
      }}
      disabled={props?.isDisabled}
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
              background: modeBrandAlt
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
      {...props}
    />
  )
}
