const { Router } = require('express');
const SimaController = require('../controllers/SimaControllers');

const router = Router();
router.post('/novoSima', SimaController.cadastraSima);
router.get('/allSima', SimaController.todosSima);
router.get('/sima/:id', SimaController.simaId);
router.put('/atualizaSima/:id', SimaController.atualizaSima)
router.delete('/sima/:id', SimaController.apagaSima)

router.get('/statusSima', SimaController.statuSima);

module.exports = router