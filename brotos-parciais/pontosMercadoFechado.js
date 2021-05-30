const axios = require('axios')
const readline = require('readline')

let rodada;

const leitor = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

leitor.question('Digite a rodada: ', function (pergunta) {
    rodada = parseInt(pergunta)
    leitor.close()

    const times = [
        254274,25307429,467530,17220776,12869753,13917904,15004131,168341,4131877,1311374,13915343,
        13947467,1030712,8530488,13970664,7887431,1775705,2514018,1226331,1709379,7079729,693226,
        5061934,13930418,2962631,109676,9124088,383346,3657934,5537709,14811806,829041,14136952,2938334,
        25808010,9277838,177419,399628,27743149,1767953,25595796,15288063,18534402,25261208,28410004,
        28173448,728620,13781242,3729424,8897965,28174470,3235100,25260972,18177824,9634729,7960645,
        26773926,5440,107840,538699,18469726,543303,3148390,28173563,13991335,17834851,4219699,11267807,
        25328629,12324152,13909330,18631313,2467754,2759845,27602485,8376046,20054432,24170980,3277734,2307001,
        27663419,8343010,22640891,2526594,1371825,26453045,14806854,25317171,4972536,26056507,18918040,7990979,
        13231369,483776,25527628,28143713,25749061,14968880,4675739,13971723,3984867,2551502,8295574,14705170,25949297,371455
    ]
    

    const url = `https://api.cartolafc.globo.com/time/id/`

    axios.get(url + `${times[0]}/${rodada}`) // verifca o primeiro time, na rodada escolhida, e se caso não tiver pontuação (rodada errada) nao busca no api
        .then(() => {
            for (let i = 0; i < times.length; i++) {
                axios.get(url + `${times[i]}/${rodada}`)
                    .then(function (response) {
                        let time = response.data.time.nome
                        let pontos = response.data.pontos
                        console.log(`${time};${pontos.toString().replace('.', ',')}`)
                    })
            }
        })
        .catch(function (error) {
            console.log(error.response.data)
        })
})