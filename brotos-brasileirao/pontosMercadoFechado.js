const axios = require("axios");
const readline = require("readline");
const clubes = require("./../listaTimes.js");

let rodada;
const times = clubes.broto;

const leitor = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

leitor.question("Digite a rodada: ", function (pergunta) {
  rodada = parseInt(pergunta);
  leitor.close();

  const url = `https://api.cartolafc.globo.com/time/id/`;

  axios
    .get(url + `${times[0]}/${rodada}`) // verifca o primeiro time, na rodada escolhida, e se caso não tiver pontuação (rodada errada) nao busca no api
    .then(() => {
      for (let i = 0; i < times.length; i++) {
        axios.get(url + `${times[i]}/${rodada}`).then(function (response) {
          let time = response.data.time.nome;
          let pontos = response.data.pontos || 0.0;
          console.log(`${time};${pontos.toString().replace(".", ",")}`);
        });
      }
    })
    .catch(function (error) {
      console.log(error.response.data);
    });
});
