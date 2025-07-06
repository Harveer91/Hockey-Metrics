
function fade_logos(class_name){
    let logos = document.getElementsByClassName(class_name)

    function fade_out(){ 
        for (let logo of logos){
            logo.style.opacity = "0";
        }
        setTimeout(fade_in, 12000);
    }
    function fade_in(){ 
        for (let logo of logos){
            logo.style.opacity = "1";
        }
        setTimeout(fade_out, 3000);
    }
    //code to start intial cycle
    fade_in();
}
fade_logos('team-logos1')
setTimeout(() => { fade_logos('team-logos2'); }, 3000);
setTimeout(() => { fade_logos('team-logos3'); }, 6000);
