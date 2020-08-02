import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

// [ Estilos dos componentes ]
const FormFieldWrapper = styled.div`
    position: relative;
    textarea {
        min-height: 150px;
    }
    input[type='color']{
        padding-left: 56px;
    }
`;

const Label = styled.label`
    color: var(--primary);
`;
Label.Text = styled.span`
    color: var(--black);
    height: 57px;
    position: absolute;
    top: 0;
    left: 16px;

    display: flex;
    align-items: center;

    transform-origin: 0% 0%;
    font-size: 18px;
    font-style: normal;
    font-weight: 300;

    transition: .1s ease-in-out;
`;


const Input = styled.input`
    background: var(--grayMedium);
    color: var(--grayDark);
    display: block;
    width: 100%;
    height: 57px;

    outline: 0;
    border: 0;
    border-top: 4px solid transparent;
    border-bottom: 4px solid #53585D;

    padding: 16px 16px;
    margin-bottom: 25px;
    resize: none;
    border-radius: 4px;
    transition: border-color .3s;

    &:focus {
        border-bottom-color: var(--primary);
    }

    &:focus:not([type="color"]) + span {
        
        transform: scale(.6) translateY(-10px); 
        color: var(--blackLighter);   
    }
    /*
    && -->  caso o PRIMEIRO valor de FALSE, pega o PRIMEIO valor;
            caso o PRIMEIRO valor de TRUE, pega o SEGUNDO valor;    
    */
    ${({ hasValue }) => hasValue && css`
        &:not([type="color"]) + span {
            transform: scale(.6) translateY(-10px);    
        }
    `}
    
`;

function FormField({ label, type, name, value, onChange, suggestions }){ 
    const fieldId = `id_${name}`;

    const isTextArea = type === 'textarea';
    const tag = isTextArea ? 'textarea' : 'input';

    const hasValue = Boolean(value.length);
    const hasSuggestions = Boolean(suggestions.length);

    return(
<FormFieldWrapper>
      <Label
        htmlFor={fieldId}
      >
        <Input
          as={tag}
          id={fieldId}
          type={type}
          value={value}
          name={name}
          hasValue={hasValue}
          onChange={onChange}
          autoComplete={hasSuggestions ? 'off' : 'on'}
          list={hasSuggestions ? `suggestionFor_${fieldId}` : undefined}
        />
        <Label.Text>
          {label}
          :
        </Label.Text>
        {
          hasSuggestions && (
            <datalist id={`suggestionFor_${fieldId}`}>
              {
              suggestions.map((suggestion) => (
                <option value={suggestion} key={`suggestionFor_${fieldId}_option${suggestion}`}>
                  {suggestion}
                </option>
              ))
            }
            </datalist>
          )
        }

      </Label>
    </FormFieldWrapper>
    );

}

// Valores Default casa a propriedade não seja passada
FormField.defaultProps = {
    type: 'text',
    value: '',
    onChange: () => {}, // como default passar uma função Lambda
    suggestions: [],
}

// Monta quais os tipos de cada atributo
FormField.propTypes = {
    label: PropTypes.string.isRequired, 
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    suggestions: PropTypes.arrayOf(PropTypes.string),
};

export default FormField;
