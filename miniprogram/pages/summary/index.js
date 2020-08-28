import {
  formatDate,
  formatTime,
  formatDurationToStr
} from '../../utils/dateTimeUtil'
import SummaryModel from '../../models/summary'
import { showToast } from '../../utils/UIUtil'

Page({
  data: {
    eventId: '',
    eventTitle: '',
    begin: 0,
    beginTime: '',
    beginDate: '',
    end: 0,
    endTime: '',
    endDate: '',
    duration: 0,
    durationStr: '',
    summary: '',
    isUploading: false
  },

  onLoad(options) {
    const { eventId, eventTitle, beginDate, endDate, duration } = options
    this.data.eventId = eventId
    this.data.begin = +beginDate
    this.data.end = +endDate
    this.data.duration = +duration

    this.setData({
      eventTitle: decodeURIComponent(eventTitle),
      beginTime: formatTime(+beginDate),
      beginDate: formatDate(+beginDate),
      endTime: formatTime(+endDate),
      endDate: formatDate(+endDate),
      durationStr: formatDurationToStr(duration)
    })
  },

  onSummaryInput(e) {
    this.setData({
      summary: e.detail.value
    })
  },

  onSubmit() {
    if (this.data.isUploading) return

    this.data.isUploading = true
    const { eventId, begin, end, duration, summary } = this.data
    SummaryModel.addEventRecord(
      eventId,
      begin,
      end,
      duration,
      summary ? summary : '无标题'
    ).then(
      res => {
        wx.navigateBack({
          delta: 1
        })
      },
      err => {
        this.data.isUploading = false
        showToast('提交失败')
      }
    )
  }
})
