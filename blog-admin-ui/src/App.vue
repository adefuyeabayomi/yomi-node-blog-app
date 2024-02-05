<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
.pointercursor:hover {
  cursor : pointer;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-bottom : 300px;
}

.bold-font {
    font-weight: 900 !important;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.no-margin {
  margin : 0px !important;
}
.text-left {
  text-align: left;
}
p {
  margin : 0px !important;
}
</style>
