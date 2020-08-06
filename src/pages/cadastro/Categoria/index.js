import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
 
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';

import useForm from '../../../hooks/useForm';

import categoriasRepository from '../../../repositories/categorias';
import {  notifyError } from '../../../components/messages/toastMessages';
import Table from '../../../components/Table';

import '../formularios.css';

function CadastroCategoria(){
    
    const categoriaDTO = {
        titulo: '',
        cor: '',
        link_extra: {
            text: '',
            url: '',
        }
    }
    
    // declara a classe Categoria com os seus atributos
    const valoresIniciais = {
        titulo: '',
        descricao: '',
        cor: '',
    }

    // [ Constantes ]
    const [categorias, setCategorias] = useState([]);   
    const [dados, setDados] = useState([]);
    const { handleChange, values, clearForm } = useForm(valoresIniciais);
    
    useEffect(() => {
        categoriasRepository.getAll()
          .then((dado) => {
            if(dado !== undefined){
                setDados(dado);
            }    
          })
          .catch((err) => {
            console.log(err.message);
            notifyError(err.message);
          });
    },[]);
       
    function refreshPage(){   
        return setTimeout(() => {
            console.log(`Recarregando a página.`);
            window.location.reload(false);           
        }, 5500);   
    }

    const columns = [
        {
            Header: "Categorias",
            columns: [
                {
                    Header: "Titulo",
                    accessor: "titulo"
                },
                {
                    Header: "Descrição",
                    accessor: "link_extra.text"
                },
                {
                    Header: "Cor",
                    accessor: "cor"
                },
                {
                    Header: "Remove",
                    accessor: "remove"
                }
            ]
        }
    ];

    // [ Funções ]
    // [ Create - Categoria ]
    async function handleSubmit(props){
        props.preventDefault();       
        
        // [ Monta o objto DTO para envio ao backend ]
        categoriaDTO.titulo = values.titulo;
        categoriaDTO.cor = values.cor;
        categoriaDTO.link_extra.text = values.descricao;

        categoriasRepository.create(categoriaDTO)
        .then((resp) => {
            if(resp !== undefined){
                console.log(`Cadastro com sucesso!`);
                refreshPage();
            }
        })
        .catch((err) => {
            alert(`Error :: ${err}`);
            notifyError('Erro ao cadastrar a categoria!');
        });

        // insere 'values' na lista 'categorias'
        setCategorias([
            ...categorias,
            values
        ]);

        // function que limpa o Form
        clearForm();
    }
 
    // [ Delete - Categoria ]
    // async function handleDelete(id){
        
    //     console.log(`ID Categoria :: ${id}`);
        
    //     // try {
    //     //     await fetch(`${categoriasRepository.getUrlCategorias}/${id}`, {
    //     //         method: 'DELETE',
    //     //         headers: {
    //     //             Accept: 'application/json',
    //     //         },
    //     //     });
    //     // } catch (error) {
    //     //     let msg = `Erro ao remover categoria de ID :: ${idCategoria}`;
    //     //     console.log(`${msg} - ${error}`);
    //     //     alert(msg);
    //     // }
    // }

    useEffect(() => {
        categoriasRepository
            .getAll()
            .then((categoriasFromServer) => {
                if(categoriasFromServer !== undefined){
                    setCategorias(categoriasFromServer);
                }
            })
            .catch((err) => {
                console.log(`ERROR :: ${err}`);
                notifyError('Erro ao buscar a lista de categorias do formulário');
            }); 
    }, []);

   return (
       <PageDefault >
            <h1 className="cabecalho">Cadastro de Categoria</h1>
            <form onSubmit={ handleSubmit } >

                <FormField
                    label="Título da Categoria"
                    type="text"
                    name="titulo"
                    value={values.titulo}
                    onChange={handleChange}
                />

                <FormField
                    label="Descrição"
                    type="textarea"
                    name="descricao"
                    value={values.descricao}
                    onChange={handleChange}
                />

                <FormField
                    label="Cor"
                    type="color"
                    name="cor"
                    value={values.cor}
                    onChange={handleChange}               
                />

               <Button className="botao">Cadastrar</Button>
            </form>

            {categorias.length === 0 && <ul className="lista">
                <li>
                    Loading...
                </li>
            </ul>}

            {categorias.length !== 0 && 
                <div>
                    <Table 
                        columns={columns} 
                        data={dados} 
                        headerStyle={ { background:  '#4c4e4e', fontSize: '15px' } } 
                        rowStyle={{ 
                            background: '#ebc251', 
                            fontSize: '13px', 
                            borderLeftWidth: '1px',
                            minWidth: '120px', 
                            height: '18px',
                            color: '#000000',
                            paddingLeft: '5px',
                        }}
                    />
                </div>
            }
 
            {/* link para navegar para a página HOME */}
            <Link to="/">
                Ir para a home
            </Link>

       </PageDefault>
   );
}
 
export default CadastroCategoria;
