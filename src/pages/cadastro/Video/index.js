import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import { Link, useHistory } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import useForm from '../../../hooks/useForm';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import videosRepository from '../../../repositories/videos';
import categoriasRepository from '../../../repositories/categorias';
import {  notifyError } from '../../../components/messages/toastMessages';
import '../formularios.css';



function CadastroVideo(){

    function redirecionaPara(path){
        return setTimeout(() => {
            console.log(`Redirecionando para '${path}'.`);
            history.push(path);  
        }, 5500);   
    }


    // const notifyError = () => toast.error(`Error message !`);
    // const notifyInfo = () => toast.info("Info message !");
    // const notifySuccess = () => toast.success("Cadastro realizado com sucesso !");
    // const notifyWarn = () => toast.warn("Warn message!");
    // const notifyDefault = () => toast("Default message !");
    // const notifyDark = () => toast.dark("Dark message !");
  
    
    const history = useHistory();
    const [categorias, setCategorias] = useState([]);
    const categoryTitles = categorias.map(({ titulo }) => titulo);
    const { handleChange, values } = useForm({
        titulo: '',
        url: '',
        categoria: '',

    });
      

    useEffect(() => {
        categoriasRepository
            .getAll()
            .then((categoriasFromServer) => {
                setCategorias(categoriasFromServer);
            })
            .catch((err) => {
                console.log(`ERROR :: ${err}`);
                alert('Erro ao buscar a lista de categorias do formulário');
            }); 
    }, []);

    // [ Funções ]
    // [ Create - Video ]
    function handleSubmit(props){
        props.preventDefault();   

        const categoriaEscolhida = categorias.find((categoria) => {
            return categoria.titulo === values.categoria;
        });

        videosRepository.create({
            titulo: values.titulo,
            url: values.url,
            categoriaId: categoriaEscolhida.id,
        })
        .then((resp) => {
            if(resp !== undefined){
                console.log(`Cadastro com sucesso!`);
                redirecionaPara('/');
            }
        })
        .catch((err) => {
            alert(`Error :: ${err}`);
            notifyError('Erro ao cadastrar o vídeo!');
        });

    }

    return (
        <PageDefault >
            <h1 className="cabecalho">Cadastro de Vídeo</h1>
            <form onSubmit={ handleSubmit } >

                <FormField
                    label="Título do Vídeo"
                    name="titulo"
                    value={values.titulo}
                    onChange={handleChange}
                />

                <FormField
                    label="URL"
                    name="url"
                    value={values.url}
                    onChange={handleChange}
                />

                <FormField
                    label="Categoria"
                    name="categoria"
                    value={values.categoria}
                    onChange={handleChange}   
                    suggestions={categoryTitles}            
                />

               <Button className="botao">Cadastrar</Button>
            </form>

            <Link to="/cadastro/categoria">
                Cadastro de Categoria
            </Link>
            
            <br/>
            <br/>

            <div>
                {/* <li>
                    <button onClick={notifyError}>notifyError</button>
                </li>
                <li>
                    <button onClick={notifyInfo}>notifyInfo</button>
                </li>
                <li>
                    <button onClick={notifySuccess}>notifySuccess</button>
                </li>
                <li>
                    <button onClick={notifyWarn}>notifyWarn</button>
                </li>
                <li>
                    <button onClick={notifyDefault}>notifyDefault</button>
                </li>
                <li>
                    <button onClick={notifyDark}>notifyDark</button>
                </li> */}


                {/* <ToastContainer /> */}
            </div>


        </PageDefault>
    );
}

export default CadastroVideo;