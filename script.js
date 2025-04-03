function isMobileDevice() {
    return (window.innerWidth <= 768 || 
            navigator.maxTouchPoints > 0 || 
            navigator.msMaxTouchPoints > 0 ||
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
}

function handleMobileRedirect() {
    if (isMobileDevice()) {
        document.getElementById('mobile-message').style.display = 'flex';
        document.getElementById('main').style.display = 'none';
    } else {
        document.getElementById('mobile-message').style.display = 'none';
        document.getElementById('main').style.display = 'block';
    }
}

window.addEventListener('load', handleMobileRedirect);
window.addEventListener('resize', handleMobileRedirect);

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
        duration: 0.5,
    })
    .from(".boundingelem", {
        y: "100%",
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
    });
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
// Function to update India time
function updateIndiaTime() {
    const options = {
        timeZone: 'Asia/Kolkata',
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };
    
    const indianTime = new Date().toLocaleTimeString('en-US', options);
    document.getElementById('india-time').textContent = indianTime + ' IST';
}

updateIndiaTime();
setInterval(updateIndiaTime, 1000);

mouseAndCircleDistort();
firstPageAnim();

document.querySelectorAll(".elem")
.forEach(function(elem){
    var prevX = null;

    const boundWidth = 200;  // Set the fixed width of movement
    const boundHeight = 5; // Set the fixed height of movement

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
        var offsetY = img.offsetHeight / 3;

        var diffY = dets.clientY - elem.getBoundingClientRect().top - offsetY;
        
        // Clamp the diffY within the height boundaries
        diffY = gsap.utils.clamp(-boundHeight / 2, boundHeight / 2, diffY);
        
        var rotation = 0;
        if (prevX !== null) {
            const diffX = dets.clientX - prevX;
            rotation = gsap.utils.clamp(-20, 20, diffX);
        }

        prevX = dets.clientX;

        // Calculate the new left position, clamping within the width boundaries
        var newLeft = gsap.utils.clamp(
            dets.clientX - offsetX - boundWidth / 2,
            dets.clientX - offsetX + boundWidth / 2,
            dets.clientX - offsetX
        );

        gsap.to(img, {
            opacity: 1,
            ease: Power3,
            top: diffY,
            left: newLeft,
            rotation: rotation
        });
    });
});
