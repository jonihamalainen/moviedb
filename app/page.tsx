import Elokuvalistaus from '@/components/Elokuvalistaus';
import Karuselli from '@/components/Karuselli';
import {Elokuva, haeElokuvat} from '@/lib/elokuva_collection';

export default async function HomePage() : Promise<React.ReactElement> {

    const elokuvat : Elokuva[] = await haeElokuvat();
    
    return(
    <>

        <h1 className='text-4xl py-2'>Esittelyssä</h1>

        <Karuselli/>

        <h1 className='text-4xl py-2'>Uusimmat elokuvat</h1>

        <div className="grid grid-cols-3 gap-8">
       {elokuvat.map((elokuva : Elokuva, idx : number) => {

            return(
                 
                <Elokuvalistaus elokuva={elokuva}/>

            )

        })}
        </div>
    </>

    )

}