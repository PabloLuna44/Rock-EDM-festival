document.addEventListener('DOMContentLoaded',function(){
     
    StartApp();
});

function StartApp(){
    
    fixedNavigation();
    CreateGalery();
    ScrollNav();
}

function fixedNavigation(){
    const barra=document.querySelector(".header");//Agarra la clase de la barra de navegacion o lo que esta en el header
    const aboutFestival= document.querySelector('.about-festival');// Agarra la calse about festival
    const body=document.querySelector('body');

    window.addEventListener('scroll', function(){ //vamoa a escuchar el scrool que se esta haciedno 
        
        if(aboutFestival.getBoundingClientRect().bottom<0){//Si el scroll qe se esta haciendo esta debajo de el top de about festival
          barra.classList.add('fijo');//Se va agregar la calse de la barra de navegacion
          body.classList.add('body-scroll');
        }
        else{
            barra.classList.remove('fijo');//Si no se remueve
            body.classList.remove('body-scroll');
        }
    });

}

function ScrollNav(){
    const links=document.querySelectorAll('.main-navigation a');

    links.forEach(link =>{
       link.addEventListener('click', function(e){
           e.preventDefault();

            const sectionScroll = e.target.attributes.href.value;
            const section=document.querySelector(sectionScroll);
            section.scrollIntoView({behavior: 'smooth'});
          
       });
    });
}

function CreateGalery(){
    const galery=document.querySelector('.galery-images');

    for(let i=1; i<=12; i++){
        const Images=document.createElement('picture');

        Images.innerHTML=`
            <source srcset="build/img/thumb/${i}.avif" type="image/avif">
            <source srcset="build/img/thumb/${i}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="imagen Galeria">
        
        `;
       
        Images.onclick=function(){
            DisplayImage(i);
        }


        galery.appendChild(Images);
    }
}


function DisplayImage(id){
    const Images=document.createElement('picture');

    Images.innerHTML=`
        <source srcset="build/img/grande/${id}.avif" type="image/avif">
        <source srcset="build/img/grande/${id}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/grandes/${id}.jpg" alt="imagen Galeria">
    
    `;
   

    //Crea el overlay o pantalla modal con la imagen
const overlay=document.createElement('div');
overlay.appendChild(Images);
overlay.classList.add('overlay');
overlay.onclick=function(){
    const body=document.querySelector('body');
    body.classList.remove('keep-body');
    overlay.remove();
}

//Boton para cerrar el Modal
const CloseModal=document.createElement('P');
CloseModal.textContent='X'
CloseModal.classList.add("btn-close");
CloseModal.onclick=function(){
    const body=document.querySelector('body');
    body.classList.remove('keep-body');
    overlay.remove();
    
}

overlay.appendChild(CloseModal);

//Añadirlo al HTML
const body=document.querySelector('body');
body.appendChild(overlay);
body.classList.add('keep-body');

}

