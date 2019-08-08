var repeater;

function hello() {
    print("Hello");
}

function myMove() {  
        var elem = document.getElementById("myAnimation");   
        var pos = 0;
        var id = setInterval(frame, 10);
        function frame() {
          if (pos == 700) {
            clearInterval(id);
          } else {
            pos = pos + 10; 
            elem.style.top = pos + 'px'; 
            elem.style.left = pos + 'px'; 
          }
        }
}
  
  
  function show_image(src, width, height, alt) {
      var img = document.createElement("img");
      img.src = src;
      img.width = width;
      img.height = height;
      img.alt = alt;
  
      // This next line will just add it to the <body> tag
      document.body.appendChild(img);
  }
