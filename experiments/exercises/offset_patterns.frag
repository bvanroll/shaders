precision mediump float;
uniform vec2 iResolution;
uniform float iTime;
float fi(float x,float s){return 1.-step(s, x);}
float cs(vec2 s){return length(s);}
void main(){vec2 st=(gl_FragCoord.xy*2.-iResolution.xy)/iResolution.y; vec3 co=vec3(0.0);float sp=iTime/8.;float m=step(mod(sp*10.,2.),1.);vec2 st2=st;vec2 u=vec2(1.);u.x=step(mod(st2.y*10.,2.),1.)*2.-1.;u.y=step(mod(st2.x*10.,2.),1.)*2.-1.;st2.x+=u.x*fract(sp*m);st2.y+=u.y*fract(sp*(1.-m));st2=fract(st2*10.)-.5;st2*=2.;float c=(cs(st2));float c2=(c);co+=fi(c,.2);co+=fi(min(c,c2),.5);gl_FragColor=vec4(co, 1.);}
