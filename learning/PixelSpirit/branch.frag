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
  float dev = .25;
  // the card itself has another way to do this, instead of 1.0-st.x+st.y it uses .5+(st.x-st.y)*.5
  // which i like more
  color += step(.45, (1.0-st.x+st.y)*.5)-step(.55, (1.0-st.x+st.y)*.5);
  



  gl_FragColor = vec4(color, alpha);
}
