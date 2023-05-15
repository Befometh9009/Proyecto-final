const mainAttr = document.querySelector("#mainAttr")
var vamp1;

class Character {
    constructor() {
        this.identity = {
            //empty until PC is created
            name: ""
        }
        this.attributes = {
            // strength, charisma, perception
            str: {id:0,num:1,spec:false}, cha: {id:1,num:1,spec:false}, per: {id:2,num:1,spec:false},
            // dexterity, manipulate, intelligence
            dex: {id:3,num:1,spec:false}, man: {id:4,num:1,spec:false}, int: {id:5,num:1,spec:false},
            // stamina, appearence, witness
            sta: {id:6,num:1,spec:false}, app: {id:7,num:1,spec:false}, wit: {id:8,num:1,spec:false}
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

        this.willpower = {
            perm:0,
            temp:0
        }
        this.health = []
    }
    getAttrByID = id => {
        let obj;
        let attr = Object.getOwnPropertyNames(this.attributes); // crea un array con el nombre de todas las propiedades
        for(let i=0; i<attr.length;i++){
            let elem = Object.getOwnPropertyDescriptor(this.attributes,attr[i]).value; //extrae los valores de cada propiedad para sacar sus correspondientes componentes
            if(elem.id==id){
                return [attr[i],elem];
            }
            
        }
        // for(let i=0;i<attr.length;i++){
        //     if(this.attributes.attr[i].id==id){
        //         console.log("aqui");
        //         obj = Object.getOwnPropertyDescriptor(this.attributes.attr[i]);
        //     }
        // }
        console.log(obj);
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
        this.identity.gen = 14;
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
    vamp1=new Vampire();
    writer = createAttributes(vamp1);
    mainAttr.innerHTML = writer;
}

createAttributes=(char)=>{
    let writer = "";
    let attribute = ["Fuerza","Carisma","Percepción","Destreza","Manipulación","Inteligencia","Resistencia","Apariencia","Astucia"];
    let count = 0;
    let maxAttr = vampGenCalculator(char.identity.gen);
    for(let i=0; i<3; i++){
        writer+='<div class=row justify-content-center align-items-center g-2`>'
        for(let j=0; j<3; j++){
            writer+=`<div class="col-4">${attribute[count]} <div class="d-inline">(_____)</div>`;
            let obj = char.getAttrByID(count);
            let name = obj[0];
            console.log(name);
            for(let k = 0;k<=maxAttr;k++){
                writer+=`<input class="stat" type="checkbox" id="${name}${k+1}" name="${name}_dot" value="1" onchange="levelSelect('${name}_dot',${k})"`
                if(k==0){
                    writer+=`checked>`
                }else{
                    writer+=`>`
                }
            }
            writer+=`</div>`;
            count++;
        }
        writer+=`</div>`
    }
    return writer;
}

// Generacion:
// 0 = humano // no tiene
// 1 - 3 = caín y antediluvianos, stats ilimitados
// 4 - 7 = disminuyen en 1 mientras aumenta la generacion
// 8 o + = 5

vampGenCalculator=(gen)=>{
    if(gen<4){
        return 10;
    }
    else if(gen<8){
        let maxAttr = 13-gen;
        return maxAttr;
    }else{
        return 5;
    }
}

levelSelect = (name,pos) =>{
    let elem = document.getElementsByName(name);
    let value;
    if(pos==0){
        value = firstPosition(name);
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
        value = parseInt(elem[pos].value);
    }
    console.log(value);
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





