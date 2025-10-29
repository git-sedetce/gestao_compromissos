const { Router } = require('express');
const AtracaoController = require('../controllers/AtracaoControllers');

const router = Router();
router.post('/novaEmpresa', AtracaoController.cadastraEmpresa);
router.post('/novaAtracao', AtracaoController.cadastraAtracao);
router.get('/allCompany', AtracaoController.todasEmpresas);
router.get('/allCompanyAtration', AtracaoController.todasEmpresasAtracoes);
router.get('/allAtracoes', AtracaoController.todasAtracoes);
router.get('/empresabyid/:id', AtracaoController.empresa);
router.get('/atracaobyid/:id', AtracaoController.atracao);
router.put('/atualizaEmpresa/:id', AtracaoController.atualizaEmpresa)
router.put('/atualizaAtracao/:id', AtracaoController.atualizaAtracao)
router.delete('/empresa/:id', AtracaoController.apagaEmpresa)

router.get('/countCompanyAtRegiao', AtracaoController.contarEmpresasAtPorRegiao);
router.get('/somaInvestAtRegiao', AtracaoController.somarInvestimentoAtPorRegiao);
router.get('/somaEmpregosAtRegiao', AtracaoController.somarEmpregosAtPorRegiao);

module.exports = router