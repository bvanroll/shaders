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

float fill(float x, float size) { return 1.-step(size, x); }
//get colors from http://dev.thi.ng/gradients/
vec3 cosPalette(float t) {
  return uAColor + uBColor*cos(6.28318*(uCColor*t+uDColor));
}

vec2 rotate(vec2 st, float a) {
  st = mat2(cos(a),-sin(a),sin(a),cos(a))*(st-.5);
  return st+.5;
}

float rhombSDF(vec2 st) {
  vec2 st1 = (st*2.-1.)*2.;
  vec2 st2 = (vec2(st.x,1.-st.y)*2.-1.)*2.;
  float triangle1 = max(abs(st1.x)*.866025+st1.y*.5,-st1.y*.5);
  float triangle2 = max(abs(st2.x)*.866025+st2.y*.5,-st2.y*.5);
  return max(triangle1, triangle2);
}

float sdRhombus(in vec2 p, in vec2 b) {
  p = abs(p);
  vec2 a = b-2.*p;
  float h = clamp((a.x*b.x-a.y*b.y)/dot(b,b),-1.,1.);
  float d = length(p-.5*b*vec2(1.-h,1.+h));
  return d*sign(p.x*b.y+p.y*b.x-b.x*b.y);
}

//2d perlin noise fn via stegu/webgl-noise
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }

vec4 permute(vec4 x) { return mod289(((x*34.0)+10.0)*x);}

vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }

vec2 fade(vec2 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }



// Classic Perlin noise
float cnoise(vec2 P) {
  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
  Pi = mod289(Pi); // To avoid truncation effects in permutation
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;

  vec4 i = permute(permute(ix) + iy);

  vec4 gx = fract(i * (1.0 / 41.0)) * 2.0 - 1.0 ;
  vec4 gy = abs(gx) - 0.5 ;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;

  vec2 g00 = vec2(gx.x,gy.x);
  vec2 g10 = vec2(gx.y,gy.y);
  vec2 g01 = vec2(gx.z,gy.z);
  vec2 g11 = vec2(gx.w,gy.w);

  vec4 norm = taylorInvSqrt(vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11)));
  g00 *= norm.x;  
  g01 *= norm.y;  
  g10 *= norm.z;  
  g11 *= norm.w;  

  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));

  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
  return 2.3 * n_xy;
}

// Classic Perlin noise, periodic variant
float pnoise(vec2 P, vec2 rep) {
  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
  Pi = mod(Pi, rep.xyxy); // To create noise with explicit period
  Pi = mod289(Pi);        // To avoid truncation effects in permutation
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;

  vec4 i = permute(permute(ix) + iy);

  vec4 gx = fract(i * (1.0 / 41.0)) * 2.0 - 1.0 ;
  vec4 gy = abs(gx) - 0.5 ;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;

  vec2 g00 = vec2(gx.x,gy.x);
  vec2 g10 = vec2(gx.y,gy.y);
  vec2 g01 = vec2(gx.z,gy.z);
  vec2 g11 = vec2(gx.w,gy.w);

  vec4 norm = taylorInvSqrt(vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11)));
  g00 *= norm.x;  
  g01 *= norm.y;  
  g10 *= norm.z;  
  g11 *= norm.w;  

  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));

  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
  return 2.3 * n_xy;
}



void main() {
  vec2 st = (gl_FragCoord.xy*2.-u_resolution.xy)/u_resolution.y;
  vec3 color = vec3(0.0,0.0,0.0);
  float alpha = 1.0;
  float size = .00001;
  float final_color = 0.5;
  float amount = 1.;
  float off = .3;
  float max_int = .5;
  float mouse_dist = distance(u_mouse.xy/u_resolution.xy,vec2(.5,.5));
  float speed = 1.;
  float s = u_time/120.;
  int iterations = 2;
  st = fract(st*amount);
  for (int i = 0; i<iterations;i++) {
    vec2 b = vec2(1.);
    float n = fill(sdRhombus(st+vec2(.0,off),b),size);
    float e = fill(sdRhombus(st+vec2(off,.0),b),size);
    float s = fill(sdRhombus(st+vec2(.0,off*-1.),b),size);
    float w = fill(sdRhombus(st+vec2(off*-1.,.0),b),size);
    float comb = n+e+s+w;
    vec2 central = st - vec2(.5);

    comb = comb *(max_int-(abs(central.x+central.y)*sin(u_time*speed)+.3));
    //final_color = mix(final_color, comb, (st.x+st.y)/2.);
    final_color = mix(final_color, comb,.5);
    final_color = mix(final_color,pnoise(u_mouse.xx*sin(u_time), st),.1);
    //final_color = mix(final_color,(n+e+s+w)*(max_int-(st.x*(.3+(sin(u_time*speed)*.7))),st.x);
    off += .3;
    rotate(st, radians(90.));
  }
    //color += fill(n, .2);
  
  color += cosPalette(final_color);
  gl_FragColor = vec4(color,1.);
}
