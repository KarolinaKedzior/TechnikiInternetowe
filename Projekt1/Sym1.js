    window.requestAnimFrame = (function(callback) {
           return window.requestAnimationFrame || window.webkitRequestAnimationFrame
           || window.mozRequestAnimationFrame || window.oRequestAnimationFrame
           || window.msRequestAnimationFrame ||  function(callback) {
             window.setTimeout(callback, 1000 / 60);
           };
         })();

          /** zmiana predkosci animacji */
         function changeSpeed(){
              dt = parseInt(document.getElementById('animation_speed').value);
         }

        /** rysowanie obiektu w pkt (x_in,y_in)*/
         function drawObject(x_in, y_in, context) {
              context.beginPath();
              var S1 = 700/ (8* AU ) ; // 4R w jedna i druga strone
              var x = parseInt(S1*(x_in - (-4*AU) ) );
              var y = parseInt(S1*(y_in - (-4*AU) )  ) ;
              context.arc(x+100, 500 - y + 170, 4, 0, 2 * Math.PI, false);
              context.fillStyle = 'Red';
              context.fill();
              context.lineWidth = 1;
              context.strokeStyle = '#003300';
              context.stroke();
         }

        /** obliczanie nowych parametrow obiektow dla nowej ramki */
       function animate(pl, startA, canvas, context) {
        if(startA.value){
            context.clearRect(0, 0, canvas.width, canvas.height);
             /** dla kazdego z n obiektow obliczamy nowe parametry*/
            for(var i =0; i < n; i++){
                 pl[i].x = pl[i].x + pl[i].vx * dt;
                 pl[i].y = pl[i].y + pl[i].vy * dt;
                 var ax =0;
                 var ay = 0;
                 for( var j =0 ; j < n; j++){
                     if( i!= j){
                         var r = Math.sqrt( Math.pow(pl[i].x-pl[j].x,2) + Math.pow(pl[i].y-pl[j].y,2));
                         ax += -G  * pl[j].mass * (pl[i].x-pl[j].x)/ Math.pow(r,3);  // sumujemy przyspieszenia z roznych obiektow
                         ay += -G  * pl[j].mass * (pl[i].y-pl[j].y)/ Math.pow(r,3);
                      }
                 }
                 pl[i].ax = ax;
                 pl[i].ay = ay;
                 pl[i].vx =  pl[i].vx + pl[i].ax * dt;
                 pl[i].vy =  pl[i].vy + pl[i].ay * dt;

                 drawObject( pl[i].x, pl[i].y, context);
            }
            /** warunek zderzenia dwoch obiektow*/
         /*if(Math.sqrt( Math.pow( my.x - 270, 2) + Math.pow( my.y - 271, 2) ) < 98){
             startA.value = false;
         } */
         requestAnimFrame( function() {animate(pl, startA, canvas, context);} );
         }
         }

          /**rysowanie n obiektow*/
           function draw(){
            startA.value = false;
            document.getElementById("pause_button").style.display = "none";
            context.clearRect(0, 0, canvas.width, canvas.height);
            for(var i =1; i <= n ; i++){
                var x0 = AU*parseFloat(document.getElementById( "x" + i).value);     // slonce
                var y0 = AU*parseFloat(document.getElementById( "y" + i).value);
                drawObject(x0,y0,context);

            }

         }
         /**zmienne globalne */
         var canvas = document.getElementById('myCanvas');
        canvas.width  = document.getElementById("page").clientWidth-30;
        canvas.height = 600;
         var canvas = document.getElementById('myCanvas');
         var context = canvas.getContext('2d');

         G = 6.67428 * Math.pow(10,-11) ;// stala grawitacyjna
         AU = 149600000000;  //   odleglosc ziemi od slonca
         M  = 5.9742 * Math.pow(10,24);      // masa ziemi
         n =  parseInt(document.getElementById('n').value );// ilosc obiektow
         planets_list = [];  // lista przetrzymujaca obiekty
         startA = {
           value: false  // bool wstrzymujacy animacje
         };
         draw();

           /** zmiana ilosci obiektow na ekranie oraz dodanie */
           document.getElementById('n') .addEventListener("input", function(){
           n = parseInt(document.getElementById('n').value);
           draw();
           if(n>2){
              document.getElementById('obj3').style.display = "table-row";
           }else{
               document.getElementById('obj3').style.display = "none";
           }

           if(n>3){
             document.getElementById('obj4').style.display = "table-row";
             }else{
               document.getElementById('obj4').style.display = "none";
           }
           }) ;


           /**pause animation */
         document.getElementById('pause_button').addEventListener("click", function(){
            if( document.getElementById('pause_button').innerHTML == "Zatrzymaj"){
               document.getElementById('pause_button').innerHTML = "Wznow";
            }else{
              document.getElementById('pause_button').innerHTML = "Zatrzymaj";
            }

            startA.value = !startA.value;
             if(startA.value){
             animate(planets_list, startA,canvas, context);
            }
             });


            /*rozpoczecie animacji*/
        function test(){
          startA.value= true;

          dt = parseInt(document.getElementById('animation_speed').value);
          planets_list.lenght = 0;
          planets_list = [];

          for(var i=1; i <= n; i++){
            var x0 = AU*parseFloat(document.getElementById( "x" + i).value) ;
            var y0 = AU*parseFloat(document.getElementById( "y" + i).value) ;
            var vx0 = 1000*parseFloat(document.getElementById( "predx" + i).value);;
            var vy0 = 1000*parseFloat(document.getElementById( "predy" + i).value);
            var ax0 = 0;
            var ay0 = 0;

           for( var j = 1; j <= n ; j++){
                if(i !=j){
                var x2 = AU*parseFloat( document.getElementById( "x" + j).value ) ;
                var y2 = AU*parseFloat( document.getElementById( "y" + j).value ) ;
                var Mass  = M*parseFloat( document.getElementById( "masa" + j).value );
                var r = Math.sqrt( Math.pow(x0-x2,2) + Math.pow(y0-y2,2) );
                 ax0 += -G * Mass * (x0-x2)/ Math.pow( r,3);
                 ay0 += -G * Mass * (y0-y2)/ Math.pow( r,3);
                }
             }
            vx0 = vx0 + ax0*dt/2;
            vy0 = vy0 + ay0*dt/2;
            var m = parseFloat(document.getElementById("masa" + i).value );
            planets_list.push( createObject(x0, y0 , vx0, vy0, M*m ) );
          }

         document.getElementById("start_button").innerHTML = "Restart";
          document.getElementById('pause_button').innerHTML = "Zatrzymaj";
         document.getElementById("pause_button").style.display = "inline";
         animate(planets_list, startA,canvas, context);

        }



        function createObject(x_in,y_in,vx_in, vy_in, m){
         var new_planet = {
           x: x_in,
           y: y_in,
           vx: vx_in,
           vy: vy_in ,
           ax: 0,
           ay: 0,
           mass: m,
        };

        return new_planet;
        }


