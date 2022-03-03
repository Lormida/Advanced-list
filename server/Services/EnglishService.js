const English = require('../Models/English')


exports.addEnglishPhraseToDatabase = async (origin, translate) => await English.create({ origin, translate })

exports.getEnglishDictFromDatabase = async () => await English.find().select({ origin: 1, translate: 1, _id: 1 })

exports.deleteEnglishPhraseFromDatabase = async (id) => await English.findByIdAndDelete(id)

exports.modifyEnglishPhraseInDatabase = async (id, slicesData) => {
  return await English.findByIdAndUpdate(id, {
    ...slicesData
  }, { new: true })
}