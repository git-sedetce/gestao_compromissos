const { Router } = require('express');
const CompromissoController = require('../controllers/CompromissoControllers');
const CompromissoController_02 = require('../controllers/CompromissoControllers_02');

const router = Router();
router.post('/newCompromisso', CompromissoController.cadastraCompromisso);
router.get('/usersByMeet/:id', CompromissoController.getUsersMeet);
router.get('/commitmentById/:id', CompromissoController.commitmentById);
router.get('/exportCommitment/:id', CompromissoController.exportCommitment);
router.put('/atualizaCompromisso/:id', CompromissoController.atualizaCompromissoById);
router.delete('/deleteCommitment/:id', CompromissoController.deletaCompromisso);
router.get('/meetCommitment/:id', CompromissoController.meetByIdCommitment);
router.get('/meet', CompromissoController.allMeet);
router.post('/newSituacao', CompromissoController.cadastraSituacao);
router.get('/situacao', CompromissoController.situacoes);
router.get('/situacaoById/:id', CompromissoController.situacaoId);

router.post('/cadastropartic', CompromissoController_02.cadastrarParticipantes);
router.get('/compromissoById/:id', CompromissoController_02.reunioesTask)
router.get('/meetCoord/:id', CompromissoController_02.meetByCoord);
router.get('/meetSexec/:id', CompromissoController_02.meetBySexec);

router.get('/mailCommitment/:id', CompromissoController.enviarEmail)

module.exports = router