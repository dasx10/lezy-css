(()=>{
    
    let set=(f,m)=>{
        let link = document.createElement('link');
        link.rel="stylesheet";
        link.href=f+'.css';
        link.media=m;
        document.head.append(link);
    }
    let from=[640,960];
    let to=[640];
    let fromTo=[[640,960],[960,1280]];
    let get=()=>{
        // console.log(1);
        let tl=to.length;
        for(let i=0;i<tl;i++)
            if(innerWidth<to[i]){
                set(`-${to[i]}`,`(max-width:${to[i]}px)`);
                to.splice(i,1);
                i--;
            };
        let fl=from.length;
        for(let i=0;i<fl;i++)
            if(innerWidth>=from[i]){
                set(from[i],`(min-width:${from[i]}px)`);
                from.splice(i,1);
                i--;
            };
        
        for(let i=0;i<fromTo.length;i++){
            if(innerWidth>=fromTo[i][0]&&innerWidth<fromTo[i][1]){
                set(`${fromTo[i][0]}-${fromTo[i][1]}`,`(min-width:${fromTo[i][0]}px) and (max-width:${fromTo[i][1]}px)`);
                fromTo.splice(i,1);
                i--;
            }
        }
            
        if(fl===0&&fromTo.length===0&&tl===0){
            window.removeEventListener('resize',get);
            get=null;
        }
    }
    get();
    window.addEventListener('resize',get);
})();