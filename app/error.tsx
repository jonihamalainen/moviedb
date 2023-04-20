'use client'

interface Props {
    error : Error
    paivita : () => void
}

function Error({error, paivita} : Props) {
  return (

    <div>
        
       <h4>{error.message}</h4>
        
        <button onClick={() => paivita()}>Hae tietoja uudestaan</button>

    </div>

   

  )
}

export default Error;