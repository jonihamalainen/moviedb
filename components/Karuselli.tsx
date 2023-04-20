import React from 'react'

function Karuselli() : React.ReactElement {
  return (
    <div className='w-full'>
        <div className="carousel w-96">
        <div id="item1" className="carousel-item w-full grid grid-cols-1 grid-rows-1">
            <div>
                <img src="https://image.tmdb.org/t/p/w500/6DrHO1jr3qVrViUO6s6kFiAGM7.jpg" className="w-full h-full"/>
            </div>
            <div> 
                <h1 className="text-3xl mt-1">Sonic the Movie 2</h1>
                <h1 className='text-2xl mt-1'>Kesto 1h 40min</h1>
                <h1 className='text-2xl mt-1'>Valmistumisvuosi: 2022</h1>
                <label className="bg-inherit btn rounded text-black border-1 hover:bg-transparent" htmlFor="my-modal1">Lue elokuvan kuvaus</label>

                    <input type="checkbox" id="my-modal1" className="modal-toggle" />

                        <div className="modal">
                        <div className="modal-box bg-white text-left">
                            <p className="py-4">Asetuttuaan aloilleen Green Hillsin pikkukaupunkiin Sonic haluaa todistaa, että hänessä on ainesta oikeaksi sankariksi. Hän joutuu todelliseen koetukseen kun Dr. Robotnik tekee paluun. Robotnikilla on mukanaan uusi aisapari, tappelupukari Knuckles, ja kiikarissa mystinen smaragdi, joka kätkee sisäänsä tuhoavan voiman. Sonic löytää apurikseen uuden ystävän, etevän Tailsin. Yhdessä he lähtevät etsimään smaragdia ennen kuin se päätyy vääriin käsiin.</p>
                            <div className="modal-action">
                            <label htmlFor="my-modal1" className="btn text-black bg-white hover:bg-transparent">Sulje</label>
                            </div>
                        </div>
                        </div>
            </div>
        </div> 
        <div id="item2" className="carousel-item w-full grid grid-cols-1 grid-rows-1">
            <div>
                <img src="https://image.tmdb.org/t/p/w500/pJPDwYebCUbShv6EkDmxscpioiw.jpg" className="w-full" />
            </div>
            <div> 
                <h1 className="text-3xl mt-1">Toinen mies</h1>
                <h1 className='text-2xl mt-1'>Kesto 1h 33min</h1>
                <h1 className='text-2xl mt-1'>Valmistumisvuosi: 2022</h1>
                <label className="bg-inherit btn rounded text-black border-1 hover:bg-transparent" htmlFor="my-modal2">Lue elokuvan kuvaus</label>

                <input type="checkbox" id="my-modal2" className="modal-toggle" />

                    <div className="modal">
                    <div className="modal-box bg-white text-left">
                        <p className="py-4">Maailma on muuttunut ja korona-aika on vaikuttanut kaikkien ihmisten toimintaan. Tommi ja Jaana ovat seurustelleet kahdeksan vuoden ajan. Jaana välttelee sitoutumista ja pikku hiljaa hänen toimintansa alkaa tuntua Tommista epäilyttävältä. Tommille herää tunne, että kaikki ei ole kunnossa heidän suhteessaan ja hän palkkaa yksityisetsivä Niklaksen selvittämään Jaanan yksityiselämää. Niklas on kokenut ja intensiivinen tutkija, mutta hänen metodinsa ovat omalaatuiset. Niklas pyrkii selvittämään kaiken mitä Jaana tekee elämässään, missä hän liikkuu ja ketä hän tapaa. Samalla Tommi riutuu omien epäluulojensa kanssa ja herää kysymys voisiko Jaana sittenkään olla suhteessa petollinen, vai rakentaako Tommi ainoastaan pelkotilaa oman mielensä sisällä.</p>
                        <div className="modal-action">
                        <label htmlFor="my-modal2" className="btn text-black bg-white hover:bg-transparent">Sulje</label>
                        </div>
                    </div>
                    </div>
            </div>
        </div> 
        <div id="item3" className="carousel-item w-full grid grid-cols-1 grid-rows-1">
            <div>
                <img src="https://image.tmdb.org/t/p/w500/xyWszJw6nqgPSKIXSaYlCgjF7xF.jpg" className="w-full" />
            </div>
            <div> 
                <h1 className="text-3xl mt-1">Pohjolan satoa</h1>
                <h1 className='text-2xl mt-1'>Kesto 1h 46min</h1>
                <h1 className='text-2xl mt-1'>Valmistumisvuosi: 2022</h1>
                <label className="bg-inherit btn rounded text-black border-1 hover:bg-transparent" htmlFor="my-modal3">Lue elokuvan kuvaus</label>

                <input type="checkbox" id="my-modal3" className="modal-toggle" />

                    <div className="modal">
                    <div className="modal-box bg-white text-left">
                        <p className="py-4">Pohjolan satoa-elokuva kertoo maalaistalon isännistä kolmessa sukupolvessa. Isännät kärsivät erilaisista ongelmista, joita kaikkia yhdistää jonkin sortin rakennemuutos. Nyt kylälle saapuu paluumuuttaja Ville, it-alan hipsteri Helsingistä. Villen yhtiökumppani on ajanut heidän yrityksensä konkurssiin, eikä Villelle ole jäänyt käteen kuin satojen tuhansien velat. Isä on ollut takaamassa Villen lainaa, joten myös koko perhetilan tulevaisuus on uhattuna. Ville saa neronleimauksen: tilan syrjäisellä pellolla voisi kasvattaa kannabista. Pääkaupunkiseudulla on nimittäin hyvästä pilvestä pula. Pienen suostuttelun jälkeen suvun miehet pistävät kannabiksen kasvamaan, ja siitäpä ne sotkut sitten tietenkin käynnistyvät. Soppaan sekaantuvat niin pilvidiileri Mehmed, EU-byrokraatit, kylän mahtimiehet, gangsterit, paikallinen moottoripyöräkerho ja kaikkien tuntema paikallispoliisi Laitinen.</p>
                        <div className="modal-action">
                        <label htmlFor="my-modal3" className="btn text-black bg-white hover:bg-transparent">Sulje</label>
                        </div>
                    </div>
                    </div>
            </div>
        </div> 
        </div> 
        <div className="flex w-full py-2 gap-2">
        <a href="#item1" className="btn btn-s">1</a> 
        <a href="#item2" className="btn btn-s">2</a> 
        <a href="#item3" className="btn btn-s">3</a> 
        </div>
    </div>
  )
}

export default Karuselli