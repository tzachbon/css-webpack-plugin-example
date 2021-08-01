
# Understanding the issue with native CSS.

## Our options

The CSS can come in different ways in our HTML:

* The first and the most simple is inline styling, which means that you explicitly write the style on the HTML tag. `<span style="color:red;">...</span>`

* A different solution is to have a `<style></style>` HTML element, describing how elements should be rendered in the document.

* Another solution is to load it as a CSS file via link tag and select the different HTML elements inside the file.

* Shadow dom can be a good candidate to answer those problems, but it has a lot of problem of it one regarding theming.

## The problems

Each one of these solutions has its benefits and tradeoffs, which is very important to understand for avoiding unexpected behavior in your styling.

But, none of those solutions solve one of the most problematic issues: **CSS is global.**

The global issue is a pretty difficult one to overcome once you face it.
Let's say you have a button with a class called `btn` and you style it.
One day your co-worker works on a different page that has a button too,
and he also decided to call it `btn`.
The problem should be apparent. The styles would clash.

Another significant issue is **specificity**, and to be more accurate is when the specificity is equaled between selectors and the last declaration found in the CSS is applied to the element.
To put it simply - your order matters.

## [Next chapter](./setup-the-solution.md)