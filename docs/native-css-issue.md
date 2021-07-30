
# Understanding the issue with native CSS.

## Our options

The CSS can come in different ways in our HTML:

* The first and the most simple is inline styling, which means that you explicitly write the style on the HTML tag. `<span style="color:red;">...</span>`

* A different solution is to have an HTML tag called `<style>...</style>`, which his text content will be the style itself and select the different HTML elements.

* Another solution is to load it as a CSS file via link tag and select the different HTML elements inside the file.

## The problems

Each one of these solutions has its benefits and tradeoffs, which is very important to understand for avoiding unexpected behavior in your styling.

But, none of those solutions solve one of the most problematic issues: **CSS is global.**

The global issue is a pretty difficult one to overcome once you face it.
Let's say you have a button with a class called `.btn` and your style it has you like.
One day your co-worker works on a different page that has a button too,
and he also decided to call it `.btn`.
The problem should be apparent. The styles would clash.

Another significant issue is **specificity**, and to be more accurate is when the specificity is equaled between selectors and the last declaration found in the CSS is applied to the element.
To put it simply - your order matters.

## [Next chapter](./setup-the-solution.md)