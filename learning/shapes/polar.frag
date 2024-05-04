#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


float plot(vec2 st, float pct) {
  return smoothstep(pct-0.02, pct, st.y) - smoothstep(pct,pct+0.02, st.y);
}


void main() {
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  vec3 color = vec3(0.0);
  vec2 pos = vec2(0.5,0.5)-st;// these values map to the center of the circle function thing
  
  float r = length(pos)*5.; //increasing this value makes the circle smaller. but i don't understand why yet
  float mod = floor(abs(sin(u_time)) * 100.) ;
  float a = atan(pos.y,pos.x)*mod; 
  // a seems to be responsible for the frequency of the function, like directly, the multing the output of the atan by 8 would mean 8 oscillations happen in the function. seems obvious now that i'm typing it out

  float f = cos(a*1.0);
  //f = abs(cos(a*3.));
  //f = abs(cos(a*2.5))*.5+.3;
  //f = abs(cos(a*12.)*sin(a*3.))*floor(fract(st.x/u_time + st.y/u_time)*20.)+.1;
  //f = smoothstep(-.5,1., cos(a*10.))*0.2+0.5;

  color = vec3(0.2,0.2,0.2);
  //color = vec3(1.-smoothstep(f,f+0.2,r));
  float pct = plot(vec2(f,f+0.2),r);
  color = (1.0-pct)* color + pct * vec3(0.0,1.0,0.0);
  // the first part (1.0-pct) * col is used to disable the underlying color when the pct is 0. with the other section adding then the wanted color on top.
  gl_FragColor = vec4(color, 1.0);

}


