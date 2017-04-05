 window.requestAnimFrame = (function(callback) {
           return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
           function(callback) {
             window.setTimeout(callback, 1000 / 60);
           };
         })();

           function changeSpeed(){
              dt = parseInt(document.getElementById('animation_speed').value);
         }


          function drawRectangle(my, context) {
         context.beginPath();
          context.arc(270, 271, 97 , 0, 2 * Math.PI, false);  //270 273
          context.fillStyle = 'Green';
          context.fill();
          context.strokeStyle = '#003300';
          context.stroke();
          var imageObj = new Image();


          context.beginPath();
          context.arc(my.sx, my.sy, my.radius, 0, 2 * Math.PI, false);
          context.fillStyle = 'Yellow';
          context.fill();
          context.lineWidth = my.borderWidth;
          context.strokeStyle = '#003300';
          context.stroke();
         }

         function animate(mCircle, startA, canvas, context) {
           // update
        if(startA.value){
          mCircle.sx = mCircle.sx + mCircle.vx * dt;
         mCircle.sy = mCircle.sy + mCircle.vy * dt;

         var r = Math.sqrt(mCircle.sx*mCircle.sx + mCircle.sy*mCircle.sy);

         mCircle.ax = -mCircle.Gm  * mCircle.Mm * mCircle.sx/ Math.pow(r,3);
         mCircle.ay = -mCircle.Gm  * mCircle.Mm * mCircle.sy/ Math.pow(r,3);

         mCircle.vx =  mCircle.vx + mCircle.ax * dt;
         mCircle.vy =  mCircle.vy + mCircle.ay * dt;

         var S1 = 500/ (5 * mCircle.Rm ) ;
         var my = {
         sx: S1*(mCircle.sx - (-mCircle.Rm) )+170,
         sy: S1*(mCircle.sy - (-mCircle.Rm) )+170,
         radius: 2,
         borderWidth: 1
         }

         if(Math.sqrt( Math.pow( my.sx - 270, 2) + Math.pow( my.sy - 271, 2) ) < 98){
             startA.value = false;
         }
         // clear
         context.clearRect(0, 0, canvas.width, canvas.height);
         drawRectangle(my, context);
         // request new frame
         requestAnimFrame( function() {animate(mCircle,startA, canvas, context);} );
         }
         }

         var canvas = document.getElementById('myCanvas');
         var context = canvas.getContext('2d');

         /** warunki poczatkowe */
         var  G = 6.67428 * Math.pow(10,-11);
         var  R = 6.4 * Math.pow(10,6);
         var M = 5.9742 * Math.pow(10,24);


         startA = {
           value: true
         };


        function test(){
          dt = parseInt(document.getElementById('animation_speed').value);
          var t = document.getElementById('pred');
         var x0,y0,vx0,vy0,ax0,ay0;
         x0 = R;
         y0 = 0;
         vx0 = 0;
         vy0 = parseInt(t.value);
         ax0 = -G * M * R/ Math.pow( R,3);
         ay0 =0;

         vx0 = vx0 + ax0*dt/2;

         x0 = x0+ vx0*dt;
         y0 = y0+ vy0*dt;
         var r = Math.sqrt(x0*x0 + y0*y0);

         ax0 = -G * M * x0/ Math.pow( r,3);
         ay0 = -G * M * y0/ Math.pow( r,3);

         vx0 = vx0 + ax0*dt;
         vy0 = vy0 + ay0*dt ;


        mCircle = {
           sx: x0,
           sy: y0,
           vx: vx0,
           vy: vy0 ,
           ax: ax0,
           ay: ay0  ,
           radius: 2, // orientacyjnie
           borderWidth: 1,
           Gm: G,
           Mm: M,
           Rm: R,
         };
           startA.value=true;

         drawRectangle(mCircle, context);
          document.getElementById("start_button").innerHTML = "Restart";


            if(startA.value){
             animate(mCircle, startA,canvas, context);
            }
            }




