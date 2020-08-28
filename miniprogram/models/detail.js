import {
  formatDate,
  formatDateTime,
  formatDuration,
  formatDurationToStr
} from '../utils/dateTimeUtil'

export default class DetailModel {
  static getEventData(eventId) {
    return wx.cloud.callFunction({
      name: 'getEventData',
      data: { eventId }
    })
  }

  static removeEvent(eventId) {
    return wx.cloud.callFunction({
      name: 'removeEvent',
      data: { eventId }
    })
  }

  static formatEventData(data) {
    const eventInfo = data.eventInfo.data
    const eventRecords = data.eventRecords.data[0].records

    return {
      title: eventInfo.title,
      duration: formatDurationToStr(eventInfo.time),
      lastUpdate: formatDate(eventInfo.lastUpdate),
      eventRecords: this.formatEventRecords(eventRecords),
      longestDuration: this.pickLongestDuration(eventRecords)
    }
  }

  static formatEventRecords(eventRecords) {
    if (!eventRecords) return []
    return eventRecords.map(record => ({
      duration: formatDuration(record.time),
      date: `${formatDateTime(record.beginDate)} ~ ${formatDateTime(
        record.endDate
      )}`,
      summary: record.summary
    }))
  }

  static pickLongestDuration(eventRecords) {
    if (!eventRecords) return formatDurationToStr(0)
    let max = 0
    eventRecords.forEach(record => {
      const duration = +record.time
      max = duration > max ? duration : max
    })
    return formatDurationToStr(max)
  }

  static editEventTitle(eventId, eventTitle) {
    return wx.cloud.callFunction({
      name: 'editEventTitle',
      data: {
        eventId,
        eventTitle
      }
    })
  }
}
