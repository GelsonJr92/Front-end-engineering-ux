import type { NextPage } from 'next' 
import { useEffect } from 'react';
import { useState } from 'react'
import { Login} from '../containers/Login' 
import { User} from '../containers/User' 

import { Home} from '../containers/Home' 

const Index: NextPage = () => {

  const [accessToken, setToken] = useState('');

  useEffect(() => {
    if(typeof window !== 'undefined'){
        const token = localStorage.getItem('accessToken');
        if(token){
          setToken(token);
        }
    }
  }, [])

  return (
    //Não consegui fazer redirecionar para a tela de login
    //accessToken ? <Login setToken={setToken}/> : <User setToken={setToken}/>
    accessToken ? <Home setToken={setToken}/> : <Login setToken={setToken}/>
  )
}

export default Index
