//将毫秒数格式化为日期（#月#日）
export function formatDate(millisec) {
  if (!millisec) {
    return false
  }
  const date = new Date(millisec)
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${month}月${day}日`
}

//将毫秒数格式化为时间（#时#分）
export function formatTime(millisec) {
  if (!millisec) {
    return false
  }
  const date = new Date(millisec)
  const hour = date.getHours()
  const minute = padZero(date.getMinutes())
  return `${hour}:${minute}`
}

//格式化为日期+时间（上面两个合并）
export function formatDateTime(millisec) {
  if (!millisec) {
    return false
  }
  return `${formatDate(millisec)} ${formatTime(millisec)}`
}

//将总毫秒数换成可读单位（返回对象方便复用）
export function formatDuration(millisec) {
  const duration = +millisec / 1000
  let pref = ''
  let suff = ''
  if (duration <= 0) {
    suff = '0秒'
  } else if (duration <= 1) {
    suff = '1秒不够'
  } else if (duration < 60) {
    pref = parseInt(duration)
    suff = '秒'
  } else if (duration / 60 < 60) {
    pref = parseInt(duration / 60)
    suff = '分钟'
  } else if (duration / 3600 < 24) {
    pref = parseInt(duration / 3600)
    suff = '小时'
  } else {
    pref = parseInt(duration / 86400)
    suff = '天'
  }
  return {
    pref,
    suff
  }
}

//将上面返回的对象直接返回为字符串
export function formatDurationToStr(millisec) {
  const data = formatDuration(+millisec)
  return data.pref + data.suff
}

//秒表计时器易读化
export function formatDurationToTimer(millisec) {
  const duration = +millisec / 1000
  const second = padZero(Math.floor(duration % 60))
  const minute = padZero(Math.floor(duration / 60) % 60)
  const hour = padZero(Math.floor(duration / 60 / 60) % 60)
  return `${hour}:${minute}:${second}`
}

//由始末时间得出时长
export function countDuration(startDate, endDate) {
  if (!startDate || !endDate) {
    return
  }
  const duration = +endDate - +startDate
  if (duration < 0) return

  return Math.floor(duration / 1000)
}

//小于十的补零格式化
function padZero(number) {
  return +number < 10 ? '0' + number.toString() : number.toString()
}
