const cloud = require('wx-server-sdk')

cloud.init({
  env: 'XXXXXXX'	//云开发id
})
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  const { userId } = event

  if (!userId) {
    return
  }

  try {
    return await db
      .collection('events')
      .where({
        userId
      })
      .get()
  } catch (e) {
    console.log(e)
  }
}
