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
vec3 cosPalette(float t) {
  return uAColor + uBColor*cos(6.28318*(uCColor*t+uDColor));
}

vec2 rotate(vec2 st, float a) {
  st = mat2(cos(a),-sin(a),sin(a),cos(a))*(st-.5);
  return st+.5;
}

float rhombSDF(vec2 st) {
  vec2 st1 = (st*2.-1.)*2.;
  vec2 st2 = (vec2(st.x,1.-st.y)*2.-1.)*2.;
  float triangle1 = max(abs(st1.x)*.866025+st1.y*.5,-st1.y*.5);
  float triangle2 = max(abs(st2.x)*.866025+st2.y*.5,-st2.y*.5);
  return max(triangle1, triangle2);
}

float fill(float x, float size) {
  return 1.-step(size, x);
}

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution;
  vec3 color = vec3(0.0,0.0,0.0);
  float alpha = 1.0;
  float size = 1.;
  float final_color = 0.5;
  float amount = 1.;
  float off = .3;
  float max_int = .5;
  float mouse_dist = distance(u_mouse.xy/u_resolution.xy,vec2(.5,.5));
  float speed = 1.;
  int iterations = 2;
  st = fract(st*amount);
  for (int i = 0; i<iterations;i++) {
    float n = fill(rhombSDF(st+vec2(0.,off)),size);
    float e = fill(rhombSDF(st+vec2(off,0.)),size);
    float s = fill(rhombSDF(st+vec2(0.,off*-1.)),size);
    float w = fill(rhombSDF(st+vec2(off*-1.,.0)),size);
    float comb = n+e+s+w;
    vec2 central = st - vec2(.5);

    comb = comb *(max_int-(abs(central.x+central.y)*sin(u_time*speed)+.3));
    final_color = mix(final_color, comb, (st.x+st.y)/2.);
    //final_color = mix(final_color,(n+e+s+w)*(max_int-(st.x*(.3+(sin(u_time*speed)*.7))),st.x);
    off += .3;
    rotate(st, radians(90.));
  }
    //color += fill(n, .2);
  
  color += cosPalette(final_color);
  gl_FragColor = vec4(color, alpha);
}
