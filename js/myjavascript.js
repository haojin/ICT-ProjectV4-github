//***************************************************//
//Display and Modify function for each type of device//
//***************************************************//
  
 //////----------------------------------//////
//////--Display the relative component--//////
//////---------------------------------//////
function displayFunction(){//display each checked component inside the products class
  var monitorNum=0;
  var imgs="";
  var left=0;
  var top=0;
  var width=0;
  var height=0;
  _monitors = new Array;
  
  selected = 0;
  $(".products:checked").each(function(i){
    
    width=sizeSetting($(this).attr("name"))[0];
    height=sizeSetting($(this).attr("name"))[1];
    
    if(i!=0&&(i%2==0)){
      left=0;
      top+=height;
    }

    //--Setting a default attribute for each device--//
    if($(this).attr("name")=='monitor'){setter('monitor',$(this).val(),[214,151],[left,top],'2',0); selected+=1;}
    else if($(this).attr("name")=='case'){setter('case',$(this).val(),[134,195],[left,top],'2',0); selected+=1;}
    else if($(this).attr("name")=='keyboard'){setter('keyboard',$(this).val(),[218,54],[left,top],'2',0); selected+=1;}
    else if($(this).attr("name")=='mouse'){setter('mouse',$(this).val(),[50,35],[left,top],'2',0); selected+=1;}
    else if($(this).attr("name")=='speaker'){setter('speaker',$(this).val(),[147,110],[left,top],'2',0); selected+=1;}

	
    var src="img/products/"+$(this).attr("name")+"/"+$(this).val()+"/2.png";
    
    if($(this).attr("name")=="monitor"){var m = getMonitor();monitorNum+=1;_monitors.push(m);};
    
    var Idname = $(this).attr("name"); 
    imgs+="<img alt='"+$(this).val()+"' width="+width+" height="+height+" src='"+src+"'name='"+$(this).attr("name")+"' id='"+$(this).val()+"' style='left:"+left+"px; top:"+top+"px' rel='"+src+"'/>";
    left+=width;;
  });
  
  //---Monitor Radio Option Controll---//
  sumMonitor = monitorNum;
  var monitorRadio1 = document.getElementById('inlineRadio1');
  var monitorRadio2 = document.getElementById('inlineRadio2');
  var monitorRadio3 = document.getElementById('inlineRadio3');
  if((monitorNum)==2){monitorRadio1.disabled=false;monitorRadio2.disabled=false};
  if((monitorNum)==3){monitorRadio1.disabled=false;monitorRadio2.disabled=false;monitorRadio3.disabled=false};
  if((monitorNum)<3 && (monitorNum)==2){monitorRadio3.disabled=true;monitorRadio3.checked=false; };
  if((monitorNum)<2){monitorRadio1.disabled=true;monitorRadio1.checked=false; monitorRadio2.disabled=true;monitorRadio2.checked=false; monitorRadio3.disabled=true;monitorRadio3.checked=false; };
  
  //alert(imgs);
  //alert(sumMonitor);
  allocate(imgs);
}

function allocate(imgs){//allocate the images into the displaying windows
  if(imgs==''){
    alert("No product checked");
    $("#previewer").find("img").remove(); 
    return;
      }
  $("#previewer").html(imgs);
  //bind drag,zoom
  var box = $("#previewer");
  box.children().each(function(i){
    binddrag($(this));
  });
}

//////------------------------------------------//////
//////--change the position of each component--//////
//////----------------------------------------//////
var str ="";
function binddrag(img){
  var divheight=437,divwidth=505;
  var imgheight=img.height(),imgwidth = img.width();
  var log = $('#bg1');
  var name = img.attr("name");
  var id = img.attr("id");
  iDrag({
    target:img,
    id:name,
    min:{x:-0, y:-0},
    max:{x:divwidth-imgwidth,y:divheight-imgheight},
    end: function(pos){
    	//log.html( 'end(x:'+pos.x+', y:'+pos.y+')'+name);
    	//setter(name.split('id')[0],"id","size",[pos.x,pos.y],"direction");
    	if(name=='monitor'){
	    	if(id==_monitors[0].split('/')[1]){
		    	var t = _monitors[0].split('/');
				t[3]=[pos.x,pos.y];
				_monitors[0] =t.join('/');
		    	//alert('move m1');
	    	}
	    	else if(id==_monitors[1].split('/')[1]){
		    	var t = _monitors[1].split('/');
				t[3]=[pos.x,pos.y];
				_monitors[1] =t.join('/');
		    	//alert('move m2');
	    	}
	    	else if(id==_monitors[2].split('/')[1]){
		    	var t = _monitors[2].split('/');
				t[3]=[pos.x,pos.y];
				_monitors[2] =t.join('/');
		    	//alert('move m3');
	    	}
    	}
    	
		else if(name=='case'){_case[3] = [pos.x,pos.y];}
		else if(name=='keyboard'){_keyboard[3] = [pos.x,pos.y];}
		else if(name=='mouse'){_mouse[3] = [pos.x,pos.y];}
		else if(name=='speaker'){_speaker[3] = [pos.x,pos.y];}
  	}
  });
}

//////------------------------------------------//////
//////--Size Setting and Zoom In & Zoom Outut--//////
//////----------------------------------------//////
function sizeSetting(name){//Giving an appropriate size for each kind of component
  var size=[];
  if(name=='monitor'){size=[214,151];}
  else if(name=='case'){size=[134,195];}
  else if(name=='keyboard'){size=[218,54];}
  else if(name=='mouse'){size=[50,35];}
  else if(name=='speaker'){size=[147,110];}
  return size;
}

var zoomimg=false;
function zoom(type){
  var box = $("#previewer");
  box.children().unbind("click");
  if(zoomimg){
    box.children().css("cursor","move");
    zoomimg=false;
    return;
      }
  zoomimg=true;
  box.children().each(function(i){
    $(this).bind("click", function(){   
      var _w =$(this).width();
      var _h =$(this).height();
      var name = $(this).attr("name");
      var id = $(this).attr("id");
      if(type=='+'){
        _w*=1.09;
        _h*=1.09;
      }
      else if(type=='-'){
        _w*=0.9;
        _h*=0.9;
      }else{
        //_w=170;_h=140;
        $(this).unbind("click");
      }
      if(_w<25 || _w>470 || _h<17 || _h>430){
        $(this).unbind("click");}
      _w = parseFloat(Math.round(_w * 100) / 100).toFixed(3);
      _h = parseFloat(Math.round(_h * 100) / 100).toFixed(3);
      $(this).width(_w);
      $(this).height(_h);
      
      if(name=='monitor'){
	      if(id==_monitors[0].split('/')[1]){
		    	var t = _monitors[0].split('/');
				t[2]=[_w,_h];
				_monitors[0] =t.join('/');
		    	//alert('zoom m1');
	    	}
	    	else if(id==_monitors[1].split('/')[1]){
		    	var t = _monitors[1].split('/');
				t[2]=[_w,_h];
				_monitors[1] =t.join('/');
		    	//alert('zoom m2');
	    	}
	    	else if(id==_monitors[2].split('/')[1]){
		    	var t = _monitors[2].split('/');
				t[2]=[_w,_h];
				_monitors[2] =t.join('/');
		    	//alert('zoom m3');
	    	}
      }
	  else if(name=='case'){_case[2] = [_w,_h];}
	  else if(name=='keyboard'){_keyboard[2] = [_w,_h];}
	  else if(name=='mouse'){_mouse[2] = [_w,_h];}
	  else if(name=='speaker'){_speaker[2] = [_w,_h];}

      binddrag($(this));
    });
  }); 
}

//////----------------------------------------------//////
//////--change z order for the specific component--//////
//////--------------------------------------------//////
function zIndexSetting(zOrder,target){
  var z_value=0;
  var z_index = document.getElementById(zOrder);
  var category = target.split('id')[0];
  
  if(category=='monitor'){
	  z_value=parseInt(z_index.value);
	  var monitorRadio1 = document.getElementById('inlineRadio1');
	  var monitorRadio2 = document.getElementById('inlineRadio2');
	  var monitorRadio3 = document.getElementById('inlineRadio3');
	  if(monitorRadio1.checked){
		  document.getElementById(_monitors[0].split('/')[1]).style.zIndex=z_value;
		  var t = _monitors[0].split('/');
		  t[5]=z_value+";";
		  _monitors[0] =t.join('/');
	  }
	  else if(monitorRadio2.checked){
		  document.getElementById(_monitors[1].split('/')[1]).style.zIndex=z_value;
		  var t = _monitors[1].split('/');
		  t[5]=z_value+";";
		  _monitors[1] =t.join('/');
	  }
	  else if(monitorRadio3.checked){
		  document.getElementById(_monitors[2].split('/')[1]).style.zIndex=z_value;
		  var t = _monitors[2].split('/');
		  t[5]=z_value+";";
		  _monitors[2] =t.join('/');
	  }
	  else{
		  document.getElementById(_monitors[0].split('/')[1]).style.zIndex=z_value;
		  var t = _monitors[0].split('/');
		  t[5]=z_value+";";
		  _monitors[0] =t.join('/');
	  }
  }
  else if(category=='case'){z_value=parseInt(z_index.value); _case[5] = z_value;document.getElementById(_case[1]).style.zIndex=z_value;}
  else if(category=='keyboard'){z_value=parseInt(z_index.value); _keyboard[5] = z_value;document.getElementById( _keyboard[1]).style.zIndex=z_value;}
  else if(category=='mouse'){z_value=parseInt(z_index.value);_mouse[5] = z_value;document.getElementById(_mouse[1]).style.zIndex=z_value;}
  else if(category=='speaker'){z_value=parseInt(z_index.value);_speaker[5] = z_value;document.getElementById(_speaker[1]).style.zIndex=z_value;}
  
  //document.getElementById(target).style.zIndex=z_value;
  //alert("Z is: "+z.value+"The target is "+target);
}

//////------------------------------------------------//////
//////--change direction for the specific component--//////
//////----------------------------------------------//////
function changeDirection(direction,name){
  var monitorRadio1 = document.getElementById('inlineRadio1');
  var monitorRadio2 = document.getElementById('inlineRadio2');
  var monitorRadio3 = document.getElementById('inlineRadio3');
  if(name=='monitorid'){
	  var id ="";
	  if(monitorRadio1.checked){
		  id = _monitors[0].split('/')[1];
		  var t = _monitors[0].split('/');
		  t[4]=direction;
		  _monitors[0] =t.join('/');
		  //alert('m1 '+id);
	  }
	  else if(monitorRadio2.checked){
		  id = _monitors[1].split('/')[1];
		  var t = _monitors[1].split('/');
		  t[4]=direction;
		  _monitors[1] =t.join('/');
		  //alert('m2 '+id);
	  }
	  else if(monitorRadio3.checked){
		  id = _monitors[2].split('/')[1];
		  var t = _monitors[2].split('/');
		  t[4]=direction;
		  _monitors[2] =t.join('/');
		  //alert('m3 '+id);
		  
	  }
	  else{
		  id = _monitors[0].split('/')[1];
		  var t = _monitors[0].split('/');
		  t[4]=direction;
		  _monitors[0] =t.join('/');
		  //alert('m1 '+id);
	  }
	  var target = document.getElementById(id);
	  var str  = target.getAttribute('src');
	  var string = str.split("/");
	  var idx = string.length-1;
	  string[idx]=direction+".png";
	  var res = string.join("/");
	  target.src=res;
	  //alert(str);
	  
  }
  
  if(name=='caseid'){
	  var id = _case[1];
	  _case[4] = direction;
	  var target = document.getElementById(id);
	  var str  = target.getAttribute('src');
	  var string = str.split("/");
	  var idx = string.length-1;
	  string[idx]=direction+".png";
	  var res = string.join("/");
	  target.src=res;
	  //alert('id: '+id);
  }
  if(name=='keyboardid'){
	  var id = _keyboard[1];
	  _keyboard[4] = direction;
	  var target = document.getElementById(id);
	  var str  = target.getAttribute('src');
	  var string = str.split("/");
	  var idx = string.length-1;
	  string[idx]=direction+".png";
	  var res = string.join("/");
	  target.src=res;
	  //alert('id: '+id);
  }
  if(name=='mouseid'){
	  var id = _mouse[1];
	  _mouse[4] = direction;
	  var target = document.getElementById(id);
	  var str  = target.getAttribute('src');
	  var string = str.split("/");
	  var idx = string.length-1;
	  string[idx]=direction+".png";
	  var res = string.join("/");
	  target.src=res;
	  //alert('id: '+id);
  }
  if(name=='speakerid'){
	  var id = _speaker[1];
	  _speaker[4] = direction;
	  var target = document.getElementById(id);
	  var str  = target.getAttribute('src');
	  var string = str.split("/");
	  var idx = string.length-1;
	  string[idx]=direction+".png";
	  var res = string.join("/");
	  target.src=res;
	  //alert('id: '+id);
  }
  //alert("The value is "+res+";");//for testing
}

 //////-------------------//////
//////--Setter & Getter--//////
//////------------------//////
var selected = 0;
var sumMonitor=0;
var _monitors = new Array;
var _monitor = [];
var _case = [];
var _keyboard = [];
var _mouse = [];
var _speaker = [];

function setter(category,id,size,location,direction,zindex){
  if(category=='monitor'){
    _monitor[0] = category; _monitor[1] = id;  _monitor[2] = size;  _monitor[3] = location; _monitor[4] = direction; _monitor[5] = zindex;
    //var msg=category+"/"+id+"/"+size+"/"+location+"/"+direction+"/"+zindex+";";
    //_monitors.push(msg);
    //document.getElementById('demo').innerHTML= "Set Successfully";
  }
  
  else if(category=='case'){
    _case[0] = category;  _case[1] = id; _case[2] = size; _case[3] = location; _case[4] = direction;_case[5] = zindex;
    //document.getElementById('demo').innerHTML= "Set Successfully";
  }
  else if(category=='keyboard'){
    _keyboard[0] = category; _keyboard[1] = id; _keyboard[2] = size; _keyboard[3] = location; _keyboard[4] = direction;_keyboard[5] = zindex;
    //document.getElementById('demo').innerHTML= "Set Successfully";
  }
  else if(category=='mouse'){
    _mouse[0] = category; _mouse[1] = id; _mouse[2] = size; _mouse[3] = location; _mouse[4] = direction; _mouse[5] = zindex;
    //document.getElementById('demo').innerHTML= "Set Successfully";
  }
  else if(category=='speaker'){
    _speaker[0] = category; _speaker[1] = id; _speaker[2] = size; _speaker[3] = location;  _speaker[4] = direction; _speaker[5] = zindex;
    //document.getElementById('demo').innerHTML= "Set Successfully";
  }
}

function getMonitor(){
	var _m = {
    get values () {
      var str="";
      
      if (_monitor.length != 0) str+=_monitor[0]+"/"+_monitor[1]+"/"+_monitor[2]+"/"+_monitor[3]+"/"+_monitor[4]+"/"+_monitor[5]+";";
      return str;
    }
  }
  //document.getElementById('demo').innerHTML= "Get Successfully";
  return _m.values;
}

function getter(){
  //alert("get");
  var _data = {
    get values () {
      var msg="";
      
      if (_monitors.length != 0){
	      for(var i=0;i<_monitors.length;i++){
		      msg+=_monitors[i];
	      }
	       //msg+=_monitor[0]+"/"+_monitor[1]+"/"+_monitor[2]+"/"+_monitor[3]+"/"+_monitor[4]+"/"+_monitor[5]+";";   
	    }
      //if (_monitors.length != 0) {for(var i = 0;i<_monitors.length;i++)msg+=_monitors[i]+";"}
      if (_case.length != 0) msg+=_case[0]+"/"+_case[1]+"/"+_case[2]+"/"+_case[3]+"/"+_case[4]+"/"+_case[5]+";";
      if (_keyboard.length != 0) msg+=_keyboard[0]+"/"+_keyboard[1]+"/"+_keyboard[2]+"/"+_keyboard[3]+"/"+_keyboard[4]+"/"+_keyboard[5]+";";
      if (_mouse.length != 0) msg+=_mouse[0]+"/"+_mouse[1]+"/"+_mouse[2]+"/"+_mouse[3]+"/"+_mouse[4]+"/"+_mouse[5]+";";
      if (_speaker.length != 0) msg+=_speaker[0]+"/"+_speaker[1]+"/"+_speaker[2]+"/"+_speaker[3]+"/"+_speaker[4]+"/"+_speaker[5]+";";

      return msg;
    }
  }
  //document.getElementById('demo').innerHTML= "Get Successfully";
  return _data.values;
}

function showData(){
  var message = getter();
  var dataList = "";
  for(var i=0;i<selected-1;i++){
    dataList += message.split(';')[i]+"\n";
  }
  dataList += message.split(';')[selected-1];
  //document.getElementById('bg2').innerHTML= message.split(';')[0]+"<br >"+message.split(';')[1]+"<br >"+message.split(';')[2]+"<br >"+message.split(';')[3]+"<br >"+message.split(';')[4];
  document.getElementById('outputData').innerHTML= dataList;
}

function runInput(){
  var cmd = document.getElementById("inputData").value;
  var lines = cmd.split('\n');
  var ctch = "";

  var i;
  for (i = 0; i < lines.length; ++i) {
    var str = lines[i].split('/');
    
    var name = str[0];
    var id = str[1];
    var size = str[2].split(',');
    var location = str[3].split(',');
    var direction = str[4];
    var zindex = str[5];

    var src="img/products/"+name+"/"+id+"/"+direction+".png";
    var imgs = "<img alt='"+id+"' width="+size[0]+" height="+size[1]+" src='"+src+"' id='"+name+"id' style='left:"+location[0]+"px; top:"+location[1]+"px; z-index:"+zindex+ "' rel='"+src+"'/>";
    var string = "name: "+name+"<br/>id: "+id+"<br/>size: ["+size[0]+","+size[1]+"]<br/>location: ["+location[0]+","+location[1]+"]<br/>direction: "+direction+"<br/> src: "+src+"<br/> zIndex: "+zindex;
    //ctch += string+"<br/>";
    ctch+=imgs;
  }
  $("#previewer").html(ctch);
}

 //////----------------------------------//////
//////--Background Changing Functionsr--//////
//////---------------------------------//////

$(document).ready(function(){
	$selected = 0;
    $("#bg1").click(function(){
	    if($selected != 1){
        	$("#previewer").css("background-image","url(img/bg/bg1.jpg)");
			$selected = 1;
        }
        else{
        	$("#previewer").css("background-image","");
			$selected = 0;
        }
    });
    $("#bg2").click(function(){
	    if($selected != 2){
        	$("#previewer").css("background-image","url(img/bg/bg2.jpg)");
			$selected = 2;
        }
        else{
        	$("#previewer").css("background-image","");
			$selected = 0;
        }
    });
    $("#bg3").click(function(){
	    if($selected != 3){
        	$("#previewer").css("background-image","url(img/bg/bg3.jpg)");
			$selected = 3;
        }
        else{
        	$("#previewer").css("background-image","");
			$selected = 0;
        }
    });
});

//***************//
//Other Functions//
//***************//

//--Can select max three monitors--//
function CountClick(name){
  var Count = 0;
  var options = document.getElementsByName(name);
  if(name=="monitor"){
    var num = 0;
    for(var i=0;i<options.length;i++){
      if(options[i].checked){
        num = num + 1;
      }
      if(num==4){
        return false;
      }
    }
  }
  else
  {
    var num = 0;
    for(var i=0;i<options.length;i++){
      if(options[i].checked){
        num = num + 1;
      }
      if(num==2){
        return false;
      }
    }
  }
}

