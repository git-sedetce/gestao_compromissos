const { Router } = require('express');
const FDIController = require('../controllers/FDIControllers');

const router = Router();
router.post('/novoFDI', FDIController.cadastraFDI);
router.post('/todosFDI', FDIController.pegaFDI);
router.get('/fdiID/:id', FDIController.fdibyId);

router.get('/countCompanyRegiao', FDIController.contarEmpresasPorRegiao);
router.get('/somaInvestimentoRegiao', FDIController.somarInvestimentoPorRegiao);
router.get('/somaEmpregosRegiao', FDIController.somarEmpregosPorRegiao);

module.exports = router