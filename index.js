const express = require('express'); // importa o express
const server = express(); // cria uma variável chamada server que chama a função express
server.use(express.json()); // faz com que o express entenda JSON
class VacinaCovid{
    id;
    fabricante;
    nome;
    doses;
    intervalo;
    constructor(id, fabricante,nome,doses,intervalo){
        this.id = id;
        this.fabricante = fabricante;
        this.nome = nome;
        this.doses = doses;
        this.intervalo = intervalo;
    }
}

const jsonDB = [];

server.get('/Vacina', (req, res) => {
    return res.status(200).json({'Vacinas':jsonDB});
}) // Cria a rota /teste com o método GET

server.get('/Vacina/:index', (req, res) => {
    const { index } = req.params; // recupera o index com os dados
    
    return res.status(200).json(jsonDB[index-1]);
})

server.post('/Vacina', (req, res) => {
    const { fabricante, nome, doses,intervalo } = req.body; // assim esperamos buscar o name informado dentro do body da requisição
    let Vacina = new VacinaCovid(jsonDB.length+1, fabricante, nome, doses,intervalo)
    jsonDB.push(Vacina);
    
    return res.status(201).send('Cadastrada com sucesso'); // retorna a informação da variável geeks
    
 })

 server.put('/Vacina/:index', (req, res) => {
    const { index } = req.params; // recupera o index com os dados
    const {  fabricante, nome, doses,intervalo  } = req.body;
    let Vacina = new VacinaCovid(index, fabricante, nome, doses,intervalo)
    jsonDB[index-1] = Vacina; // sobrepõe o index obtido na rota de acordo com o novo valor
    
    return res.status(201).send('Alterada com sucesso');
}); // retorna novamente os geeks atualizados após o update


server.delete('/Vacina/:index', (req, res) => {
    const { index } = req.params; // recupera o index com os dados
    
    jsonDB.splice(index-1, 1); // percorre o vetor até o index selecionado e deleta uma posição no array
    
    return res.status(200).send('Deletada com sucesso');
}); // retorna os dados após exclusão

server.listen(3000); 
