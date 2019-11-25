export class ArmorModel {

    public armor: number;
    public price: number;  
    public material: string;
    public titel: string;
    public attr: number;
    

    constructor(armor: number,price: number, material: string, titel: string, attr: number) {
        this.armor = armor;
        this.titel = titel;
        this.material = material;
        this.price = price;
        this.attr = attr;
    }


}
