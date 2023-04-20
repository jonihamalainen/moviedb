export const timeConvert = (n : number) : string=>{
    let kesto : number = n;

    let tunnit : number = (kesto / 60);

    let ptunnit : number = Math.floor(tunnit);

    let minuutit : number = (tunnit - ptunnit) * 60;

    let pminuutit : number = Math.round(minuutit);

    let tunnitjaminuutit : string = `Elokuvan kesto: ${ptunnit} tunti(a) ja ${pminuutit} minuutti(a).`

    if(kesto < 60){
        return `Elokuvan kesto: ${kesto} minuutti(a)`
    } else {
        return tunnitjaminuutit;
    }

}
