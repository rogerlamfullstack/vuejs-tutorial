<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { ref, reactive, watchEffect } from 'vue'

defineProps<{ msg: string }>()

let whyUsingReactive = 0;
const count = ref(0);
const dynamicId = ref("100");
const state = reactive({ count: 0, count2: 0 })
let count2 = ref(0);
function checkErr() {
  throw new Error("Check error handler example");
}
function increment() {
  state.count++;
  whyUsingReactive++; // you can see why we need to use reactive when want to access the variable
}
watchEffect(() => {
  state.count2 = state.count + 1;
})
let state2 = reactive({ count: 0 })

// the above reference ({ count: 0 }) is no longer being tracked (reactivity connection is lost!)
state2 = reactive({ count: 1 })

function exampleLimitationReactivity() {

  const state = reactive({ count: 0 })

  // n is a local variable that is disconnected
  // from state.count.
  let n = state.count
  // does not affect original state
  n++
  console.log("n:" + n);
  // count is also disconnected from state.count.
  let { count } = state
  // does not affect original state
  count++
  console.log("count local:" + count);
  // the function receives a plain number and
  // won't be able to track changes to state.count
  console.log(state.count);
}

function exampleRefUnwrapping() {
  const count = ref(0)
  let state = reactive({
    count
  })

  console.log('Old Count:' + count.value) // 0

  state.count = 1
  console.log('State count with old count:' + count.value) // 1

  const otherCount = ref(2)
  state = reactive({
    count: otherCount
  })
  state.count = 5;
  console.log('New count:' + otherCount.value) // 2
  // original ref is now disconnected from state.count
  console.log('Old count:' + count.value) // 1
}
let i = 0;
const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})

// a computed ref
const publishedBooksMessage = computed(() => {
  return Date.now(); // sample if use the computed
  return author.books.length > 0 ? 'Yes' : 'No'
})

//
// a computed ref
function publishedBookWithoutComputed() {
  return  Date.now(); // sample if use without the computed
  return author.books.length > 0 ? 'Yes Without Computed' : 'No Without Computed'
};

function clickChangeAuthor() {
  if (i == 0) {
    i++;
    return;
  }
  publishedBookWithoutComputed
  return author.books = [];
}

/* Writable compute */
const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed({
  // getter
  get() {
    return firstName.value + ' ' + lastName.value
  },
  // setter
  set(newValue) {
    // Note: we are using destructuring assignment syntax here.
    [firstName.value, lastName.value] = newValue.split(' ')
  }
})

function changeName() {
  fullName.value = 'Roger Lam';
}

</script>


<template>
  <h1>{{ msg }}</h1>

  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VS Code</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>See <code>README.md</code> for more information.</p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Docs
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
  </p>
  <div :foobar="12" v-bind:id="dynamicId">DynamicId: {{ dynamicId }}</div>

  <button type="button" @click="count++">count is: {{ count }}</button>
  <br />
  <button type="button" @click="checkErr">Error Handling Example</button>
  <br />
  <p>
    Why we need to use reactive: {{ whyUsingReactive }}
    <button type="button" @click="increment">State using Reactive: {{ state.count }}, Count 2 variable (check for
      watchEffect method) : {{ state.count2 }}</button>
  </p>
  <p>
    Limitation of reactivity: {{ state2.count }}
    <button @click="exampleLimitationReactivity"> Click here and view on console log</button>
  </p>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
  <p>
    The example of RefUnwrapping: <button @click="exampleRefUnwrapping">Click here</button>
  </p>

  <p>Has published books:</p>
  <p>Published use computed method: {{ publishedBooksMessage }}</p>
  <p>publishedBookWithoutComputed: {{ publishedBookWithoutComputed() }}</p>
  <button @click="clickChangeAuthor">Button without Computed</button>

  <p>
  {{fullName}}. 
  <br/> 
  Click btn below, you'll see the method without Computed will change value because it does not cache like compute method.
  <br/>
  Reason change: the DOM update and it sees the publishedBookWithoutComputed() => change value to show
  </p>
  <button @click="changeName">Change name</button>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
