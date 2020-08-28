const cloud = require('wx-server-sdk')

cloud.init({
  env: 'XXXXXXX'	//云开发id
})
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  const { eventId } = event

  if (!eventId) {
    return
  }

  try {
    const eventInfo = await db
      .collection('events')
      .doc(eventId)
      .get()

    const eventRecords = await db
      .collection('event-records')
      .where({
        eventId
      })
      .get()

    return { eventInfo, eventRecords }
  } catch (e) {
    console.log(e)
  }
}
