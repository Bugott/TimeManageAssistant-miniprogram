const cloud = require('wx-server-sdk')

cloud.init({
  env: 'XXXXXXX'	//云开发id
})
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  const { eventId, beginDate, endDate, summary, time } = event

  if (!eventId) {
    return
  }

  try {
    await db
      .collection('event-records')
      .where({
        eventId
      })
      .update({
        data: {
          records: _.push([
            {
              summary,
              beginDate,
              endDate,
              time
            }
          ])
        }
      })

    await db
      .collection('events')
      .doc(eventId)
      .update({
        data: {
          time: _.inc(parseInt(time)),
          lastUpdate: endDate
        }
      })
  } catch (e) {
    console.log(e)
  }
}
