# CSS `subgrid`

- https://web.dev/articles/css-subgrid?hl=en
- https://codepen.io/hchiam/pen/oNmLrvv?editors=1100
- https://codepen.io/hchiam/pen/GRzqbKq?editors=1100
- https://codepen.io/miriamsuzanne/pen/xxKRpmq?editors=1100

```css
parent {
  display: grid;
  grid-template-columns: repeat(2,1fr);
}
parent > direct-child {
  display: grid;
  grid-template-columns: subgrid; /* inherits parent's grid "lines" */
}
```
