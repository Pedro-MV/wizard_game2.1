var personagem, personagemImg, morteImg
var fantasma, fantasmaImg
var chaoImg
var proj, projImg, projs
var fantasmas=[]
var paredeE, paredeD, paredeC, paredeB, paredes
var vidas, zc, uc, dc, tc
var cd=1
var onda1 = 1
var onda2 = 0
var countdown=5


var vida=3
var esq=false
var dir=false
var cim=false
var bai=false
var pos = [
    {x:420,y:300},
    {x:780,y:300},
    {x:420,y:1050},
    {x:780,y:1050},
    {x:150,y:600},
    {x:150,y:840},
    {x:1050,y:600},
    {x:1050,y:840},
]

console.log(vida)

function preload(){
    personagemImg=loadAnimation("wizard1.png","wizard2.png")
    morteImg=loadAnimation("deadwizard.png")
    fantasmaImg=loadAnimation("ghost1.png","ghost2.png")
    chaoImg=loadImage("floor.png")
    projImg=loadImage("proj.png")
    zc=loadImage("0c.png")
    uc=loadImage("1c.png")
    dc=loadImage("2c.png")
    tc=loadImage("3c.png")
}
function setup() {
    createCanvas(1200,1200);
    personagem = createSprite(600,700)
    personagem.addAnimation("correndo",personagemImg)
    personagem.addAnimation("morte",morteImg)
    paredeC = createSprite(600,220,1200,140)
    paredeB = createSprite(600,1150,1200,140)
    paredeE = createSprite(60,600,120,1200)
    paredeD = createSprite(1140,600,120,1200)
    paredeC.visible=false
    paredeB.visible=false
    paredeE.visible=false
    paredeD.visible=false

    projs=new Group ()

}

function draw() {
    background(chaoImg);
    //códigos que serão executados ao longo de todo o jogo
    controlar()

    if (vida>0){
        mostrarCooldown()
        atirar()
        spawnFantasma()
        moverFantasma()
        endWave1()
    }

    if(cd>1){
        cd--
    }

    personagem.overlap(fantasmas,(p,ghost)=>{
        if (vida>0){
            ghost.remove()
            vida--

        }

    }  
    )

    drawSprites();

    personagem.collide(paredeC)
    personagem.collide(paredeB)
    personagem.collide(paredeE)
    personagem.collide(paredeD)



    textAlign("center")
    stroke("black")
    strokeWeight(5)
    fill ("white")
    textSize(30)
    text ("setas para se mover, Espaço para atirar",600,50)
    textSize(20)
    text (onda2+" x: "+mouseX + " y: "+mouseY, mouseX, mouseY-30)
    if(vida==3){
        vidas=image(tc,50,-90,300,300)
    }
    if(vida==2){
        vidas=image(dc,50,-90,300,300)
    }
    if(vida==1){
        vidas=image(uc,50,-90,300,300)
    }
    if(vida==0){
        vidas=image(zc,50,-90,300,300)
        personagem.changeAnimation("morte")
    }

    if(onda1==0&&countdown>0&&frameCount%50==0){
        countdown--
    }
}

function controlar(){
    if(vida>0){
        if(keyDown(UP_ARROW)){
            personagem.y-=10
            cim=true
            bai=false
            esq=false
            dir=false
        }
        if(keyDown(DOWN_ARROW)){
            personagem.y+=10 
            cim=false
            bai=true
            esq=false
            dir=false
        }
        if(keyDown(LEFT_ARROW)){
            personagem.x-=10 
            cim=false
            bai=false
            esq=true
            dir=false
        }
        if(keyDown(RIGHT_ARROW)){
            personagem.x+=10
            cim=false
            bai=false
            esq=false
            dir=true
        }
    }

}

function spawnFantasma(){
    var i = Math.round(random(0,7))
    var x = pos[i].x
    var y = pos[i].y
    if(onda1>0&&frameCount%100==0){
            fantasma=createSprite(x,y)
            fantasma.addAnimation("correndo",fantasmaImg)
            fantasmas.push(fantasma)
            onda1--
    }
    if(onda2>0&&frameCount%75==0){
            fantasma=createSprite(x,y)
            fantasma.addAnimation("correndo",fantasmaImg)
            fantasmas.push(fantasma)
            onda2--
            console.log(onda2)
    }

}

function moverFantasma(){

 if(frameCount%5){
     for(var i = 0; i<fantasmas.length; i++){
            if(personagem.x > fantasmas[i].x){
                fantasmas[i].velocityX = 3
            }else{
                fantasmas[i].velocityX=-3
            }
            if(personagem.y>fantasmas[i].y){
                fantasmas[i].velocityY=3
            }else{
                fantasmas[i].velocityY=-3
             }
        }
    }

}

function atirar(){
    if(keyDown("space")&&cd==1){
        cd=100
        proj=createSprite(personagem.x,personagem.y)
        proj.addImage(projImg)
        if(dir){
            proj.velocityX=15
        }
        if(esq){
            proj.velocityX=-15
        }
        if(bai){
            proj.velocityY=15
        }
        if(cim){
            proj.velocityY=-15
        }
        if(!cim && !bai && !dir && !esq){
            proj.velocityX=15
        }
        projs.add(proj)
        projs.setLifetimeEach(100)
        
    }

        projs.overlap(fantasmas,(proj,ghost)=>{
            proj.remove()
            ghost.remove()
        })
}

function mostrarCooldown(){
    fill("cyan")
    rect(personagem.x-50,personagem.y-80,cd,10)
}

function endWave1(){
    if (onda1==0&&countdown>0){
        fill("red")
        textSize(50)
        strokeWeight(5)
        text("Onda 2 em: "+countdown,600,100)
    }
    if (countdown==0){
        onda2=2
    }
}
