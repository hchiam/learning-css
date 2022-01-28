# Learning CSS / CSS3

Just one of the things I'm learning. <https://github.com/hchiam/learning>

<https://css-tricks.com>

<https://codepen.io/hchiam>

<https://app.memrise.com/course/700033/learn-css>

<https://css-for-js.dev>

## Miscellaneous notes

(Make VSCode ignore auto-formatting with `prettier.setting` > Prettier: Require Config. Or just temporarily turn off formatting on save: `editor.formatOnSave`.)

- My CSS boilerplate: https://github.com/hchiam/css-boilerplate

- <https://speakerdeck.com/dmosher/so-you-want-to-be-a-front-end-engineer>
  - Cascade Priority:
    - Browser defaults < WithOUT `!important` (user < author) < With `!important` (author < user)
    - using style resets is nice to have the same cross-browser starting point, but at the cost of performance
    - limit `!important` —> becomes messy
  - CSS Specificity:
    - `!important` (10,000) > inline (1000) > ID (100) > class (10) > element (1)
    - tip: use classes more than IDs = this means you’re doing a healthy amount of reuse/abstraction of visual patterns
    - tip: keep specificity as low as possible ("ECII"! sounds like "easy!", 5 symbols)
  - CSS Rule Conflict Resolution:
    - If different CSS selectors have the same specificity then browsers check other things too:
      - `!important`
      - Origin (author, user, browser - see earlier cascade priority)
      - Specificity (ABCD)
      - Source Order
  - Layout & Paint
    - Layout process: recursive, with parents depending on children
      - parent computes width
      - iterate over children
        - place child renderer (x,y)
        - call child layout if dirty
      - parent computes height
      - parent sets dirty bit to false (so if browser comes back to parent, it knows it doesn’t need to re-layout/“reflow” the parent)
    - Painting Process:
      - background colour
      - background image
      - border
      - children
      - outline
  - Reflow is triggered by:
    - font/screen size
    - add/remove stylesheets
    - change in DOM
    - user input, :hover, etc.
    - changing class attr
    - when calculating the offset of a node
  - Ways to Minimize the Effects of Reflow:
    - make DOM changes in lower children
    - avoid inline styles (which trigger reflow)
    - animate ONLY fixed/absolute elements (not trigger reflow on other elements)
    - avoid using tables for layout (require multiple passes since all cells can affect all cells)
  - Painting Optimizations:
    - don't add elements hidden underneath
    - paint deltas of bitmap rectangles
- <https://www.slideshare.net/ysaw/html5-touch-interfaces-sxsw-extended-version>
  - touch: pinch: use CSS matrix transforms (instead of native pinch)
    - why:
      - to minimize DOM touches
      - to simplify transforms in the long run
    - how to use matrix transform to do pinch:
      - get center of touch points as scale center, get scale factor → scale element (use `matrix` or hardware accelerate with `matrix3d`) and translateX = scalePoint * (newWidth - oldWidth) / newWidth
      - nice: `transform: matrix(a, b, c, d, e, f);`
        - a = wider
        - d = taller
        - b = skew clockwise, as if your hands are on left/right sides
        - c = skew counter-clockwise, hands on the top and bottom
        - e = move right
        - f = move down
        - example: `transform: matrix(1, 0, 0, 1, 10, 10);`
      - EVEN BETTER: hardware acceleration with `transform: matrix3d`
        - example:

          ```css
          transform: matrix3d(
              1,0,0,1,
              0,1,0,0,
              0,0,1,0,
              xOffset,yOffset,zOffset,1
          ); 
          ```

        - example: <https://codepen.io/hchiam/pen/LYRQWOx>
        - btw, [matrix3d is faster than translate](https://stackoverflow.com/questions/23573621/why-is-css-matrix3d-rendered-faster-than-css-position)
- Check/debug performance of animations/load/speed:
  - <https://developer.chrome.com/docs/devtools/evaluate-performance>
  - <https://www.debugbear.com/blog/devtools-performance#cpu-flame-chart>
- CSS flexbox, hand-written visual summary on one sticky note:
  - <https://drive.google.com/file/d/1FT-EEwIou3rGAuripb-SMPyTNwhXhG0F/view>
- <https://www.webfx.com/blog/web-design/12-common-css-mistakes-web-developers-make>
  - use CSS Reset
  - use hex instead of color names (color names have value decided by the browser)
  - remember print stylesheets: `<link rel="stylesheet" href="print.css" media="print" />`
- <https://adamschwartz.co/magic-of-css>
  - box-sizing:

    ```css
    html { /* for more intuitive widths and paddings: */
        box-sizing: border-box
    }
    *, *::before, *::after {
        box-sizing: inherit
    }
    ```

  - `display: inline-block; /* for better horizontal scrolling */`
    - <https://www.w3schools.com/css/css_inline-block.asp>
    - vs inline, inline-block lets you set width/height and margin/padding, but inline-block can't wrap
    - vs block, inline-block lets the element sit next to other elements
  - vertical centering content with unknown height:
    - `display: table;`
    - `display: table-cell; vertical-align: middle;`
  - another way to create a grid:
    - `display: inline-block;`
    - `text-align: justify;`
  - best practice: DRY CSS:
    - Avoid specifying specific sizes.
    - Aim let content determine size. = flexible, more use cases, less future bugs.
      - example:
        - bad, specific sizes: `height: 2.5em; top: -2.5em;`
        - good, content determines size: `bottom: 100%; /* dynamic! */`
        - how?: think "shift up 100% from bottom" instead of "shift up by a negative top"
  - avoid using `<table>`s for non-table data (the table layout engine is confusing)
    - if you have to use a `<table>`, then wrap each table cell (`<td>`) in a `<div>`
  - colours are rendered/perceived differently by different devices, environments, & people
  - colours have psychological effects but also perceptual quirks that must be accounted for, like how light-coloured text on dark feels thicker than it actually is
  - (random: `font-variant` can make text all capitals but small-caps letters, like Bible)
  - (random: `white-space: pre;` lets you make a `<p>` behave like a `<pre>`)
    - (there's also a `white-space: pre-wrap;` option that combines wrap & pre)
  - (random: `word-spacing: 100px;` to size the spaces to the right of words)
  - you can use radio buttons + divs as accordions:

    ```css
    .baffle{
        height: 0;
    }
    input[type="radio"]:checked + .baffle { /*when check radio!*/
        height: 10em;
    }
    ```

- Visual Hierarchy
  - visual hierarchy guides the user's eyes (start → end) <https://www.pinterest.ca/pin/362680576233403543>
  - <https://visme.co/blog/visual-hierarchy>
  - big to small. top to bottom. main to details. visually grouped = mentally grouped. <https://moakgroup.com/2018/04/design-with-typography-on-your-mind>
  - improve things like business card or resume. SIZE! Colour! Different fonts! <https://visme.co/blog/visual-hierarchy>
- <https://youtu.be/Qhaz36TZG5Y?t=263>
  - flexbox for lines → CSS grid for bigger picture
  - replace media queries with clamp:

    ```css
    /* clamp isn't supported in IE */
    /* replace a bunch of media queries with clamp() */
    article {
    width: clamp(200px, 50%, 600px);
    }
    ```

  - number headers like h1 without manually typing numbers:

    ```css
    :root {
      counter-reset: some-name; /* 0 by default */
      /* you can also set initial value: */
      /* counter-reset: some-name -1; will have first number show in UI as 0 */
    }
    h1 {
      /* increment by 1 right away */
      counter-increment: some-name;
    }
    h1::before {
      content: counter(some-name);
    }
    ```

  - `button:focus-within {}`
  - PostCSS lets you use modern features even if not (currently) supported.
  - extra: clamp(minimum, preferred, maximum)

    ```css
    something {
      width: clamp(45ch, 50%, 75ch);
      scroll-padding: 1rem 0 0 0;
    }
    ```

  - generate colour themes more easily:

    ```css
    /* same saturation and lightness,
    but vary hue,
    and the colours will look like they go together: */
    .theme-one {
    background: hsl(25, 50%, 50%);
    }
    .theme-two {
    background: hsl(50, 50%, 50%);
    }
    .theme-three {
    background: hsl(75, 50%, 50%);
    }
    ```

- <https://www.smashingmagazine.com/2018/05/guide-css-layout>
  - float
    - clear float
  - position: relative parent, absolute child
    - position: sticky > fixed
  - display: none
  - display: contents = not the box but just its children
  - display: flex vs display: grid
    - display: flex = linear. think in terms of main axis and cross axis (can be reversed, so it’s different terms than for grid).
      - flex: flex-grow flex-shrink flex-basis = share-of-growth share-of-shrink start-size = 1 1 0 (for example)
    - display: grid = 2d. think in terms of inline axis and block axis.
      - grid-template-columns (and let grid to create rows as required) : 1fr 100px 2fr (for example).
      - grid-gap: 20px (for example).
      - .container > div:nth-child(3n) { grid-row-end: span 2; } = every 3rd div takes up 2 rows (but may only take up 1 column)

      ```css
      .item {
          grid-column: 1 / 3; /* = start-line end-line */
          grid-row: 1 / 3; /* = start-line end-line */
      } /* = spans 2 column tracks and 2 column rows = covers 4 grid cells */
      ```

      - grid items can occupy the same cells -> enables overlapping content in a grid
      - grid-template-areas (to show “map” of the grid layout) uses grid-area (which “name” elements used in the “map”)
- more info on CSS Grid: <https://www.freecodecamp.org/learn/responsive-web-design/css-grid/use-grid-row-to-control-spacing>
- more info on CSS Flexbox: <https://www.freecodecamp.org/learn/responsive-web-design/css-flexbox>
- Responsive Design: <https://web.dev/learn/design/>
- Keep [learning CSS](https://web.dev/learn/css/), including CSS selector specificity calculation: <https://web.dev/learn/css/specificity/#visualizing-specificity>
- CSS `contain: content` for better performance: <https://github.com/hchiam/learning-css-contain>
- CSS variables and `:root` in `@media` for cleaner globally reduced motion in 1 spot <https://codepen.io/hchiam/full/wvqEQob>
- CSS `grid-column` vs `grid-template-columns`: <https://www.w3schools.com/cssref/tryit.asp?filename=trycss_grid-column>
  - `grid-template-columns` goes on the container that you set `display: grid` on. It tells CSS the size of the columns in the grid.
  - `grid-column` goes on the children inside the container that you set `display: grid` on. It tells CSS the start / end columns of the item inside the grid. For example: `grid-column: 1 / span 3;` means it'll span columns 1 and 3, while just `grid-column: 1 / 3;` means it'll go from column line 1 (left-most) to column line 3 (which makes it look like it's spanning columns 1 and 2).
  - relatedly, `grid-template-areas` lets you map out grid children in a more visual way. It also goes on the container that you set `display: grid` on. You can assign something like `grid-area: A;` to each child item.
  - <https://codepen.io/hchiam/pen/PoKdVya?editors=1100>
- colour palette generator: <https://coolors.co>
- <https://ishadeed.com/article/defensive-css/>
  - `overscroll-behavior-y: contain;` can be used to prevent scrolling to the end of the modal scrolling the background; lock scroll chaining
  - CSS variable fallback value: `var(--actions-width, 70px)`
  - don't forget `background-repeat`:
    ```css
    background-image: url('..');
    background-repeat: no-repeat;
    ```
  - vertical media queries exist:
    ```css
    @media (min-height: 600px) {
      .aside__secondary {
        position: sticky;
        bottom: 0;
      }
    }
    ```
  - set a `background-color` even on `<img>` elements so that even if the image fails to load, then any overlaid text still can have guaranteed contrast
  - got layout shifts caused by scrollbar appearing? try `scrollbar-gutter: stable;` to always reserve space for the scrollbar gutter!
  - `auto-fit`: stretch to fit. `auto-fill`: fill what can. I think I like `auto-fill` better for more cases.
- HSL colour degree reference: (mnemonic: 0 30 60 100 200 300)
  - red: 0deg
  - orange: 30deg
  - yellow: 60deg
  - green: 100deg
  - blue: 200deg ([голубой](https://en.wiktionary.org/wiki/%D0%B3%D0%BE%D0%BB%D1%83%D0%B1%D0%BE%D0%B9#Adjective)) and 250deg ([синий](https://en.wiktionary.org/wiki/%D1%81%D0%B8%D0%BD%D0%B8%D0%B9#Adjective))
  - purple: 300deg

## more recent CodePen experiments and notes made around the time I'm taking [CSS in JS](https://css-for-js.dev/) course:

- CSS shadow via `box-shadow` vs via `filter: drop-shadow`: https://codepen.io/hchiam/pen/YzrrVGL

- CSS `filter: saturate(#);`: https://codepen.io/hchiam/pen/mdBBmOG

- CSS horizontal radiuses / vertical radiuses: https://codepen.io/hchiam/pen/bGoorOm

- CSS border auto-uses text color. Also CSS has `currentColor` keyword: https://codepen.io/hchiam/pen/qBPPQVg

- Fancy hover link (but must be one-liner link): https://codepen.io/hchiam/pen/LYzzaow (Note that `display: inline` elements act weird because they're treated like text: extra line-height spacing underneath, automatically filling the width, not responding to top/bottom margins.)

- CSS fit-content: https://codepen.io/hchiam/pen/eYGGoNQ (`fit-content` is an intelligent in-between for `min-content` and `max-content`)

- `.max-width-wrapper`: https://codepen.io/hchiam/pen/dyVVLqN

- `100vh` isn't always 100% of viewport for mobile because of scrolling and browsers trying to avoid flickering issues. Instead of `100vh`, use `height: 100%` on `html` and on `body`.
  - "`min-height: 100%` trick": `body` `height: 100%` and `main` `min-height: 100%` so that `main` can still grow to fit content inside of `main`

- `height` looks at children (e.g. content), like shrinkwrap
- `width` looks at parent

- CSS margin collapse rules weirdness: https://codepen.io/hchiam/pen/WNZZqjo
  - overlapping inline-direction margins don't collapse, but
  - overlapping block-direction margins DO collapse, but only in the default flow layout (flow != flex), and only if there's no elements between them (nesting / a parent's closing tag doesn't count as blocking collapsing margins!), and no padding/border/height gap directly between (between siblings, or between parent/child depending on the side of the parent's border).
    - The bigger margin (absolute value) will be used (think personal space or physical distancing during COVID), whether we're talking siblings or parent/child. One less intuitive example is a child with larger block-direction margin than its parent will make it look like its parent has the large margin. This means a parent with 0 block-direction margin can take on its child's block-direction margin, because whatever number >0 is a bigger absolute value than 0.
      - The "bigger absolute value" means a more negative margin will be used when both are negative.
      - When one is positive and one is negative, they'll be added together to cancel each other out (instead of comparing absolute values).
      - Similarly, if there's multiple positive and negative margins to overlap, take the most positive and most negative margins and add those.
      - So if you want a child to be lower down inside its parent, you might want to add top padding to the parent instead of trying to incorrectly add top margin to the child.

- https://github.com/hchiam/huckleberry

- CSS absolute positioning rules conflict resolution: https://codepen.io/hchiam/pen/GRMOrWV

- `position: absolute` child is positioned relative to closest `position`ed ancestor: https://codepen.io/hchiam/pen/mdBqKPp

- browser paints `position: static` (default) before elements with `position` != `static`

- Without a `z-index` escape hatch, by default, stacking order = non-positioned with be under positioned, then stacked on top in DOM order. If you're in the default flow (!= flex) layout, content will float to the front regardless of stacking. Importantly, if two elements are in the same stacking context and are both `position`ed, then the one that appears later in the DOM will be placed on top.
- `z-index` only works on `position`ed elements (and can also be used with flex/grid children)
- Note: stacking context != parent-child. Analogy: image editor layers, or semver 1.999 is always less than 2.0. https://codepen.io/hchiam/pen/qBPpWyj
- `isolation: isolate` is the purest side-effect-free way to create a **_"local/scoped"_ stacking context** with an element (no need to set a `z-index` or `position` on that element): https://www.joshwcomeau.com/css/stacking-contexts/
  - instead of using implicit triggers
  - and can solve things like layered cards unintentionally overlapping with the header when you scroll up: `isolation: isolate` works to group things so internal stacking only matters within the group and doesn't affect other things.
  - set `isolation: isolate` on your React `#root` element so you can isolate the main content from any ["portal"](https://github.com/hchiam/learning-react-portals)ed modals (which get listed last in the DOM) and avoid fighting escalating `z-index` wars:
    ```html
    <div id="root" style="isolation: style;">
      <header>This sticky content goes overtop main content but below modal.</header>
      <main>Main content that could also have overlaid tooltips and cards.</main>
    </div>
    <div>Some "portal"ed modal element that must always be above any content without knowing z-index values.</div>
    ```
    Or use a library like [Reach UI](https://reach.tech/) to solve the stacking problem for you: swap `CustomLoginModal` for `ReachLoginModal` in https://codesandbox.io/s/stacking-contexts-global-contexts-zcjbt?file=/src/Header.js
- CSS Stacking Context inspector:
  - Chrome: https://chrome.google.com/webstore/detail/css-stacking-context-insp/apjeljpachdcjkgnamgppgfkmddadcki
  - Firefox: https://addons.mozilla.org/en-US/firefox/addon/css-stacking-context-inspector/
- centering a modal:

  ```css
  .modal {
    /*
      Need for centering to work:
      - position absolute or fixed (usually fixed for modal)
      - all sides 0 (left, right, top, bottom)
      - auto margins
    */
    position: fixed;
    inset: 0;
    margin: auto;

    width: 85%;
    height: max-content;
  }
  ```

- an ancestor using `transform` (or `will-change: transform`) un-intuitively makes any `position: fixed` descendants be relative to the ancestor, instead of (what you'd normally expect) relative to the viewport. i.e., `transform`ed ancestors can't have `fixed` descendants

- tip: always comment `position: relative;` when you add it (non-`static`) to make its `overflow` respected by its `position: absolute` descendants, so future you can see why.
- tip: always comment `overflow: hidden;` so future you remembers why. especially important since usually the reason for it isn't obvious from the code and has to do with elements that aren't expressed around that `overflow: hidden` declaration

- warning: setting just `overflow-x: hidden` xor `overflow-y: hidden` triggers a scrollbar to show. you _can't_ clip overflow in one dimension while also allowing overflow in the other _without also_ triggering a scrollbar to show.
  - `overflow-x` and `overflow-y` can be used to hide and show scrollbars, but you can't make content overflow in only one dimension and clip in only one dimension
  - `overflow-x: visible` and `overflow-y: visible` = overflow, no scrollbars
  - `overflow-x: hidden` and `overflow-y: hidden` = clipped, no scollbars
  - `overflow-x` and `overflow-y` with 1 `hidden` and 1 `visible` = 1 clipped, and 1 scrollbar if overflowing

- ancestor with both `position` and `overflow` will have its overflow scroll applied to `position: absolute` descendants, otherwise the `position: absolute` descendants won't "listen" to its scroll if it only has `overflow` i.e.;
- `position: absolute` ignores parent `overflow: hidden` unless that same parent also has `position: relative`
  - why? you'd expect `position: absolute` elements to get ignored, but like in another note (look up), a `position: absolute` child gets contained by a `position`ed ancestor, so a parent with `overflow: hidden` needs `position` something for the child to "listen" to it
  - `position: fixed` ignores `overflow: hidden` even more!
  - a child only triggers overflow if that child is contained by the ancestor

- a `position: sticky` child stays within its containing ancestor, so if its containing ancestor scrolls off-screen, then so does the `position: sticky` element
  - sticky elements stay within their containing ancestors: https://codepen.io/hchiam/pen/wvrpPOM
  - you can create a `sticky` header with a buffer using `padding-top` and negative `top`: https://codepen.io/hchiam/pen/XWeVVqO

- if `position: sticky` isn't working, check if an ancestor has some `overflow` value other than visible
- setting `overflow` makes `sticky` descendants stick within, no longer globally

- you can make a hole in visibility: children visible while their parents are invisible: ancestors can have `visibility: hidden` and descendants can have `visibility: visible` (this _**doesn't**_ work with other things like `display: none`, `opacity`, `aria-hidden="true"`)

- consider making React components toggle screen-reader-only text visibility in dev mode: https://www.joshwcomeau.com/snippets/react-components/visually-hidden/
  - automatic translation services may not translate `aria-label`s, so you might have to use this solution (which also lets you bundle other related features)

- note: `aria-hidden="true"` hides elements from screen readers, but doesn't remove it (nor descendants) from tabbing, so you also need to make it [`inert`](https://github.com/WICG/inert) (or `tabindex="-1"`)

- **clean styling code:** regardless of styling tool, you can adjust your tactics to aim for the same conceptual strategies:
  - avoid **naming collisions** (which styles get applied?)
  - avoid **specificity unclear-ness** (which styles get applied?)
  - keep **styles strictly scoped** to an element (will I only style what I intended?)
  - _**THEN**_ with all the above, you can easily **figure out what styles apply** to an element, and you can easily **change styles without fear of unintentionally affecting** elements you didn't know about
  - _**BUT**_ consider [`styled-components`](https://github.com/styled-components/styled-components), since it helps encourage good dev habits and **solves these problems** for us. (It also covers vendor prefixes and lets you do things like let JS data affect CSS styles.) If you can't use it, consider at least learning from its strategies to apply to your own code (e.g. legacy code base).
    - [`@emotion/css`](https://emotion.sh/docs/introduction) is a [similar alternative that's framework agnostic](https://emotion.sh/docs/@emotion/css)
    - [twin](https://github.com/ben-rogerson/twin.macro) is an interesting React alternative that combines Tailwind classes with styled-components and sass styling for things that don't have Tailwind classes

- global styles:
  - CSS resets for cross-browser consistency
  - CSS resets to smooth out CSS quirks, `box-sizing: border-box`, etc.
  - set global defaults as fallbacks in case you forget to `import` the right component
  - `!important` is acceptable for overriding the default styles of 3rd party libraries' components
  - aim to keep the global styles relatively short and easy to remember when you code

- inline styles are usually not a good idea because now you have to check multiple places for styling, and they don't work with media queries

- CSS variables are quick and easy for dynamic styles, but CSS variables aren't as flexible as `styled-components` interpolations (e.g. media queries and fancy dynamic styling in the context of a framework like React), and CSS variables aren't supported in IE, so if you have to support IE, consider using `styled-components` interpolations:

- `styled-components` lets you do very dynamic styling with things like this:

  ```jsx
  import styled from "styled-components/macro";

  export const MaxWidthWrapper = ({ children, maxWidth, someBoolean }) => {
    return <Wrapper maxWidth={maxWidth}>{children}</Wrapper>;
  };

  const Wrapper = styled.div`
    max-width: ${(props) => props.maxWidth};
    margin-inline: auto;
    padding-inline: 16px;
    font-weight: ${(props) => props.someBoolean && 'bold'};
      /* if false, it won't write this line; you won't get font-weight: false; */
  `;

  // ...

  import { createGlobalStyle } from "styled-components";
  
  const GlobalStyles = createGlobalStyle`
    *, *::before, *::after {
      box-sizing: border-box;
    }
    html, body, #root {
      height: 100%;
      margin: 0;
      padding: 0;
    }
    body {
      background-color: #333;
    }
    #root {
      padding: 1rem;
    }
  `;
  export default GlobalStyles;
  ```
  
  - the `${}` can be interpolated even within a selector!

- scroll indicator shadows implemented with pseudo elements + `sticky` overlay elements: https://codepen.io/hchiam/pen/gOGKzwB or see [scroll-indicator-shadow-overlay.scss](https://github.com/hchiam/learning-css/blob/main/scroll-indicator-shadow-overlay.scss) (as opposed to the background shadow technique https://codepen.io/hchiam/pen/bGEJweq)

- improving animation performance: https://medium.com/@matthew.costello/frontend-web-performance-the-essentials-0-61fea500b180
  - change `left` (layout) to `background-position` (paint) to `transform` (composite) = fastest, but avoid overusing properties that would create too many composite layers to manage
  - use Chrome DevTools "Performance" tab > (record) > find red dropped "Frames" > see "Main" for things using up time like "Layout" or "Paint" or "Recalculate style" (which can point out things like "[Forced reflow](https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing?utm_source=devtools#avoid-forced-synchronous-layouts) is a likely performance bottleneck")
  - use Chrome DevTools "Rendering" panel to highlight things that are causing repaints or layout shifts.

- CSS `:target` fun: https://codepen.io/hchiam/pen/vYeaxRr

- Gradient generator (no more grey transition middle!): https://www.joshwcomeau.com/gradient-generator (basically ["generate a bunch of midpoint colors using a custom color mode, and pass them all to our CSS gradient function. The CSS engine will use RGB interpolation, but it won't affect the final result (at least, not by enough for it to be perceptible to humans)"](https://www.joshwcomeau.com/css/make-beautiful-gradients/#:~:text=generate%20a%20bunch%20of%20midpoint%20colors%20using%20a%20custom%20color%20mode%2C%20and%20pass%20them%20all%20to%20our%20css%20gradient%20function.%20the%20css%20engine%20will%20use%20rgb%20interpolation%2C%20but%20it%20won't%20affect%20the%20final%20result%20(at%20least%2C%20not%20by%20enough%20for%20it%20to%20be%20perceptible%20to%20humans)))

- example of styled-components style composition: `SomeComposedStyle = styled(SomeBaseStyle)``;` instead of just `SomeBaseStyle = styled.button``;`

- contrast checker: https://webaim.org/resources/contrastchecker (useful in cases like comparing button background colour to page background colour, which DevTools currently can't check)

- colour-blindness: built-in DevTools in Chrome and in Firefox let you easily simulate different types of colour vision: red and yellow are a good pair of colours if you really can't use non-colour ways to distinguish items (differently dashed lines? or arrows pointing to the lines in the graph?)

- you can disable animations inside `@media (prefers-reduced-motion: reduce)`
- but this is better: `@media (prefers-reduced-motion: no-preference)`: animations off by default, users enable animations, and browsers without support don't animate (good accessibility):

  ```css
  @media (prefers-reduced-motion: no-preference) {
    .fancy-box {
      transition: transform 0.2s;
    }
  }
  ```

- mnemonic: "prefer `no-preference` for `prefers-reduced-motion`"
- in JS, we can get this value too:

  ```js
  const reduceMotionForPreferenceOrForOldBrowser = !window.matchMedia('(prefers-reduced-motion: no-preference)').matches; // note the "!"
  ```

- in JS, we can _watch_ this value too:

  ```js
  const mediaQueryList = window.matchMedia('(prefers-reduced-motion: no-preference)');
  const listener = () => {
    const reduceIt = !window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
    console.log('reduce animation if old browser or explicitly preferred:', reduceIt);
  }
  mediaQueryList.addListener(listener);
  // mediaQueryList.removeListener(listener);
  ```

- you may need to set `display: block;` for an element to take `padding`

- elements can only have 1 layout mode at a time.

- `display: flex` sets its _children_ to a `flex` layout mode, so a child with `display: block` will still instead behave in a `flex` layout mode, and the element itself will use flow layout.
- note: `flex` children don't like to have content like text overflow out of them, unless you force them with a `width` intentionally smaller than the min content width
  - but if you use both `flex-basis` and `width`, then `flex-basis` will get used.
  - and if you use both `flex` and `width`, then `flex-basis` will be set by `flex` and ignores `width`.

  ```css
  /* so use THIS: */
  .good {
    flex: 1 1 500px; /* flex-basis of 500px, basically suggested max width before calc flex-grow or flex-shrink */
  }
  /* and NOT this: */
  .bad {
    flex: 1; /* implicitly flex-basis is 0, overriding width regardless of order */
    width: 500px; /* won't get used and will be 0 */
  }
  ```

- more common `flex` props for me to use:
  - `justify-content` = primary axis (like "justify" in Microsoft Word). Set in parent, applies to children.
  - `align-items` = cross axis (how to position items) for items ("i" for "inside"). . Set in parent, applies to children, and children can override this on an individual basis with `align-self` set on the child itself.
- `align-content` = like `align-items`, except for when the line wraps around ("c" for "curve", or "content" just like `justify-content` adjusts the bigger-picture content, not individual items inside)
- on **`display: flex` _children_**:
  - **"max size":** the _`width` and `height` or `flex-basis`_ (with acts like `width` and `height` on the current primary axis) that you set are more like suggestions, and _act more like `max-width` or `max-height`_, (although width can force it shrink to less than min content width, while flex-basis can't force it). But we can also set `max-width` or `max-height`, and `flex-grow` will respect those values.
  - **"min size":** the _content's longest word_ (_NOT_ `flex-basis`) basically sets the _`min-width` or `min-height`_. But we can also set `min-width` or `min-height`, and `flex-shrink` will respect those values.
- `flex-grow` and `flex-shrink` are "unitless" fractionals (ratio numerators) that say how much that element grows to fill space or shrinks when there's not enough space, but `flex-shrink` can't shrink under that element's min content size

  ```css
  section {
    display: flex;
  }
  nav {
    width: 200px;
    flex-shrink: 1000;
  }
  main {
    flex-grow: 1;
  }
  .prevent-this-from-shrinking-when-space-is-sparse {
    flex-shrink: 0;
  }
  ```

- extra space? -> check each child's `flex-grow`, while respecting `max-width`.
- lack space? -> check each child's `flex-shrink`, while respecting `min-width` and content width (as long as `width` isn't explicitly smaller).
- but usually we just want to use `flex` shorthand = `flex-grow: 1`, `flex-shrink: 1`, and `flex-basis: 0` (which conceptually works like `width: 0` and filling the rest of the space like you typically want)
  - and _NOT_ recommended: setting `flex-grow` or `flex-shrink` without setting `flex-basis`, because `flex-basis: auto` is the default
  - `flex-basis: 0` = will "stretch" each item to fill additional space.
    - what you'd usually want, so just use `flex`.
  - `flex-basis: auto` = will "add" _additional_ space to items.

```css
.wrapper {
  display: flex;
}
.left, .right {
  min-width: 100px;
  max-width: 200px;
  flex: 0 1000 200px; /* 
    0: don't grow past suggested width of 200px, 
    1000: visually shrink only .right when lacking space, 
    until hit suggested width of 200px */
}
.middle {
  flex: 1 1 500px; /* 
    1: grow only .middle, 
    1: let .right appear to be the only one shrinking 
        but when .right hits its min-width then shrink .middle to not overflow body 
        (hence flex-shrink of 1 instead of 0), 
    suggested width of .middle of 500px */
}
@media (max-width: 700px) {
  .left {
    display: none; /* hide .left at smaller screen width */
  }
}
```

- also:

  ```css
  /* this is UNNECESSARILY VERBOSE and misleading: */
  .bad {
    flex: 1 1 150px;
    max-width: 150px;
  }
  /* this is CLEANER: */
  .good {
    flex: 0 1 150px; /* don't grow them but allow shrinking for really tiny screens */
  }
  ```

- CSS Grid works like parking lot lines, and rectangular children can decide how they fill/take up spots (but also overlap, unlike in parking lots).
- CSS Grid structure can be selectively ignored.
- If you need to support older browsers, fallback to flexbox (and ensure tasks can be done for good UX, not necessarily identical experience):

  ```css
  /* feature query: */
  .a {
    display: flex;
  }

  @supports (display: grid) {
    .a {
      display: grid;
    }
  }
  ```

- similar to `display: flex`, `display: grid` sets its _children_ to grid layout mode
- unlike `flex-basis` "suggested" sizes, `grid-template` sets sizes as "hard limits" _by default_ (CSS grid sizes overflow by default, even with `%` sizes),
  - _unless_ you use `1fr` etc. in a CSS grid, to set grid sizes as flexibly as `flex-grow: 1` for flexbox
- `display: grid` from the parent means setting `display: inline` on a child is ignored for the same reason as setting `left: 200px` has no effect on a non-positioned element
- `display: grid` from parent overrides child `display: inline`
- `position: absolute` on child overrides parent `display: grid`
- you can "paint by colour" with CSS [`grid-template`](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template) while also setting `row / column` sizes:

  ```css
  grid-template: 
      "a a ." minmax(50px, auto)
      "a a ." 80px
      "b b c" auto / 1fr 1fr 5fr;
  ```

- by default, CSS grid dynamically/implicitly assigns children to cells/rows and dynamically sets each row's height to be the tallest in each dynamically-generated row by default (you can explicitly set row heights if you want though), which is useful for listing out a dynamic list of data into some grid-like display, like a calendar month where you don't want/have to explicitly say how many rows to allocate space for
