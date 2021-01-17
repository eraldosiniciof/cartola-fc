const axios = require('axios')

const rodada = 30
const times = [
    2551502, 2467754, 1030712, 24170980, 1709379, 27602485, 5537709, 25328629,
    1226331, 8530488, 28143713, 9124088, 17220776, 4675739, 25527628, 25949297,
    2759845, 11267807, 2962631, 728620, 3148390, 26056507, 13781242, 25749061,
    467530, 2938334, 22640891, 15004131, 25808010, 13970664, 4972536, 27663419,
    13971723, 2307001, 12324152, 168341, 25317171, 25261208, 14968880, 7960645,
    109676, 107840, 17834851, 28410004, 8897965, 18918040, 13231369, 13930418,
    1311374, 399628, 13909330, 7887431, 3277734, 28174470, 4131877, 28173448,
    177419, 1767953, 18469726, 28173563, 693226, 14806854, 4219699, 3729424, 371455,
    1371825, 9634729, 8343010, 3235100, 25260972, 1775705, 27743149, 15288063,
    20054432, 26453045, 2514018, 13991335
]

let url = 'http://api.cartolafc.globo.com/time/id/'

for (let i = 0; i < times.length; i++) {
    axios.get(url + `${times[i]}/${rodada}`)
        .then(response => {
            const dados = response.data.atletas
            Object.keys(dados).forEach(idJogador => {
                let nomeTime = response.data.time.nome
                let atleta = dados[idJogador]['atleta_id']
                let capitao = response.data.capitao_id
                console.log(`${nomeTime};${atleta};${capitao}`)
                // console.log(response.data.time.nome, dados[idJogador]['apelido'])
            })
        })
        .catch(error => {
            console.log(error)
        })
}