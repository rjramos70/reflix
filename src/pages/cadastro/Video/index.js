import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import useForm from '../../../hooks/useForm';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import videosRepository from '../../../repositories/videos';
import categoriasRepository from '../../../repositories/categorias';

import '../formularios.css';

function CadastroVideo(){
    
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
        .then(() => {
            console.log(`Cadastro com sucesso!`)
            // Redireciona para a home
            history.push('/');    
        })
        .catch((err) => {
            alert(`Error :: ${err}`);
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

        </PageDefault>
    );
}

export default CadastroVideo;