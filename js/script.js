const mainIdentity = document.querySelector("#mainIdentity"); //constructor HTML de la sección: Identidad
const mainAttr = document.querySelector("#mainAttr"); //Constructor HTML de la sección: Atributos
const mainHabs = document.querySelector("#mainHabs"); //Constructor HTML de la sección: Habilidades
const mainGen = document.querySelector("#gen");

//Inicializador de la lista de clanes
var clanList = [];

//Campos de identidad en español
const vampIdentityEsp = [
  "Nombre",
  "Naturaleza",
  "Clan",
  "Jugador",
  "Conducta",
  "Generación",
  "Crónica",
  "Concepto",
  "Sire",
];

//Campos de Identidad en inglés
const vampIdentityEng = [
  "name",
  "nat",
  "clan",
  "play",
  "dem",
  "gen",
  "chr",
  "con",
  "sire",
];

//Atributos de vampiro en español
const attributeEsp = [
  "Fuerza",
  "Carisma",
  "Percepción",
  "Destreza",
  "Manipulación",
  "Inteligencia",
  "Resistencia",
  "Apariencia",
  "Astucia",
];

// Habilidades de vampiro en español
const vampHabEsp = [
  "Alerta",
  "Armas C.C.",
  "Academicismo",
  "Atletismo",
  "Armas de Fuego",
  "Ciencia",
  "Callejeo",
  "Conducir",
  "Finanzas",
  "Consciencia",
  "Etiqueta",
  "Informática",
  "Empatía",
  "Latrocinio",
  "Investigación",
  "Expresión",
  "Interpretación",
  "Leyes",
  "Intimidación",
  "Pericias",
  "Medicina",
  "Liderazgo",
  "Sigilo",
  "Ocultismo",
  "Pelea",
  "Supervivencia",
  "Política",
  "Subterfugio",
  "Trato con Animales",
  "Tecnología",
];


//Atributos de vampiro en inglés
const attributeEng = [
  "str",
  "cha",
  "per",
  "dex",
  "man",
  "int",
  "sta",
  "app",
  "wit",
];

// Habilidades de vampiro en inglés
const vampHabEng = [
  "alertness",
  "melee",
  "academics",
  "atletism",
  "firearms",
  "science",
  "streetwise",
  "drive",
  "finance",
  "awareness",
  "etiquette",
  "computer",
  "empathy",
  "larceny",
  "investigation",
  "expression",
  "performance",
  "law",
  "intimidation",
  "crafts",
  "medicine",
  "leadership",
  "stealth",
  "occult",
  "brawl",
  "survive",
  "politics",
  "subterfuge",
  "animalKen",
  "technology",
];

class Clan {
  constructor(nameClan, desc, weak, primal_disc) {
    this.nameClan = nameClan;
    this.desc = desc;
    this.weak = weak;
    this.primal_disc = primal_disc;
  }
}

var vamp1;
/**
 * Estadísticas globales para todos los personajes
 */
class Character {
  constructor() {
    this.identity = {
      //empty until PC is created
      name: "",
      play: "",
    };
    this.attributes = {
      // strength, charisma, perception
      str: { id: 0, num: 1, spec: false },
      cha: { id: 1, num: 1, spec: false },
      per: { id: 2, num: 1, spec: false },
      // dexterity, manipulate, intelligence
      dex: { id: 3, num: 1, spec: false },
      man: { id: 4, num: 1, spec: false },
      int: { id: 5, num: 1, spec: false },
      // stamina, appearence, witness
      sta: { id: 6, num: 1, spec: false },
      app: { id: 7, num: 1, spec: false },
      wit: { id: 8, num: 1, spec: false },
    };
    this.habilities = {
      //empty until PC is created
      tal: {},
      tech: {},
      know: {},
    };
    this.backgrounds = {
      //empty until PC is created
    };

    this.willpower = {
      perm: 0,
      temp: 0,
    };
    this.health = [];
  }
  getAttrByID = (id) => {
    let attr = Object.getOwnPropertyNames(this.attributes); // crea un array con el nombre de todas las propiedades
    for (let i = 0; i < attr.length; i++) {
      let elem = Object.getOwnPropertyDescriptor(
        this.attributes,
        attr[i]
      ).value; //extrae los valores de cada propiedad para sacar sus correspondientes componentes
      if (elem.id == id) {
        return [attr[i], elem];
      }
    }
  };
  getHabByID = (id) => {
    let hab = Object.getOwnPropertyNames(this.habilities); // crea un array con el nombre de todas las propiedades
    for (let i = 0; i < attr.length; i++) {
      let elem = Object.getOwnPropertyDescriptor(this.habilities, hab[i]).value; //extrae los valores de cada propiedad para sacar sus correspondientes componentes
      if (elem.id == id) {
        return [hab[i], elem];
      }
    }
  };
}

/**
 * Estadísticas de un Vampiro, hereda de Character
 */
class Vampire extends Character {
  constructor() {
    super();
    this.identity.nat = "";
    this.identity.dem = "";
    this.identity.con = "";
    this.identity.clan = {};
    this.identity.gen = 13;
    this.identity.sire = "";
    this.virtues = {
      vir_1: {
        type: "",
        num: 0,
      },
      vir_2: {
        type: "",
        num: 0,
      },
      vir_3: {
        type: "",
        num: 0,
      },
    };
    this.path = {
      type: "",
      num: 0,
    };
    this.merits = [];
    this.flaws = [];
    this.blood = [];
    this.health = {
      lethal: 7,
      aggravated: 7,
    };
  }
}

//Lista de clanes según el libro, el constructor rellena la lista @clanList[]
function clansBuilder() {
  let assamita = new Clan("Assamita", "", "No puede cometer diablerie", "");
  let brujah = new Clan("Brujah", "", "Propensión al Frenesí", "");
  let gangrel = new Clan(
    "Gangrel",
    "",
    "Ganan partes Animales al perder el control",
    ""
  );
  let lasombra = new Clan("Lasombra", "", "Recibe más daño del fuego", "");
  let malkavian = new Clan("Malkavian", "", "Locos al ser abrazados", "");
  let nosferatu = new Clan("Nosferatu", "", "Deformes al ser abrazados", "");
  let ravnos = new Clan("Ravnos", "", "Tienen un vicio incontrolable", "");
  let seguidor_de_Set = new Clan(
    "Seguidores de Set",
    "",
    "Recibe más daño del sol",
    ""
  );
  let toreador = new Clan(
    "Toreador",
    "",
    "Facilidad para quedar embelesados",
    ""
  );
  let tremere = new Clan(
    "Tremere",
    "",
    "Despreciados, Vínculo Nv.1 a un antiguo",
    ""
  );
  let tzimice = new Clan(
    "Tzimice",
    "",
    "Se debilitan si se alejan de tierra de algún lugar especial para ellos",
    ""
  );
  let ventrue = new Clan("Ventrue", "", "Presa selectiva", "");

  clanList = [
    assamita,
    brujah,
    gangrel,
    lasombra,
    malkavian,
    nosferatu,
    ravnos,
    seguidor_de_Set,
    toreador,
    tremere,
    tzimice,
    ventrue,
  ];
}

/**
 * Constructor principal de la hoja de personaje en HTML
 */
function initializeSheet() {
  vamp1 = new Vampire();
  let writer = createIdentity();
  mainIdentity.innerHTML = writer;
  writer = createStats(vamp1, 1);
  mainAttr.innerHTML = writer;
  writer = createStats(vamp1, 2);
  mainHabs.innerHTML = writer;
}

/**
 * Función constructora de la sección: Identidad
 * @returns Sección ya construida
 */
function createIdentity() {
  clansBuilder();
  let writer = "";
  count = 0;
  for (let i = 0; i < 3; i++) {
    writer += `<div class="row justify-content-center align-items-center g-2">`;
    for (let j = 0; j < 3; j++) {
      writer += `<div class="col">
                <label for="${vampIdentityEng[count]}" class="form-label">${vampIdentityEsp[count]}</label>`;
      switch (count) {
        case 2:
          writer += `<select class="form-control" id="mainClan"><option value="0">Seleccione...</option>`;
          for (let k = 0; k < clanList.length; k++) {
            writer += `<option value="${k + 1}">${
              clanList[k].nameClan
            }</option>`;
          }
          writer += `</select>`;
          break;
        case 5:
          writer += `<input type="number" class="form-control" name="${vampIdentityEng[count]}" id="${vampIdentityEng[count]}" aria-describedby="helpId" onclick="updateGen()" value="13">
                    </div>`;
          break;
        default:
          writer += `<input type="text" class="form-control" name="${vampIdentityEng[count]}" id="${vampIdentityEng[count]}" aria-describedby="helpId">`;
          break;
      }
      writer += `</div>`;
      count++;
    }
    writer += `</div>`;
  }
  return writer;
}

/**
 * Actualiza la generación a medida se va cambiando el número que aparece en el clan, en caso de ser inválido, reinicia el contador a "13"
 */
function updateGen(){
    let generation = gen.value;
    if(generation>0){
        vamp1.identity.gen = generation;
        writer = createStats(vamp1, 1);
        mainAttr.innerHTML = writer;
        writer = createStats(vamp1, 2);
        mainHabs.innerHTML = writer;
    }
    else{
        alert("Número de generación no válido")
        gen.value = 13;
        updateGen();
    }

}

/**
 * Constructor HTML para realizar la construcción de la lista que permite visualizar cada sección
 * @param {Recibe el objeto Character que en este caso sería el personaje del usuario (con estadísticas incluidas)} char
 * @returns entrega el texto ya construido
 */
function createStats(char, section) {
  let writer = "";
  let max = vampGenCalculator(char.identity.gen);
  //Extrae la generación del vampiro, entre más baja mayor sus capacidades y puede albergar estadísticas más altas
  writer += listStats(max, section);
  return writer;
}

/**
 * Función constructora de las secciones Atributos y Habilidades
 * @param {el máximo que la generacion permite, definido por Vampire.identity.gen} max 
 * @param {Sección a construir, un número que puede ser 1 o 2} section 
 * @returns 
 */
function listStats(max, section) {
  let writer = "";
  let count = 0;
  let arr;
  let name;
  switch (section) {
    case 1:
      arr = attributeEsp;
      name = attributeEng;
      break;
    case 2:
      arr = vampHabEsp;
      name = vampHabEng;
      break;
  }
  for (let i = 0; i < arr.length / 3; i++) {
    writer += "<div class=row justify-content-center align-items-center g-2`>";
    for (let j = 0; j < 3; j++) {
      writer += `<div class="col-4">${arr[count]}<div class="d-inline">(_____)</div>`;
      for (let k = 0; k < max; k++) {
        writer += `<input class="stat d-inline" type="checkbox" id="${name[count]}${
          k + 1
        }" name="${name[count]}_dot" value="${k + 1}" onclick="levelSelect('${
          name[count]
        }_dot',${k})"`;
        if (k == 0 && section == 1) {
          writer += `checked>`;
        } else {
          writer += `>`;
        }
      }
      writer += `</div>`;
      count++;
    }
    writer += `</div>`;
  }
  return writer;
}



/**
 * Función que se encarga de definir el máximo que permite la generación del vampiro para tener en estadísticas, siguiendo la siguiente tabla
 * Generacion:
 * 0 = humano // no tiene
 * 1 - 3 = caín y antediluvianos, stats ilimitados
 * 4 - 7 = disminuyen en 1 mientras aumenta la generacion
 * 8 o + = 5
 * @param {valor de la generación, viene de @Vampire.identity.gen} gen 
 * @returns el valor máximo de estadística que puede llevar el personaje
 */
function vampGenCalculator(gen) {
  if (gen < 4) {
    return 10;
  } else if (gen < 8) {
    let max = 13 - gen;
    return max;
  } else{
    return 5;
  }
}

/**
 *
 * @param {Recibe el input según el nombre de etiqueta, que es común en todos los puntos de cada estadística. Por Ej.: str_dot} name
 * @param {Posición del número del checkbox seleccionado en su propia lista} pos
 */
function levelSelect(name, pos) {
  let elem = document.getElementsByName(name);
  let value;
  if (pos == 0) {
    value = firstPosition(name);
  } else {
    if (elem[pos].checked) {
      for (let i = 1; i <= pos; i++) {
        elem[i].checked = true;
      }
      if (pos < elem.length - 1) {
        for (let i = pos + 1; i < elem.length; i++) {
          elem[i].checked = false;
        }
      }
    } else {
      elem[pos].checked = true;
      levelSelect(name, pos);
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
function firstPosition(name) {
  let elem = document.getElementsByName(name);
  if (elem[0].checked == false && elem[1].checked) {
    elem[0].checked = true;
    for (let i = 1; i < elem.length; i++) {
      elem[i].checked = false;
    }
  } else if (elem[0].checked == false) {
    return 0;
  }
  return 1;
}
