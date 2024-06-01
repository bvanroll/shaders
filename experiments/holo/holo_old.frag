#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265359

const vec3 uAColor = vec3(.5);
const vec3 uBColor = vec3(.5);
const vec3 uCColor = vec3(1.);
const vec3 uDColor = vec3(.3,.2,.2);

//get colors from http://dev.thi.ng/gradients/
vec3 cosPalette(float t) {
  return uAColor + uBColor*cos(6.28318*(uCColor*t+uDColor));
}

float circleSDF(vec2 st) {
  return length(st-.5)*2.;
}

float fill(float x, float size) {
  return 1.-step(size, x);
}

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution;
  float col = 0.0;
  vec2 l = vec2(.5,.5)-(u_mouse/u_resolution);
  l = l*.1;
  float alpha = 1.0;
  float dots = 1.;
  float dotsize = .7;
  vec2 off = vec2(.1,.1);
  float movemod = sin(u_time)/2.+1.;
  col += fill(circleSDF(fract(st*dots)+l+movemod),dotsize)/4.;
  for (int i = 0; i < 4; i++) {
    vec2 off1 = off * vec2(-1,1);
    vec2 off2 = off * vec2(1,-1);
    vec2 off3 = off * vec2(1,1);
    vec2 off4 = off * vec2(-1,-1);
    col += fill(circleSDF(fract(st*dots)+off1+l+movemod),dotsize)/4.;
    col += fill(circleSDF(fract(st*dots)+off2+l),dotsize)/4.;
    col += fill(circleSDF(fract(st*dots)+off3+l),dotsize)/4.;
    col += fill(circleSDF(fract(st*dots)+off4+l),dotsize)/4.;
    //col += fill(circleSDF(fract(st*dots + l*.9+off)*.3), dotsize);
    off += vec2(.1,.1);
  }
  vec3 color = cosPalette(col);

  gl_FragColor = vec4(color, alpha);
}
