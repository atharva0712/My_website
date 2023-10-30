const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

var xscale = 1;
var yscale = 1;
function firstPageAnim(){
    var tl = gsap.timeline();
    tl.from("#nav", {
        y: '-10',
        opacity: 0,
        ease: Expo.easeInOut,
        duration: 1.5,
    })
        .from(".boundingelem", {
            y: "150",
            ease: Expo.easeInOut,
            duration: 1.8,
            delay: -1,
        })

        .from("#homefooter", {
            startAt: { y: "10"},
            y: "0",
            opacity: 0,
            duration: 1.5,
            delay: -1,
            ease: Expo.easeInOut,
        })
}
function mouseAndCircleDistort() {
    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove", function(dets) {

        xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
        yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);

        document.querySelector('#minicircle').style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;

        xprev = dets.clientX;
        yprev = dets.clientY;
    });
}

mouseAndCircleDistort();
firstPageAnim();

document.querySelectorAll(".elem")
.forEach(function(elem){
    var prevX = null;


    elem.addEventListener("mouseleave", function(dets){
        var img = elem.querySelector("img");
        gsap.to(img, {
            opacity: 0,
            ease: Power3,
            duration: 0.5,
        });
    });

    elem.addEventListener("mousemove", function(dets){
        var img = elem.querySelector("img");
        
        var offsetX = img.offsetWidth / 2;
        var offsetY = img.offsetHeight / 2;

        var diffY = dets.clientY - elem.getBoundingClientRect().top - offsetY;
        
        var rotation = 0;
        if(prevX !== null) {
            const diffX = dets.clientX - prevX;
            rotation = gsap.utils.clamp(-20, 20, diffX);
        }

        prevX = dets.clientX;

        gsap.to(img, {
            opacity: 1,
            ease: Power3,
            top: diffY,
            left: dets.clientX - offsetX,
            rotation: rotation
        });
    });
});



