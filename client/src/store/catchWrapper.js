const catchWrapper = (cb, successText) => {

  return new Promise(async (res, rej) => {

    const error = await cb().catch(e => {
      const { statusCode, message } = e.response.data
      return { statusCode, message }
    })

    if (!error) {
      return res(successText)
    }
    return rej(error)

  })

}

export default catchWrapper
