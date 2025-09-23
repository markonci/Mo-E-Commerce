import React from 'react'
import getAllCategrios from '../../../_Api/_getAllCategrios/getAllCategrios.api'
import Categorieswiper from './_categorieswiper/Categorieswiper';


export default  async function Categeriossilder() {
const {data}=await getAllCategrios()
// funcation api 

    
  return (
    <>
    <Categorieswiper data={data}/>
    </>
  )
}
