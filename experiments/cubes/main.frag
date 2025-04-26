#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265359

float rhombSDF(vec2 st) {
  vec2 st1 = (st)*2.;
  vec2 st2 = (vec2(st.x,0.-st.y)*2.-1.)*2.;
  float triangle1 = max(abs(st1.x)*.866025+st1.y*.5,-st1.y*.5);
  float triangle2 = max(abs(st2.x)*.866025+st2.y*.5,-st2.y*.5);
  return max(triangle1, triangle2);
}

float rectSDF(vec2 st, vec2 s) {
  return max(abs(st.x/s.x),abs(st.y/s.y));
}

float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

float stroke(in float x_coor, float s, float width){
  float d = step(s,x_coor+width*.5)-step(s,x_coor-width*.5);
  return clamp(d, 0.,1.);
}

float triSDF(vec2 st) {
  st = st*2.;
  return max(abs(st.x)*.866025+st.y*.5,-st.y*.5);
}

vec2 rotate(vec2 st, float a) {
  return mat2(cos(a),-sin(a),sin(a),cos(a))*(st);
}


float sphereSDF(vec3 p, float r) {
  return length(p) - r;
}

float sceneSDF(vec3 ray) {
  return sphereSDF(ray, .0001);
}

float boxSDF(vec3 p, vec3 b)
{
  float e = .01;
  p = abs(p  )-b;
  vec3 q = abs(p+e)-e;
  return min(min(
      length(max(vec3(p.x,q.y,q.z),0.0))+min(max(p.x,max(q.y,q.z)),0.0),
      length(max(vec3(q.x,p.y,q.z),0.0))+min(max(q.x,max(p.y,q.z)),0.0)),
      length(max(vec3(q.x,q.y,p.z),0.0))+min(max(q.x,max(q.y,p.z)),0.0));
}

mat4 rotateY(float theta) {
  float c = cos(theta);
  float s = sin(theta);

  return mat4(
      vec4(c,0,s,0),
      vec4(0,1,0,0),
      vec4(-s,0,c,0),
      vec4(0,0,0,1)
      );

}
mat4 rotation3d(vec3 axis, float angle) {
  axis = normalize(axis);
  float s = sin(angle);
  float c = cos(angle);
  float oc = 1.0 - c;

  return mat4(
    oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
    oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
    oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
    0.0,                                0.0,                                0.0,                                1.0
  );
}


float rayMarch(vec3 ro, vec3 rd, float start, float end, vec4 rot) {

  float MAX_MARCHING_STEPS = 15.;
  float EPSILON = 0.0001;
  float depth = start;
  for (float i = 0.; i < MAX_MARCHING_STEPS; i++) {
    vec3 p = ro + depth * rd;
    p = (rotation3d(rot.xyz, rot.w) * vec4(p, 1.0)).xyz;
    float d = boxSDF(p , vec3(.5,.5,.5));
    depth += d;
    if (d < EPSILON || depth > end) break;
  }
  return depth;
}



void main() {
  vec2 st = (gl_FragCoord.xy-.5*u_resolution) / u_resolution.y;
  float temp = 0.;
  vec3 ro = vec3(0, 0, 5); //ray origin
  vec3 rd = normalize(vec3(st, -1)); //ray direction 
  float via = cos(3.*u_time) /2.+.5;
  float vib = cos(.5*u_time) /2.+.5;
  float vic = cos(1.2*u_time) /2.+.5;
  float vid = sin(2.*u_time) /2.+.5;
  float vie = cos(8.*u_time) /2.+.5;
  float d = rayMarch(ro+vec3(0,.2,-.4), rd, 0.,100.,vec4(.4,.8,-.9,4.)*via);
  d = min(d,rayMarch(ro+vec3(-.2,.0,.02), rd, 0.,100.,vec4(.2,.1,.3,1.)*vib));
  d = min(d,rayMarch(ro+vec3(-.9,-.9,-1.0), rd, 0.,100.,vec4(.2,.8,.3,1.2)*vic));
  d = min(d,rayMarch(ro+vec3(.9,.3,.0), rd, 0.,100.,vec4(.2,.1,.3,.1)*vid));
  d = min(d,rayMarch(ro+vec3(-.2,.9,-.8), rd, 0.,100.,vec4(.7,.1,.3,.9)*vie));
  d = 1.-d/12.5;
  d = stroke(d, .6, .01);
  vec3 col = vec3(d);
  if (d > 100.0) {
    //col = vec3(0.1);
  } else {
    //col = vec3(0.,0.,1.);
  }
    

  gl_FragColor = vec4(col, 1.0);
}
