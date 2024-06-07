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

float hexSDF(vec2 st) {
  st = abs(st);
  return max(abs(st.y),st.x*.866025+st.y*.5);
}

float polySDF(vec2 st, float angles) {
  float a = atan(st.x,st.y)+PI;
  float r = length(st);
  float v = (2.*PI)/angles;
  return cos(floor(.5+a/v)*v-a)*r;
}

vec2 rotate(vec2 st, float a) {
  st = mat2(cos(a),-sin(a),sin(a),cos(a))*(st);
  return st;
}

float triSDF(vec2 st) {
  st = st*2.;
  return max(abs(st.x)*.866025+st.y*.5,-st.y*.5);
}

float vesicaSDF(vec2 st, float w) {
  vec2 offset1 = st-vec2(w,.0);
  vec2 offset2 = st+vec2(w,.0);
  float circle1 = length(offset1);
  float circle2 = length(offset2);
  return max(circle1, circle2);
}

float rhombSDF(vec2 st) {
  vec2 st1 = (st)*2.;
  vec2 st2 = (vec2(st.x,0.-st.y))*2.;
  float triangle1 = max(abs(st1.x)*.866025+st1.y*.5,-st1.y*.5);
  float triangle2 = max(abs(st2.x)*.866025+st2.y*.5,-st2.y*.5);
  return max(triangle1, triangle2);
}

float stroke(in float x_coor, float s, float width){
  float d = step(s,x_coor+width*.5)-step(s,x_coor-width*.5);
  return clamp(d, 0.,1.);
}

float crossSDF(vec2 st, float s) {
  vec2 size = vec2(.25, s);
  float rect1 = max(abs(st.x/size.x),abs(st.y/size.y));
  float rect2 = max(abs(st.x/size.y),abs(st.y/size.x));
  return min(rect1,rect2);
}

float circle(in vec2 st, in float radius){
  vec2 dist = st-vec2(.5);
  return 1.-smoothstep(radius-(radius*.01),
                       radius+(radius*.01),
                       dot(st,st)*4.);
}

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution;
  st.x *= u_resolution.x/u_resolution.y;
  st = (st-.5)*2.;
  vec3 color = vec3(0.0,0.0,0.0);
  float alpha = 1.0;
  //st = rotate(st, radians(90.*sin(u_time)));
  //color = vec3(hexSDF(st));
  //color = vec3(polySDF(st, 3.));
  //color = vec3(
  //color = vec3(triSDF(st));
  float v = rhombSDF(st);
  v = crossSDF(st, .9);
  v = circle(st, .9);
  color = vec3(stroke(v,.5,.9));
  

  gl_FragColor = vec4(color, alpha);
}
