const { Router } = require('express')
const SecretariaControllers = require('../controllers/SecretariaControllers')

const router = Router()
router.get('/secretaria/:id', SecretariaControllers.pegaSecretaria);
router.get('/coordenadoria/:coord', SecretariaControllers.pegaCoordenadoria);
router.get('/coordenadoriaById/:id', SecretariaControllers.pegaCoordenadoriaById);
router.get('/coordenadoria', SecretariaControllers.coordenadoria);
router.get('/secretaria', SecretariaControllers.secretaria);
router.get('/coordsexecByUserId/:id', SecretariaControllers.pegarCoordSexevByUser);
router.get('/coordsexecByUserName/:name', SecretariaControllers.pegarCoordSexevByUserName);

module.exports = router