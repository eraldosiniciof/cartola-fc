const axios = require('axios')
const readline = require('readline')

let rodada;

const leitor = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

leitor.question('Digite a rodada: ', function (answer) {
    rodada = parseInt(answer)
    leitor.close()

    const times = [2551502, 2467754, 8295574, 5440, 1030712, 24170980, 7079729, 13917904, 1709379, 27602485, 5537709, 25328629, 8376046, 14705170, 13915343, 1226331, 8530488, 28143713, 9124088, 17220776, 4675739, 25527628, 25949297, 2759845, 11267807, 2962631, 728620, 3148390, 26056507, 13781242, 25749061, 467530, 2938334, 22640891, 15004131, 25808010, 13970664, 4972536, 27663419, 13971723, 2307001, 12324152, 7990979, 5061934, 168341, 25317171, 25261208, 14968880, 7960645, 109676, 107840, 17834851, 28410004, 8897965, 18918040, 13947467, 14811806, 13231369, 13930418, 1311374, 399628, 13909330, 7887431, 3277734, 28174470, 4131877, 28173448, 177419, 1767953, 3657934, 18177824, 18469726, 28173563, 25595796, 12869753, 254274, 25307429, 693226, 14806854, 383346, 9277838, 538699, 483776, 4219699, 3729424, 371455, 18534402, 1371825, 9634729, 3984867, 8343010, 3235100, 543303, 25260972, 1775705, 26773926, 2526594, 14136952, 18631313, 27743149, 15288063, 20054432, 26453045, 2514018, 13991335, 829041]

    const url = `https://api.cartolafc.globo.com/time/id/`

    axios.get(url + `${times[0]}/${rodada}`) // verifca o primeiro time, na rodada escolhida, e se caso não tiver pontuação (rodada errada) nao busca no api
        .then(() => {
            for (let i = 0; i < times.length; i++) {
                axios.get(url + `${times[i]}/${rodada}`)
                    .then(function (response) {
                        let time = response.data.time.nome
                        let pontos = response.data.pontos
                        console.log(`${time}/${pontos.toString().replace('.', ',')}`)
                    })
            }
        })
        .catch(function (error) {
            console.log(error.response.data)
        })
})