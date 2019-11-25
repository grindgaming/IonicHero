import {WeaponModel} from './weapon-model';
import {ArmorModel} from './armor-model';

export class HeroModel {

    public hp: number;
    public maxHp: number;
    public strength: number;
    public agillity: number;
    public intelligence: number;
    public strengthMulti: number;
    public agillityMulti: number;
    public intelligenceMulti: number;
    public helmet: ArmorModel;
    public chest: ArmorModel;
    public arms: ArmorModel;
    public legs: ArmorModel;
    public feet: ArmorModel;
    public weapon: WeaponModel;
    public weight: number;
    public attack: number;
    public klasse: string;
    public def: number;


    constructor() {
        this.hp = 10;
        this.maxHp = 10;
        this.strength = 0;
        this.agillity = 0;
        this.intelligence = 0;
        this.attack = 0;
        this.helmet = new ArmorModel(1,1, 'Blech','alte',0);
        this.chest = new ArmorModel(1,1,'Blech','alte',0);
        this.arms = new ArmorModel(1, 1,'Blech','alte',0);
        this.legs = new ArmorModel(1, 1,'Blech','alte',0);
        this.feet = new ArmorModel(1, 1,'Blech','alte',0);
        this.weapon = new WeaponModel(2, 1,'Stab','Holz',0);
        this.klasse = "";
        this.setDef();

    }

   public setDef() {
       this.def = 
       this.helmet.armor +
       this.chest.armor +
       this.arms.armor +
       this.legs.armor +
       this.feet.armor;
   }



}
