

class Character {
    constructor() {
        this.identity = {
            //empty until PC is created
            name: ""
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
        super();
        this.identity.nature = "";
        this.identity.conduct = "";
        this.identity.clan = {
                desc: "",
                weak: "",
                primal_disc: new Array(3)
            };
        this.identity.gen = 0;
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
        this.health = new Array(2);
    }
}

initializeSheet = ()=>{
    let writer = "";    
}

levelSelect = (name,pos) =>{
    let elem = document.getElementsByName(name);
    let valor;
    if(pos==0){
        valor = firstPosition(name);
    }
    else{
        if(elem[pos].checked){
            for(let i=0; i<=pos; i++){
                elem[i].checked=true;
            }
            if(pos < elem.length-1){
                for(let i=pos+1; i<elem.length; i++){
                    elem[i].checked=false;
                }
            }
        }
        else{
            elem[pos].checked = true;
            levelSelect(name,pos);
        }
        valor = parseInt(elem[pos].value);
    }
    console.log(valor);
}

firstPosition=(name) => {
    let elem = document.getElementsByName(name);
    if(elem[0].checked==false&&elem[1].checked){
        elem[0].checked=true;
        for(let i=1;i<elem.length;i++){
            elem[i].checked = false;
        }
    }
    else if(elem[0].checked==false){
        return 0;
    }
    return 1;
}





