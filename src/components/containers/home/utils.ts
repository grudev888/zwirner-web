import {parse} from 'date-fns'

const NUM_TO_DAY = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

export const parseAvailability = (hours: any[], currentTime: Date) =>
  hours
    .find((hour: any) => hour._key.toLowerCase() === NUM_TO_DAY[currentTime.getDay()])
    .availableTimes?.map((time: any) => ({
      from: parse(`${time.from} -04`, 'h:mm a X', new Date()),
      to: parse(`${time.to} -04`, 'h:mm a X', new Date()),
    }))
