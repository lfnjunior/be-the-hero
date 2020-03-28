import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { useToasts } from 'react-toast-notifications';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');
  const { addToast } = useToasts();
  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const ong = {
      name,
      email,
      whatsapp,
      city,
      uf
    }

    try {
      const resp = await api.post('ong', ong);
      addToast(`Seu Id de acesso: ${resp.data.id}`,{ appearance: 'success', autoDismiss: true});
      history.push('/')
    } catch (error) {
      addToast(error.message ? error.message : 'Ocorreu um erro inesperado',{ appearance: 'error', autoDismiss: true});   
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section className="form">
          <img src={logoImg} alt="Be The Hero"/>
          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma ejude pessoas a encontrarem os casos da sua ong</p>
          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#e02041"/>
            Voltar
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input 
            placeholder="Nome da ONG"
            value={name}
            onChange={e => setName(e.target.value)}/>
          <input 
            type="email" 
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}/>
          <input 
            placeholder="Whatsapp"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}/>
          <div className="input-group">
            <input 
              placeholder="Cidade"
              value={city}
              onChange={e => setCity(e.target.value)}/>
            <input 
              placeholder="UF" 
              style={{width: 80}}
              value={uf}
              onChange={e => setUf(e.target.value)}/>
          </div>
          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>       
  );  
}