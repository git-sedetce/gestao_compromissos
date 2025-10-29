const { Router } = require('express')
const LocalizacaoControllers = require('../controllers/LocalizacaoControllers')

const router = Router()
router.get('/pegaCidade', LocalizacaoControllers.pegarCidade);
router.get('/cityId/:id', LocalizacaoControllers.cityById);
router.get('/pegaCidadeRegiao', LocalizacaoControllers.pegarCidadeRegiao);
router.get('/regiaoByCity/:id', LocalizacaoControllers.pegarRegiaoByCity);

router.get('/pegaCidadeBr', LocalizacaoControllers.pegarCidadeBr);
router.get('/cityIdBr/:id', LocalizacaoControllers.cityByIdBr);
router.get('/pegaEstadoBr', LocalizacaoControllers.pegarEstadoBr);
router.get('/estadoByCityBr/:city', LocalizacaoControllers.pegarEstadoByCityBr);


module.exports = router