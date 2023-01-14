# Learning CSS / CSS3

Just one of the things I'm learning. <https://github.com/hchiam/learning>

There's a lot of notes here! Intended use: Ctrl+F to help myself recall things.

<https://css-tricks.com>

<https://codepen.io/hchiam>

<https://app.memrise.com/course/700033/learn-css>

<https://css-for-js.dev>

- https://www.joshwcomeau.com/css/understanding-layout-algorithms

  - **Mental model for CSS:**
    - **layouts = algorithms**, and
    - **properties = inputs to those algorithms**.
    - Also: CSS is a collection of mini languages.
  - (Note that layout mode isn't only set by the `display` property, it can also be set by `position`, `float`, the parent having `display:flex`, etc.)
  - (Note that there should be 1 primary layout mode on an element, and parent/child layout modes can conflict, but `position`ed layout on the element itself usually beats all other layouts trying to be applied to that element - except for `position:relative`.)
  - Remember that flow layout is the default, and so img tags will get extra blank space added below images because it's treated like text, which can't be easily tweaked with `padding`/`border`/`margin`. And `white-space: nowrap;` is required if you want `overflow-x: auto;` to work on a row of `<img>`s because images are treated like text by default. Learning only about specific properties won't explain things like this!
  - Different layout modes can have different default behaviour for any property:
    - For example, the `width` property is implemented differently depending on the layout algorithm: e.g.: in flow layout, `width:2000px` is `2000px`, but in `flex` layout, `width:2000px` is treated as a "suggestion"!

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

      - get center of touch points as scale center, get scale factor → scale element (use `matrix` or hardware accelerate with `matrix3d`) and translateX = scalePoint \* (newWidth - oldWidth) / newWidth
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

          ```text
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
    html {
      /* for more intuitive widths and paddings: */
      box-sizing: border-box;
    }
    *,
    *::before,
    *::after {
      box-sizing: inherit;
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
    .baffle {
      height: 0;
    }
    input[type="radio"]:checked + .baffle {
      /*when check radio!*/
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
- CSS variables can be inherited by child elements and can updated dynamically with JS (unlike SCSS variables which transpile to static values).
- CSS variables (AKA CSS custom properties) and `:root` in `@media` for cleaner globally reduced motion in 1 spot <https://codepen.io/hchiam/full/wvqEQob>

  - like a single source of truth (that can be locally overridden/inherited):

    ```css
    @media (pointer: coarse) {
      /* media query --> responsive CSS variable! */
      html {
        --min-tap-height: 44px; /* no need to manage/customize everywhere! */
      }
    }
    .some-button,
    .some-input {
      min-height: var(--min-tap-height, 32px);
    }
    ```

  - CSS variables are evaluated when used, not when defined, and are composable:

    ```css
    /* GOOD: more flexible and concise: */
    body {
      --hue: 275deg;
      --intensity: 100% 50%;

      --my-color: hsl(var(--hue) var(--intensity));

      --space: 8px;
      border-radius: calc(var(--space) / 2 + 2px);
      font-size: calc(24 / 16 * 1rem);
    }

    /* BAD: as opposed to: */
    body {
      --color-blue-25: hsl(275deg 50% 25%);
      --color-blue-50: hsl(275deg 50% 50%);
      --color-blue-75: hsl(275deg 50% 75%);
      --color-blue-90: hsl(275deg 50% 90%);
      /* ... */
    }
    ```

    or

    ```css
    :root {
      --red-hue: 0deg;
      --red: hsl(var(--red-hue) 100% 50);
      --orange: hsl(calc(var(--red-hue) + 20deg) 100% 50);
      --yellow: hsl(calc(var(--red-hue) + 40deg) 100% 50);
    }
    ```

- CSS `grid-column` vs `grid-template-columns`: <https://www.w3schools.com/cssref/tryit.asp?filename=trycss_grid-column>
  - `grid-template-columns` goes on the container that you set `display: grid` on. It tells CSS the size of the columns in the grid.
  - `grid-column` goes on the children inside the container that you set `display: grid` on. It tells CSS the start / end columns of the item inside the grid. For example: `grid-column: 1 / span 3;` means it'll span columns 1 and 3, while just `grid-column: 1 / 3;` means it'll go from column line 1 (left-most) to column line 3 (which makes it look like it's spanning columns 1 and 2).
  - relatedly, `grid-template-areas` lets you map out grid children in a more visual way. It also goes on the container that you set `display: grid` on. You can assign something like `grid-area: A;` to each child item.
  - <https://codepen.io/hchiam/pen/PoKdVya?editors=1100>
- curated colour palettes in context: <https://www.happyhues.co>
- <https://ishadeed.com/article/defensive-css/>
  - `overscroll-behavior-y: contain;` can be used to prevent scrolling to the end of the modal scrolling the background; lock scroll chaining
  - CSS variable fallback value: `var(--actions-width, 70px)`
  - don't forget `background-repeat`:
    ```css
    background-image: url("..");
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
  - `auto-fit`: stretch to fit. `auto-fill`: fill the space with elements _or placeholder gaps_. I think I like `auto-fill` better for more cases.
- HSL colour degree reference: (mnemonic: 0 30 60 100 200 300)

  - red: 0deg
  - orange: 30deg
  - yellow: 60deg
  - green: 100deg
  - blue: 200deg ([голубой](https://en.wiktionary.org/wiki/%D0%B3%D0%BE%D0%BB%D1%83%D0%B1%D0%BE%D0%B9#Adjective)) and 250deg ([синий](https://en.wiktionary.org/wiki/%D1%81%D0%B8%D0%BD%D0%B8%D0%B9#Adjective))
  - purple: 300deg

- stuff you can do without JS-heavy web frameworks: https://codepen.io/hchiam/pen/ExbmjEP

## more recent CodePen experiments and notes made around the time I'm taking [CSS in JS](https://css-for-js.dev/) course:

- CSS shadow via `box-shadow` (direction choice) vs via `filter: drop-shadow` (contoured shadow): https://codepen.io/hchiam/pen/YzrrVGL

  - note: it's `drop-shadow`, not `dropshadow`!

- CSS `filter: saturate(#);`: https://codepen.io/hchiam/pen/mdBBmOG

- CSS horizontal radiuses / vertical radiuses: https://codepen.io/hchiam/pen/bGoorOm

- CSS border auto-uses text color. Also CSS has `currentColor` keyword: https://codepen.io/hchiam/pen/qBPPQVg

- Fancy hover link (but must be one-liner link): https://codepen.io/hchiam/pen/LYzzaow (Note that `display: inline` elements act weird because they're treated like text: extra line-height spacing underneath (which you can get rid of with `line-height:0`), or automatically filling the width, not responding to top/bottom margins.)

- CSS fit-content: https://codepen.io/hchiam/pen/eYGGoNQ (`fit-content` is an intelligent in-between for `min-content` and `max-content`)

- `.max-width-wrapper`: https://codepen.io/hchiam/pen/dyVVLqN

- `border-image-slice`:

  - `border-image-slice` [is how much of the corners of the border image to use for the border corners and the remaining middle edges of the image for the border edges - see the 9-part grid for a conceptual hint](https://developer.mozilla.org/en-US/docs/Web/CSS/border-image-slice)

  - here's an example on CodePen: https://codepen.io/hchiam/pen/YzEvpOr?editors=0100

  - [there's a lot more you can do](https://developer.mozilla.org/en-US/docs/Web/CSS/border-image)

- `appearance: none`: https://codepen.io/hchiam/pen/abVXZYx

- CSS `::selection` styling: https://codepen.io/hchiam/pen/VwQPvQG

- more easily style-able dropdown that also makes use of native `select` cross-compatible usability: https://codepen.io/hchiam/pen/OJOwrdX

- auto-increase click target size with just CSS and then adding a `.click-target-helper` class to elements you want to apply it to: https://codepen.io/hchiam/pen/mdpBpme (or just use a `::after` element with `position: absolute;` and a negative `inset` or negative `top`, `right`, `bottom`, `left` values to increase the tap target area without affecting layout! - just make sure the button can have `position: relative;`)

- blurred glow: https://codepen.io/hchiam/pen/JjpRmmy?editors=1100

- `backdrop-filter` to make an element semi-transparent like frosted glass: https://codepen.io/hchiam/pen/OJQRBqq?editors=1100 (works best on Chrome)

  - ```css
    /* (Firefox fallback semi-transparent background for contrast) */

    @supports (backdrop-filter: blur(12px)) {
      /* (styles for browsers supporting backdrop-filter) */
    }
    ```

- asymmetrical/oval border-radius: https://codepen.io/hchiam/pen/eYVdQOg?editors=1100

- nested border-radiuses, calculated!: https://codepen.io/hchiam/pen/xxYEQOY?editors=1100

  - inner radius = outer radius - padding

  ```css
  .outer {
    border-radius: var(--outer-radius);
    padding: var(--padding);
  }
  .inner {
    --inner-radius: calc(var(--outer-radius) - var(--padding));
    border-radius: var(--inner-radius);
  }
  ```

  - `border-radius: 100vmax` makes the left/right or top/bottom ends of a box always end in circles: https://codepen.io/hchiam/pen/xxYEQOY?editors=1100

- "Moat" with inset shadow + normal shadow and nested radiuses: https://codepen.io/hchiam/pen/bGLBWej?editors=1000

- generate shadows with coordination (low/med/hi) and realism (spread and background colour accounted for) and adaptability (`--shadow-color`): https://www.joshwcomeau.com/shadow-palette

- Simulated Stylable Select (CSS + JS): https://codepen.io/hchiam/pen/wvprLpV

- https://github.com/hchiam/mini-component-library

- https://github.com/hchiam/sole-and-ankle and https://github.com/hchiam/sole-and-ankle-revisited

- https://github.com/hchiam/scrollburglars

- `100vh` isn't always 100% of viewport for mobile because of scrolling and browsers trying to avoid flickering issues (for mobile, `100vh` is currently set to the largest possible height, like when the URL and bottom buttons slide away when you scroll). Instead of `100vh`, use `height: 100%` on `html` and on `body`.
  - "`min-height: 100%` trick": `body` `height: 100%` and `main` `min-height: 100%` so that `main` can still grow to fit content inside of `main`
- `100vw` has a similar problem: it doesn't include the scrollbar, which is fine on mobile (scrollbar "floats" and adds 0 space), but it's a problem on desktop, when the scrollbar takes up its own space, which depends on platform, and may then overflow.
  - JS can get scrollbar width set by platform: `const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;` (then use cssVariables.js to set up `--full-width: calc(100vw - var(--scrollbar-width));`)
- OR, consider always showing a scrollbar (`overflow-y: scroll;`), to avoid other problems like dynamic content overflowing and causing a scrollbar to be added later, and to avoid layout shift (which is bad UX and potentially bad perf too).
- we can use `clamp` to set a min and max, but we can combine it with other things to enable things like setting _two_ max widths:

  ```css
  .two-max-widths {
    /* max width of fixed 100px or dynamic 100%: */
    width: clamp(10px, 10%, 100px);
    max-width: 100%;
  }
  ```

- ```css
  .hero {
    min-height: min(80vh, 500px);
    /*
    min-height = can grow if needed.
    min(80vh, 500px) = respond to different screen heights:
      tall: min-height: 500px = avoid dead space and tons of scrolling.
      short: min-height: 80vh = text not truncated on top, and avoid dead space too.
     */
  }
  ```

- https://stackoverflow.com/a/21064102 JS can get you 3 different widths: `offsetWidth` vs `scrollWidth` vs `clientWidth`: https://i.stack.imgur.com/5AAyW.png
  - `offsetWidth` includes border
  - `scrollWidth` includes overflow stuff you can scroll to
  - `clientWidth` includes just what you'd normally think, as long as it's inside the viewport (excludes truncated width and scrollbar width)
- `window.outerWidth` = `window.innerWidth` + sidebar etc.

- `height` looks at children (e.g. content), like shrinkwrap
- `width` looks at parent

- `margin: auto` works to center or push things away because `auto` is a "greedy" value, automatically consuming all the extra available space around the element

  - that's why `margin-block: auto` or `margin-inline: auto` trick helps center things

- CSS margin collapse rules weirdness: https://codepen.io/hchiam/pen/WNZZqjo and https://codepen.io/hchiam/pen/ExQgjOX and https://www.joshwcomeau.com/css/rules-of-margin-collapse/

  - (margin collapse applies to the default flow layout mode only (like `display:block`), since it made sense for documents, and so margin collapse doesn't happen for `display:flex` because it doesn't make sense)
  - overlapping inline-direction margins don't collapse, but
  - overlapping block-direction margins DO collapse, but only in the default flow layout (flow != flex or grid), and only if there's no elements between them (nesting / a parent's closing tag doesn't count as blocking collapsing margins!), and no padding/border/height gap directly between (between siblings, or between parent/child depending on the side of the parent's border).
    - The bigger margin (absolute value) will be used (think personal space or physical distancing during COVID), whether we're talking siblings or parent/child. One less intuitive example is a child with larger block-direction margin than its parent will make it look like its parent has the large margin. This means a parent with 0 block-direction margin can take on its child's block-direction margin, because whatever number >0 is a bigger absolute value than 0.
      - The "bigger absolute value" means a more negative margin will be used when both are negative.
      - When one is positive and one is negative, they'll be added together to cancel each other out (instead of comparing absolute values).
      - Similarly, if there's multiple positive and negative margins to overlap, take the most positive and most negative margins and add those.
      - So if you want a child to be lower down inside its parent, you might want to add top padding to the parent instead of trying to incorrectly add top margin to the child.
      - But where this analogy breaks down: while margin "distancing" collapses/overlaps in the block direction, but oddly "add" (don't overlap) in the inline direction.

- https://github.com/hchiam/huckleberry

- CSS absolute positioning rules conflict resolution: https://codepen.io/hchiam/pen/GRMOrWV

- `position: absolute` child is positioned relative to closest `position`ed ancestor: https://codepen.io/hchiam/pen/mdBqKPp

- browser paints `position: static` (default) before elements with `position` != `static`

- Without a `z-index` escape hatch, by default, stacking order = non-positioned with be under positioned, then stacked on top in DOM order. If you're in the default flow (!= flex) layout, content will float to the front regardless of stacking. Importantly, if two elements are in the same stacking context and are both `position`ed, then the one that appears later in the DOM will be placed on top.
- `z-index` only works on `position`ed elements (and can also be used with flex/grid children without `position`ing them)
- Note: stacking context != parent-child. Analogy: image editor layers, or semver 1.999 is always less than 2.0. https://codepen.io/hchiam/pen/qBPpWyj
- `isolation: isolate` is the purest side-effect-free way to create a **_"local/scoped"_ stacking context** with an element (no need to set a `z-index` or `position` on that element): https://www.joshwcomeau.com/css/stacking-contexts/
  - instead of using implicit triggers
  - and can solve things like layered cards unintentionally overlapping with the header when you scroll up: `isolation: isolate` works to group things so internal stacking only matters within the group and doesn't affect other things.
  - set `isolation: isolate` on your React `#root` element so you can isolate the main content from any ["portal"](https://github.com/hchiam/learning-react-portals)ed modals (which get listed last in the DOM) and avoid fighting escalating `z-index` wars:
    ```html
    <div id="root" style="isolation: style;">
      <header>
        This sticky content goes overtop main content but below modal.
      </header>
      <main>
        Main content that could also have overlaid tooltips and cards.
      </main>
    </div>
    <div>
      Some "portal"ed modal element that must always be above any content
      without knowing z-index values.
    </div>
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

- ```css
  /* source: https://webaim.org/techniques/css/invisiblecontent/ */
  .sr-only {
    /* screen-reader-only: */
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    height: 1px;
    width: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
  }
  ```

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

- CSS variables are quick and easy for dynamic styles at runtime (not compiled away to static values like SASS/LESS variables are), but CSS variables aren't as flexible as `styled-components` interpolations (e.g. media queries and fancy dynamic styling in the context of a framework like React), and CSS variables aren't supported in IE, so if you have to support IE, consider using `styled-components` interpolations:

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
    font-weight: ${(props) => props.someBoolean && "bold"};
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
    - recalculate applied styles -> layout -> paint -> composite/compositing (invented to enable fast scrolling by transforming what was already calculated)
    - use `will-change: transform;` to tell the browser to always use GPU all the time, instead of sometimes switching between CPU to GPU, which can have slight animation differences
  - use Chrome DevTools "Performance" tab > (record) > find red dropped "Frames" > see "Main" for things using up time like "Layout" or "Paint" or "Recalculate style" (which can point out things like "[Forced reflow](https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing?utm_source=devtools#avoid-forced-synchronous-layouts) is a likely performance bottleneck")
  - use Chrome DevTools "Rendering" panel to highlight things that are causing repaints or layout shifts.

- CSS `:target` fun: https://codepen.io/hchiam/pen/vYeaxRr

- CSS `^` vs `|` (caret vs pipe) selectors: https://codepen.io/hchiam/pen/abqrxXG?editors=1100

- Gradient generator (no more grey transition middle!): https://www.joshwcomeau.com/gradient-generator (basically ["generate a bunch of midpoint colors using a custom color mode, and pass them all to our CSS gradient function. The CSS engine will use RGB interpolation, but it won't affect the final result (at least, not by enough for it to be perceptible to humans)"](<https://www.joshwcomeau.com/css/make-beautiful-gradients/#:~:text=generate%20a%20bunch%20of%20midpoint%20colors%20using%20a%20custom%20color%20mode%2C%20and%20pass%20them%20all%20to%20our%20css%20gradient%20function.%20the%20css%20engine%20will%20use%20rgb%20interpolation%2C%20but%20it%20won't%20affect%20the%20final%20result%20(at%20least%2C%20not%20by%20enough%20for%20it%20to%20be%20perceptible%20to%20humans)>))

- example of styled-components style composition: ` SomeComposedStyle = styled(SomeBaseStyle)``; ` instead of just ` SomeBaseStyle = styled.button``; `

- contrast checker: https://webaim.org/resources/contrastchecker (useful in cases like comparing button background colour to page background colour, which DevTools currently can't check)

- colour-blindness: built-in DevTools in Chrome and in Firefox let you easily simulate different types of colour vision: red and yellow are a good pair of colours if you really can't use non-colour ways to distinguish items (differently dashed lines? or arrows pointing to the lines in the graph?)

- you can disable animations inside `@media (prefers-reduced-motion: reduce)`
- but this is better: `@media (prefers-reduced-motion: no-preference)`: animations off by default, users enable animations, and browsers without support for this media query don't animate (good accessibility):

  ```css
  @media (prefers-reduced-motion: no-preference) {
    .fancy-box {
      transition: transform 0.2s;
    }
  }
  ```

  ```css
  /* this code snippet is an example pattern for motion-safe fallback animation: */

  @keyframes fade-in {
    /* still get attention subtly but without motion */
  }
  @keyframes slide-in {
    /* use motion to direct attention */
  }
  .important-element {
    animation: fade-in 0.5s; /* safe fallback that's still helpful */
    animation-delay: 1s;
  }
  /* prevent motion if the user requests reduced motion: */
  /* prevent motion if browser doesn't support checking, just to be safe: */
  @media (prefers-reduced-motion: no-preference) {
    .important-element {
      animation-name: slide-in;
    }
  }
  ```

- mnemonic: "prefer `no-preference` for `prefers-reduced-motion`"
- in JS, we can get this value too:

  ```js
  const reduceMotionForPreferenceOrForOldBrowser = !window.matchMedia(
    "(prefers-reduced-motion: no-preference)"
  ).matches; // note the "!"
  ```

- in JS, we can _watch_ this value too:

  ```js
  const mediaQueryList = window.matchMedia(
    "(prefers-reduced-motion: no-preference)"
  );
  const listener = () => {
    const reduceIt = !window.matchMedia(
      "(prefers-reduced-motion: no-preference)"
    ).matches;
    console.log(
      "reduce animation if old browser or explicitly preferred:",
      reduceIt
    );
  };
  mediaQueryList.addListener(listener);
  // mediaQueryList.removeListener(listener);
  ```

  - and here's a [React](https://github.com/hchiam/learning-reactjs) hook version: https://www.joshwcomeau.com/react/prefers-reduced-motion/#the-hook

- you can use [`as="someOtherTagName"`](https://styled-components.com/docs/api#as-polymorphic-prop) to make a styled-component have a different underlying tag:

  ```jsx
  import { Link } from "react-router-dom";
  function Button({ href, children }) {
    return (
      <Wrapper to={href} as={href ? Link : "button"}>
        {children}
      </Wrapper>
    );
  }
  const Wrapper = styled.button`
    /* ... */
  `;
  ```

  - If the component being imported (e.g. `Link` in the example above) is instead a styled-component, then make sure that the imported component has `({className})` and `<ComponentBeingImported style={styles} className={className}>`, so that styled-components can take its magically-generated class name from your `Wrapper` and inject it into your component being imported.

- [You can refer to instances of styled-components within styled-components](https://styled-components.com/docs/advanced#referring-to-other-components) for "contextual styles" (or ["inverted control"/"inversion of control" nesting](https://www.joshwcomeau.com/css/styled-components/)):

  ```jsx
  // NOT RECOMMENDED:
  // we COULD make a Link styled differently when inside of an Icon:
  const Icon = styled.svg`
    & > ${Link} {
      /* Icon > Link */
    }
  `;

  // or RECOMMENDED: "inversion of control"
  // instead keep styles related to Link in one spot (no memory/hunting needed):
  // (style Link differently when it's inside an Icon:)
  const Link = styled.svg`
    ${Icon} > & {
      /* Icon > Link */
    }
  `;

  // but for one-off page stylings like for holidays, consider composition instead:
  const HolidayLink = styled(Link)``;
  // to avoids perf cost of importing an entire page as context per component
  ```

  - you can do ["inverted control"/"inversion of control" nesting](https://www.joshwcomeau.com/css/styled-components/) in [SASS/SCSS](https://github.com/hchiam/learning-sass) too, but styled-components helps automate scoping/collision/specificity across files.

- components tips with styled-components:

  - core variant options = limited few props (or CSS variables for rapid-change perf)
  - "one-off" variants: do composition with `styled(BaseComponent)`
  - component-within-component contextual styles:
    - for common/core variants: "inversion of control" nesting (see notes above) with `${Parent} & {}` in one place
    - for "one-off" contexts: do composition with `styled(BaseComponent)`

- ```jsx
  // use ThemeProvider as a React context to wrap children so they get theme in props, instead of you importing in each child's file:
  import { ThemeProvider } from "styled-components";
  import { BREAKPOINTS } from "../../constants";
  function App() {
    return (
      <ThemeProvider theme={{ breakpoints: BREAKPOINTS }}>
        {/* children */}
      </ThemeProvider>
    );
  }
  // ... and now in another file, you don't have to import BREAKPOINTS everywhere, and instead use props.theme:
  const SomeChildInAnotherFile = styled.div`
    @media ${(props) => props.theme.breakpoints.tabletAndUp} {
      // ...
    }
  `;
  ```

- `@keyframes` with `styled-components`: `keyframes`:

  ```jsx
  /** guaranteed to avoid naming conflicts:
   * (as opposed to CSS @keyframes, which are all global)
   */
  const float = keyframes`
    from {
      /* ... */
    }
    to {
      /* ... */
    }
  `;
  const SomeStyledComponent = styled.div`
    animation: ${float} 1s infinite alternate ease-in-out;
  `;
  ```

- CSS has different layout modes (like flow, `position`ed, `flex`, `grid`, etc.), and each layout mode decides what each property does (if anything), like whether it ignores `z-index` (flow ignores `z-index`, while `position`ed, `flex`, `grid` respect `z-index`)

- There's also many other layout modes: https://developer.mozilla.org/en-US/docs/Web/CSS/display but including an exciting new one called [`display: contents`, which lets indirect children (2 levels down) participate in the layout mode](https://codepen.io/hchiam/pen/OJzZPqY)

- Layout modes can also interact with each other: https://codepen.io/hchiam/pen/PoEdWJo - take the content inside a CSS Grid cell and wrap it inside an inner sticky div to enable it to stick then not: "`grid { sticky }`".

- CSS Grid can be used to make text 1 middle column and make images full-width/full-bleed: https://codepen.io/hchiam/pen/vYpzgro
  - `grid-column: 1 / -1;` means "(1st line from left) to (1st line from right)"

### extra flexbox notes

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
  - **"max size":** the _`width` and `height` or `flex-basis`_ (which acts like `width` and `height` on the current primary axis) that you set are more like suggestions, and _act more like `max-width` or `max-height`_, (although width can force it shrink to less than min content width, while flex-basis can't force it). But we can also set `max-width` or `max-height`, and `flex-grow` will respect those values.
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
  - `flex` defaults to: `0 1 auto` (`flex-grow: 0`) (`flex-shrink: 1`) (`flex-basis: auto`) https://www.joshwcomeau.com/css/interactive-guide-to-flexbox
  - `flex-basis: 0` = will "stretch" each item to fill additional space.
    - what you'd usually want, so just use `flex`.
  - `flex-basis: auto` = will "add" _additional_ space to items.

- ```css
  .wrapper {
    display: flex;
  }
  .left,
  .right {
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

  - example: https://codepen.io/hchiam/pen/qBKZwON

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

- `flex-wrap: wrap-reverse` wraps "upwards" (as opposed to `flex-wrap: wrap` wrapping "downwards" in the normal reading direction).
- `flex`'s `order` and `flex-wrap: wrap-reverse` are good backups if you can't use CSS grid

- `gap` can take 2 values: `gap: <row-gap> <column-gap>;`

- fixed/absolute positioned layout overrides/ignores other layouts like flex
  - this means that when you apply both `flex` (from parent) and `position:fixed` (on the element itself), the element will ignore `justify-content`, etc.

### extra CSS grid notes

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
    - `fr` also reacts based on its contents (which explains unexpected behaviour like grandchild causing direct child cell growth that overflows the body, instead of scrolling on the direct child itself) because the minimum size of `fr` is `auto`
- `display: grid` from the parent means setting `display: inline` on a child is ignored for the same reason as setting `left: 200px` has no effect on a non-positioned element
- `display: grid` from parent overrides child `display: inline`
- `position: absolute` on child overrides parent `display: grid`
- you can "paint by colour" with CSS [`grid-template`](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template) while also setting `row / column` sizes:

  ```css
  grid-template:
    "a a ." minmax(50px, auto)
    "a a ." 80px
    "b b c" auto / 1fr 1fr 5fr; /* / column widths on last line, like x-axis labels */
  ```

- but you might want to only use `grid-template-columns`, for the reason in the next point:

  ```css
  .parent {
    grid-template-columns: repeat(
      2,
      1fr
    ); /* can't use repeat() in grid-template */
    /* grid-template-rows: dynamically add rows and shrink height, not fixed height */
  }
  .child {
    height: 2rem; /* set height here, vs stuck explicitly specifying number of rows */
  }
  ```

- by default, CSS grid dynamically/implicitly assigns children to cells/rows and dynamically sets each row's height to be the tallest in each dynamically-generated row by default (you can explicitly set row heights if you want though), which is useful for listing out a dynamic list of data into some grid-like display, like a calendar month where you don't want/have to explicitly say how many rows to allocate space for
- in CSS `display: grid`, `justify-content: center` makes the grid columns no longer go fill/full-width, and works like `justify-content` does in `display: flex` but affects the grid **columns** themselves
- in CSS `display: grid`, `justify-items: center` also exists, but affects the grid **children** _inside_ the grid columns
- in CSS `display: grid`, `align-content: center` makes the grid rows no longer go fill/full-height, and works like `align-content` does in `display: flex` but affects the grid **row** themselves (and requires the grid to have a `height` set)
- in CSS `display: grid`, `align-items: center` also exists, and works like `align-items` does in `display: flex`, but affects the grid **children** _inside_ the rows columns
- in CSS `display: grid`, there's also `align-self` (for vertical), which works like it does in `display: flex`, but CSS grid also has `justify-self` (for horizontal)
- "`-content`" = columns/rows themselves
- "`-items`" = children in the cells

- `grid-row: 1 / -1` on a child is possible: to span from top of grid to bottom of grid (track line 1 to track line -1, like negative indices in [Python](https://github.com/hchiam/learning-python)), regardless of the number of rows
  - example: full-width image in CSS grid: https://codepen.io/hchiam/pen/vYpzgro
- `grid-row` and `grid-column` are indexed starting at 1 (or -1 from the ends), and if you give them one value, then it's assumed to be 1 cell size (`grid-row: 1` = `grid-row: 1 / 2`)

- "world famous" CSS grid with dynamic number and size of columns to fill the width:

  ```css
  .grid {
    display: grid;
    --min: min(400px, 100%);
    --max: 1fr;
    grid-template-columns: repeat(auto-fill, minmax(var(--min), var(--max)));
    /* instead of setting a specific number in repeat's 1st parameter, */
    /* repeat with auto-fill tries to add extra columns dynamically to fit */
    /* minmax with min non-fr size and dynamic size 1fr 
          will have minimum size, but then 
          will grow to fill any leftover space */

    /* min to prevent overflow for small screens,
          at which point 100% could become smaller than 200px 
       (or use a media query with a breakpoint that's easier to understand) */
  }
  ```

- CSS grid with 2 panels, 1 that grows until they're same, then both grow:

  ```css
  .panel-1-grows-then-both-grow {
    display: grid;
    grid-template-columns: minmax(50px, 1fr) minmax(500px, 1fr);
  }
  ```

- By default, CSS grid acts like a table: it grows to the width of its widest child. But you can override this default and give CSS grid permission to shrink:

  ```css
  .override-default-css-grid-width-behaviour {
    grid-template-columns: minmax(0px, auto);
  }
  ```

- if you're [supporting only modern browsers for CSS grid](https://caniuse.com/css-grid), you can center things both vertically and horizontally in 2 lines of CSS grid (instead of [CSS flexbox](https://caniuse.com/flexbox) `display: flex; justify-content: center; align-items: center;`):

  ```css
  .center-both-horizontally-and-vertically {
    display: grid;
    place-content: center; /* shorthand for CSS grid justify-content and align-content having the same value */
  }
  ```

### other stuff

- pick breakpoints that are _between_ likely screen widths, instead of right at the boundaries of likely screen widths:

  ```css
  /* mobile by default (if your is better with desktop by default, then reverse the order below and use max-width instead) */

  /* (add 350px breakpoint if you must distinguish "small"/"large" mobile) */

  @media (min-width: 550px) {
    /* or 550/16 rem to cover user font size */
    /* tablet */
    /* (550px is to the left but spaced away from likely tablet sizes) */
  }

  @media (min-width: 1100px) {
    /* or 1100/16 rem to cover user font size */
    /* laptop */
    /* (1100px is to the left but spaced away from likely laptop sizes) */
  }

  @media (min-width: 1500px) {
    /* or 1500/16 rem to cover user font size */
    /* desktop */
    /* (1500px is to the left but spaced away from likely desktop sizes) */
  }

  /* note: these widths are intended for general styling, not for detecting devices, since users are able to do things like adjust screen widths or change portrait/landscape mode */
  ```

- To detect detect user interaction type or user input type of pointer,you can use ["Interaction Media Features"](https://drafts.csswg.org/mediaqueries-4/#mf-interaction):

  ```css
  @media (hover: hover) and (pointer: fine) {
    /* mouse or trackpad */
  }

  @media (hover: hover) and (pointer: coarse) {
    /* kinect or wii remote */
  }

  @media (hover: none) and (pointer: fine) {
    /* stylus digitizer or eye-tracking */
  }

  @media (hover: none) and (pointer: coarse) {
    /* touchscreen */
  }

  @media (hover: none) and (pointer: none) {
    /* keyboard-only or sip-and-puff switches */
  }

  @media (hover: any-hover) and (pointer: any-pointer) {
    /* any */
  }
  ```

- pros/cons of **responsive** versus **fluid** design:

  |      | **responsive** approach                                                                                                                    | **fluid** approach                                                                                                                                                                                              |
  | ---- | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | pros | semantic grouping, totally different/unrelated styles for different sizes                                                                  | "smooth" transitions, responds to containers/context                                                                                                                                                            |
  | cons | "choppy" transitions, "global" window media queries only (can't respond to container queries unless the newest CSS features are supported) | harder to understand intent just from reading the code (must intuit test cases with a working example), harder to group/control unrelated things or have totally different/unrelated styles for different sizes |

- font size that intelligently scales with screen width:

  ```css
  h1 {
    --s: 1.5rem;

    /* fluid typography size is helpful for large text like headings: */
    font-size: clamp(var(--s), 4vw + 1rem, var(--s) * 2);
    /*
      - 4vw to let screen width scale h1 headings
      - clamp keeps h1 sizes sensible in big/small screens
          (generally we should keep body font size unchanged at all widths)
      - 1rem for accessibility: let user control font size at all clamp values
      - calc() isn't required inside of clamp
    */

    min-height: 0vh; /* so Safari behaves consistently with other browsers */
  }
  ```

  ```css
  .large-text {
    --min-font-size: 1.5rem;
    --max-font-size: 3rem;

    --growth-rate: 4vw; /* also responds to screen width */
    --earlier-offset: 1rem; /* also responds to user font size setting */
    /* --earlier-offset >= 1rem or <= -1rem so user can scale with font size settings */

    font-size: clamp(
      var(--min-font-size),
      var(--growth-rate) + var(--earlier-offset),
      var(--max-font-size)
    );
    min-height: 0vh; /* so Safari behaves consistently with other browsers */
  }
  ```

- to support multiple screen resolutions:

  ```html
  <!-- only one file type for multiple screen resolutions: -->
  <img
    alt=""
    src="fallback_for_IE.png"
    srcset="modern.png 1x, modern@2x.png 2x, modern@3x.png 3x"
  />
  ```

  or if to support multiple image file types _**and**_ resolutions: ([here's an example image fallback and optimizations for screen resolution and filetype support - hover over the `img` in Chrome DevTools and it'll tell you the actual file being used](https://github.com/hchiam/unsprinkle/commit/fb1ed7550d544fc7341b1bdf977219831c010ac7))

  ```html
  <!-- multiple sources and multiple responsive resolutions: -->

  <!-- NOTE: the order of <source> tags matters for fallbacks! -->
  <!-- NOTE: <img> also included for IE -->
  <!-- the <picture> tag will act as a inline <span> (or block wrapper in IE) -->
  <!-- consider build to generate images: https://www.npmjs.com/package/avif -->
  <picture>
    <source
      type="image/avif"
      srcset="modern.avif 1x, modern@2x.avif 2x, modern@3x.avif 3x"
    />
    <source
      type="image/png"
      srcset="modern.png 1x, modern@2x.png 2x, modern@3x.png 3x"
    />
    <!-- <source> tags are invisible and act to swap the src attribute below: -->
    <img alt="" src="fallback_for_IE.png" />
  </picture>
  ```

  or if you're using `background-image` instead:

  ```css
  body {
    --width: var(--width-of-standard-1x-image);
    background-image: url("image.png"); /* @1x */
    background-size: var(--width) var(--height); /* to avoid native image size */
  }
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 2dppx) {
    background-image: url("image@2x.png");
  }
  @media (-webkit-min-device-pixel-ratio: 3), (min-resolution: 3dppx) {
    background-image: url("image@3x.png");
  }
  ```

- 3 `<img>` priorities (choose 2 out of the 3):

  - maintaining aspect ratio (no distortion)
  - showing entire image (no clipping)
  - filling available space (no gaps around)

- hard-coding the width _and_ height of an `<img>` at the same time can easily distort the aspect ratio. But CSS `object-fit` gives us other options, with different priorities (choose 2 out of the 3):

  | strategy  | aspect ratio | un-clipped           | fills space                 |
  | --------- | ------------ | -------------------- | --------------------------- |
  | fill      | **no**       | YES                  | YES                         |
  | contain   | YES          | YES                  | **no** (can have side gaps) |
  | **cover** | YES          | **no** (scaled)      | YES                         |
  | none      | YES          | **no** (_un_-scaled) | YES                         |

- `object-position` can be used with `object-fit: cover` or `object-fit: none` to position the `<img>` with a left-top offset

  - (`object-position` _**won't**_ work with `object-fit: fill` nor `object-fit: contain`)

  ```css
  img {
    width: 100%; /* span full screen width */
    min-height: 70px; /* allow shrinking down to a certain min height */
    object-fit: cover; /* maintain aspect ratio, fill space, but clip as needed */
    object-position: left center; /* anchor at horizontal left, vertical center */
  }
  ```

- `object-fit` is like `background-size` (except `background-image` can tile with `background-repeat`)
- `object-position` is like `background-position`

- `background-repeat`: `repeat` (= repeats with truncation as needed), `repeat-x`, `repeat-y`, `no-repeat`, `round` (= resize to fit repeats without truncation), `space` (= add space between to fit repeats without truncation)

- `aspect-ratio` fallback:

  ```scss
  /* for browsers that don't support CSS aspect-ratio: */
  .padding-hack-container {
    --ratio-of-height-to-width: 100%; /* 50% means width:height = 2:1 or 2/1 */
    height: 0;
    padding-bottom: var(--ratio-of-height-to-width);
    position: relative;
    img {
      position: absolute; /* so the contained img isn't 0 height */
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  /*
  - 0 height means padding-bottom is contributing to height
  - padding percents are always relative to width (to avoid infinite calc loops?)
    - so padding-bottom in this case is ratio of height to width
  */
  ```

- `display-flex-parent > img` = bad, `display-flex-parent > div > img` = good:

  - `<img>` tags will grow/not-grow in weird ways when they're a direct child of a `display: flex` container, so instead prefer treating `<img>` as content (and set `img {width: 100%;}`) and wrapping it in a divider like `<div><img></div>`, itself inside of the `display: flex` container so the flexbox styles get applied to the `<div>` wrapper instead, to behave more like how you'd expect

- if you need a random image 1000px wide and 500px tall: https://source.unsplash.com/1000x500 (here's the license: https://unsplash.com/license)

- text wrap: by default breaks on spaces and dashes (but really-long words overflow)

  - you can _prevent_ overflow on spaces with `&nbsp;`
  - `overflow-wrap: break-word; word-wrap: break-word;` lets you break words that cause overflow

    - and when that happens, you can add `hyphens: auto; -webkit-hyphens: auto;` to add (non-selectable) hyphens at the splits (when you set `<html lang="en">`):

    ```css
    .wrap-text-better {
      overflow-wrap: break-word;
      word-wrap: break-word; /* IE */

      hyphens: auto;
      -webkit-hyphens: auto; /* Safari */
      /* note: Firefox doesn't support hyphenation on Capitalized Words */
    }
    ```

  - or if you want text to cut off, replace `hyphens` with `overflow: hidden; text-overflow: ellipsis;`:

  ```css
  .truncate-long-words-instead-of-using-overflow-wrap {
    overflow: hidden;
    text-overflow: ellipsis;
  }
  ```

  - or if you want to have ellipses on a specific line for a multi-line-wrapping text (and don't need to support IE):

  ```css
  .truncate-multi-line-wrapping-text-starting-at-3rd-line {
    display: -webkit-box; /* works as a child of a flow layout parent */
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
  /* wrap it in a div to avoid being a child of a display:flex parent */
  /* wrap it in a div to avoid being a child of a display:grid parent */
  /* This line clamping algorithm doesn't actually hide the text, 
      (so you need overflow: hidden), 
      it just calculates its height and decides where to insert ellipses.
      So if this element is a flex/grid child, it might get stretched
      and end up (partially) showing lines that should be hidden.
  */
  ```

  - or if you want to avoid wrapping altogether and all users will be OK with truncated text (e.g. accessibility, or whether important info at the end can be shown):

  ```css
  .truncate-one-liner-text-with-no-wrapping {
    white-space: nowrap; /* 1: don't wrap; don't calculate line breaks */
    max-width: 100px; /* 2: when to trigger element overflow */
    overflow: hidden; /* 2: how to handle element overflow */
    text-overflow: ellipsis; /* 3: how to handle text overflow */
  }
  ```

- the browser calculates line breaks _before_ deciding what to do about overflow

- there's another layout mode: "multi-column layout", like a book or page with multiple columns like in a Word doc, but it doesn't get its own `display` name:

  https://codepen.io/hchiam/pen/zYpdOXz

  ```scss
  .multi-column-layout {
    /* columns: 2 300px; */
    --max-columns: 2;
    --min-column-width: 300px;
    columns: var(--max-columns) var(--min-column-width);
    column-gap: 1rem;
    padding: 1rem;
    p {
      margin-bottom: 1rem;
      break-inside: avoid; /* to avoid splitting up a paragraph across columns */
      text-indent: 2rem; /* to indent paragraphs like in a novel */
      /* text-align: justify; if narrow then don't justify, otherwise weird spacing or over-hyphenated */
    }
  }
  ```

- there's also float layout mode: it feels like an outdated mode, but there are things that only `float` can do. It acts like a rock in a river:

  ```css
  .floated-element {
    float: left; /* other stuff will go to my right */
    /* and float-ed elements don't have margin by default, so: */
    margin-right: 1rem; /* between me and other stuff to my right */
  }
  ```

- `:last-of-type` (and any variant of it) actually filters by last of _HTML tag_ type, so it ignores class names: so `.some-class:last-of-type` won't actually get the last of `.some-class`, and `p:nth-last-of-type(1)` works but only gets the last `<p>` tag amongst its immediate siblings

- `-webkit` prefixes exist in non-Safari browsers, for example, Chrome forked a core component of WebKit

- you might want to use `user-select: none;` to disable mobile from selecting text on a button you clicked

- FOIT = Flash Of Invisible Text (showing no font until downloaded font)
- FOUT = Flash Of Unstyled Text (showing fallback font until downloaded font)
- handle FOIT/FOUT with `font-display`:

  - `font-display: block;` to wait for critical font, like icon fonts (but avoid icon fonts).
  - `font-display: optional;` for non-critical font for subtle enhancements, since it has a short block period, no swap period, and hence an early failure period.
  - `font-display: swap;` to get any text showing ASAP, tho will swap as available - _including infinitely any time after the page loads_ (= might change font or cause layout shift seconds/minutes after page load).
  - **PREFER** `font-display: fallback;` for smooth font loading UX: fast connections avoid FOUT, and slow connections avoid FOUT happening randomly while you're already using the page.
    - and then you _could_ minimize layout shift with something like https://meowni.ca/font-style-matcher to generate CSS styles to smoothen the swap between 2 fonts (but requires some fancy logic to [remove those styles after fonts are loaded](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Font_Loading_API)), but in future it could be easier with f-mods ("font descriptors") with overrides to add inside of `@font-face` rules, like:
      - `size-adjust` (works like `font-size`)
      - `ascent-override`/`descent-override` (which work like `line-height`)
      - `advance-override` (which works like `letter-spacing`)

- system font stack = no network request, no font flash, wide language coverage, works across OSs/systems/platforms, and matches user device conventions: https://systemfontstack.com

  ```css
  html {
    --sans-serif-font-stack: -apple-system, BlinkMacSystemFont, avenir next, avenir,
      segoe ui, helvetica neue, helvetica, Ubuntu, roboto, noto, arial, sans-serif;

    --serif-font-stack: Iowan Old Style, Apple Garamond, Baskerville,
      Times New Roman, Droid Serif, Times, Source Serif Pro, serif, Apple Color
        Emoji, Segoe UI Emoji, Segoe UI Symbol;

    --monospace-font-stack: Menlo, Consolas, Monaco, Liberation Mono, Lucida
        Console, monospace;

    font-family: var(--sans-serif-font-stack);
  }

  .different-font-as-needed {
    font-family: var(--serif-font-stack);
  }
  ```

- web fonts notes:

  - Google Fonts web font example:

    ```html
    <head>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@1,400;1,600&display=fallback"
        rel="stylesheet"
      />

      <!-- and for a variable font with ranges of weights for free (like SVG): -->
      <!-- for non-italic: 0,100..900 -->
      <!-- for italic:     1,100..900 -->
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=fallback"
        rel="stylesheet"
      />

      <!-- ... -->
    </head>
    ```

    ```css
    .using-google-web-font {
      font-family: "Open Sans", sans-serif;
      /* helpful convention: 'Quotes For Web Fonts' and no-quotes-for-local-fonts */
    }
    ```

  - or self-host web fonts by getting the .woff2 file (from Chrome Network tab, filtered by Font, opened in new tab to download the .woff2 file) and copying the relevant css2 code (from clicking the link above and can be used like the example code below), which are optimized by doing things like sub-setting to `unicode-range`s:

    ```css
    /* don't need the <link>s anymore */
    /* but download the .woff2 file and copy the css2 code to use the .woff2 file */
    @font-face {
      font-family: "Open Sans";
      font-style: normal;
      font-weight: 400;
      font-display: fallback;
      src: url(./local/self-hosted/path/to/filename.woff2) format("woff2");
      unicode-range: U+000-5FF; /* Latin glyphs */
    }
    ```

    - Example [Google-optimized but self-hosted variable web font](https://github.com/hchiam/unsprinkle/commit/7fe8cb9ed762dc3c471a0f2ae50404746e5e2174)

  - or self-host web fonts with https://fontsource.org

    ```sh
    yarn add @fontsource/open-sans # npm install @fontsource/open-sans
    ```

    ```jsx
    // import in jsx:
    import "@fontsource/open-sans"; // defaults to weight 400 normal variant
    import "@fontsource/open-sans/500.css"; // weight 500
    import "@fontsource/open-sans/900-italic.css"; // italic variant

    import "@fontsource/cabin/variable-italic.css"; // variable weight italic font
    ```

    ```scss
    // import in Sass/SCSS:
    @import "~@fontsource/open-sans/index.css"; // defaults to weight 400 normal variant
    @import "~@fontsource/open-sans/500.css"; // weight 500
    @import "~@fontsource/open-sans/900-italic.css"; // italic variant

    @import "~@fontsource/cabin/variable-italic.css"; // variable weight italic font
    @include OpenSans.fontFaceVariable($weight: 500, $type: "wghtOnly");
    ```

    ```css
    .using-self-hosted-font {
      font-family: "Open Sans", sans-serif;
      /* helpful convention: 'Quotes For Web Fonts' and no-quotes-for-local-fonts */
    }

    .using-variable-self-hosted-font {
      font-family: "Cabin", sans-serif;
      font-weight: 400;
    }
    @supports (font-variation-settings: normal) {
      .using-variable-self-hosted-font {
        font-family: "CabinVariable";
        font-variation-settings: "wght" 400;
      }
    }
    ```

  - or manually create a web font with a web font generator and then do:

    ```html
    <head>
      <style>
        /* inline to load fonts ASAP: */
        @font-face {
          font-family: "Web Font Name";
          src: url("/fonts/Web_Font_Name-regular-italic.woff2") format("woff2"),
            url("/fonts/Web_Font_Name-regular-italic.woff") format("woff");
          /* put woff2 first since it's usually smaller */
          font-weight: 400; /* each non-variable font file only has one weight */
          font-style: normal;
          font-display: fallback;
          unicode-range: U+000-5FF; /* Latin glyphs */
        }

        /* and repeat for other files for different font weights, */
        /* OR define a variable font with a range of weights: */
        @font-face {
          font-family: "Web Font Name";
          src: url("/fonts/Web_Font_Name-variable.woff2") format("woff2 supports variations"),
            url("/fonts/Web_Font_Name-variable.woff") format("woff-variations");
          font-weight: 300 1000; /* for 300-1000 inclusive */
          font-style: normal;
          font-display: fallback;
          unicode-range: U+000-5FF; /* Latin glyphs */
        }
      </style>
      <style>
        /* then use it: */
        .variable-font {
          font-family: "Web Font Name";
          font-weight: 777;
          font-variation-settings: "slnt" -10; /* slant, and other things: wght, wdth, slnt, ital, opsz */
          /* which correspond to font-weight, font-stretch, font-style with deg, ... */
          font-variation-settings:
            /* and custom-named axes/"levers" in UPPERCASE like: */ "CASL" 0.8, /* "casual" */
              "CRSV" 1; /* "cursive" */
        }
      </style>
    </head>
    ```

  - use variable fonts for a more expressive/polished look at no extra cost

- `transform` doesn't work on the default `inline`/flow layout algorithm.

  - if you want to make `transform` work, try `display: inline-block` or some other layout mode

- `transform: translate(var(--x), var(--y));` is like `position: relative; left: var(--x); top: var(--y);`, except `transform`'s relative percent values like `100%` are relative to the element itself, instead of relative to the element's parent (which `position: relative` does)

  - so `transform: translateY(-100%);` moves an item up by it's own height

  - default `transform-origin: center`

- `transform: scale(var(--x), var(--y));` lets you scale x and y axes independently

  - default `transform-origin: center`

- `transform: rotate(1turn)` == `transform: rotate(360deg)`

  - default `transform-origin: center`

- `transform: skewX(25deg);` feels like pulling the jello's bottom edge to the right (like pulling a plate under it, the top moves in the opposite direction - with the default `transform-origin: center`)
- `transform: skewY(25deg);` feels like pulling the jello's right edge to the bottom

  - default `transform-origin: center`

- `transform: translateX(var(--x)) rotate(var(--r))` is _**NOT**_ the same as `transform: rotate(var(--r)) translateX(var(--x))`:

  - `transform: translateX(var(--x)) rotate(var(--r))` = spin in another location
  - `transform: rotate(var(--r)) translateX(var(--x))` = move forward in another cardinal direction

- `transform-origin: bottom right;`, not `bottom-right`
- `transform-origin: 80% 75%;` means 80% of the way to the right, and 75% of the way down the element. (waving hand example: https://codepen.io/hchiam/pen/QWQjvoa)

- how to solve "doom flicker" in CSS: have a non-moving parent `:hover` trigger a moving child `transform`, instead of having the `:hover` and `transform` both on the same element (which could move away from the cursor that hovered it)

- easing in CSS `@keyframes` versus JS `.animate()` frames: https://codepen.io/hchiam/pen/MWQWPdN

  - JS frames in `.animate()` can use 1 transition _across all_ steps (by default - but this can be tweaked per step with an additional property per object in the frames array)
  - CSS `@keyframes` can only transition _between_ steps

- grow and shrink alternating animation while only specifying one direction:

  ```css
  @keyframes grow {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.5);
    }
  }

  .example {
    animation: grow 2s infinite alternate both;
    /* the "alternate" keyword will make it grow AND shrink! */
    /* the "both" keyword isn't really needed, but it persists the initial/final states across the timeline */
  }
  ```

- animations have their own "cascade origin", so that's why their styles override styles in most regular selectors (see "CSS Rule Conflict Resolution" notes for "origins")

- `animation-fill-mode: backwards;` doesn't mean the animation somehow fills backwards, it means it uses the initial state of the animation `@keyframes` and fills the timeline backwards from there! So this includes before the animation event starts, and during the `animation-delay` also.
- `animation-fill-mode: forwards;`
- `animation-fill-mode: both;` = most likely you'll want (persist the initial and final states of the animation, regardless of other styles)
- `animation-fill-mode: none;` = default

```css
@keyframes rise-from-offscreen {
  from {
    transform: translateY(calc(100% + var(--spacing)));
  }
  to {
    transform: translateY(0);
  }
}
.help-circle {
  --spacing: 32px;
  animation: rise-from-offscreen 1s both infinite;
  animation-delay: 1s;
  position: fixed;
  bottom: var(--spacing);
  right: var(--spacing);
}
```

- `animation-play-state: paused;` or `running`, instead of awkwardly removing animations partway thru a `@keyframes` animation (won't work on `transition` animations tho)

- generate cubic-bezier animation curves to copy to clipboard: https://cubic-bezier.com

- you could create performant animations with a sprite sheet with `animation: ... steps(34) ... ;`

  - https://codepen.io/hchiam/pen/xxYwrNE
  - https://i.imgur.com/zLh2Pgs.png

- ```js
  element.addEventListener("onTransitionEnd", () => {
    // called whenever a transition ends on the element
  });
  ```

- `background: linear-gradient`s layered: (first in list is layered on top) https://codepen.io/hchiam/pen/WNMRrxR?editors=1100 (same goes for `radial-gradient`)

  - a gradient can be (used for) more than blended colours!

- `background: conic-gradient`:

  - https://codepen.io/hchiam/pen/ExQZVrQ (generate pie chart with hard stops)
  - https://codepen.io/hchiam/pen/OJQWyYJ (position and angle)

- tool to generate _**eased**_ gradients: https://larsenwork.com/easing-gradients/#editor

- you can "undo" `pointer-event: none;` on element descendants!

  - parent: `pointer-events: none;`
  - child: `pointer-events: auto;`
  - (note: `pointer-events: none;` doesn't prevent users from tabbing to things like buttons)

- `clip-path` can be animated by interpolating where its polygon points move! even with just `:hover` or `:focus`, no `@keyframes` needed! (just make sure you specify the same number of points) For example: https://codepen.io/hchiam/pen/BaYpjOW (aside note: `will-change: transform; /* as opposed to clip-path */`)

- ```css
  @media (prefers-reduced-motion: no-preference) {
    html {
      scroll-behavior: smooth;
      scroll-margin-top: 6rem; /* if you need to show heading below a sticky element */
    }
  }
  ```

  ```html
  <a href="#heading_id">Some text (link) you can click to jump to heading</a>
  <!-- ... -->
  <h2 id="heading_id">Some heading you can jump to</h2>
  ```

  otherwise:

  ```js
  document.querySelector("#heading_id")?.scrollIntoView({
    behavior: "smooth", // <-- !!! otherwise defaults to whatever CSS has for scroll-behavior
  });
  ```

- ```css
  .parent {
    scroll-snap-type: x mandatory;
  }
  .child {
    scroll-snap-align: center; /* or scroll-snap-align: start; */
  }
  ```

  - example scroll snap: https://codepen.io/hchiam/pen/OJQWNrw?editors=1100

- scrollbars are usually specific to OS, not specific to browser

- to styles scrollbars to blend into app theme https://codepen.io/hchiam/pen/abqpZoB?editors=1100

- `:focus-visible` = `:focus` but only when the user is using a non-pointer input method to focus (already have nice defaults on modern browsers that differentiate for you) = focused via keyboard, not mouse, as determined partially by heuristics https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible

- `:focus-within` = `:focus` but on any descendant element (useful for styling the parent if any of its children are focused)

- there's `:focus-within`, but no `:hover-within` exists

- _**NEW:**_ `float`s now can be accompanied with a [`shape-outside`](https://caniuse.com/css-shapes) (like `shape-outside: circle();`, or `clip-path` or SVG or `url(...);`) and with a `shape-margin`:

  ```css
  .floated {
    --breathing-room: 16px;
    float: left;
    shape-outside: url(... .png); /* instead of default square space */
    margin-right: var(--breathing-room); /* need shape-margin too */
    shape-margin: var(--breathing-room); /* need margin-right too */
  }
  ```

- to make a container completely wrap around a `float`ed element:

  ```css
  /* trigger parent to grow by adding an empty element at the bottom: */
  .parent-that-contains-floated-elements::after {
    content: "";
    display: block;
    clear: both;
  }
  /* otherwise parent height ignores float-ed elements */
  ```

- `scroll-margin-top` on the item to scroll to

  - Why? For example, so JS `scrollIntoView()` doesn't scroll the target element underneath a `fixed`/`sticky` header

  - (and maybe also add `margin-top` on the first child of things you could scroll to)

- CSS environment variables: `env()` (like `var()` but user-agent defined and usable in more places, like in media queries)

  - https://developer.mozilla.org/en-US/docs/Web/CSS/env
  - https://developer.chrome.com/docs/web-platform/virtual-keyboard/#the-css-environment-variables
