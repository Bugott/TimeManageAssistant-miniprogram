import DetailModel from '../../models/detail'
import { showToast, showModal } from '../../utils/UIUtil'

const globalEnv = getApp()

Page({
  data: {
    eventId: '',
    eventTitle: '',
    lastUpdate: '',
    duration: '',
    longestDuration: '',
    eventRecords: null, 
    isEditingTitle: false,
    isUploadingTitle: false
  },

  onLoad: function(options) {
    this.data.eventId = options.id
  },

  onShow() {
    this.getEventData(this.data.eventId)
  },

  onStartRecord() {
    const timerInfo = globalEnv.data

    if (timerInfo.eventId !== '' && timerInfo.eventId !== this.data.eventId) {
      showToast('你目前已经有目标在进行中')
      return
    }

    wx.navigateTo({
      url: `/pages/timer/index?eventId=${
        this.data.eventId
      }&eventTitle=${encodeURIComponent(this.data.eventTitle)}`
    })
  },

  onEditEventTitle() {
    this.setData({
      isEditingTitle: true
    })
  },

  onEditCompleted(e) {
    if (!e.detail.length) {
      showToast('标题不能为空')
      return
    }

    if (this.data.isUploadingTitle) return

    this.data.isUploadingTitle = true

    DetailModel.editEventTitle(this.data.eventId, e.detail)
      .then(res => {
        const { eventId, eventTitle } = res.result.data
        const timerInfo = globalEnv.data

        this.setData({
          isEditingTitle: false,
          eventTitle
        })

        if (timerInfo.eventId && timerInfo.eventId === eventId) {
          timerInfo.eventTitle = eventTitle
        }
        this.data.isUploadingTitle = false
        showToast('修改成功', true)
      })
      .catch(err => {
        this.setData({
          isEditingTitle: false
        })
        this.data.isUploadingTitle = false
        showToast('修改失败')
      })
  },

  onEditCancel() {
    this.setData({
      isEditingTitle: false
    })
  },

  onRemoveEvent() {
    showModal('', `是否删除 “${this.data.eventTitle}”`, () => {
      DetailModel.removeEvent(this.data.eventId).then(
        res => {
          wx.navigateBack({
            delta: 1
          })
        },
        err => {
          showToast('删除失败')
        }
      )
    })
  },

  getEventData(eventId) {
    DetailModel.getEventData(eventId).then(
      res => {
        const data = DetailModel.formatEventData(res.result)
        this.setData({
          eventTitle: data.title,
          lastUpdate: data.lastUpdate,
          duration: data.duration,
          longestDuration: data.longestDuration,
          eventRecords: data.eventRecords
        })
      },
      err => {
        showToast('获取失败')
      }
    )
  }
})
