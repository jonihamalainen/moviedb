import {Elokuva, haeGenre} from '@/lib/elokuva_collection';
import {genreCheck} from '@/utils/genreCheck';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
    params : {
        genre : string
    }
}

export default async function GenrePage({params} : Props) : Promise<React.ReactElement> {

    const haku = genreCheck(params.genre);

    const elokuvat : Elokuva[] = await haeGenre(haku);

    return(
    <>

        <h2 className='text-4xl py-2'>{haku} elokuvat</h2>


        <div className="grid grid-cols-3 gap-8">
            {elokuvat.map((elokuva : Elokuva, idx : number) => {
                
                return(

                    <div>

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

                    </div>

                )

            })}
        </div>

        <div className='mt-4'>

            <Link className='rounded-full bg-red-600 p-2 hover:bg-red-800 text-white text-center' href="/">Palaa etusivulle</Link>

        </div>
      
    </>

    )

}