function countSeceonds (howMany) {
    for (var i=1 ; i<= howMany ; i++) {
        (function(ii){
            setTimeout(function(){
                console.log(ii);
            }, ii*1000);
        })(i)
    }
}

countSeceonds(3);
