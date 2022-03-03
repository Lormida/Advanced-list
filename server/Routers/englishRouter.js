const { Router } = require('express')
const englishController = require('../Controllers/englishController')
const router = Router()

router.get('/english-dictionary', englishController.getEnglishDict)
router.post('/add-english-phrase', englishController.addEnglishPhrase)
router.delete('/delete-english-phrase/:id', englishController.deleteEnglishPhrase)
router.patch('/modify-english-phrase/:id', englishController.modifyEnglishPhrase)

module.exports = router