import config from '../config';

const URL_VIDEOS = `${config.URL_BACKEND_DOMINIO}/videos`;

function getUrlVideos(){
  return URL_VIDEOS;
}

function create(objetoVideo){
  return fetch(URL_VIDEOS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(objetoVideo),
    })
    .then(async (resposta) => {
      if(resposta.ok){
        const result = await resposta.json();
        return result;
      }
    });
}

function getAll(){
    return fetch(URL_VIDEOS)
      .then(async (response) => {
        if (response.ok) {
          const result = await response.json();
          
          return result;
        }
        // MELHORIA: Ver qual o status de retorno do erro e tratar a mensagem do erro.
        throw new Error('Não foi possível pegar a lista de todos os Vídeos');
      });
}

export default {
    getUrlVideos,
    getAll,
    create,
}