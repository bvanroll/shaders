#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265359

float bounceOut(float x) {
  const float a = 4.0 / 11.0;
  const float b = 8.0 / 11.0;
  const float c = 9.0 / 10.0;

  const float ca = 4356.0/361.0;
  const float cb = 35442.0 / 1805.0;
  const float cc = 16061.0/1805.0;

  float x2 = x*x;
  
  return x < a 
    ? 7.5625 * x2
    : x < b
      ? 9.075 * x2 - 9.9 * x + 3.4
      : x < c
        ? ca * x2 - cb * x + cc
        : 10.8 * x * x - 20.52 * x + 10.72;
}

float bounceIn(float x) {
  return 1.0 - bounceOut(1.0 - x);
}


float bounceInOut(float x) {
  return x < 0.5
    ? 0.5 * (1.0 - bounceOut(1.0 - x * 2.0))
    : 0.5 * bounceOut(x * 2.0 - 1.0) + 0.5;
}




void main() {
  vec2 st = gl_FragCoord.xy/u_resolution;
  vec3 red = vec3(1.0,0.0,0.0);
  red.x = 1.0;
  red.y = 0.0;
  red.z = 0.0;
  // red.x = red.r = red.s = red[0] (red.s comes from red.stpq, instead of red.rgba or red.xyzw)
  // red.xy = vec2(1.0, 0.0) (this sets 2 of the values for red)
  // red.grb = vec2(0.0,1.0,0.0) (you can mix and match these to switch the order)
  // magenta = red.rgr (it also works for assigning and repeating, in this case repeating the red value for r and b)
  vec3 blue = red.ggr;
  float pct = (sin(u_time) + 1.0) / 2.0;
  pct = bounceInOut(pct);
  vec3 color = mix(red,blue,pct);
  gl_FragColor = vec4(color, 1.0);
}
