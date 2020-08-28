//吐司提醒框封装成方法，把“是否带勾”选项放进参数中，便于复用
export function showToast(title, isSuccess) {
  const icon = isSuccess ? 'success' : 'none'
  wx.showToast({
    title,
    icon,
    duration: 2000
  })
}
//把模态输入框封装成方法，把确认和取消的方法放进参数，便于复用
export function showModal(title, content, onConfirm, onCancel) {
  wx.showModal({
    title,
    content,
    success(res) {
      if (res.confirm && onConfirm) {
        onConfirm()
      } else if (res.cancel && onCancel) {
        onCancel()
      }
    }
  })
}
