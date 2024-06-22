const JobModel = require('../models/job.model')

async function listJob(req, res) {
    // const jobs = await JobModel.find({
    //     status: true
    // })
    //examples jobs
    const jobs = [
        {
            "id": 1,
            "vaga": "Pedreiro",
            "divulgador": "Joao da Silva",
            "local": "Ibatiba-ES",
            "quantidadeVagas": 5,
            "inscritos": 3,
            "descrição": "Estamos em busca de um pedreiro experiente que já tenha trabalhado no campo. O candidato deve ser maior de idade e possuir habilidades práticas em construção, reparo e manutenção de estruturas. É essencial ter conhecimento em técnicas de alvenaria, leitura de plantas e segurança no trabalho. Procuramos alguém comprometido, com boa capacidade de trabalho em equipe e disposição para enfrentar os desafios do dia a dia na construção civil rural."
        },
        {
            "id": 2,
            "vaga": "Colhedor de Café",
            "divulgador": "Maria da Silva",
            "local": "Venda Nova do Imigrante-ES",
            "quantidadeVagas": 2,
            "inscritos": 1,
            "descrição": "Procuramos colhedores de café dedicados e trabalhadores para se juntar à nossa equipe durante a safra. O candidato ideal deve ter experiência na colheita de café, ser ágil e cuidadoso na coleta dos grãos para garantir a qualidade do produto. Esperamos que os candidatos sejam pontuais, tenham boa condição física e disposição para trabalhar ao ar livre em diferentes condições climáticas. Oferecemos um ambiente de trabalho colaborativo e possibilidade de ganhos adicionais conforme a produtividade."
        },
        {
            "id": 1,
            "vaga": "Pedreiro",
            "divulgador": "Joao da Silva",
            "local": "Ibatiba-ES",
            "quantidadeVagas": 5,
            "inscritos": 3,
            "descrição": "Estamos em busca de um pedreiro experiente que já tenha trabalhado no campo. O candidato deve ser maior de idade e possuir habilidades práticas em construção, reparo e manutenção de estruturas. É essencial ter conhecimento em técnicas de alvenaria, leitura de plantas e segurança no trabalho. Procuramos alguém comprometido, com boa capacidade de trabalho em equipe e disposição para enfrentar os desafios do dia a dia na construção civil rural."
        },
        {
            "id": 2,
            "vaga": "Colhedor de Café",
            "divulgador": "Maria da Silva",
            "local": "Venda Nova do Imigrante-ES",
            "quantidadeVagas": 2,
            "inscritos": 1,
            "descrição": "Procuramos colhedores de café dedicados e trabalhadores para se juntar à nossa equipe durante a safra. O candidato ideal deve ter experiência na colheita de café, ser ágil e cuidadoso na coleta dos grãos para garantir a qualidade do produto. Esperamos que os candidatos sejam pontuais, tenham boa condição física e disposição para trabalhar ao ar livre em diferentes condições climáticas. Oferecemos um ambiente de trabalho colaborativo e possibilidade de ganhos adicionais conforme a produtividade."
        },
        {
            "id": 1,
            "vaga": "Pedreiro",
            "divulgador": "Joao da Silva",
            "local": "Ibatiba-ES",
            "quantidadeVagas": 5,
            "inscritos": 3,
            "descrição": "Estamos em busca de um pedreiro experiente que já tenha trabalhado no campo. O candidato deve ser maior de idade e possuir habilidades práticas em construção, reparo e manutenção de estruturas. É essencial ter conhecimento em técnicas de alvenaria, leitura de plantas e segurança no trabalho. Procuramos alguém comprometido, com boa capacidade de trabalho em equipe e disposição para enfrentar os desafios do dia a dia na construção civil rural."
        },
        {
            "id": 2,
            "vaga": "Colhedor de Café",
            "divulgador": "Maria da Silva",
            "local": "Venda Nova do Imigrante-ES",
            "quantidadeVagas": 2,
            "inscritos": 1,
            "descrição": "Procuramos colhedores de café dedicados e trabalhadores para se juntar à nossa equipe durante a safra. O candidato ideal deve ter experiência na colheita de café, ser ágil e cuidadoso na coleta dos grãos para garantir a qualidade do produto. Esperamos que os candidatos sejam pontuais, tenham boa condição física e disposição para trabalhar ao ar livre em diferentes condições climáticas. Oferecemos um ambiente de trabalho colaborativo e possibilidade de ganhos adicionais conforme a produtividade."
        },
        {
            "id": 1,
            "vaga": "Pedreiro",
            "divulgador": "Joao da Silva",
            "local": "Ibatiba-ES",
            "quantidadeVagas": 5,
            "inscritos": 3,
            "descrição": "Estamos em busca de um pedreiro experiente que já tenha trabalhado no campo. O candidato deve ser maior de idade e possuir habilidades práticas em construção, reparo e manutenção de estruturas. É essencial ter conhecimento em técnicas de alvenaria, leitura de plantas e segurança no trabalho. Procuramos alguém comprometido, com boa capacidade de trabalho em equipe e disposição para enfrentar os desafios do dia a dia na construção civil rural."
        },
        {
            "id": 2,
            "vaga": "Colhedor de Café",
            "divulgador": "Maria da Silva",
            "local": "Venda Nova do Imigrante-ES",
            "quantidadeVagas": 2,
            "inscritos": 1,
            "descrição": "Procuramos colhedores de café dedicados e trabalhadores para se juntar à nossa equipe durante a safra. O candidato ideal deve ter experiência na colheita de café, ser ágil e cuidadoso na coleta dos grãos para garantir a qualidade do produto. Esperamos que os candidatos sejam pontuais, tenham boa condição física e disposição para trabalhar ao ar livre em diferentes condições climáticas. Oferecemos um ambiente de trabalho colaborativo e possibilidade de ganhos adicionais conforme a produtividade."
        }
    ];
    res.json(jobs)
}

async function createJob() {

}

async function updateJob() {

}

async function deleteJob() {

}

module.exports = { listJob, createJob, updateJob, deleteJob }
