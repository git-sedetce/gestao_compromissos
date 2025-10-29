"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Cidades",
      [
        {
          nome_municipio: "Abaiara",
          regiao_id: 1,
          cod_ibge: "2300101",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Acarape",
          regiao_id: 7,
          cod_ibge: "2300150",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Acaraú",
          regiao_id: 5,
          cod_ibge: "2300200",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Acopiara",
          regiao_id: 2,
          cod_ibge: "2300309",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Aiuaba",
          regiao_id: 13,
          cod_ibge: "2300408",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Alcântaras",
          regiao_id: 11,
          cod_ibge: "2300507",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Altaneira",
          regiao_id: 1,
          cod_ibge: "2300606",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Alto Santo",
          regiao_id: 14,
          cod_ibge: "2300705",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Amontada",
          regiao_id: 6,
          cod_ibge: "2300754",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Antonina do Norte",
          regiao_id: 1,
          cod_ibge: "2300804",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Apuiarés",
          regiao_id: 6,
          cod_ibge: "2300903",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Aquiraz",
          regiao_id: 3,
          cod_ibge: "2301000",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Aracati",
          regiao_id: 4,
          cod_ibge: "2301109",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Aracoiaba",
          regiao_id: 7,
          cod_ibge: "2301208",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Ararendá",
          regiao_id: 12,
          cod_ibge: "2301257",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Araripe",
          regiao_id: 1,
          cod_ibge: "2301307",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Aratuba",
          regiao_id: 7,
          cod_ibge: "2301406",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Arneiroz",
          regiao_id: 13,
          cod_ibge: "2301505",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Assaré",
          regiao_id: 1,
          cod_ibge: "2301604",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Aurora",
          regiao_id: 1,
          cod_ibge: "2301703",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Baixio",
          regiao_id: 2,
          cod_ibge: "2301802",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Banabuiú",
          regiao_id: 9,
          cod_ibge: "2301851",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Barbalha",
          regiao_id: 1,
          cod_ibge: "2301901",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Barreira",
          regiao_id: 7,
          cod_ibge: "2301950",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Barro",
          regiao_id: 1,
          cod_ibge: "2302008",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Barroquinha",
          regiao_id: 5,
          cod_ibge: "2302057",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Baturité",
          regiao_id: 7,
          cod_ibge: "2302107",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Beberibe",
          regiao_id: 4,
          cod_ibge: "2302206",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Bela Cruz",
          regiao_id: 5,
          cod_ibge: "2302305",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Boa Viagem",
          regiao_id: 10,
          cod_ibge: "2302404",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Brejo Santo",
          regiao_id: 1,
          cod_ibge: "2302503",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Camocim",
          regiao_id: 5,
          cod_ibge: "2302602",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Campos Sales",
          regiao_id: 1,
          cod_ibge: "2302701",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Canindé",
          regiao_id: 10,
          cod_ibge: "2302800",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Capistrano",
          regiao_id: 7,
          cod_ibge: "2302909",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Caridade",
          regiao_id: 10,
          cod_ibge: "2303006",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Cariré",
          regiao_id: 11,
          cod_ibge: "2303105",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Caririaçu",
          regiao_id: 1,
          cod_ibge: "2303204",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Cariús",
          regiao_id: 2,
          cod_ibge: "2303303",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Carnaubal",
          regiao_id: 8,
          cod_ibge: "2303402",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Cascavel",
          regiao_id: 3,
          cod_ibge: "2303501",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Catarina",
          regiao_id: 2,
          cod_ibge: "2303600",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Catunda",
          regiao_id: 12,
          cod_ibge: "2303659",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Caucaia",
          regiao_id: 3,
          cod_ibge: "2303709",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Cedro",
          regiao_id: 2,
          cod_ibge: "2303808",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Chaval",
          regiao_id: 5,
          cod_ibge: "2303907",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Choró",
          regiao_id: 9,
          cod_ibge: "2303931",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Chorozinho",
          regiao_id: 3,
          cod_ibge: "2303956",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Coreaú",
          regiao_id: 11,
          cod_ibge: "2304004",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Crateús",
          regiao_id: 12,
          cod_ibge: "2304103",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Crato",
          regiao_id: 1,
          cod_ibge: "2304202",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Croatá",
          regiao_id: 8,
          cod_ibge: "2304236",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Cruz",
          regiao_id: 5,
          cod_ibge: "2304251",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Deputado Irapuan Pinheiro",
          regiao_id: 9,
          cod_ibge: "2304269",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Ereré",
          regiao_id: 14,
          cod_ibge: "2304277",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Eusébio",
          regiao_id: 3,
          cod_ibge: "2304285",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Farias Brito",
          regiao_id: 1,
          cod_ibge: "2304301",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Forquilha",
          regiao_id: 11,
          cod_ibge: "2304350",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Fortaleza",
          regiao_id: 3,
          cod_ibge: "2304400",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Fortim",
          regiao_id: 4,
          cod_ibge: "2304459",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Frecheirinha",
          regiao_id: 11,
          cod_ibge: "2304509",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "General Sampaio",
          regiao_id: 6,
          cod_ibge: "2304608",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Graça",
          regiao_id: 11,
          cod_ibge: "2304657",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Granja",
          regiao_id: 5,
          cod_ibge: "2304707",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Granjeiro",
          regiao_id: 1,
          cod_ibge: "2304806",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Groaíras",
          regiao_id: 11,
          cod_ibge: "2304905",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Guaiúba",
          regiao_id: 7,
          cod_ibge: "2304954",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Guaraciaba do Norte",
          regiao_id: 8,
          cod_ibge: "2305001",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Guaramiranga",
          regiao_id: 7,
          cod_ibge: "2305100",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Hidrolândia",
          regiao_id: 12,
          cod_ibge: "2305209",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Horizonte",
          regiao_id: 3,
          cod_ibge: "2305233",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Ibaretama",
          regiao_id: 9,
          cod_ibge: "2305266",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Ibiapina",
          regiao_id: 8,
          cod_ibge: "2305308",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Ibicuitinga",
          regiao_id: 9,
          cod_ibge: "2305332",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Icapuí",
          regiao_id: 4,
          cod_ibge: "2305357",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Icó",
          regiao_id: 2,
          cod_ibge: "2305407",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Iguatu",
          regiao_id: 2,
          cod_ibge: "2305506",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Independência",
          regiao_id: 12,
          cod_ibge: "2305605",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Ipaporanga",
          regiao_id: 12,
          cod_ibge: "2305654",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Ipaumirim",
          regiao_id: 2,
          cod_ibge: "2305704",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Ipu",
          regiao_id: 8,
          cod_ibge: "2305803",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Ipueiras",
          regiao_id: 12,
          cod_ibge: "2305902",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Iracema",
          regiao_id: 14,
          cod_ibge: "2306009",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Irauçuba",
          regiao_id: 6,
          cod_ibge: "2306108",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Itaiçaba",
          regiao_id: 4,
          cod_ibge: "2306207",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Itaitinga",
          regiao_id: 3,
          cod_ibge: "2306256",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Itapajé",
          regiao_id: 6,
          cod_ibge: "2306306",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Itapipoca",
          regiao_id: 6,
          cod_ibge: "2306405",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Itapiúna",
          regiao_id: 7,
          cod_ibge: "2306504",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Itarema",
          regiao_id: 5,
          cod_ibge: "2306553",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Itatira",
          regiao_id: 10,
          cod_ibge: "2306603",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Jaguaretama",
          regiao_id: 14,
          cod_ibge: "2306702",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Jaguaribara",
          regiao_id: 14,
          cod_ibge: "2306801",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Jaguaribe",
          regiao_id: 14,
          cod_ibge: "2306900",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Jaguaruana",
          regiao_id: 4,
          cod_ibge: "2307007",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Jardim",
          regiao_id: 1,
          cod_ibge: "2307106",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Jati",
          regiao_id: 1,
          cod_ibge: "2307205",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Jijoca de Jericoacoara",
          regiao_id: 5,
          cod_ibge: "2307254",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Juazeiro do Norte",
          regiao_id: 1,
          cod_ibge: "2307304",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Jucás",
          regiao_id: 2,
          cod_ibge: "2307403",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Lavras da Mangabeira",
          regiao_id: 1,
          cod_ibge: "2307502",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Limoeiro do Norte",
          regiao_id: 14,
          cod_ibge: "2307601",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Madalena",
          regiao_id: 10,
          cod_ibge: "2307635",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Maracanaú",
          regiao_id: 3,
          cod_ibge: "2307650",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Maranguape",
          regiao_id: 3,
          cod_ibge: "2307700",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Marco",
          regiao_id: 5,
          cod_ibge: "2307809",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Martinópole",
          regiao_id: 5,
          cod_ibge: "2307908",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Massapê",
          regiao_id: 11,
          cod_ibge: "2308005",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Mauriti",
          regiao_id: 1,
          cod_ibge: "2308104",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Meruoca",
          regiao_id: 11,
          cod_ibge: "2308203",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Milagres",
          regiao_id: 1,
          cod_ibge: "2308302",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Milhã",
          regiao_id: 9,
          cod_ibge: "2308351",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Miraíma",
          regiao_id: 6,
          cod_ibge: "2308377",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Missão Velha",
          regiao_id: 1,
          cod_ibge: "2308401",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Mombaça",
          regiao_id: 9,
          cod_ibge: "2308500",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Monsenhor Tabosa",
          regiao_id: 12,
          cod_ibge: "2308609",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Morada Nova",
          regiao_id: 14,
          cod_ibge: "2308708",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Moraújo",
          regiao_id: 11,
          cod_ibge: "2308807",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Morrinhos",
          regiao_id: 5,
          cod_ibge: "2308906",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Mucambo",
          regiao_id: 11,
          cod_ibge: "2309003",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Mulungu",
          regiao_id: 7,
          cod_ibge: "2309102",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Nova Olinda",
          regiao_id: 1,
          cod_ibge: "2309201",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Nova Russas",
          regiao_id: 12,
          cod_ibge: "2309300",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Novo Oriente",
          regiao_id: 12,
          cod_ibge: "2309409",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Ocara",
          regiao_id: 7,
          cod_ibge: "2309458",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Orós",
          regiao_id: 2,
          cod_ibge: "2309508",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Pacajus",
          regiao_id: 3,
          cod_ibge: "2309607",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Pacatuba",
          regiao_id: 3,
          cod_ibge: "2309706",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Pacoti",
          regiao_id: 7,
          cod_ibge: "2309805",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Pacujá",
          regiao_id: 11,
          cod_ibge: "2309904",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Palhano",
          regiao_id: 14,
          cod_ibge: "2310001",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Palmácia",
          regiao_id: 7,
          cod_ibge: "2310100",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Paracuru",
          regiao_id: 3,
          cod_ibge: "2310209",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Paraipaba",
          regiao_id: 3,
          cod_ibge: "2310258",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Parambu",
          regiao_id: 13,
          cod_ibge: "2310308",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Paramoti",
          regiao_id: 10,
          cod_ibge: "2310407",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Pedra Branca",
          regiao_id: 9,
          cod_ibge: "2310506",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Penaforte",
          regiao_id: 1,
          cod_ibge: "2310605",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Pentecoste",
          regiao_id: 6,
          cod_ibge: "2310704",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Pereiro",
          regiao_id: 14,
          cod_ibge: "2310803",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Pindoretama",
          regiao_id: 3,
          cod_ibge: "2310852",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Piquet Carneiro",
          regiao_id: 9,
          cod_ibge: "2310902",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Pires Ferreira",
          regiao_id: 11,
          cod_ibge: "2310951",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Poranga",
          regiao_id: 12,
          cod_ibge: "2311009",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Porteiras",
          regiao_id: 1,
          cod_ibge: "2311108",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Potengi",
          regiao_id: 1,
          cod_ibge: "2311207",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Potiretama",
          regiao_id: 14,
          cod_ibge: "2311231",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Quiterianópolis",
          regiao_id: 13,
          cod_ibge: "2311264",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Quixadá",
          regiao_id: 9,
          cod_ibge: "2311306",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Quixelô",
          regiao_id: 2,
          cod_ibge: "2311355",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Quixeramobim",
          regiao_id: 9,
          cod_ibge: "2311405",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Quixeré",
          regiao_id: 14,
          cod_ibge: "2311504",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Redenção",
          regiao_id: 7,
          cod_ibge: "2311603",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Reriutaba",
          regiao_id: 11,
          cod_ibge: "2311702",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Russas",
          regiao_id: 14,
          cod_ibge: "2311801",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Saboeiro",
          regiao_id: 2,
          cod_ibge: "2311900",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Salitre",
          regiao_id: 1,
          cod_ibge: "2311959",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Santa Quitéria",
          regiao_id: 12,
          cod_ibge: "2312205",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Santana do Acaraú",
          regiao_id: 11,
          cod_ibge: "2312007",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Santana do Cariri",
          regiao_id: 1,
          cod_ibge: "2312106",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "São Benedito",
          regiao_id: 8,
          cod_ibge: "2312304",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "São Gonçalo do Amarante",
          regiao_id: 3,
          cod_ibge: "2312403",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "São João do Jaguaribe",
          regiao_id: 14,
          cod_ibge: "2312502",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "São Luís do Curu",
          regiao_id: 6,
          cod_ibge: "2312601",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Senador Pompeu",
          regiao_id: 9,
          cod_ibge: "2312700",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Senador Sá",
          regiao_id: 11,
          cod_ibge: "2312809",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Sobral",
          regiao_id: 11,
          cod_ibge: "2312908",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Solonópole",
          regiao_id: 9,
          cod_ibge: "2313005",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Tabuleiro do Norte",
          regiao_id: 14,
          cod_ibge: "2313104",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Tamboril",
          regiao_id: 12,
          cod_ibge: "2313203",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Tarrafas",
          regiao_id: 1,
          cod_ibge: "2313252",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Tauá",
          regiao_id: 13,
          cod_ibge: "2313302",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Tejuçuoca",
          regiao_id: 6,
          cod_ibge: "2313351",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Tianguá",
          regiao_id: 8,
          cod_ibge: "2313401",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Trairi",
          regiao_id: 3,
          cod_ibge: "2313500",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Tururu",
          regiao_id: 6,
          cod_ibge: "2313559",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Ubajara",
          regiao_id: 8,
          cod_ibge: "2313609",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Umari",
          regiao_id: 2,
          cod_ibge: "2313708",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Umirim",
          regiao_id: 6,
          cod_ibge: "2313757",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Uruburetama",
          regiao_id: 6,
          cod_ibge: "2313807",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Uruoca",
          regiao_id: 5,
          cod_ibge: "2313906",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Varjota",
          regiao_id: 11,
          cod_ibge: "2313955",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Várzea Alegre",
          regiao_id: 1,
          cod_ibge: "2314003",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          nome_municipio: "Viçosa do Ceará",
          regiao_id: 8,
          cod_ibge: "2314102",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cidades', null, {});
  },
};
