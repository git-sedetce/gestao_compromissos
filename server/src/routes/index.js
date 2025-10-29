const express = require('express')
const user = require('./userRoutes')
const project = require('./projectRoutes')
const meet = require('./reunioesRoutes')
const tarefa = require('./tarefaRoutes')
const sub_tarefa = require('./subTarefaRoutes')
const secretaria = require('./secretariaRoutes')
const statistics = require('./statisticsRoutes')
const audit = require('./auditRoutes')
const compromisso = require('./compromissoRoutes')
const atracao = require('./atracaoRoutes')
const fdi = require('./fdiRoutes')
const sima = require('./simaRoutes')
const inauguracao = require('./inauguracaoRoutes')
const localizacao = require('./localizacaoRoutes')

module.exports = app => {
    app.use(express.json(),
    express.urlencoded({ extended: false }),
    user,
    project,
    meet,
    tarefa,
    sub_tarefa,
    secretaria,
    statistics,
    audit, 
    compromisso,
    atracao,
    fdi,
    sima,
    inauguracao, 
    localizacao
    )
}