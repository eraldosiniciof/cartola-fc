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

    const times = [
        478884, 1756648, 8376046, 18743469, 12441, 25811350, 13920006,
        694225, 2181312, 558289, 728620, 26117548, 2938334, 7062057,
        17086222, 14811806, 467530, 3105518, 609374, 1161964, 3415552,
        13955544, 1836067, 26327084, 770024, 15368680, 17809181, 17224793,
        5061934, 12869753, 5537709, 26517235, 15815269, 9124088, 1314309,
        14968880, 333735, 107840, 2551502, 22571710, 383346, 13930418,
        14407357, 26303772, 8897965, 819873, 27510539, 693226, 7876558, 19225291,
        8582966, 2617801, 796105, 15237, 7079729, 1771495, 559315, 7730004, 7960645,
        2962631, 2514018, 26232396, 13975731, 13909330, 1329579, 25261208, 1775705,
        448719, 1030712, 2307001, 25328629, 25329236, 13923857, 3105207, 17834851,
        11088860, 399628, 829041, 180108, 379814, 3657934, 13947467, 4131877,
        2800175, 3277734, 13917904, 168341, 13648940, 708046, 15004131, 1226331, 27307263,
        17220776, 13915343, 1642244, 5440, 845856, 13252408, 2551061, 612338, 25930519,
        27602485, 7882055, 16196755, 1069606, 109676, 22907378, 14136952, 3701061,
        26315622, 254274, 1709379, 18631313, 25278920, 409193, 13928892, 13970995,
        15536929, 8530488, 3120451, 13145455, 7887431, 13781242, 25488303, 1311374,
    ]

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