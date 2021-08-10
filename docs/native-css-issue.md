
# Understanding the issue with native CSS.

## Our options

Native CSS is implemented in different ways:

* The first and the most simple way to include CSS is using inline styling, which means that you explicitly include a style in an HTML tag. `<span style="color:red;">...</span>`

* A different solution is to use an HTML tag called `<style>...</style>`, where its text content is the style itself, and it is used to select the different HTML elements.

* Another option is to load a CSS file via a link tag, and select the different HTML elements inside the file.

## The problems

Each one of the solutions above has its benefits and tradeoffs. It is very important to understand them to avoid unexpected behavior in your styling. You'll find that none of those solutions, however, solve one of the most problematic issues - that **CSS is global**.

The global issue is a pretty difficult one to overcome. Let's say you have a button with a class called `btn` and you style it. One day your co-worker works on a different page that has a button too, and he also decided to call it `btn`. The problem should be apparent - the styles would clash.

Another significant issue is **specificity**, where the specificity is equal between selectors, and the last declaration found in the CSS is applied to the element. To put it simply - your order matters.

## [Next chapter](./setup-the-solution.md)