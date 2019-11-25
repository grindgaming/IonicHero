export class EnemyModel {

    public hp;
    public maxHp;
    public attack;
    public name;

    constructor(maxHp: number,attack: number, name: string) {
        
        this.maxHp = maxHp;
        this.hp = this.maxHp;
        this.attack = attack;
        this.name = name;

    }

    public setStats() {
        
    }

}
