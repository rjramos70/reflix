import styled from 'styled-components';

const Button = styled.button`
    color: var(--black);
    border: 1px solid var(--white);
    background: var(--primary);
    box-sizing: border-box;
    cursor: pointer;
    padding: 16px 24px;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    outline: none;
    border-radius: 5px;
    text-decoration: none;
    display: inline-block;
    transition: opacity .3s;

    &:hover {
        color: var(--white);
        text-shadow: 1px 1px 1px var(--black);
    }
    &:focus {
        opacity: .5;
    }
`;

export default Button;
