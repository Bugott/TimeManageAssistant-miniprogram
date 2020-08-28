const cloud = require('wx-server-sdk')

cloud.init({
  env: 'XXXXXXX'	//云开发id
})
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  const { eventTitle, userId } = event

  if (!eventTitle || !userId) return

  try {
    const event = await db.collection('events').add({
      data: {
        userId,
        title: eventTitle,
        createDate: new Date(),
        lastUpdate: null,
        time: 0
      }
    })

    await db.collection('event-records').add({
      data: {
        eventId: event._id
      }
    })
  } catch (e) {
    console.log(e)
  }
}
