# Rotate

as far as i understand this function, it functions by multiplying a 2d vector by a mat2 (2x2 matrix as far as i can tell) like this:

[[cos(angle),-sin(angle)],       [x,
[sin(angle),-cos(angle)]]     x   y]

creating something like this:
```
st.x = cos(angle)*st.x - sin(angle)*st.x
st.y = sin(angle)*st.y - cos(angle)*st.y
```
although i don't fully understand cos and sin's effect on these values, i feel like i'm a step closer to understand these functions

