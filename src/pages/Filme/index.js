import React, { useState, useEffect } from 'react';
import './filme-info.css';
import { useParams, useHistory } from 'react-router-dom';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import apiFilmes from '../../services/api';
import { toast } from 'react-toastify';

const Filme = () => {
    const { id } = useParams();
    const history = useHistory();

    const [loading, setLoading] = useState(true);
    const [filme, setFilme] = useState([]);
 
    const salvarFilme = () => {
        const minhaLista = localStorage.getItem('filmes');

        let filmesSalvos = JSON.parse(minhaLista) || [];

        // Se tiver algum filme salvo com o mesmo id, será ignorado
        const hasFilme = filmesSalvos.some((filmesSalvos) => filmesSalvos.id === filme.id)

        if(hasFilme){
            toast.info('Você já possui este filme salvo.');
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem('filmes', JSON.stringify(filmesSalvos));
        toast.success('Filme salvo com sucesso!');
    }

    useEffect(() => {
        const getFilmes = async () => {
            await apiFilmes.get(`r-api/?api=filmes/${id}`)
            .then((resp) => {
                if(resp.data.length === 0){
                    // Tentou acessar com o ID que não existe, navegar para Home
                    history.replace('/');
                }
                setFilme(resp.data);
                setLoading(false);
            })
            .catch((e) => console.log('error: ', e))
            .finally(() => {})
        }

        getFilmes();

        return () => {}
    }, [history, id])

    return(
        <div className='filme-info'>
            {!loading ? (
                <>
                    <h1>{filme.nome}</h1>
                    <img src={filme.foto} alt={filme.nome}/>
                    <h3>Sinopse</h3>
                    {filme.sinopse}

                    <div className='botoes'>
                        <button onClick={() => salvarFilme()}>Salvar</button>
                        <button>
                            <a 
                                target='blank'
                                href={`https://youtube.com/results?search_query=${filme.nome} Trailer`}
                            >Trailer</a>
                        </button>
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

export default Filme;