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


  //draw box
  //float left = step(0.1,st.x); // everything > 0.1 = 1.0
  //float bottom = step(0.1,st.y); // everything > 0.1 = 1.0
  //float right = 1.0-step(0.9,st.x);
  //float top = 1.0-step(0.9,st.y);
  //color = vec3(left*bottom*top*right);
  vec2 bottom_left = step(vec2(0.1),st); // does the same as previous code but passes vec2's to get both
  vec2 top_right = vec2(1.0)-step(vec2(0.9),st);
  color = vec3(bottom_left.x * bottom_left.y * top_right.x * top_right.y);
  
  gl_FragColor = vec4(color, 1.0);
}
