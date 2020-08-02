import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
 
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';

import useForm from '../../../hooks/useForm';

import categoriasRepository from '../../../repositories/categorias';
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
    
    const [dados, setDados] = useState([]);
        
    useEffect(() => {
        categoriasRepository.getAll()
          .then((dado) => {
                setDados(dado);
          })
          .catch((err) => {
            console.log(err.message);
            alert(err.message);
          });
    }, 
        [ 
            /* 
            ALERTA: se não for colocar estes colchetes as requisições ficarão 
            em loop infinito 
            */
        ]
    );

    // URL categorias
    const URL = categoriasRepository.getUrlCategorias();
       
    // declara a classe Categoria com os seus atributos
    const valoresIniciais = {
       titulo: '',
       descricao: '',
       cor: '',
    }
  
    // [ Constantes ]
    // lista 'categorias', setter 'setCategorias'
    const [categorias, setCategorias] = useState([]);
    // lista de componentes retornadas do useForm em forma de um objeto
    const { handleChange, values, clearForm } = useForm(valoresIniciais);
    
    const history = useHistory();

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


        try{
            await fetch(URL, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(categoriaDTO),
            });
        } catch (error) {
            let msg = 'Erro ao cadastrar a nova categoria';
            console.log(`${msg} - ${error}`);
            // alert(msg);
        }
        
        // insere 'values' na lista 'categorias'
        setCategorias([
            ...categorias,
            values
        ]);
    
        history.push('/cadastro/categoria');

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


    // Componente vai ser chamado quando quisermos que um efeito colateral aconteça
    useEffect(() => {
        fetch(URL)
          .then(async (response) => {
            if (response.ok) {
              const result = await response.json();
              setCategorias(result);
              return;
            }
            throw new Error('Não foi possível pegar os dados');
          }); 
    }, [URL]);

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
                        headerStyle={ { background:  '#4c4e4e', 'fontSize': '15px' } } 
                        rowStyle={{ 
                            background: '#ebc251', 
                            'fontSize': '13px', 
                            'borderLeftWidth': '1px',
                            'minWidth': '120px', 
                            height: '18px' 
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
