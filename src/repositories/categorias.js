import config from '../config';

const URL_CATEGORIAS = `${config.URL_BACKEND_DOMINIO}/categorias`;

function getUrlCategorias(){
  return URL_CATEGORIAS;
}

function getAllWithVideos(){

    return fetch(`${URL_CATEGORIAS}?_embed=videos`)
      .then(async (response) => {
        if (response.ok) {
          const result = await response.json();
          
          return result;
        }
        // MELHORIA: Ver qual o status de retorno do erro e tratar a mensagem do erro.
        throw new Error('Não foi possível pegar a lista de todas as Categorias com videos');
      }); 

}

function getAll(){
    return fetch(URL_CATEGORIAS)
      .then(async (response) => {
        if (response.ok) {
          const result = await response.json();
          
          return result;
        }
        // MELHORIA: Ver qual o status de retorno do erro e tratar a mensagem do erro.
        throw new Error('Não foi possível pegar a lista de todas as Categorias');
      });
}

export default {
    getUrlCategorias,
    getAllWithVideos,
    getAll,
}