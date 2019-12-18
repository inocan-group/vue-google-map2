<template>
  <div class="main">
    <div class="container">
      <div class="top" style="text-align:center">
        <p>
          <a>
            <img class="image" :src="require('../../assets/vue-map.svg')" />
          </a>
        </p>
        <h2>Welcome to Storybook for Vue Maps</h2>
      </div>
      <p>
        Vue Maps is a library for Vue JS viewmodel JavaScript framework. The tool enables users to use Google Maps API straight in the Vue application. Integration of storybook allows quickly to learn how components work and what parameters they need to get to show one or another information.
      </p>
      <p>
        Here you will find a collection of UI components represented as stories, where you can interact with the different maps components by triggering multiple actions and knobs.
      </p>

      <h4>How to use this library</h4>
      <ul>
        <li>Clone the repository.</li>
        <li>
          Install the dependencies using
          <code>yarn install</code> or <code>sudo yarn install</code>.
        </li>
        <li>
          Run storybook to see the components
          <code>yarn storybook</code>. Or build if you want to use this library in your own server: <code>yarn storybook:build</code>.
        </li>
        <li>Run vue if you want to try the components in vue: <code>yarn serve</code>.</li>
        <li>The components are inside the <strong>src/components</strong> folder directory.</li>
        <li>Look at the components in the storybook, try and learn how to use it. From the description provided in each component's "Info" tab.</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {}
</script>

<style scoped>
.main {
  display: flex;
  justify-content: center;
  line-height: 1.4;
  font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
  font-size: 1rem;
  color: #314556;
}
h2 {
  margin-block-start: 3rem;
  margin-block-end: 3rem;
}
h4 {
  margin-block-start: 3rem;
}
.container {
  padding: 2rem;
  max-width: 50rem;
}
.image {
  width: 100px;
}
.logo {
  width: 50px;
}
code {
  font-size: 0.9rem;
  border-radius: 4px;
  color: #5492cc;
  background-color: #eff4f7;
  padding: 2px 10px;
  margin: 10px 0;
}
</style>
