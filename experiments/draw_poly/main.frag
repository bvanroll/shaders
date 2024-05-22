#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265359

// this does not work, i'm drawing over what i've drawn before.
float v_line(vec2 st, float xcor, float width, float y1, float y2) {
  return step(xcor-width,st.x) - step(xcor+width, st.x)- (1.0-step(y1, st.y)) - step(y2, st.y);
}

float h_line(vec2 st, float ycor, float width, float x1, float x2) {
  return step(ycor-width, st.y) - step(ycor+width, st.y) - (1.0-step(x1, st.x)) - step(x2, st.x);
}

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution;
  vec3 color = vec3(0.0,0.0,0.0);
  //float width = 0.001;
  //color += v_line(st, 0.4, 0.001, 0.25, 0.75) * vec3(1.0);
  //color += h_line(st, 0.75, 0.001, 0.5, 0.6) * vec3(1.0);
  //color += h_line(st, 0.25, 0.001, 0.4, 0.6) * vec3(1.0);
  //color += v_line(st, 0.6, 0.001, 0.25, 0.75) * vec3(1.0);
  //float temp = step(0.4-width, st.x)-step(0.4+width, st.x)-(1.0-step(0.25, st.y))-step(0.75, st.y)
  //+step(0.6-width, st.x)-step(0.6+width,st.x)
  //+step(0.75-width,st.y)-step(0.75+width,st.y)-(1.0-step(0.4-width, st.x))-step(0.6+width,st.x)
  //+step(0.25-width, st.y) - step(0.25+width, st.y);


  //now the simple solution

  float box = step(0.4, st.x)-(1.0-step(0.25,st.y)) - step(0.6, st.x)-step(0.75, st.y);
  float r = sin(u_time/200.0);
  float g = sin(u_time/3000000.333);
  float b = sin(u_time);
  color.r = r;
  color.g = g;
  color.b = b;
  color = color;

  gl_FragColor = vec4(color, box);

  
}
