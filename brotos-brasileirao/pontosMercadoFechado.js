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

  const url = `https://api.cartolafc.globo.com/time/id/`;

  axios
    .get(url + `${times[0]}/${rodada}`) // verifca o primeiro time, na rodada escolhida, e se caso não tiver pontuação (rodada errada) nao busca no api
    .then(() => {
      for (let i = 0; i < times.length; i++) {
        axios.get(url + `${times[i]}/${rodada}`).then(function (response) {
          let time = response.data.time.nome;
          let pontos = response.data.pontos;
          console.log(`${time};${pontos.toString().replace(".", ",")}`);
        });
      }
    })
    .catch(function (error) {
      console.log(error.response.data);
    });
});
