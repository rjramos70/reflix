const URL_BACKEND_DOMINIO = window.location.hostname.includes('localhost') 
                        ? 'http://localhost:8080'
                        : 'https://reflix-app-server.herokuapp.com';


export default { 
    URL_BACKEND_DOMINIO, 
};
