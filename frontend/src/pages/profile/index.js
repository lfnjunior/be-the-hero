import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {
  FiPower, 
  FiTrash2, 
  FiAlertOctagon
} from 'react-icons/fi';
import './styles.css';

import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

import { useToasts } from 'react-toast-notifications';

export default function Profile() {
  const ongName = localStorage.getItem('ongName');
  const ongId = localStorage.getItem('ongId');
  const [incidents, setIncidents] = useState([]);
  const { addToast } = useToasts();
  const history = useHistory();
  
  useEffect(()=> {
    api.get('profile', {
        headers: {
          Authorization: ongId
        }
      }
    ).then((resp)=> {
      setIncidents(resp.data);
    }, error => {
      addToast(error.message ? error.message : 'Não foi possivel carregas os casos',{ appearance: 'error', autoDismiss: true});   
    })
  },[ongId,addToast]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incident/${id}`, {
        headers: {
          Authorization: ongId
        }
      });      
      setIncidents(incidents.filter(i => i.id !== id));
      addToast(`Caso ${id} deletado com sucesso`,{ appearance: 'success', autoDismiss: true});         
    } catch (error) {
      addToast(error.message ? error.message : 'Não foi possivel excluir o caso',{ appearance: 'error', autoDismiss: true});         
    }
  }

  function handleLogout() {
    localStorage.clear();
    addToast(`Até breve ${ongName}`,{ appearance: 'success', autoDismiss: true});  
    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
          <img src={logoImg} alt="Be The Hero"/>
          <span>Olá, {ongName}</span>
          <Link className="button" to="/incidents/new">
            Cadastrar novo caso
          </Link>
          <button onClick={handleLogout} type="button">
            <FiPower size={18} color="#e02041"/>
          </button>
      </header>
      <h1>Casos Cadastrados</h1>
      <ul>
      { (incidents.length > 0) ?
          incidents.map(incident => (
            <li key={incident.id}>
              <strong>Caso:</strong>
                <p>{incident.title}</p>
              <strong>Descrição:</strong>
                <p>{incident.description}</p>
              <strong>Valor:</strong>
                <p>{
                  Intl.NumberFormat(
                    'pt-BR', 
                    {
                      style: 'currency',
                      currency: 'BRL'
                    }
                  ).format(incident.value) 
                }</p>
              <button
                onClick={ () => {
                    handleDeleteIncident(incident.id)
                  }
                } 
                type="button">
                <FiTrash2 size={20} color="#a8a8b3"></FiTrash2>
              </button>
            </li>
          ))
        :
        (
          <>
            <FiAlertOctagon size={25} color="#554564"/>
            <br/>
            <h3>
              No momento você não possui nenhum caso cadastrado!
              <br/>
              Clique em "Cadastrar novo caso".
            </h3>
          </>
        )
      }  
      </ul>

    </div>       
  );  
}