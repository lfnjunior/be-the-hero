import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi'
import { useToasts } from 'react-toast-notifications';
import api from '../../services/api';
import logoImg from '../../assets/logo.svg';
import './styles.css';

export default function Incident() {

  const ongId = localStorage.getItem('ongId');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const { addToast } = useToasts();
  const history = useHistory();


  async function handleNewIncident(e) {
    e.preventDefault();

    const incident = {
      title,
      description,
      value
    }

    try {
      await api.post('incident', incident,{
        headers: {
          Authorization: ongId
        }
      });
      addToast(`Caso cadastrado com sucesso`,{ appearance: 'success', autoDismiss: true});
      history.push('/profile')
    } catch (error) {
      addToast(error.message ? error.message : 'Ocorreu um erro inesperado',{ appearance: 'error', autoDismiss: true});   
    }
  }

  return (
    <div className="incident-container">
      <div className="content">
        <section className="form">
          <img src={logoImg} alt="Be The Hero"/>
          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#e02041"/>
            Voltar
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input 
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Título do Caso"/>
          <textarea 
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Descrição"/>
          <input 
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="Valor em reais"
            type="number"
            min="0" 
            max="9999999"/>
          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>       
  );  
}