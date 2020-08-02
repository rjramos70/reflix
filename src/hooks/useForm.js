import { useState } from 'react';

// Hooks Form - componente que incapsula outros componentes  
function useForm(valoresIniciais) {
    
    // declara um 'State' de nome 'values' passando a Categoria, e uma função para atualizar 'setValues'
    const [values, setValues] = useState(valoresIniciais);
    
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

    function clearForm(){
        setValues(valoresIniciais);
    }

    return {
        values,
        handleChange,
        clearForm,
    }
}

export default useForm;