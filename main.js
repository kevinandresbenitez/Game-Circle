/*Block class */
class Block{

    constructor(ejeX,ejeY){
        this.bottomLeft= [ejeX,ejeY];
        this.bottomRight=[ejeX + anchoBloque,ejeY];

        this.topLeft=[ejeX,ejeY + altoBloque];
        this.topRight=[ejeX+ anchoBloque,ejeY + altoBloque];
    }

}

const container = document.querySelector('.container-game');

/*Define params*/
const altoTablero =400;
const anchoTablero =570;

const altoBloque= 20;
const anchoBloque=100;

/*Define user positions and widths */
const userWidth =120;
const userHeight =20;
const userPositionDefault = [230,10];
let userPositionActualy=[230,10];


/*Circle */
const circleWidth =20;
const circleHeight =20;
const circlePositionDefault = [270,40];
let circlePositionActualy=[270,40];
let diametro = 20;
let circleSpeed = 8;
let xDirectioncircle =2;
let yDirectioncircle =2;


/*Add params to te container-game */
container.style.width= anchoTablero+'px';
container.style.height= altoTablero+'px';


/*Definir los bloques */
const Blocks=[

    new Block(10,350),
    new Block(120,350),
    new Block(230,350),            
    new Block(340,350),
    new Block(450,350),

    new Block(10,300),
    new Block(120,300),    
    new Block(230,300),
    new Block(340,300),        
    new Block(450,300),
   
    
    new Block(10,250),    
    new Block(120,250),    
    new Block(230,250),
    new Block(340,250),
    new Block(450,250),
    
   
]

/*add blocks in the  Dom*/
function addBlocks(blockArray){

    blockArray.forEach((block)=>{
        let newBlock = document.createElement('div');
            /*Add property */
        newBlock.style.width=anchoBloque+'px';
        newBlock.style.height=altoBloque+'px';
        newBlock.style.left= block.bottomLeft[0]+'px';
        newBlock.style.bottom= block.bottomLeft[1]+'px';        
        newBlock.classList.add('block');
    
            /*Add in the Dom */
        container.appendChild(newBlock);
    })

}
function drawNewBlocks(){
    let blocks = document.querySelectorAll('.block');    
    blocks.forEach((obj,key)=>{
        container.removeChild(obj);
    })
    addBlocks(Blocks);
}

/*Add user dom*/
function addUser(){
    let user = document.createElement('div');
    user.id  = 'user';
    user.style.left=userPositionDefault[0] + 'px';
    user.style.bottom=userPositionDefault[1] + 'px';
    user.style.width = userWidth + 'px';
    user.style.height = userHeight +'px';
    container.appendChild(user);
}
function drawMoveUser(){
    let user = document.getElementById('user');
    user.style.left=userPositionActualy[0] + 'px';
}
function moveUser(e){
    
    switch(e.key){
        case 'ArrowLeft':
            if(userPositionActualy[0] == 0){
                break
            }

            userPositionActualy[0] -= 10 ;
            break
        case 'ArrowRight':            
            if((userPositionActualy[0]+userWidth) >= anchoTablero){
                break
            }
            
            userPositionActualy[0] += 10 ;
            break
    }
    drawMoveUser()
   
}

/*add circle dom*/
function addCircle(){
    let circle = document.createElement('div');
    circle.style.left=circlePositionDefault[0] + 'px';
    circle.style.bottom=circlePositionDefault[1] + 'px';
    circle.style.width = circleWidth + 'px';
    circle.style.height = circleHeight +'px';
    circle.classList.add('circle');
    container.appendChild(circle);
}
function drawMoveCircle(){
    let circle= document.querySelectorAll('.circle')[0];
    circle.style.left = circlePositionActualy[0] + 'px';
    circle.style.bottom = circlePositionActualy[1] + 'px';    

}
function moveCircle(){        

        /*Colicion con el usuario*/
    if(circlePositionActualy[1] == userPositionActualy[1] + diametro){                
        if((circlePositionActualy[0] + diametro >= userPositionActualy[0]) && (circlePositionActualy[0] <= userPositionActualy[0] + userWidth ) ){            
            yDirectioncircle = 2 ;
        }        
    }

        /*Colicion con bloques */
    Blocks.forEach((block,key)=>{

        let deleteBlock =false;

        /*Condiciones*/

        const abajo= (circlePositionActualy[0] + diametro >= block.bottomLeft[0] && circlePositionActualy[0] <= block.bottomRight[0] ) && (block.bottomLeft[1] - diametro == circlePositionActualy[1]);
        const arriba =(circlePositionActualy[0] + diametro >= block.topLeft[0] && circlePositionActualy[0]  <= block.topRight[0]) && (block.topLeft[1]== circlePositionActualy[1]);
        const derecha =(block.bottomRight[1] - diametro <= circlePositionActualy[1] && block.topRight[1] >= circlePositionActualy[1]) && (block.bottomRight[0] == circlePositionActualy[0]);
        const izquierda =((block.bottomLeft[1] - diametro <= circlePositionActualy[1] && block.topLeft[1] >=  circlePositionActualy[1]) && ( block.bottomLeft[0] == circlePositionActualy[0] + diametro ));

        const esquinaAbajoDerecha =(derecha && abajo);
        const esquinaArribaDerecha=(derecha && arriba);
        const esquinaAbajoIzquierda =(izquierda && abajo);
        const esquinaArribaIzquierda=(izquierda && arriba);

        const esquinasAbajo =(esquinaAbajoIzquierda || esquinaAbajoDerecha);
        const esquinasArriba =(esquinaArribaIzquierda || esquinaArribaDerecha);
        const esquinasDerecha=(esquinaArribaDerecha|| esquinaAbajoDerecha);
        const esquinasIzquieda=(esquinaAbajoIzquierda|| esquinaArribaIzquierda);

            /*Superficies de una sola cara */
        /*abajo */
        if(abajo && !esquinasAbajo){
            yDirectioncircle *=-1;
            deleteBlock =true;
        }                
        /*arriba */        
        if(arriba && !esquinasArriba){
            yDirectioncircle *= -1 ;                
            deleteBlock =true;
        }
        /*Derecha */
        if(derecha && !esquinasDerecha){
            xDirectioncircle *= -1 ;            
            deleteBlock =true;
        }
        /*Izquierda */
        if(izquierda && !esquinasIzquieda){
            xDirectioncircle *= -1 ;   
            deleteBlock =true;
        }

            /*Esquinas */
        if(esquinaAbajoDerecha){
            if(xDirectioncircle > 0 && yDirectioncircle >0){
                yDirectioncircle =-2;
            }else{
                xDirectioncircle =2;
            }
            deleteBlock =true;       
        }
        if(esquinaAbajoIzquierda){
            if(xDirectioncircle < 0 && yDirectioncircle > 0){
                yDirectioncircle =-2;
            }else{
                xDirectioncircle =-2;
            }
            deleteBlock =true;
        }
        
        if(esquinaArribaDerecha){
            if(xDirectioncircle > 0 && yDirectioncircle < 0){
                yDirectioncircle =2;
            }else{
                xDirectioncircle =2;
            }
            deleteBlock =true;
        }
        if(esquinaArribaIzquierda){
            if(xDirectioncircle < 0 && yDirectioncircle < 0){
                yDirectioncircle =2;
            }else{
                xDirectioncircle =-2;
            }
            deleteBlock =true;
        }


        /*Eliminar Bloquee */
        if(deleteBlock){            
            Blocks.splice(key,1);
            drawNewBlocks();
        }

    })

    if(Blocks.length == 0){
        endGame(true);
    }

        /*Colicion con las paredes*/
    /*Arriba del tablero */
    if((circlePositionActualy[1] + diametro) == altoTablero){        
        yDirectioncircle = -2 ;
    }
    /*Derecha del tablero */
    if((circlePositionActualy[0] + diametro) == anchoTablero){        
        xDirectioncircle = -2 ;
    }
    /*izquierda del tablero */
    if(circlePositionActualy[0] == 0){        
        xDirectioncircle = 2 ;
    }
    /*Abajo del tablero */
    if(circlePositionActualy[1] == 0){       
        endGame(false);       
    }


 circlePositionActualy[0] += xDirectioncircle;
 circlePositionActualy[1] += yDirectioncircle;
 drawMoveCircle();  
}


/*Stop cricle and send menseje */
function endGame(status){
    let text= document.getElementById('menseje');
    if(status){
        text.style.color ='gren';
        text.innerText='¡ Ganaste !';
        xDirectioncircle=0;
        yDirectioncircle=0;   
    }
    else{
        text.style.color ='red';
        text.innerText='Perdiste';
        xDirectioncircle=0;
        yDirectioncircle=0;        
    }
};

/*Hotkeys user */
document.addEventListener('keydown',moveUser)

/*Add all elements */
addBlocks(Blocks);
addUser();
addCircle();

/*Timer */
let timerID = setInterval(moveCircle,circleSpeed);