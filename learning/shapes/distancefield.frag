#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265359

float circle(in vec2 st, in float radius){
  vec2 dist = st-vec2(.5);
  return 1.-smoothstep(radius-(radius*.01),
                       radius+(radius*.01),
                       dot(dist,dist)*4.);
}


void main() {
  vec2 st = gl_FragCoord.xy/u_resolution;
  st.x *= u_resolution.x/u_resolution.y;
  vec3 color = vec3(1.0);
  float alpha = 0.;
  float d = 0.0;
  // remaps space to -1 1
  st = st *2.-1.;
  d = length(abs(st)-.3);
  
  

  gl_FragColor = vec4(color, alpha);
}
