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

vec2 rotate(vec2 st, float a) {
  return mat2(cos(a),-sin(a),sin(a),cos(a))*(st);
}

vec2 rotateTilePattern(vec2 st) {
  st *= 2.;

  // give each cell an index number according to its position
  float index = .0;
  index += step(1., mod(st.x,2.));
  index += step(1., mod(st.y,2.))*2.;

  // 2 3
  // 0 1

  st = fract(st);
  st = rotate(st, radians(90.*index));

  return st;
}

float triSDF(vec2 st) {
  st = st*2.;
  return max(abs(st.x)*.866025+st.y*.5,-st.y*.5);
}

vec2 tile(vec2 st, float tiles) {return fract(st*tiles)-.5; }

void main() {
  vec2 st = (gl_FragCoord.xy*2. - u_resolution.xy)/u_resolution.y;
  vec3 color = vec3(0.0,0.0,0.0);
  float alpha = 1.0;
  st = tile(st, 3.);
  st = rotateTilePattern(st);
  st -= .5;
  color += triSDF(st);

  gl_FragColor = vec4(color, alpha);
}
