
function fade_logos(class_name){
    let logos = document.getElementsByClassName(class_name)

    function fade_out(){ 
        for (let logo of logos){
            logo.style.opacity = "0";
        }
        setTimeout(fade_in, 16500);
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
setTimeout(() => { fade_logos('team-logos2'); }, 4500);
setTimeout(() => { fade_logos('team-logos3'); }, 9000);
setTimeout(() => { fade_logos('team-logos4'); }, 13500);

