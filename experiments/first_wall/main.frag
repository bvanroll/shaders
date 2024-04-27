#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265359

vec2 getSmooths(float size, float center) {
  vec2 st = gl_FragCoord.xy/u_resolution;
  return vec2(smoothstep(center - size, center, st.x) - smoothstep(center, center+size, st.x), smoothstep(center - size, center, st.y) - smoothstep(center, center+size, st.y));
}

vec3 gradient_spot(float center, float radius) {
  float r_size = radius/3.0;
  float g_size = r_size*2.0;
  float b_size = radius;
  vec2 r = getSmooths(r_size, center);
  vec2 g = getSmooths(g_size, center);
  vec2 b = getSmooths(b_size, center);
  vec3 y = vec3(r.y - r.x, g.y-g.x, b.y-b.x);
  return y;
}


void main() {
  vec2 st = gl_FragCoord.xy/u_resolution;
  // float y = pow(st.x, 2.0);
  // float y = pow(st.x, PI);
  // float y = sqrt(st.x);
  // float y = step(0.5, st.x);
  // float y = smoothstep(0.3,0.9,st.x);
  // this code creates a smooth gradient for a line edge from 0.4 to 0.5 and 0.5 to 0.6 since it's only checking the x coors
  // float y = smoothstep(0.4,0.5,st.x) - smoothstep(0.5,0.6,st.x);
  //vec3 color = vec3(y);

  //float pct = plot(st,y);
  //color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);
  float center = (sin(u_time) + 1.0)/2.0;
  float radius = (cos(u_time) + 1.0) * 0.3;
  vec3 color = gradient_spot(center, radius);
  gl_FragColor = vec4(color, 1.0);
}
