const englishService = require('../Services/EnglishService')
const AppError = require('../AppError')

exports.getEnglishDict = async (req, res, next) => {
  let englishDict = null
  try {
    englishDict = await englishService.getEnglishDictFromDatabase()
  }
  catch (e) {
    let error = new AppError('Internal fault', '503')
    return next(error)
  }
  return res.status(200).json(englishDict)
}

exports.addEnglishPhrase = async (req, res, next) => {
  let newPhrase = null
  try {
    const { origin, translate } = req.body
    newPhrase = await englishService.addEnglishPhraseToDatabase(origin, translate)
  }
  catch (e) {
    let error = new AppError('Error creating object', '400')
    return next(error)
  }
  res.status(201).json(newPhrase)
}

exports.deleteEnglishPhrase = async (req, res, next) => {
  let deletePhrase = null
  const id = req.params.id
  try {
    deletePhrase = await englishService.deleteEnglishPhraseFromDatabase(id)
  }
  catch (e) {
    let error = new AppError('Error validation', '400')
    return next(error)
  }
  return res.status(200).json(deletePhrase)
}

exports.modifyEnglishPhrase = async (req, res, next) => {
  const id = req.params.id
  let modifiedPhrase = null
  try {
    modifiedPhrase = await englishService.modifyEnglishPhraseInDatabase(id, req.body)
  } catch (e) {
    let error = new AppError('Error saving', '401')
    return next(error)
  }
  res.status(200).json(modifiedPhrase)
}