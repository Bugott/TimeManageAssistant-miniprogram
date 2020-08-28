export default class SummaryModel {
  static addEventRecord(eventId, beginDate, endDate, duration, summary) {
    return wx.cloud.callFunction({
      name: 'addEventRecord',
      data: {
        eventId,
        beginDate,
        endDate,
        time: duration,
        summary
      }
    })
  }
}