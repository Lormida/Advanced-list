const catchWrapper = (cb, successText) => {

  return new Promise(async (res, rej) => {

    const error = await cb().catch(e => {
      const { statusCode, message } = e.response?.data || { statusCode: 500, message: e.message }
      return { statusCode: +statusCode, message, error: true }
    })

    if (!error) {
      return res({ statusCode: 200, message: successText })
    }
    return rej(error)

  })

}

export default catchWrapper
