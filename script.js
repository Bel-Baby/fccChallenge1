let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
//let inventory = [`stick`,`dagger`,`sword`];
let inventory = [`stick`];
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
    {
        name: "stick",
        power: 5,
    },
    {
        name: "dagger",
        power: 30,
    },
    {
        name: "claw hammer",
        power: 50,
    },
    {
        name: "sword",
        power: 100,
    }
];

const monsters = [
    { name: "slime", level: 2, health: 15, }, { name: "fanged beast", level: 8, health: 60, }, { name: "dragon", level: 20, health: 300, }
]

const locations = [
    {
        name: "town square",
        "button text": ["Go to store", "Go to cave", "Fight dragon"], //if property name has more than one word, you'll need to surround it in quotes.
        "button functions": [goStore, goCave, fightDragon],
        text: "You are in the town square. You see a sign that says \"Store\"."
    },
    {
        name: "store",
        "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "You enter the store."
    },
    {
        name: "cave",
        "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
        "button functions": [fightSlime, fightBeast, goTown],
        text: "You enter the cave. You see some monsters.",
    },
    {
        name: "fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goTown],
        text: "You are fighting a monster."
    },
    {
        name: "kill monster",
        "button text": ["Go to town square", "Go to town square", "Go to town square"],
        "button functions": [goTown, goTown, easterEgg],
        text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
        //escaping quotes.
        //text: "The monster screams \"Arg!\" as it dies. You gain experience points and find gold."
    },
    {
        name:"lose"
        ,"button text":["REPLAY?","REPLAY?","REPLAY?"],
        "button functions":[restart,restart,restart],
        text:"You die. &#x2620;"
    },
    {
        name: "win",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;"
    },
    {name:"easter egg",
    "button text":["2","8","Go to town square?"],
    "button functions":[pickTwo,pickEight,goTown],
    text:"You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"}
];

//initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function goTown() {
    /*button1.innerText = "Go to store";
    button2.innerText = "Go to cave";
    button3.innerText = "Fight dragon";
    button1.onclick = goStore;
    button2.onclick = goCave;
    button3.onclick = fightDragon;
    text.innerText = "You are in the town square. You see a sign that says \"Store\".";*/
    update(locations[0]);
}

function goStore() {
    /*button1.innerText="Buy 10 health (10 gold)";
    button2.innerText = "Buy weapon (30 gold)";
    button3.innerText = "Go to town square";
    button1.onclick = buyHealth;
    button2.onclick = buyWeapon;
    button3.onclick = goTown;
    text.innerText = "You enter the store.";*/
    update(locations[1]);
}

function goCave() {
    update(locations[2]);
}

function buyHealth() {
    if (gold >= 10) {
        gold -= 10;
        health += 10;
        goldText.innerText = gold;
        healthText.innerText = health;
    } else {
        text.innerText = "You do not have enough gold to buy health.";
    }
}

function buyWeapon() {
    //The currentWeapon variable is the index of the weapons array, but array indexing starts at zero. The index of the last element in an array is one less than the length of the array.Change the if condition to check weapons.length - 1, instead of weapons.length.
    if (currentWeapon < weapons.length - 1) {
        if (gold >= 30) {
            gold -= 30;
            currentWeapon++;
            goldText.innerText = gold;
            let newWeapon = weapons[currentWeapon].name;
            text.innerText = "You now have a " + newWeapon + ".";
            inventory.push(newWeapon);
            text.innerText += " In your inventory you have: " + inventory;
        } else {
            text.innerText = "You do not have enough gold to buy a weapon.";
        }
    } else {
        text.innerText = "You already have the most powerful weapon!";
        button2.innerText = "Sell weapon for 15 gold";
        button2.onclick = sellWeapon;
    }
}

function sellWeapon() {
    if (inventory.length > 1) {
        gold += 15;
        goldText.innerText = gold;
        let currentWeapon;
        currentWeapon = inventory.shift();
        text.innerText = "You sold a " + currentWeapon + ".";
        text.innerText += " In your inventory you have: " + inventory;
    } else {
        text.innerText = "Don't sell your only weapon!";
    }
}

function update(location) {
    monsterStats.style.display="none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerHTML = location.text;
}

function goFight() {
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterName.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
}

function fightSlime() {
    fighting = 0;
    goFight();
}

function fightBeast() {
    fighting = 1;
    goFight();
}

function fightDragon() {
    fighting = 2;
    goFight();
}

function attack() {
    text.innerText = "The " + monsters[fighting].name + " attacks.";
    text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
    health -= getMonsterAttackValue(monsters[fighting].level);
    if (isMonsterHit()) {
        monsterHealth -= weapons[currentWeapon].power /*use the addition operator(+) to add a random number between 1 and the value of xp to your monsterHealth -= weapons[currentWeapon].power*/+ Math.floor(Math.random()*xp)+1;
    }else{
        text.innerText+=" You miss.";
    }
    healthText.innerText=health;
    monsterHealthText.innerText=monsterHealth;
    if(health<=0){
        lose();
    }else if(monsterHealth<=0){
        defeatMonster();
        if(fighting===2){
            winGame();
        }else{
            defeatMonster();
        }
    }
    //On every attack, there should be a chance that the player's weapon breaks.
    if (Math.random() <= .1 && inventory.length !== 1){
        text.innerText += " Your "+inventory.pop()+" breaks.";
        //Decrement the value of currentWeapon.
        currentWeapon--;
    }
};

function getMonsterAttackValue(level) {
    const hit=(level*5)-(Math.floor(Math.random()*xp));//This will set the monster's attack to five times their level minus a random number between 0 and the player's xp.
    console.log(hit);
    return hit > 0 ? hit : 0;
}

function isMonsterHit(){
    return Math.random() > .2 || health < 20;
}

function dodge() {
    text.innerText="You dodge the attack from the "+monsters[fighting].name;
};

function defeatMonster(){
    gold+=Math.floor(monsters[fighting].level*6.7);// set gold equal to gold plus the monster's level times 6.7.Use Math.floor() to round the result down.
    xp+=monsters[fighting].level;
    goldText.innerText=gold;
    xpText.innerText=xp;
    update(locations[4]);//Finish the defeatMonster function by calling the update function with locations[4] as the argument.
}

function lose(){
    update(locations[5]);
}

function winGame(){
    update(locations[6]);
}

function restart(){
    xp=0;
    health=100;
    gold=50;
    currentWeapon=0;
    inventory=["stick"];
    goldText.innerText=gold;
    healthText.innerText=health;
    xpText.innerText=xp;
    goTown();
}

function easterEgg(){
    update(locations[7]);
}

function pickTwo(){
    pick(2);
}
  
function pickEight(){
    pick(8);
}

function pick(guess){
    const numbers=[];
    while(numbers.length<10){
        // push a random number between 0 and 10 to the end of the numbers array.
        numbers.push(Math.floor(Math.random()*11));
    }
    //At the end of the string, before the final quote, insert the new line escape character \n. This will cause the next part you add to text.innerText to appear on a new line.
    text.innerText="You picked "+guess+". Here are the random numbers:\n";

    for (let i = 0; i < 10; i++) {
        //Inside your for loop, use the += operator to add to the end of text.innerText. Add the number at index i of the numbers array, using numbers[i]. Then add a new line, using the escape sequence you used earlier.
        text.innerText+=numbers[i]+"\n";
    }
//After your for loop, add an if statement to check if the guess is in the numbers array.
    if (numbers.includes(guess)) {
        text.innerText+="Right! You win 20 gold!";
        gold+=20;
        goldText.innerText=gold;
    }else{
        text.innerText+="Wrong! You lose 10 health!";
        health-=10;
        healthText.innerText=health;
        if(health<=0){
            lose();
        }
    }
}