const findSec = (index) =>{
    switch(index){
        case 0 : return(".sec1");break;
        case 1 : return(".sec2");break;
        case 2 : return(".sec3");break;
        case 3 : return(".sec4");break;
        case 4 : return(".sec5");break;
    }
}
    new fullpage('#fullpage',{
        css3:true,
        anchors:['homepage','whatistechex','uiwithfigma','pygame','signup'],
        scrollOverflow: true,
        scrollingSpeed:1000,
        menu: '#menu',
        autoScrolling:true,
        scrollHorizontally: true,
        paddingTop:'30px',
        parallaxOptions: {type: 'reveal', percentage: 62, property: 'translate'},
        onLeave: (origin,destination,direction)=>{
            let sec = findSec(destination.index);
            let secPrev = findSec(origin.index);
            const back = gsap.timeline({defaults:{ease:"power1.out"}});
            if(destination.isFirst){
                back.pause()
            }else if(direction==="down"){
                if(!(destination.isLast)){
                    back.fromTo(sec,{rotation: -5},{rotation: 3,duration: 1.2,delay: 0.7});
                }
            }
            else if(direction==="up"){
                if(!(destination.isFirst))  
                    back.fromTo(sec,{rotation: 1},{rotation: -3,duration: 1.2,delay: 1});
            }
                
        }  
    });
const timeline = gsap.timeline({defaults:{ease:"power1.out"}});
timeline.to("#scroll",{opacity:1, duration: 1,delay:.3})
    .fromTo("#logo",{opacity:0 ,y:"+3%"},{opacity:1,y:"0%",duration: 0.4},"-=1");

// Code for the slideshow
var slideIndex = 1;
showSlides(slideIndex);
// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" activated", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}