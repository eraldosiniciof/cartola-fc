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
        478884, 2551502, 13907, 8569799, 18743469, 12441, 13920006, 7714941, 261868, 558289, 728620, 28734961, 14811806, 29023040, 467530, 26435518, 3105518, 1767953, 13991335, 1161964, 13955544, 1836067, 15935016, 177419, 8080486, 28781387, 1381034, 5061934, 12869753, 26773926, 5537709, 15815269, 14968880, 3580650, 28541719, 383346, 333735, 13930418, 8897965, 27510539, 693226, 17224793, 12324152, 608590, 9124088, 15237, 7079729, 1771495, 559315, 7730004, 7960645, 2962631, 2514018, 4972536, 13909330, 25261208, 448719, 25808010, 1030712, 25328629, 25329236, 13923857, 829041, 371455, 379814, 3657934, 13947467, 4131877, 3277734, 13917904, 708046, 7910369, 15004131, 28173448, 28173563, 28708162, 18840731, 27307263, 28654184, 17220776, 13915343, 1642244, 5440, 845856, 28779310, 2551061, 7882055, 10785, 1069606, 1527006, 109676, 14136952, 3701061, 26315622, 254274, 1709379, 28843904, 13928892, 13970995, 7330909, 15536929, 8530488, 13975731, 3120451, 7887431, 1311374
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