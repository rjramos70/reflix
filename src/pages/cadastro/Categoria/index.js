import React, { useState } from 'react';
import { Link } from 'react-router-dom';
 
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';

import '../../cadastro/formularios.css';
 
function CadastroCategoria(){
   // declara a classe Categoria com os seus atributos
   const Categoria = {
       nome: '',
       descricao: '',
       cor: '',
   }
  
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
        // extrai os atributos 'getAttribute' e 'value' do 'props.target'
        //   const { getAttribute, value } = props.target;

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
 
   return (
       <PageDefault >
           <h1 className="cabecalho">Cadastro de Categoria</h1>
           <form onSubmit={ handleSubmit } >
               <fieldset className="grupo">
                    <div>
                        
                        <FormField
                                classe="campo"
                                label="Nome da Categoria"
                                type="text"
                                name="nome"
                                value={values.nome}
                                onChange={handleChange}
                        />

                            <FormField
                                classe="campo"
                                label="Descrição"
                                type="textarea"
                                name="descricao"
                                value={values.descricao}
                                onChange={handleChange}
                        />
        
                            <FormField
                                classe="campo"
                                label="Cor"
                                type="color"
                                name="cor"
                                value={values.cor}
                                onChange={handleChange}               
                            />

                    </div>

               </fieldset>
               
 
               <button className="botao">Cadastrar</button>
           </form>
          
           {/* lista da Categorias */}
           <ul className="lista">
               {categorias.map((categoria, indice) => {
                   return(
                    <ul>
                       <li key={`${categoria.nome}${indice}`}>
                           {categoria.nome} - {categoria.descricao} - {categoria.cor}
                       </li>
                    </ul>
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
