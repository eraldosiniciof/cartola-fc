const axios = require("axios");
const readline = require("readline");

let rodada;

const leitor = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

leitor.question("Digite a rodada: ", function (answer) {
  rodada = parseInt(answer);
  leitor.close();

  const times = [
    14344484, 558289, 25307429, 8210481, 254274, 28779310, 1608412, 17439680,
    3845370, 9365704, 14661957, 16358650, 20249583, 4355028, 25311431, 16217672,
    1454232, 14732504, 3145767,
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
