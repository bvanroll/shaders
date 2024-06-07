#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265359

const vec3 uAColor = vec3(.5,.5,.5);
const vec3 uBColor = vec3(.5,.5,.5);
const vec3 uCColor = vec3(1.,1.,1.);
const vec3 uDColor = vec3(.0,.33,.67);

//get colors from http://dev.thi.ng/gradients/
vec3 cosPalette(float t) { return uAColor + uBColor*cos(6.28318*(uCColor*t+uDColor)); }

float stroke(in float x_coor, float s, float width){
  float d = step(s,x_coor+width*.5)-step(s,x_coor-width*.5);
  return clamp(d, 0.,1.);
}

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution;
  vec3 color = vec3(0.0,0.0,0.0);
  float alpha = 1.0;
  vec2 pos = vec2(.5)-st;
  float r = length(pos)*2.;
  float a = atan(pos.y,pos.x);
  float f = sin(a*3.);
  f = abs(cos(a*3.));
  f = abs(cos(a*2.5))*.5+.3;
  f = abs(cos(a*12.)*sin(a*3.))*.8+.1;
  f = smoothstep(-.5,.8,cos(a*10.))*.2+.5;
  color += 1.-stroke(f, 1.,.4);
  

  gl_FragColor = vec4(color, alpha);
}
