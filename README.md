# Learning CSS / CSS3

Just one of the things I'm learning. <https://github.com/hchiam/learning>

<https://css-tricks.com>

<https://codepen.io/hchiam>

## Miscellaneous notes

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