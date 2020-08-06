import config from '../config';
import { getMessageByHttpStatus } from '../components/messages/httpStatusMessage'

const URL_CATEGORIAS = `${config.URL_BACKEND_DOMINIO}/categorias`;

function getUrlCategorias(){
  return URL_CATEGORIAS;
}

function getAllWithVideos(){
    return fetch(`${URL_CATEGORIAS}?_embed=videos`)
      .then(async (response) => {
        if(response.status >= 300){
          getMessageByHttpStatus(response.status);
        }

        if (response.ok) {
          const result = await response.json();          
          return result;
        }
      }); 
}

function getAll(){
    return fetch(URL_CATEGORIAS)
      .then(async (response) => {
        if(response.status >= 300){
          getMessageByHttpStatus(response.status);
        }
        if (response.ok) {
          const result = await response.json();         
          return result;
        }
      });
}

function create(objetoCategoria){
  return fetch(URL_CATEGORIAS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(objetoCategoria),
    })
    .then(async (resposta) => {
      getMessageByHttpStatus(resposta.status); 
      if(resposta.ok){
        const result = await resposta.json();
        return result;
      }  
    });
}


export default {
    getUrlCategorias,
    getAllWithVideos,
    getAll,
    create,
}