import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
 
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';

// import '../../cadastro/formularios.css';
 
function CadastroCategoria(){
   // declara a classe Categoria com os seus atributos
   const Categoria = {
       nome: '',
       descricao: '',
       cor: '',
   };
  
   // declara um 'State' do tipo Array de nome 'categorias' vazio, e uma função para atualizar 'setCategorias'
   const [categorias, setCategorias] = useState([]);
 
   // declara um 'State' de nome 'values' passando a Categoria, e uma função para atualizar 'setValues'
   const [values, setValues] = useState(Categoria);
  
   // cria uma função que recebe uma 'chave' e 'valor'
   function setValue(chave, valor){
       // seta a Categoria corrente
       setValues({
           ...values,          // pega a lista com todos os valores
           [chave]: valor,     // insere um novo valor na lista
       })
   }
 
   function handleChange(props){
       setValue(
            props.target.getAttribute('name'),
            props.target.value,
       );
   }
 
   function handleSubmit(props){
       props.preventDefault();
       // insere 'values' na lista 'categorias'
       setCategorias([
           ...categorias,
           values
       ]);
 
       // limpa campos do State corrente
       setValues(Categoria);
   }
 
   // Componente vai ser chamado quando quisermos que um efeito colateral aconteça
   useEffect(() => {
        // O que deve acontecer
        const URL = 'http://localhost:8080/categorias';

        fetch(URL)
            .then(async (respostaDoServidor) => {
                const resposta = await respostaDoServidor.json();
                console.log(resposta);
                setCategorias([
                    ...resposta,
                ])
            });

        // setTimeout(() => {
        //     setCategorias([
        //         ...categorias,
        //         {
        //             id: 1,
        //             nome: "Front End",
        //             descricao: "Categoria super bacana",
        //             cor: "#cbd1ff"
        //         },
        //         {
        //             id: 2,
        //             nome: "Back End",
        //             descricao: "Outra categoria super bacana",
        //             cor: "#cbd1ff"
        //         },
        //     ]);
        // }, 4 * 1000);
   }, [
        // Com que frequência
        
   ]);

   return (
       <PageDefault >
            <h1 className="cabecalho">Cadastro de Categoria</h1>
            <form onSubmit={ handleSubmit } >

                <FormField
                    label="Nome da Categoria"
                    type="text"
                    name="nome"
                    value={values.nome}
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

            <ul className="lista">
               {categorias.map((categoria, indice) => {
                   return(
                       <li key={`${categoria.nome}${indice}`} >
                           {categoria.nome} - {categoria.descricao} - {categoria.cor}
                       </li>
                   )
               })}
            </ul>
 
            {/* link para navegar para a página HOME */}
            <Link to="/">
                Ir para a home
            </Link>
 
       </PageDefault>
   );
}
 
export default CadastroCategoria;
