const { Router } = require('express')
const UserController = require('../controllers/UsersControllers')
const AutenticaService = require('../service/AutenticaService')

const router = Router()
router.get('/')
router.post('/newUser', UserController.cadastraUser)
router.get('/allUser', UserController.pegaUser) //AutenticaService.authenticatedUser,
router.get('/allUserActive', UserController.pegaUserActive) //AutenticaService.authenticatedUser,
router.get('/users', UserController.pegaUsers)
router.get('/usersCompromisso', UserController.pegaUsersCompromisso)
router.get('/usersCompromissoConcluidos/:id', UserController.pegaUsersCompromissoFinished)
router.get('/compromissoConcluidos', UserController.pegaCompromissoFinished)
router.get('/usersCompromisso/:id', UserController.pegaUsersCompromissobyId)
router.get('/userPorId/:id', UserController.pegaUmUser)
router.get('/userById/:id', UserController.pegarUmUser)
router.get('/userByProject/:id', UserController.pegaUsersByProject)
router.post('/login', UserController.verificaLogin)
router.get('/consultaEmail/:email', UserController.consultaEmail)
//router.get('/user', UserController.authenticatedUser)
//router.get('/consultaUsuario/:id', UserController.consultaUsuario)
router.post('/logout', UserController.logout)
router.post('/reset', UserController.resetPassword)
router.put('/atualizaUser/:id', UserController.atualizaUser)
router.delete('/user/:id', UserController.deletaUsers)
router.get('/allUserByProfile/:id', UserController.pegaUsersByProfile)
router.get('/allUserInd', UserController.pegaUsersInd) //AutenticaService.authenticatedUser,


module.exports = router