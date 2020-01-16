let countDown;
let timerD=document.querySelector('.display__time-left')
let endtime=document.querySelector('.display__end-time')
let botones=document.querySelectorAll('[data-time]')
function timer(seconds){
    clearInterval(countDown);
   const now= Date.now();
   
   const then=now+seconds*1000;
   display(seconds)
   endTime(then)
   
   countDown=setInterval(() => {
       const secondsLeft=Math.round(then-Date.now())/1000;//restamos el tiempo para obtener los segundo q q faltan se divide para 1000 por time now devuleve en milisegundos
       if(secondsLeft<0){
           clearInterval(countDown); //cuendo los segundos sean cero deten el intervalo
           return
       }
       display(secondsLeft)//sino muestraslos en pantalla
   },1000);

}
function display(seconds){
   
    const minutes=Math.floor(seconds/60);
    const minutesR=minutes%60;//el signo%60 es muy importante hace q los minutos dividan en horas con un intervalo de 0 a 60
    
    const horas=Math.floor(minutes/60)
    const horasr=horas%24//hace q las horas se dividan en dias
    const remainderS=Math.floor(seconds%60);//el signo%60 es muy importante hace q los segundos sean un intervalo de 0 a 60
    const count=`${horas}:${minutesR < 10 ? '0':''}${minutesR} : ${remainderS < 10 ? '0':''}${remainderS}`
    
    timerD.textContent=count;

    
    


}

function endTime(timestamp){
    const end=new Date(timestamp);
    const hour=end.getHours();
    const minut=end.getMinutes();
    endtime.textContent=`Be Back at ${hour}:${minut < 10 ? '0':''}${minut}`
}
botones.forEach(function(boton){
    boton.addEventListener('click',startTimer)
})
document.customForm.addEventListener('submit',function(e){
    e.preventDefault();
    const hor=this.minutes.value;
    const mins=hor*60;    
    localStorage.setItem('mins','')//re iniciamos el valor de minutos cuen ingresamos un nuevo valor al formulario
    localStorage.setItem("mins", mins);//guardamos el valor de minutos q escribimos
    const ahora=Math.round((Date.now()/1000)/60);
    localStorage.setItem('ahora',ahora);//guardamos el tiempo justo despues de haber ingresado el input de minutos
    timer((hor*60)*60);
    this.reset()

})

function startTimer(){
    const segundos=parseInt(this.dataset.time);
    timer(segundos)
}

function settime(){
    let m=localStorage.getItem('mins');//llamamos al los valores guardados
    m=parseInt(m);
    let h=localStorage.getItem('ahora');
    h=parseInt(h);
    let t=h+m//tiempo cuendo el intervalo finalizara
    let th=Math.round((Date.now()/1000)/60);//el tiempo justo ahora
    let tt=t-th;
    if(tt>0){//se ejecuta solo si el tiempo del intervalo no a finalizado
        timer(tt*60)

    }else{
        clearInterval(countDown)
    }
}
settime()