<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  components: {
  },
  created() {
    document.addEventListener('keydown', function(event) {
      if ((event.ctrlKey === true || event.metaKey === true) &&
                    (event.which === 61 || event.which === 107 ||
                        event.which === 173 || event.which === 109 ||
                        event.which === 187 || event.which === 189)) {
        event.preventDefault()
      }
    }, false)
    // Chrome IE 360
    window.addEventListener('mousewheel', function(event) {
      if (event.ctrlKey === true || event.metaKey) {
        event.preventDefault()
      }
    }, { passive: false })

    // firefox
    window.addEventListener('DOMMouseScroll', function(event) {
      if (event.ctrlKey === true || event.metaKey) {
        event.preventDefault()
      }
    }, { passive: false })
  }
}
</script>

<style lang="less" scoped>
// #app {
//   position: absolute;
//   height: 100%;
//   width: 100%;
// }
</style>
