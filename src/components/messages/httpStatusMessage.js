
import { notifyError, notifySuccess } from '../messages/toastMessages'

let httpResp = {
    status: '',
    message: '',
}

export const getMessageByHttpStatus = (httpStatus) => {
    httpResp.status = httpStatus;
    
    switch (httpStatus) {
        case 200:
            httpResp.message = 'Requisição com sucesso!';
            break;
        case 201:
            httpResp.message = 'Cadastro com sucesso';
            break;
        case 300:
            httpResp.message = 'URI da requisição foi alterada temporariamente!';
            break;
        case 400:
            httpResp.message = 'Servidor não entendeu a requisição pois está com uma sintaxe inválida!';
            break;
        case 404:
            httpResp.message = 'Servidor não pode encontrar o recurso solicitado';
            break;
        case 414:
            httpResp.message = 'URI requisitada pelo cliente é maior do que o servidor aceita para interpretar!';
            break;
        case 500:
            httpResp.message = 'Erro interno no servidor!';
            break;
        case 502:
            httpResp.message = 'Resposta inválida do servidor!';
            break;
        case 503:
            httpResp.message = 'Servidor indisponível!';
            break;
        case 505:
            httpResp.message = 'Versão HTTP usada na requisição não é suportada pelo servidor';
            break;
                                 
        default:
            httpResp.message = `Status :: ${httpStatus} não identificado`;
            break;

    }

    if(httpStatus>= 300){
        notifyError(httpResp.message);
    }
    if(httpStatus < 300){
        notifySuccess(httpResp.message);
    }

};

export default {
    getMessageByHttpStatus,
}