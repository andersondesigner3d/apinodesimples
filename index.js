const express = require('express');//importa o express

const server = express();//cria o servidor

server.use(express.json());//permite receber json via posto no body


//query params = parametros de rota ex ?id=20?pagina=40
//route paramns = separação de rotas ex /home/curso/geografia
//request body = {nome : 'nodejs', tipo: 'backend'}

const cursos = [
    'nodeJs',
    'JavaScript',
    'PHP'
];

//================+==================== MIDLEWARES =================================================

//midleware global
server.use((req,res,next)=>{
    console.log(`URL chamada: "+${req.url}`);
    return next(); //faz o codigo continuar após o midleware, sem ele o sistema nao passa daqui
})

//midleware simples
function checkCurso(req,res,next){
    if(!req.body.name){//busca no body da requisição o array name
        return res.status(400).json({ error : "Nome do curso é obrigatório"});
    }
    return next();
}

//midleware simples
function checkIndexCurso(req,res,next){
    const curso = cursos[req.params.index]; //busca nos cursos o parametro index que vem na url
    if(!curso){
        return res.status(400).json({ error : "Curso não existe"});
    }

    req.curso = curso;

    return next();
}

//========================================= ROTAS =========================================================

//http://localhost:3000/curso
server.get('/curso/:id',checkIndexCurso,checkIndexCurso, (req,res)=>{ //req = requisições get ou post
    const nome = req.query.nome; //nome deve vir ?nome=algumnome
    const id = req.params.id;
    return res.json({curso: `Aprendendo ${nome} com ID: ${id}`}); //retorna um json via get e concatena usando crase
})

//retorna todos os cursos
server.get('/cursos', (req,res)=>{ 
    return res.json(cursos); 
})
//retorna um curso pelo id do array
server.get('/cursos/:index',checkIndexCurso, (req,res)=>{ 
    const {index} = req.params; //ecmascript6
    return res.json(req.curso); //usa o que capturou do midleware
})
//salva um curso novo
server.post('/cursos',checkCurso, (req,res)=>{  //rota usa o midleware simples
    const {name} = req.body;//captura o array name do json quem vem via body do post
    cursos.push(name);//adiciona no array (aqui entraria o sql)
    return res.json(cursos); //retorna todos os cursos
})
//atualiza um curso especifico
server.put('/cursos/:index',checkCurso,checkIndexCurso, (req,res)=>{ 
    const {index} = req.params; //captura o index do array via url
    const {name} = req.body;//captura o array name do json quem vem via body do post
    cursos[index] = name;//atualiza o banco (aqui entraria o sql)
    return res.json(cursos); 
})

//atualiza um curso especifico
server.delete('/cursos/:index',checkIndexCurso, (req,res)=>{ 
    const {index} = req.params; //captura o index do array via url
    cursos.splice(index,1);//deleta o item do array
    return res.json({"message" : "Curso deletado com sucesso!"}); //retorna mensagem de sucesso
    //return res.send(); //retorna nada
})

server.listen(3000);//acessa uma porta pra rodar