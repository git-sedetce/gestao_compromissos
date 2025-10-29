const { Router } = require('express')
const StatisticsController = require('../controllers/StatisticsController')


const router = Router()
router.get('/countProjectCoordSt1', StatisticsController.projetoCoordSt1)
router.get('/countProjectCoordSt2', StatisticsController.projetoCoordSt2)
router.get('/countProjectCoordSt3', StatisticsController.projetoCoordSt3)
router.get('/countProjectCoordSt4', StatisticsController.projetoCoordSt4)
router.get('/countProjectSexecSt1', StatisticsController.projetoSexecSt1)
router.get('/countProjectSexecSt2', StatisticsController.projetoSexecSt2)
router.get('/countProjectSexecSt3', StatisticsController.projetoSexecSt3)
router.get('/countProjectSexecSt4', StatisticsController.projetoSexecSt4)

router.get('/countCommitCoordSt1', StatisticsController.compromissoCoordSt1)
router.get('/countCommitCoordSt2', StatisticsController.compromissoCoordSt2)
router.get('/countCommitCoordSt3', StatisticsController.compromissoCoordSt3)
router.get('/countCommitCoordSt4', StatisticsController.compromissoCoordSt4)
router.get('/countCommitSexecSt1', StatisticsController.compromissoSexecSt1)
router.get('/countCommitSexecSt2', StatisticsController.compromissoSexecSt2)
router.get('/countCommitSexecSt3', StatisticsController.compromissoSexecSt3)
router.get('/countCommitSexecSt4', StatisticsController.compromissoSexecSt4)

router.get('/countTaskCoordSt1', StatisticsController.tarefaCoordSt1)
router.get('/countTaskSexecSt1', StatisticsController.tarefaSexecSt1)



module.exports = router