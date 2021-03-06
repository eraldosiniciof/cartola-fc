const axios = require("axios");
const readline = require("readline");

let rodada;

const leitor = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

leitor.question("Digite a rodada: ", function (pergunta) {
  rodada = parseInt(pergunta);
  leitor.close();

  const times = [
    8210481, 254274, 558289, 28779310, 25307429, 16217672, 1454232, 3145767,
    9365704, 20249583, 28518045, 17439680, 3845370, 25311431, 1608412, 13589622,
    14732504, 14661957, 4355028, 8387242,
  ];

  let url = "http://api.cartolafc.globo.com/time/id/";

  for (let i = 0; i < times.length; i++) {
    axios
      .get(url + `${times[i]}/${rodada}`)
      .then((response) => {
        const dados = response.data.atletas;
        Object.keys(dados).forEach((idJogador) => {
          let nomeTime = response.data.time.nome;
          let atleta = dados[idJogador]["atleta_id"];
          let capitao = response.data.capitao_id;
          console.log(`${nomeTime};${atleta};${capitao}`);
          // console.log(response.data.time.nome, dados[idJogador]['apelido'])
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
});
