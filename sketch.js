//Variaveis Bola
let xbola = 150;
let ybola = 100;
let diametro = 12;
let raio = diametro/2

//Variaveis Raquete
let xraquete = 7;
let yraquete = 75;

//Variaveis Ambas Raquetes
let comp_raquete = 5;
let alt_raquete = 50;

//Variaveis do oponente
let xraqueteop = 287;
let yraqueteop = 75;

//Adicionando chance de erro
let chanceDeErrar = 0;

let colidiu = false;

//Velocidade bola
let velxbola = 3;
let velybola = 3;

//Velocidade da raquete inimiho
let velyop;

//Placar jogo
let meuspontos = 0;
let pontosoponente = 0;

//Sons do jogo
let somraquete;
let somponto;
let somtrilha;

function preload(){
  somtrilha = loadSound("trilha.mp3");
  somponto = loadSound("ponto.mp3");
  somraquete = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(300, 200);
  somtrilha.loop();
}

function draw() {
  background(0);
  exibe_bola();
  movimento_bola();
  colisao_borda();
  exibe_raquete(xraquete, yraquete);
  exibe_raquete(xraqueteop, yraqueteop);
  exibe_raquete(xraqueteop, yraqueteop);
  movimento_raquete();
  movimento_raqueteop();
  //colisao_raquete();
  colisao_raquete_library(xraquete, yraquete);
  colisao_raquete_library(xraqueteop, yraqueteop)
  incluiplacar();
  marcaponto();
}

function exibe_bola(){
  circle(xbola, ybola, diametro);
}

function movimento_bola(){
  xbola += velxbola;
  ybola += velybola;
}

function colisao_borda(){
  if (xbola + raio > width || xbola - raio < 0){
  velxbola *= -1;
  }
if (ybola + raio >height || ybola - raio < 0){
  velybola *= -1;
  }
}

function exibe_raquete(x, y){
    rect(x, y, comp_raquete, alt_raquete);
}

function movimento_raquete(){
  if (keyIsDown(UP_ARROW)){
    yraquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yraquete += 10;
  }
}

function colisao_raquete(){
  if (xbola - raio < xraquete + comp_raquete && ybola - raio < yraquete + alt_raquete && ybola + raio > yraquete){
    velxbola *= -1;
  } 
}
 function colisao_raquete_library(x, y){
   colidiu = collideRectCircle(x, y, comp_raquete, alt_raquete, xbola, ybola, raio);
   if (colidiu){
     velxbola *= -1;
     somraquete.play();
   }
 }

function movimento_raqueteop(){
  velyop = ybola - yraqueteop - alt_raquete / 2 - 25;
  yraqueteop += velyop + chanceDeErrar;
  calculaChanceErrar();
}

function incluiplacar(){
  stroke(255); //Contorno
  textAlign(CENTER); //texto centro
  textSize(16); //tamanho texto
  fill(color(255, 140, 0)); //color pra usar RGB
  rect(65, 2.5, 20 ,17);
  fill(255);
  text(meuspontos, 75, 17);
  fill(color(255, 140, 0));
  rect(215, 2.5, 20 ,17);
  fill(255); //255 cor branca
  text(pontosoponente, 225, 17);
 
}

function marcaponto(){
  if(xbola > 295){
    meuspontos += 1;
    somponto.play();
  }
  if(xbola < 5){
    pontosoponente += 1;
    somponto.play();
  }
}

function calculaChanceErrar(){
  if(pontosoponente >= meuspontos){
    chanceDeErrar += 0.25;
    if(chanceDeErrar >= 39){
      chancedeErrar = 10;
      }
    }else {
      chanceDeErrar -= 0.25
      if(chanceDeErrar <= 35){
        chanceDeErrar = 8.75
      }
    }
}