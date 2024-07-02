import React, { useState } from 'react'
import Imagen from '../assets/login.png'
import ImageProfile from '../assets/profile1.jpg'

import appFirebase from '../credenciales'
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth' 
const auth = getAuth(appFirebase)

const Login = () => {

  const [registrando, setRegistrando] = useState(false)

  const functAutenticacion = async(e) => {
    e.preventDefault();
    const correo = e.target.email.value;
    const contraseña = e.target.password.value;
    
    if (registrando){
      try {
        await createUserWithEmailAndPassword(auth, correo, contraseña)
      } catch (error) {
        alert("Aseguresé que la contraseña tenga más de ocho caracteres")
      }
    }
    else{
      try {
        await signInWithEmailAndPassword(auth, correo, contraseña)
      } catch (error) {
        alert("El correo o la contraseña son incorrectos")
      }
      
    }
  }


  return (
    <div className='container'>
      <div className="row">
        {/* columna más pequeña formulario*/}
        <div className="col-md-4">
          <div className="padre">
            <div className="card card-body shadow-lg">
              <img src={ImageProfile} alt="" className='estilo-profile'/>
              <form onSubmit={functAutenticacion}>
                <input type="text" placeholder='Ingresar email' className='cajatexto' id='email' />
                <input type="password" placeholder='Ingresar contraseña' className='cajatexto' id='password'/>
                <button className='btnform'>{registrando ? "Registrate" : "Inicia sesión"}</button>              
                </form>
              <h4 className='texto'>{registrando ? "Si ya tienes cuenta" : "No tienes cuenta"}<button className='btnswitch' onClick={()=>setRegistrando(!registrando)}>{registrando ? "Inicia sesión"  : "Registrate"}</button></h4>
            </div>
          </div>
        </div>
        {/* columna más grande*/}
        <div className="col-md-8">
          <img src={Imagen} alt="" className='tamaño-imagen' />
        </div>
      </div>
    </div>
  )
}

export default Login