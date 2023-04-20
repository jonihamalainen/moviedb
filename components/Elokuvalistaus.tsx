import Link from 'next/link'
import Image from 'next/image';
import React from 'react'
import { Elokuva } from '@/lib/elokuva_collection';

interface Props {
    elokuva : Elokuva
}

function Elokuvalistaus({elokuva} : Props) : React.ReactElement {

  return (

    <>

    <Link href={`/elokuva/${elokuva._id}`}>

        <div className='grid justify-items-center'>
            
        <Image
            src={`https://image.tmdb.org/t/p/w154${elokuva.tmdbkuva}`}
            alt='Elokuvan juliste'
            width={154}
            height={300}
        />

        </div>

        <div className='grid justify-items-center'>

            
                <h1 className='text-2xl'>{elokuva.nimi.length !== 0 ? elokuva.nimi : elokuva.alkuperainennimi}</h1>

                <h2 className='text-xl'>{elokuva.genre + " " + elokuva.valmistumisvuosi}</h2>

        </div>

    
    </Link>

    </>
    
  )

}

export default Elokuvalistaus