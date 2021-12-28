import React, { useState, useEffect } from 'react';
import './home.css';
import apiFilmes from '../../services/api';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { Link } from 'react-router-dom';

const Home = () =>  {

  const [loading, setLoading] = useState(true);
  const [filmes, setFilmes] = useState([]);
  
  const getFilmes = async () => {
    await apiFilmes.get('r-api/?api=filmes')
    .then((resp) => {
      setFilmes(resp.data);
      setLoading(false);
    })
    .catch((e) => console.log('error: ', e))
    .finally(() => {})
  }


  useEffect(() => {
    getFilmes();
  }, [])

  return (
    <div className='container'>
      {!loading ? (
        <>
          <div className='lista-filmes'>
            
            {filmes.map((filme) => {
              return(
                <article key={filme.id}>
                  <strong>{filme.nome}</strong>
                  <img src={filme.foto} alt={filme.nome}/>
                  <Link to={`/filme/${filme.id}`}>Acessar</Link>
                </article>
              );
            })}
          </div>
        </>
      ) : (
        <Loader
          type="ThreeDots"
          color="#c52626"
          height={50}
          width={50}
        />
      )}
    </div>
  );
}

export default Home;
