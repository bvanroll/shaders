#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265359

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution;
  vec3 color = vec3(0.0,0.0,0.0);
  float alpha = 1.0;
  float deviation = .25;
  //idk why but i've never considered using cos or sin on anything else then u_time, but this is really interesting and something i definetly overlooked
  color += step(.5+(cos(st.y*PI)*deviation),st.x);
  

  gl_FragColor = vec4(color, alpha);
}
