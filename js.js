        const READY_STATE_UNINITIALIZED = 0;
		const READY_STATE_LOADING = 1;
		const READY_STATE_LOADED = 2;
		const READY_STATE_INTERACTIVE = 3;
		const READY_STATE_COMPLETE = 4;
		var oPeticionHTTP;
        var objParse;


        
        
        var oAjax = {
            
            inicializa_xhr : function(){
                if(window.XMLHttpRequest) {
                    return new XMLHttpRequest();
                }
                else if(window.ActiveXObject) {
                    return new ActiveXObject("Microsoft.XMLHTTP");
                }
            },

            cargaContenido : function(metodo,url,funcion){
                oPeticionHTTP = this.inicializa_xhr();	

                if (oPeticionHTTP){
                    // Preparar la funcion de respuesta
                    oPeticionHTTP.onreadystatechange = funcion;
                    // Realizar peticion HTTP
                    oPeticionHTTP.open(metodo, url, true);
                    oPeticionHTTP.send(null);				
                }	
            },

        
        }//fin objeto oAjax
        
        
        
        var controlador = {
                        
            
            muestraContenido : function(){
                if(oPeticionHTTP.readyState == READY_STATE_COMPLETE){
                    if(oPeticionHTTP.status == 200){ 
                        
                        objParse = JSON.parse(oPeticionHTTP.responseText);
                        var content = document.getElementById('content');
                         
                        for(var i in objParse){
                            content.innerHTML = '<h1>' + i + '</h1>';
                            for(var j in objParse[i]){
                                                           
                                if(j == "img"){    
                                    var imgG = document.getElementById('img_g');
                                    imgG.setAttribute('src','proyecto/'+objParse[i][j]);
                                    return;
                                   
                                }
                                content.innerHTML += '<h2>' + j + ':   ' + '<span id="textos">' + objParse[i][j] + '</span>' + '</h2>'; 
                               
                            }
                        }
                        
                    }
                    else{
                        return 'Error: ' + oPeticionHTTP.status;
                    }
                }
            },
            
            descargaArchivo : function(fichero){
                this.relacionObjetoAjax = Object.create(oAjax);
                this.relacionObjetoAjax.cargaContenido('GET', 'json/' + fichero + '.json', this.muestraContenido.bind(this));
                
                
            },
            
            evento : function(e){  
              this.descargaArchivo(e.target.id);
            }
            
        } //fin objeto controlador





window.onload = main;

function main(){
    
    var content = document.getElementById('content');
    
    oAjax.cargaContenido('GET', 'json/elCasoSlevin.json', controlador.muestraContenido.bind(controlador));
    
    var lis_img = document.querySelectorAll('li img');
    
    for(var i=0;i<lis_img.length;i++){
         lis_img[i].onclick = controlador.evento.bind(controlador);
    }
    
   
    
    
}

