const { Router } = require('express');
const InauguracaoController = require('../controllers/InauguracaoControllers');

const router = Router();
router.post('/cadastroInauguracao', InauguracaoController.cadastraInauguracao);
router.get('/todasInauguracao', InauguracaoController.pegaInauguracao);
router.get('/proximaInauguracao', InauguracaoController.proximaInauguracao);
router.get('/inauguracaoId/:id', InauguracaoController.inauguracaobyId);
router.put('/atualizaIng/:id', InauguracaoController.atualizaIng)
router.delete('/inauguracao/:id', InauguracaoController.apagaIng)
//estatíscicas
router.get('/inauguracaoRealizadas', InauguracaoController.contarInauguracoesRealizadas);
router.get('/inauguracaoFuturas', InauguracaoController.contarInauguracoesFuturas);
router.get('/ingRealizadasRegiao', InauguracaoController.contarInauguracoesRealizadasPorRegiao);
router.get('/ingFuturasRegiao', InauguracaoController.contarInauguracoesFuturasPorRegiao);

module.exports = router