YUI.add("graphics-canvas",function(c){var q="canvasShape",e=c.config.doc,s=c.Lang,k=c.AttributeLite,l,n,t,o,i,f,h=c.Color,p=parseInt,g=parseFloat,m=s.isNumber,j=RegExp,r=h.toRGB,a=h.toHex;function b(){}b.prototype={_toRGBA:function(v,u){u=(u!==undefined)?u:1;if(!h.re_RGB.test(v)){v=a(v);}if(h.re_hex.exec(v)){v="rgba("+[p(j.$1,16),p(j.$2,16),p(j.$3,16)].join(",")+","+u+")";}return v;},_toRGB:function(u){return r(u);},setSize:function(u,v){if(this.get("autoSize")){if(u>this.node.getAttribute("width")){this.node.style.width=u+"px";this.node.setAttribute("width",u);}if(v>this.node.getAttribute("height")){this.node.style.height=v+"px";this.node.setAttribute("height",v);}}},_updateCoords:function(u,v){this._xcoords.push(u);this._ycoords.push(v);},_clearAndUpdateCoords:function(){var u=this._xcoords.pop()||0,v=this._ycoords.pop()||0;this._updateCoords(u,v);},_updateNodePosition:function(){var v=this.get("node"),u=this.get("x"),w=this.get("y");v.style.position="absolute";v.style.left=(u+this._left)+"px";v.style.top=(w+this._top)+"px";},_updateDrawingQueue:function(u){this._methods.push(u);},lineTo:function(D,B,u){var A=arguments,v=0,z,E,C,w=this._stroke&&this._strokeWeight?this._strokeWeight:0;if(!this._lineToMethods){this._lineToMethods=[];}if(typeof D==="string"||typeof D==="number"){A=[[D,B]];}z=A.length;for(;v<z;++v){if(A[v]){E=A[v][0];C=A[v][1];this._updateDrawingQueue(["lineTo",E,C]);this._lineToMethods[this._lineToMethods.length]=this._methods[this._methods.length-1];this._trackSize(E-w,C-w);this._trackSize(E+w,C+w);this._updateCoords(E,C);}}this._drawingComplete=false;return this;},moveTo:function(v,w){var u=this._stroke&&this._strokeWeight?this._strokeWeight:0;this._updateDrawingQueue(["moveTo",v,w]);this._trackSize(v-u,w-u);this._trackSize(v+u,w+u);this._updateCoords(v,w);this._drawingComplete=false;return this;},curveTo:function(z,v,E,D,C,B){var A,w,u,F;this._updateDrawingQueue(["bezierCurveTo",z,v,E,D,C,B]);this._drawingComplete=false;A=Math.max(C,Math.max(z,E));w=Math.max(B,Math.max(v,D));u=Math.min(C,Math.min(z,E));F=Math.min(B,Math.min(v,D));this._trackSize(A,w);this._trackSize(u,F);this._updateCoords(A,w);return this;},quadraticCurveTo:function(A,z,D,C){var w,v,u,E,B=this._stroke&&this._strokeWeight?this._strokeWeight:0;this._updateDrawingQueue(["quadraticCurveTo",A,z,D,C]);this._drawingComplete=false;w=Math.max(D,A);v=Math.max(C,z);u=Math.min(D,A);E=Math.min(C,z);this._trackSize(w+B,v+B);this._trackSize(u-B,E-B);this._updateCoords(w,v);return this;},drawCircle:function(w,C,v){var A=0,z=2*Math.PI,u=this._stroke&&this._strokeWeight?this._strokeWeight:0,B=v*2;B+=u;this._drawingComplete=false;this._trackSize(w+B,C+B);this._trackSize(w-u,C-u);this._updateCoords(w,C);this._updateDrawingQueue(["arc",w+v,C+v,v,A,z,false]);return this;},drawDiamond:function(v,B,A,u){var z=A*0.5,w=u*0.5;this.moveTo(v+z,B);this.lineTo(v+A,B+w);this.lineTo(v+z,B+u);this.lineTo(v,B+w);this.lineTo(v+z,B);return this;},drawEllipse:function(I,G,J,O){var L=8,D=-(45/180)*Math.PI,Q=0,C,A=J/2,B=O/2,M=0,F=I+A,E=G+B,K,H,P,N,z,v,u=this._stroke&&this._strokeWeight?this._strokeWeight:0;K=F+Math.cos(0)*A;H=E+Math.sin(0)*B;this.moveTo(K,H);for(;M<L;M++){Q+=D;C=Q-(D/2);P=F+Math.cos(Q)*A;N=E+Math.sin(Q)*B;z=F+Math.cos(C)*(A/Math.cos(D/2));v=E+Math.sin(C)*(B/Math.cos(D/2));this._updateDrawingQueue(["quadraticCurveTo",z,v,P,N]);}this._trackSize(I+J+u,G+O+u);this._trackSize(I-u,G-u);this._updateCoords(I,G);return this;},drawRect:function(v,B,z,A){var u=this._stroke&&this._strokeWeight?this._strokeWeight:0;this._drawingComplete=false;this._updateDrawingQueue(["moveTo",v,B]);this._updateDrawingQueue(["lineTo",v+z,B]);this._updateDrawingQueue(["lineTo",v+z,B+A]);this._updateDrawingQueue(["lineTo",v,B+A]);this._updateDrawingQueue(["lineTo",v,B]);this._trackSize(v-u,B-u);this._trackSize(v+z+u,B+A+u);return this;},drawRoundRect:function(v,D,z,B,A,C){var u=this._stroke&&this._strokeWeight?this._strokeWeight:0;this._drawingComplete=false;this._updateDrawingQueue(["moveTo",v,D+C]);this._updateDrawingQueue(["lineTo",v,D+B-C]);this._updateDrawingQueue(["quadraticCurveTo",v,D+B,v+A,D+B]);this._updateDrawingQueue(["lineTo",v+z-A,D+B]);this._updateDrawingQueue(["quadraticCurveTo",v+z,D+B,v+z,D+B-C]);this._updateDrawingQueue(["lineTo",v+z,D+C]);this._updateDrawingQueue(["quadraticCurveTo",v+z,D,v+z-A,D]);this._updateDrawingQueue(["lineTo",v+A,D]);this._updateDrawingQueue(["quadraticCurveTo",v,D,v,D+C]);this._trackSize(v-u,D-u);this._trackSize(v+z+u,D+B+u);this._updateCoords(z,B);return this;},drawWedge:function(F,D,J,C,w,z){var I,H,B,N,A,G,E,M,L,v,u,K=0;z=z||w;this._drawingComplete=false;this._updateDrawingQueue(["moveTo",F,D]);z=z||w;if(Math.abs(C)>360){C=360;}I=Math.ceil(Math.abs(C)/45);H=C/I;B=-(H/180)*Math.PI;N=(J/180)*Math.PI;if(I>0){G=F+Math.cos(J/180*Math.PI)*w;E=D+Math.sin(J/180*Math.PI)*z;this.lineTo(G,E);for(;K<I;++K){N+=B;A=N-(B/2);M=F+Math.cos(N)*w;L=D+Math.sin(N)*z;v=F+Math.cos(A)*(w/Math.cos(B/2));u=D+Math.sin(A)*(z/Math.cos(B/2));this._updateDrawingQueue(["quadraticCurveTo",v,u,M,L]);}this._updateDrawingQueue(["lineTo",F,D]);}this._trackSize(0,0);this._trackSize(w*2,w*2);return this;},end:function(){this._closePath();return this;},closePath:function(){this._updateDrawingQueue(["closePath"]);this._updateDrawingQueue(["beginPath"]);},_getLinearGradient:function(){var J=c.Lang.isNumber,O=this.get("fill"),F=O.stops,C,N,M,P=0,Q=F.length,u,H=0,G=0,I=this.get("width"),R=this.get("height"),L=O.rotation||0,T,S,B,z,A=H+I/2,v=G+R/2,E,D=Math.PI/180,K=parseFloat(parseFloat(Math.tan(L*D)).toFixed(8));if(Math.abs(K)*I/2>=R/2){if(L<180){B=G;z=G+R;}else{B=G+R;z=G;}T=A-((v-B)/K);S=A-((v-z)/K);}else{if(L>90&&L<270){T=H+I;S=H;}else{T=H;S=H+I;}B=((K*(A-T))-v)*-1;z=((K*(A-S))-v)*-1;}u=this._context.createLinearGradient(T,B,S,z);for(;P<Q;++P){M=F[P];C=M.opacity;N=M.color;E=M.offset;if(J(C)){C=Math.max(0,Math.min(1,C));N=this._toRGBA(N,C);}else{N=r(N);}E=M.offset||P/(Q-1);u.addColorStop(E,N);}return u;},_getRadialGradient:function(){var M=c.Lang.isNumber,S=this.get("fill"),N=S.r,E=S.fx,C=S.fy,G=S.stops,D,P,O,T=0,V=G.length,v,J=0,I=0,K=this.get("width"),W=this.get("height"),X,U,B,A,R,Q,u,L,Y,Z,F,H,z;
Q=J+K/2;u=I+W/2;X=K*E;B=W*C;U=J+K/2;A=I+W/2;R=K*N;Z=Math.sqrt(Math.pow(Math.abs(Q-X),2)+Math.pow(Math.abs(u-B),2));if(Z>=R){H=Z/R;if(H===1){H=1.01;}L=(X-Q)/H;Y=(B-u)/H;L=L>0?Math.floor(L):Math.ceil(L);Y=Y>0?Math.floor(Y):Math.ceil(Y);X=Q+L;B=u+Y;}if(N>=0.5){v=this._context.createRadialGradient(X,B,N,U,A,N*K);z=1;}else{v=this._context.createRadialGradient(X,B,N,U,A,K/2);z=N*2;}for(;T<V;++T){O=G[T];D=O.opacity;P=O.color;F=O.offset;if(M(D)){D=Math.max(0,Math.min(1,D));P=this._toRGBA(P,D);}else{P=r(P);}F=O.offset||T/(V-1);F*=z;if(F<=1){v.addColorStop(F,P);}}return v;},_initProps:function(){this._methods=[];this._lineToMethods=[];this._xcoords=[0];this._ycoords=[0];this._width=0;this._height=0;this._left=0;this._top=0;this._right=0;this._bottom=0;},_drawingComplete:false,_createGraphic:function(u){var v=c.config.doc.createElement("canvas");return v;},_trackSize:function(u,v){if(u>this._right){this._right=u;}if(u<this._left){this._left=u;}if(v<this._top){this._top=v;}if(v>this._bottom){this._bottom=v;}this._width=this._right-this._left;this._height=this._bottom-this._top;}};c.CanvasDrawing=b;l=function(u){this._transforms=[];this.matrix=new c.Matrix();l.superclass.constructor.apply(this,arguments);};l.NAME="canvasShape";c.extend(l,c.GraphicBase,c.mix({init:function(){this.initializer.apply(this,arguments);},initializer:function(u){var v=this,w=u.graphic;v._initProps();v.createNode();v._xcoords=[0];v._ycoords=[0];if(w){this._setGraphic(w);}v._updateHandler();},_setGraphic:function(u){var v;if(u instanceof c.CanvasGraphic){this._graphic=u;}else{u=c.one(u);v=new c.CanvasGraphic({render:u});v._appendShape(this);this._graphic=v;}},addClass:function(u){var v=c.one(this.get("node"));v.addClass(u);},removeClass:function(u){var v=c.one(this.get("node"));v.removeClass(u);},getXY:function(){var z=this.get("graphic"),v=z.getXY(),u=this.get("x"),w=this.get("y");return[v[0]+u,v[1]+w];},setXY:function(w){var A=this.get("graphic"),v=A.getXY(),u=w[0]-v[0],z=w[1]-v[1];this._set("x",u);this._set("y",z);this._updateNodePosition(u,z);},contains:function(u){return u===c.one(this.node);},test:function(u){return c.one(this.get("node")).test(u);},compareTo:function(u){var v=this.node;return v===u;},_getDefaultFill:function(){return{type:"solid",cx:0.5,cy:0.5,fx:0.5,fy:0.5,r:0.5};},_getDefaultStroke:function(){return{weight:1,dashstyle:"none",color:"#000",opacity:1};},_left:0,_right:0,_top:0,_bottom:0,createNode:function(){var u=c.config.doc.createElement("canvas"),v=this.get("id");this._context=u.getContext("2d");u.setAttribute("overflow","visible");u.style.overflow="visible";if(!this.get("visible")){u.style.visibility="hidden";}u.setAttribute("id",v);v="#"+v;this.node=u;this.addClass("yui3-"+q+" yui3-"+this.name);},on:function(v,u){if(c.Node.DOM_EVENTS[v]){return c.one("#"+this.get("id")).on(v,u);}return c.on.apply(this,arguments);},_setStrokeProps:function(A){var v,z,y,x,w,u;if(A){v=A.color;z=g(A.weight);y=g(A.opacity);x=A.linejoin||"round";w=A.linecap||"butt";u=A.dashstyle;this._miterlimit=null;this._dashstyle=(u&&c.Lang.isArray(u)&&u.length>1)?u:null;this._strokeWeight=z;if(m(z)&&z>0){this._stroke=1;}else{this._stroke=0;}if(m(y)){this._strokeStyle=this._toRGBA(v,y);}else{this._strokeStyle=v;}this._linecap=w;if(x=="round"||x=="bevel"){this._linejoin=x;}else{x=parseInt(x,10);if(m(x)){this._miterlimit=Math.max(x,1);this._linejoin="miter";}}}else{this._stroke=0;}},set:function(){var u=this,v=arguments[0];k.prototype.set.apply(u,arguments);if(u.initialized){u._updateHandler();}},_setFillProps:function(y){var w=m,u,v,x;if(y){u=y.color;x=y.type;if(x=="linear"||x=="radial"){this._fillType=x;}else{if(u){v=y.opacity;if(w(v)){v=Math.max(0,Math.min(1,v));u=this._toRGBA(u,v);}else{u=r(u);}this._fillColor=u;this._fillType="solid";}else{this._fillColor=null;}}}else{this._fillType=null;this._fillColor=null;}},translate:function(u,v){this._translateX+=u;this._translateY+=v;this._addTransform("translate",arguments);},translateX:function(u){this._translateX+=u;this._addTransform("translateX",arguments);},translateY:function(u){this._translateY+=u;this._addTransform("translateY",arguments);},skew:function(u,v){this._addTransform("skew",arguments);},skewX:function(u){this._addTransform("skewX",arguments);},skewY:function(u){this._addTransform("skewY",arguments);},rotate:function(u){this._rotation=u;this._addTransform("rotate",arguments);},scale:function(u,v){this._addTransform("scale",arguments);},_rotation:0,_transform:"",_addTransform:function(v,u){u=c.Array(u);this._transform=s.trim(this._transform+" "+v+"("+u.join(", ")+")");u.unshift(v);this._transforms.push(u);if(this.initialized){this._updateTransform();}},_updateTransform:function(){var A=this.node,z,x,w=this.get("transformOrigin"),v=this.matrix,y=0,u=this._transforms.length;if(this._transforms&&this._transforms.length>0){for(;y<u;++y){z=this._transforms[y].shift();if(z){v[z].apply(v,this._transforms[y]);}}x=v.toCSSText();}this._graphic.addToRedrawQueue(this);w=(100*w[0])+"% "+(100*w[1])+"%";A.style.MozTransformOrigin=w;A.style.webkitTransformOrigin=w;A.style.msTransformOrigin=w;A.style.OTransformOrigin=w;if(x){A.style.MozTransform=x;A.style.webkitTransform=x;A.style.msTransform=x;A.style.OTransform=x;}this._transforms=[];},_updateHandler:function(){this._draw();this._updateTransform();},_draw:function(){var u=this.node;this.clear();this._closePath();u.style.left=this.get("x")+"px";u.style.top=this.get("y")+"px";},_closePath:function(){if(!this._methods){return;}var z=this.get("node"),G=this._right-this._left,D=this._bottom-this._top,v=this._context,A=[],x=this._methods.concat(),C=0,B,u,F,y,E=0;this._context.clearRect(0,0,z.width,z.height);if(this._methods){E=x.length;if(!E||E<1){return;}for(;C<E;++C){A[C]=x[C].concat();F=A[C];y=F[0]=="quadraticCurveTo"?F.length:3;for(B=1;B<y;++B){if(B%2===0){F[B]=F[B]-this._top;}else{F[B]=F[B]-this._left;}}}z.setAttribute("width",Math.min(G,2000));z.setAttribute("height",Math.min(2000,D));v.beginPath();for(C=0;C<E;++C){F=A[C].concat();if(F&&F.length>0){u=F.shift();
if(u){if(u=="closePath"){this._strokeAndFill(v);}if(u&&u=="lineTo"&&this._dashstyle){F.unshift(this._xcoords[C]-this._left,this._ycoords[C]-this._top);this._drawDashedLine.apply(this,F);}else{v[u].apply(v,F);}}}}this._strokeAndFill(v);this._drawingComplete=true;this._clearAndUpdateCoords();this._updateNodePosition();this._methods=x;}},_strokeAndFill:function(u){if(this._fillType){if(this._fillType=="linear"){u.fillStyle=this._getLinearGradient();}else{if(this._fillType=="radial"){u.fillStyle=this._getRadialGradient();}else{u.fillStyle=this._fillColor;}}u.closePath();u.fill();}if(this._stroke){if(this._strokeWeight){u.lineWidth=this._strokeWeight;}u.lineCap=this._linecap;u.lineJoin=this._linejoin;if(this._miterlimit){u.miterLimit=this._miterlimit;}u.strokeStyle=this._strokeStyle;u.stroke();}},_drawDashedLine:function(D,J,u,G){var v=this._context,H=this._dashstyle[0],F=this._dashstyle[1],x=H+F,A=u-D,E=G-J,I=Math.sqrt(Math.pow(A,2)+Math.pow(E,2)),y=Math.floor(Math.abs(I/x)),w=Math.atan2(E,A),C=D,B=J,z;A=Math.cos(w)*x;E=Math.sin(w)*x;for(z=0;z<y;++z){v.moveTo(C,B);v.lineTo(C+Math.cos(w)*H,B+Math.sin(w)*H);C+=A;B+=E;}v.moveTo(C,B);I=Math.sqrt((u-C)*(u-C)+(G-B)*(G-B));if(I>H){v.lineTo(C+Math.cos(w)*H,B+Math.sin(w)*H);}else{if(I>0){v.lineTo(C+Math.cos(w)*I,B+Math.sin(w)*I);}}v.moveTo(u,G);},clear:function(){this._initProps();if(this.node){this._context.clearRect(0,0,this.node.width,this.node.height);}return this;},getBounds:function(){var B=this.get("stroke"),z=this.get("width"),A=this.get("height"),v=this.get("x"),C=this.get("y"),u=0;if(B&&B.weight){u=B.weight;}z=(v+z+u)-(v-u);A=(C+A+u)-(C-u);v-=u;C-=u;return this.matrix.getContentRect(z,A,v,C);},destroy:function(){var u=this.get("graphic");if(u){u.removeShape(this);}else{this._destroy();}},_destroy:function(){if(this.node){c.one(this.node).remove(true);this._context=null;this.node=null;}}},c.CanvasDrawing.prototype));l.ATTRS={transformOrigin:{valueFn:function(){return[0.5,0.5];}},transform:{setter:function(u){this.matrix.init();this._transforms=this.matrix.getTransformArray(u);this._transform=u;return u;},getter:function(){return this._transform;}},node:{readOnly:true,getter:function(){return this.node;}},id:{valueFn:function(){return c.guid();},setter:function(v){var u=this.node;if(u){u.setAttribute("id",v);}return v;}},width:{value:0},height:{value:0},x:{value:0},y:{value:0},visible:{value:true,setter:function(w){var v=this.get("node"),u=w?"visible":"hidden";if(v){v.style.visibility=u;}return w;}},fill:{valueFn:"_getDefaultFill",setter:function(w){var v,u=this.get("fill")||this._getDefaultFill();v=(w)?c.merge(u,w):null;if(v&&v.color){if(v.color===undefined||v.color=="none"){v.color=null;}}this._setFillProps(v);return v;}},stroke:{valueFn:"_getDefaultStroke",setter:function(w){var v=this.get("stroke")||this._getDefaultStroke(),u;if(w&&w.hasOwnProperty("weight")){u=parseInt(w.weight,10);if(!isNaN(u)){w.weight=u;}}w=(w)?c.merge(v,w):null;this._setStrokeProps(w);return w;}},autoSize:{value:false},pointerEvents:{value:"visiblePainted"},graphic:{readOnly:true,getter:function(){return this._graphic;}}};c.CanvasShape=l;n=function(u){n.superclass.constructor.apply(this,arguments);};n.NAME="canvasPath";c.extend(n,c.CanvasShape,{_type:"path",_draw:function(){this._closePath();},createNode:function(){var u=c.config.doc.createElement("canvas"),v=this.get("id");this._context=u.getContext("2d");u.setAttribute("overflow","visible");u.setAttribute("pointer-events","none");u.style.pointerEvents="none";u.style.overflow="visible";u.setAttribute("id",v);v="#"+v;this.node=u;this.addClass("yui3-"+q+" yui3-"+this.name);},end:function(){this._draw();}});n.ATTRS=c.merge(c.CanvasShape.ATTRS,{width:{getter:function(){var u=this._stroke&&this._strokeWeight?(this._strokeWeight*2):0;return this._width-u;},setter:function(u){this._width=u;return u;}},height:{getter:function(){var u=this._stroke&&this._strokeWeight?(this._strokeWeight*2):0;return this._height-u;},setter:function(u){this._height=u;return u;}},path:{readOnly:true,getter:function(){return this._path;}}});c.CanvasPath=n;t=function(){t.superclass.constructor.apply(this,arguments);};t.NAME="canvasRect";c.extend(t,c.CanvasShape,{_type:"rect",_draw:function(){var u=this.get("width"),v=this.get("height");this.clear();this.drawRect(0,0,u,v);this._closePath();}});t.ATTRS=c.CanvasShape.ATTRS;c.CanvasRect=t;o=function(u){o.superclass.constructor.apply(this,arguments);};o.NAME="canvasEllipse";c.extend(o,l,{_type:"ellipse",_draw:function(){var u=this.get("width"),v=this.get("height");this.clear();this.drawEllipse(0,0,u,v);this._closePath();}});o.ATTRS=l.ATTRS;c.CanvasEllipse=o;i=function(u){i.superclass.constructor.apply(this,arguments);};i.NAME="canvasCircle";c.extend(i,c.CanvasShape,{_type:"circle",_draw:function(){var u=this.get("radius");if(u){this.clear();this.drawCircle(0,0,u);this._closePath();}}});i.ATTRS=c.merge(c.CanvasShape.ATTRS,{width:{setter:function(u){this.set("radius",u/2);return u;},getter:function(){return this.get("radius")*2;}},height:{setter:function(u){this.set("radius",u/2);return u;},getter:function(){return this.get("radius")*2;}},radius:{lazyAdd:false}});c.CanvasCircle=i;f=function(){f.superclass.constructor.apply(this,arguments);};f.NAME="canvasPieSlice";c.extend(f,c.CanvasShape,{_type:"path",_draw:function(A){var v=this.get("cx"),B=this.get("cy"),z=this.get("startAngle"),w=this.get("arc"),u=this.get("radius");this.clear();this._left=v;this._right=u;this._top=B;this._bottom=u;this.drawWedge(v,B,z,w,u);this.end();}});f.ATTRS=c.mix({cx:{value:0},cy:{value:0},startAngle:{value:0},arc:{value:0},radius:{value:0}},c.CanvasShape.ATTRS);c.CanvasPieSlice=f;function d(u){d.superclass.constructor.apply(this,arguments);}d.NAME="canvasGraphic";d.ATTRS={render:{},id:{valueFn:function(){return c.guid();},setter:function(v){var u=this._node;if(u){u.setAttribute("id",v);}return v;}},shapes:{readOnly:true,getter:function(){return this._shapes;}},contentBounds:{readOnly:true,getter:function(){return this._contentBounds;
}},node:{readOnly:true,getter:function(){return this._node;}},width:{setter:function(u){if(this._node){this._node.style.width=u+"px";}return u;}},height:{setter:function(u){if(this._node){this._node.style.height=u+"px";}return u;}},autoSize:{value:false},resizeDown:{getter:function(){return this._resizeDown;},setter:function(u){this._resizeDown=u;if(this._node){this._redraw();}return u;}},x:{getter:function(){return this._x;},setter:function(u){this._x=u;if(this._node){this._node.style.left=u+"px";}return u;}},y:{getter:function(){return this._y;},setter:function(u){this._y=u;if(this._node){this._node.style.top=u+"px";}return u;}},autoDraw:{value:true},visible:{value:true,setter:function(u){this._toggleVisible(u);return u;}}};c.extend(d,c.GraphicBase,{_x:0,_y:0,getXY:function(){var u=c.one(this._node),v;if(u){v=u.getXY();}return v;},_resizeDown:false,initializer:function(x){var z=this.get("render"),v=this.get("visible")?"visible":"hidden",u=this.get("width")||0,y=this.get("height")||0;this._shapes={};this._redrawQueue={};this._contentBounds={left:0,top:0,right:0,bottom:0};this._node=e.createElement("div");this._node.style.position="absolute";this._node.style.visibility=v;this.set("width",u);this.set("height",y);if(z){this.render(z);}},render:function(y){var u=c.one(y),z=this._node,v=this.get("width")||parseInt(u.getComputedStyle("width"),10),x=this.get("height")||parseInt(u.getComputedStyle("height"),10);u=u||e.body;u.appendChild(z);z.style.display="block";z.style.position="absolute";z.style.left="0px";z.style.top="0px";this.set("width",v);this.set("height",x);this.parentNode=u;return this;},destroy:function(){this.removeAllShapes();if(this._node){this._removeChildren(this._node);c.one(this._node).destroy();}},addShape:function(u){u.graphic=this;if(!this.get("visible")){u.visible=false;}var w=this._getShapeClass(u.type),v=new w(u);this._appendShape(v);return v;},_appendShape:function(v){var w=v.node,u=this._frag||this._node;if(this.get("autoDraw")){u.appendChild(w);}else{this._getDocFrag().appendChild(w);}},removeShape:function(u){if(!(u instanceof l)){if(s.isString(u)){u=this._shapes[u];}}if(u&&u instanceof l){u._destroy();delete this._shapes[u.get("id")];}if(this.get("autoDraw")){this._redraw();}return u;},removeAllShapes:function(){var u=this._shapes,v;for(v in u){if(u.hasOwnProperty(v)){u[v].destroy();}}this._shapes={};},clear:function(){this.removeAllShapes();},_removeChildren:function(u){if(u&&u.hasChildNodes()){var v;while(u.firstChild){v=u.firstChild;this._removeChildren(v);u.removeChild(v);}}},_toggleVisible:function(x){var w,v=this._shapes,u=x?"visible":"hidden";if(v){for(w in v){if(v.hasOwnProperty(w)){v[w].set("visible",x);}}}if(this._node){this._node.style.visibility=u;}},_getShapeClass:function(v){var u=this._shapeClass[v];if(u){return u;}return v;},_shapeClass:{circle:c.CanvasCircle,rect:c.CanvasRect,path:c.CanvasPath,ellipse:c.CanvasEllipse,pieslice:c.CanvasPieSlice},getShapeById:function(v){var u=this._shapes[v];return u;},batch:function(v){var u=this.get("autoDraw");this.set("autoDraw",false);v();this._redraw();this.set("autoDraw",u);},_getDocFrag:function(){if(!this._frag){this._frag=e.createDocumentFragment();}return this._frag;},_redraw:function(){var u=this.get("resizeDown")?this._getUpdatedContentBounds():this._contentBounds;if(this.get("autoSize")){this.set("width",u.right);this.set("height",u.bottom);}if(this._frag){this._node.appendChild(this._frag);this._frag=null;}},addToRedrawQueue:function(u){var w,v;this._shapes[u.get("id")]=u;if(!this.get("resizeDown")){w=u.getBounds();v=this._contentBounds;v.left=v.left<w.left?v.left:w.left;v.top=v.top<w.top?v.top:w.top;v.right=v.right>w.right?v.right:w.right;v.bottom=v.bottom>w.bottom?v.bottom:w.bottom;v.width=v.right-v.left;v.height=v.bottom-v.top;this._contentBounds=v;}if(this.get("autoDraw")){this._redraw();}},_getUpdatedContentBounds:function(){var y,w,v,u=this._shapes,x={left:0,top:0,right:0,bottom:0};for(w in u){if(u.hasOwnProperty(w)){v=u[w];y=v.getBounds();x.left=Math.min(x.left,y.left);x.top=Math.min(x.top,y.top);x.right=Math.max(x.right,y.right);x.bottom=Math.max(x.bottom,y.bottom);}}x.width=x.right-x.left;x.height=x.bottom-x.top;this._contentBounds=x;return x;}});c.CanvasGraphic=d;},"@VERSION@",{skinnable:false,requires:["graphics"]});