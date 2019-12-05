import {HeroModel} from './hero-model';
import {EnemyModel} from './enemy-model';
import {ArmorModel} from './armor-model';
import {WeaponModel} from './weapon-model';

export class SavestateModel {

    public gold: number;
    public totalxp: number;
    public level: number;
    public stage: number;
    public expThreshholds: any;
    public nextThreshhold: number;
    public hero: HeroModel;
    public enemys: EnemyModel[];
    public currentEnemy: EnemyModel;
    public eHP: number;
    public eMaxHP: number;
    public shopWeapons: WeaponModel[];
    public shopArmors: ArmorModel[];
    public specialCd: number;
    public strongCd: number;



    constructor() {
        this.gold = 0;
        this.totalxp = 0;
        this.level = 1;
        this.stage = 1;
        this.specialCd = 0;
        this.strongCd = 0;
        this.expThreshholds = [1000, 250, 700,900,1200, 1400,2000,3000,5000, 7000,9000, 16000,35000,100000,200000,500000];
        this.nextThreshhold = this.getNextThreshhold();
        this.hero = new HeroModel();
        this.currentEnemy = new EnemyModel(10,6,'Tutorial Borg');
        this.eHP = this.currentEnemy.hp;
        this.eMaxHP = this.currentEnemy.maxHp;
        this.shopWeapons = [
            new WeaponModel(2,1,'biegsame Gabel','Diamant',0),
            new WeaponModel(2,1,'biegsame Gabel','Diamant',0),
            new WeaponModel(2,1,'biegsame Gabel','Diamant',0),
            new WeaponModel(2,1,'biegsame Gabel','Diamant',0)
        ];
        this.shopArmors = [
            new ArmorModel(4,1,'Leder','Verstaubte',0),
            new ArmorModel(4,1,'Leder','Verstaubte',0),
            new ArmorModel(4,1,'Leder','Verstaubte',0),
            new ArmorModel(4,1,'Leder','Verstaubte',0),
            new ArmorModel(4,1,'Leder','Verstaubte',0),
            new ArmorModel(4,1,'Leder','Verstaubte',0),
            new ArmorModel(4,1,'Leder','Verstaubte',0),
            new ArmorModel(4,1,'Leder','Verstaubte',0),
            new ArmorModel(4,1,'Leder','Verstaubte',0),
            new ArmorModel(4,1,'Leder','Verstaubte',0),
            new ArmorModel(4,1,'leder','Verstaubte',0),
            new ArmorModel(4,1,'Leder','Verstaubte',0),
            new ArmorModel(4,1,'Leder','Verstaubte',0),
            new ArmorModel(4,1,'Leder','Verstaubte',0),
            new ArmorModel(4,1,'Leder','Verstaubte',0),
            new ArmorModel(4,1,'Leder','Verstaubte',0),
            new ArmorModel(4,1,'Leder','Verstaubte',0),
            new ArmorModel(4,1,'Leder','Verstaubte',0),
            new ArmorModel(4,1,'Leder','Verstaubte',0),
            new ArmorModel(4,1,'Leder','Verstaubte',0),
           
            
        ];
    }

    public getNextThreshhold(): number {
        return this.expThreshholds[this.level];


    }

    public checkXp() {

        if (this.totalxp >= this.nextThreshhold) {
            this.level++;
        }
    }

    

}
