import React from 'react';
import './erro.css';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return(
        <div className='not-found'>
            <h1>404</h1>
            <h2>Ops! Página não encontrada!</h2>
            <Link to='/'>Veja todos filmes</Link>
        </div>
    );
}

export default NotFound;