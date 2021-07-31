<template>
  <div :class="classes.app">
    Hello from Vue!
  </div>
</template>

<script>
import classes from './app.css';

export default {
  data() {
    return {
      classes
    }
  }
}
</script>