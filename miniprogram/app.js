import TimerState from './config/timerState'
import { CLOUD_ENV_ID } from './config'

App({
  onLaunch() {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
        env: CLOUD_ENV_ID
      })
    }

    this.data = {
      timerId: -1,
      timerState: TimerState.NONE,
      eventId: '',
      eventTitle: '',
      duration: 0,
      beginDate: 0,
      pauseDate: 0,
      pauseDuration: 0
    }
  },

  //启动or暂停后开始计时器
  startTimer(eventId, eventTitle, onCount) {
    const { data } = this
    const { timerState, timerId } = data
    //如果TimerState是None则是第一次启动，直接计时，如果是PAUSE则是暂停后开始，需要计算出暂停的时间
    if (timerState === TimerState.NONE) {
      data.eventId = eventId
      data.eventTitle = eventTitle
      data.beginDate = Date.now()
    } else if (timerState === TimerState.PAUSE) {
      data.pauseDuration = data.pauseDuration + (Date.now() - data.pauseDate)
      data.pauseDate = 0
    }
    //改变标志为ONGOING
    data.timerState = TimerState.ONGOING
    //id不为0时需要停止计时
    if (timerId !== -1) {
      clearInterval(timerId)
    }

    const { beginDate, pauseDuration } = data
    //计算时长公式：现在时间-开始时间-暂停时长
    data.duration = Date.now() - beginDate - pauseDuration
    onCount(data.duration)
    const newTimerId = setInterval(() => {
      data.duration = Date.now() - beginDate - pauseDuration
      onCount(data.duration)
    }, 1000)
    this.data.timerId = newTimerId
  },

  //暂停计时器，同时记录暂停前的时间，然后停止计时，改变TimerState标志
  pauseTimer() {
    this.data.pauseDate = Date.now()
    clearInterval(this.data.timerId)
    this.data.timerId = -1
    this.data.timerState = TimerState.PAUSE
  },

  //停止计时器，停止计时，将所有data设空值，改标志为None
  stopTimer() {
    clearInterval(this.data.timerId)
    this.data.timerId = -1
    this.data.timerState = TimerState.NONE
    this.data.eventId = ''
    this.data.eventTitle = ''
    this.data.duration = 0
    this.data.pauseDuration = 0
    this.data.beginDate = 0
    this.data.pauseDate = 0
  }
})
