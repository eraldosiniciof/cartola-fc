const axios = require('axios')

let urlParciais = 'http://api.cartolafc.globo.com/atletas/pontuados'
const parciaisJogadores = {}

axios.get(urlParciais)
    .then(async response => {
        const parciais = response.data.atletas
        Object.keys(parciais).forEach(jogador => {
            // console.log(jogador, parciais[jogador]['apelido'] ,parciais[jogador]['pontuacao'])
            // parciaisJogadores[jogador] = parciais[jogador]['pontuacao']
            let ptsParciais = parciais[jogador]['pontuacao']
            console.log(`${jogador}/${ptsParciais.toString().replace('.', ',')}`)
        })
    })