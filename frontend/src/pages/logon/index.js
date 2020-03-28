import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiLogIn} from 'react-icons/fi'
import './styles.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

import api from '../../services/api'
import { useToasts } from 'react-toast-notifications'

export default function Logon() {

  const [id, setId] = useState('');
  const { addToast } = useToasts();
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const resp = await api.post('session', {id});

      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', resp.data.name);
      
      addToast(`Acesso autorizado ${resp.data.name}`,{ appearance: 'success', autoDismiss: true});
      
      history.push('/profile');
    } catch (error) {
      addToast(error.message ? error.message : 'Falha ao realizar login',{ appearance: 'error', autoDismiss: true});   
    }
  }
  
  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero"/>
        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>
          <input 
            placeholder="Sua ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button className="button" type="submit">Entrar</button>
          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#e02041"/>
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={heroesImg} alt="Heroes"/>
    </div>      
  );  
}