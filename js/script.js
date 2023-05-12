class Character {
    constructor() {
        this.identity = {
            //empty until PC is created
            name: "pedro"
        }
        this.attributes = {
            // strength, dexterity, stamina
            str: 1, dex: 1, sta: 1,
            // charisma, manipulate, appearence
            cha: 1, man: 1, app: 1,
            // perception, intelligence, witness
            per: 1, int: 1, wit: 1
        }
        this.habilities = {
            //empty until PC is created
            tal: {},
            tech: {},
            know: {}
        }
        this.backgrounds = {
            //empty until PC is created
        }

        this.willpower = [0, 0]
        this.health = []
    }
}

class Vampire extends Character {
    constructor() {
        super(identity) = {
            nature : "",
            conduct : "",
            clan : {
                name:"",
                desc: "",
                weak: "",
                primal_disc: new Array(3)
            },
            gen : 0
        }
        this.virtues = {
            vir_1: {
                type: "",
                num: 0
            },
            vir_2: {
                type: "",
                num: 0
            },
            vir_3: {
                type: "",
                num: 0
            }
        }
        this.path = {
            type: "",
            num: 0
        },
        this.merits = [];
        this.flaws = [];
        this.blood = [];
        super(health) = new Array(2);
    }
}

const personajes = new Vampire();
console.log(personajes.identity.name);


