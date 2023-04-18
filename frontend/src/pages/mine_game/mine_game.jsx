import React from 'react'
import Navbar from '../../components/navbar/navbar'
import Game from '../../components/game/game'
import Footer from '../../components/footer/footer'
import { useParams } from 'react-router-dom'

const Mine = () => {
  // let {str} = useParams();

  return (
    <div>
      <Navbar/>
      <Game/>
      <Footer/>
    </div>
  )
}

export default Mine
