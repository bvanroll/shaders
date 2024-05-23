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
  vec2 stm = u_mouse/u_resolution;
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

  //float box = step(0.4, st.x)-(1.0-step(0.25,st.y)) - step(0.6, st.x)-step(0.75, st.y);

  //even simpler
  vec2 box = step(vec2(0.4, 0.25), st)-step(vec2(0.6,0.75), st);
  //trying to make an outline
  vec2 smallerbox = step(vec2(0.401, 0.251), st)-step(vec2(0.599,0.749), st);

  //box = box * (vec2(1.0)-smallerbox);
  //i don't understand these results, but when subtracting after the x and y are extracted it works (see next line)

  float val = (box.x * box.y) - (smallerbox.x * smallerbox.y);
  float r = (1.0+sin(u_time+20.0))/2.0;
  float g = (1.0+sin(u_time+50.0))/2.0;
  float b = (1.0+sin(u_time))/2.0;
  //float mod = distance(stm, vec2(0.5));
  float mod = 1.0;
  color.r = r*mod;
  color.g = g*mod;
  color.b = b*mod;
  color = color;
  gl_FragColor = vec4(color, val);

  
}
