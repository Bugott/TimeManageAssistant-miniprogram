const cloud = require('wx-server-sdk')

cloud.init({
  env: 'XXXXXXX'	//云开发id
})
const db = cloud.database()

exports.main = async (event, context) => {
  
  const wxContext = cloud.getWXContext()

  try {
    return await db.collection('users').add({
      data: {
        _openid: wxContext.OPENID
      }
    })
  } catch (e) {
    console.log(e)
  }
}