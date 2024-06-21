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


float rand(vec2 st) { 
  return fract(sin(dot(st, vec2(323.*sin(u_time), 3.*cos(u_time+u_time/3.))))/cos(2.*u_time));
}

float fill(float x, float size) { return 1.-step(size, x); }

float circleSDF(vec2 st) { return length(st); }

void main() {
  vec2 st = (gl_FragCoord.xy*2. - u_resolution.xy)/u_resolution.y;
  vec2 stm = (u_mouse*2. - u_resolution.xy)/u_resolution.y;
  float rng = rand(fract(st * 10999.));
  vec3 color = vec3(0.0,0.0,0.0);
  float alpha = 1.0;
  float c = circleSDF(st-stm);
  color += cosPalette(fill(c, .2)*rng+rng*.05);

  



  gl_FragColor = vec4(color, alpha);
}
