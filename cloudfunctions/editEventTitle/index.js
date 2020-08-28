const cloud = require('wx-server-sdk')

cloud.init({
  env: 'XXXXXXX'	//云开发id
})
const db = cloud.database()

exports.main = async (event, context) => {
  const { eventId, eventTitle } = event

  if (!eventId || !eventTitle) return

  try {
    const result = await db
      .collection('events')
      .doc(eventId)
      .update({
        data: {
          title: eventTitle
        }
      })
    result.data = {
      eventId,
      eventTitle
    }
    return result
  } catch (e) {
    console.log(e)
    return e
  }
}
