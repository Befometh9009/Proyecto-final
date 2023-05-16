const mainAttr = document.querySelector("#mainAttr") //Constructor HTML de la sección: Atributos
const mainHabs = document.querySelector("#mainHabs") //Constructor HTML de la sección: Habilidades

const attributeEsp = ["Fuerza","Carisma","Percepción","Destreza","Manipulación","Inteligencia","Resistencia","Apariencia","Astucia"];
const vampHabEsp = [
    "Alerta","Armas C.C.","Academicismo",
    "Atletismo","Armas de Fuego","Ciencia",
    "Callejeo","Conducir","Finanzas",
    "Consciencia","Etiqueta","Informática",
    "Empatía","Latrocinio","Investigación",
    "Expresión","Interpretación","Leyes",
    "Intimidación","Pericias","Medicina",
    "Liderazgo","Sigilo","Ocultismo",
    "Pelea","Supervivencia","Política",
    "Subterfugio","Trato con Animales","Tecnología",
]
const attributeEng = ["str","cha","per","dex","man","int","sta","app","wit"];
const vampHabEng = [
    "alertness","melee","academics",
    "atletism","firearms","science",
    "streetwise","drive","finance",
    "awareness","etiquette","computer",
    "empathy","larceny","investigation",
    "expression","performance","law",
    "intimidation","crafts","medicine",
    "leadership","stealth","occult",
    "brawl","survive","politics",
    "subterfuge","animalKen","technology",
]
var vamp1;
/**
 * Estadísticas globales para todos los personajes
 */
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
        let attr = Object.getOwnPropertyNames(this.attributes); // crea un array con el nombre de todas las propiedades
        for(let i=0; i<attr.length;i++){
            let elem = Object.getOwnPropertyDescriptor(this.attributes,attr[i]).value; //extrae los valores de cada propiedad para sacar sus correspondientes componentes
            if(elem.id==id){
                return [attr[i],elem];
            }
            
        }
    }
    getHabByID = id => {
        let hab = Object.getOwnPropertyNames(this.habilities); // crea un array con el nombre de todas las propiedades
        for(let i=0; i<attr.length;i++){
            let elem = Object.getOwnPropertyDescriptor(this.habilities,hab[i]).value; //extrae los valores de cada propiedad para sacar sus correspondientes componentes
            if(elem.id==id){
                return [hab[i],elem];
            }
            
        }
    }
}

/**
 * Estadísticas de un Vampiro, hereda de Character
 */
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
        this.identity.gen = 13;
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
        this.health = {
            lethal: 7,
            aggravated: 7
        };
    }
}

/**
 * Constructor de la hoja de personaje en HTML
 */
function initializeSheet(){
    vamp1=new Vampire();
    let writer = createStats(vamp1,1);
    mainAttr.innerHTML = writer;
    writer = createStats(vamp1,2);
    mainHabs.innerHTML = writer;
}

/**
 * Constructor HTML para realizar la construcción de la lista que permite visualizar cada sección
 * @param {Recibe el objeto Character que en este caso sería el personaje del usuario (con estadísticas incluidas)} char 
 * @returns entrega el texto ya construido
 */
function createStats(char,section){
    let writer = "";    
    let max = vampGenCalculator(char.identity.gen);
    writer += listStats(max,section,char);
    return writer;
}

function listStats(max,section,char){
    let writer = "";
    let count = 0;
    let arr;
    let name;
    switch(section){
        case 1:
            arr = attributeEsp;
            name = attributeEng
        break;
        case 2:
            arr = vampHabEsp;
            name = vampHabEng;
        break;
        case 3:
            console.log("ola ke ase") //por modificar
        break;
    }
    for(let i=0; i<arr.length/3; i++){
        writer+='<div class=row justify-content-center align-items-center g-2`>'
        for(let j=0; j<3; j++){
            writer+=`<div class="col-4">${arr[count]} <div class="d-inline">(_____)</div>`;
            for(let k = 0;k<max;k++){
                writer+=`<input class="stat" type="checkbox" id="${name[count]}${k+1}" name="${name[count]}_dot" value="${k+1}" onclick="levelSelect('${name[count]}_dot',${k})"`
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

function vampGenCalculator(gen){
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
/**
 * 
 * @param {Recibe el input según el nombre de etiqueta, que es común en todos los puntos de cada estadística. Por Ej.: str_dot} name 
 * @param {Posición del número del checkbox seleccionado en su propia lista} pos 
 */
function levelSelect(name,pos){
    let elem = document.getElementsByName(name);
    let value;
    if(pos==0){
        value = firstPosition(name);
    }
    else{
        if(elem[pos].checked){
            for(let i=1; i<=pos; i++){
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

/**
 * Listener que escucha la primera posición de cada una de las estadísticas, si su posición siguiente se encuentra activa, vaciará todas las que sigan después de la inicial, si está solo, se desactivará y activará
 * @param {Nombre de etiquetas en común entre cada estadística} name
 * 
 */
function firstPosition(name){
    let elem = document.getElementsByName(name);
    if(elem[0].checked==false && elem[1].checked){
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





