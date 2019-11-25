export class WeaponModel {

    public dmg: number;
    public price: number;
    public titel: string;
    public material: string;
    public attr: number;



    constructor(dmg: number, price: number, titel: string, material: string, attr: number) {
        this.dmg = dmg;
        this.price = price;
        this.titel = titel;
        this.material = material;
        this.attr = attr;

    }

}
