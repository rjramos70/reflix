import React from 'react';
import { Link } from 'react-router-dom'
import Logo from '../../assets/img/Logo150.png'
import './Menu.css';
//import ButtonLink from './components/ButtonLink';
import Button from '../Button';
 
 
function Menu() {
   return(
       <nav className="Menu">
           <Link to="/">
               <img className="Logo" src={Logo} alt="ReFlix logo"/>
           </Link>
 
           <Button as={Link} className="ButtonLink" to="/cadastro/video">
               Novo Vídeo
           </Button>
       </nav>
   );
}
 
export default Menu;