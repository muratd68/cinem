'use client'

import { useTheme } from '@/context/ThemeContext'
import CodeBlock from '@/components/CodeBlock'
import { Atom, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import PDFDownload from '@/components/PDFDownload'

export default function VueJSCheatSheet() {
  const { isDark } = useTheme()

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/" className={`inline-flex items-center gap-2 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} mb-4`}>
          <ArrowLeft className="w-4 h-4" />
          Geri
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-emerald-500">
              <Atom className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Vue.js Cheat Sheet</h1>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Progressive JavaScript framework</p>
            </div>
          </div>
          <PDFDownload title="Vue.js" sheetId="vuejs" />
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Composition API</h2>

          <CodeBlock
            language="javascript"
            title="Setup ve Reactive"
            code={`<script setup>
import { ref, reactive, computed } from 'vue'

// Ref (primitive values)
const count = ref(0)
const name = ref('Vue')

// Reactive (objects)
const user = reactive({
  name: 'Ali',
  age: 25
})

// Computed
const doubleCount = computed(() => count.value * 2)

// Methods
const increment = () => {
  count.value++
}

const updateUser = () => {
  user.name = 'Veli'
}
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Double: {{ doubleCount }}</p>
    <button @click="increment">+</button>
  </div>
</template>`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Template Syntax</h2>

          <CodeBlock
            language="html"
            title="Directives"
            code={`<!-- Text binding -->
<p>{{ message }}</p>
<p v-text="message"></p>

<!-- HTML binding -->
<div v-html="rawHtml"></div>

<!-- Attribute binding -->
<img :src="imageUrl" :alt="imageAlt">
<a :href="url">Link</a>

<!-- Class binding -->
<div :class="{ active: isActive }"></div>
<div :class="[baseClass, errorClass]"></div>

<!-- Style binding -->
<div :style="{ color: textColor, fontSize: size + 'px' }"></div>

<!-- Conditional -->
<p v-if="seen">Gorunur</p>
<p v-else-if="other">Diger</p>
<p v-else>Varsayilan</p>

<p v-show="isVisible">Show/Hide</p>

<!-- Loop -->
<li v-for="item in items" :key="item.id">
  {{ item.name }}
</li>

<li v-for="(item, index) in items" :key="index">
  {{ index }}: {{ item }}
</li>`}
          />

          <CodeBlock
            language="html"
            title="Event Handling"
            code={`<!-- Click -->
<button @click="handleClick">Click</button>
<button @click="count++">Increment</button>

<!-- Event modifiers -->
<form @submit.prevent="onSubmit">
<a @click.stop="doThis">Stop propagation</a>
<input @keyup.enter="submit">
<button @click.once="doOnce">Once</button>

<!-- Key modifiers -->
<input @keyup.enter="submit">
<input @keyup.esc="cancel">
<input @keyup.ctrl.enter="send">

<!-- Mouse modifiers -->
<div @click.left="onClick">Left</div>
<div @click.right="onRightClick">Right</div>`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Form Handling</h2>

          <CodeBlock
            language="html"
            title="v-model"
            code={`<script setup>
import { ref } from 'vue'

const text = ref('')
const checked = ref(false)
const selected = ref('')
const multiSelect = ref([])
</script>

<template>
  <!-- Text input -->
  <input v-model="text" type="text">

  <!-- Textarea -->
  <textarea v-model="text"></textarea>

  <!-- Checkbox -->
  <input v-model="checked" type="checkbox">

  <!-- Radio -->
  <input v-model="selected" type="radio" value="A">
  <input v-model="selected" type="radio" value="B">

  <!-- Select -->
  <select v-model="selected">
    <option value="a">A</option>
    <option value="b">B</option>
  </select>

  <!-- Multiple select -->
  <select v-model="multiSelect" multiple>
    <option value="a">A</option>
    <option value="b">B</option>
  </select>

  <!-- Modifiers -->
  <input v-model.lazy="text">
  <input v-model.number="age" type="number">
  <input v-model.trim="text">
</template>`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Lifecycle Hooks</h2>

          <CodeBlock
            language="javascript"
            title="Lifecycle"
            code={`<script setup>
import {
  onMounted,
  onUpdated,
  onUnmounted,
  onBeforeMount,
  onBeforeUpdate,
  onBeforeUnmount
} from 'vue'

// Component mount oldugunda
onMounted(() => {
  console.log('Component mounted')
  // API calls, DOM operations
})

// Component update oldugunda
onUpdated(() => {
  console.log('Component updated')
})

// Component unmount olmadan once
onUnmounted(() => {
  console.log('Component unmounted')
  // Cleanup: event listeners, timers
})

onBeforeMount(() => {
  console.log('Before mount')
})

onBeforeUpdate(() => {
  console.log('Before update')
})

onBeforeUnmount(() => {
  console.log('Before unmount')
})
</script>`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Watch</h2>

          <CodeBlock
            language="javascript"
            title="Watch ve WatchEffect"
            code={`<script setup>
import { ref, watch, watchEffect } from 'vue'

const count = ref(0)
const user = ref({ name: 'Ali' })

// Tek degisken izleme
watch(count, (newValue, oldValue) => {
  console.log(\`Count: \${oldValue} -> \${newValue}\`)
})

// Birden fazla degisken
watch([count, user], ([newCount, newUser], [oldCount, oldUser]) => {
  console.log('Values changed')
})

// Deep watch
watch(user, (newUser) => {
  console.log('User changed:', newUser)
}, { deep: true })

// Immediate
watch(count, (newValue) => {
  console.log('Count:', newValue)
}, { immediate: true })

// WatchEffect - otomatik dependency tracking
watchEffect(() => {
  console.log('Count is:', count.value)
})
</script>`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Props ve Emit</h2>

          <CodeBlock
            language="javascript"
            title="Props"
            code={`<!-- ChildComponent.vue -->
<script setup>
// Props tanimlama
const props = defineProps({
  title: String,
  count: {
    type: Number,
    default: 0
  },
  user: {
    type: Object,
    required: true
  },
  items: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <h1>{{ title }}</h1>
  <p>Count: {{ count }}</p>
</template>

<!-- Parent -->
<ChildComponent
  title="Hello"
  :count="5"
  :user="userData"
/>`}
          />

          <CodeBlock
            language="javascript"
            title="Emit Events"
            code={`<!-- ChildComponent.vue -->
<script setup>
const emit = defineEmits(['update', 'delete'])

const handleUpdate = () => {
  emit('update', { id: 1, name: 'New' })
}

const handleDelete = () => {
  emit('delete', 1)
}
</script>

<template>
  <button @click="handleUpdate">Update</button>
  <button @click="handleDelete">Delete</button>
</template>

<!-- Parent -->
<ChildComponent
  @update="onUpdate"
  @delete="onDelete"
/>`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Composables</h2>

          <CodeBlock
            language="javascript"
            title="Custom Composable"
            code={`// composables/useMouse.js
import { ref, onMounted, onUnmounted } from 'vue'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  const update = (event) => {
    x.value = event.pageX
    y.value = event.pageY
  }

  onMounted(() => {
    window.addEventListener('mousemove', update)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', update)
  })

  return { x, y }
}

// Kullanim
<script setup>
import { useMouse } from '@/composables/useMouse'

const { x, y } = useMouse()
</script>

<template>
  <p>Mouse: {{ x }}, {{ y }}</p>
</template>`}
          />

          <CodeBlock
            language="javascript"
            title="useFetch Composable"
            code={`// composables/useFetch.js
import { ref } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(true)

  fetch(url)
    .then(res => res.json())
    .then(json => {
      data.value = json
    })
    .catch(err => {
      error.value = err
    })
    .finally(() => {
      loading.value = false
    })

  return { data, error, loading }
}

// Kullanim
<script setup>
import { useFetch } from '@/composables/useFetch'

const { data, loading, error } = useFetch('/api/users')
</script>`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Vue Router</h2>

          <CodeBlock
            language="javascript"
            title="Router Kurulumu"
            code={`// router/index.js
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('@/views/Home.vue') },
  { path: '/about', component: () => import('@/views/About.vue') },
  { path: '/user/:id', component: () => import('@/views/User.vue') },
  { path: '/:pathMatch(.*)*', component: () => import('@/views/404.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

// Component icinde
<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// Programmatic navigation
router.push('/about')
router.push({ name: 'user', params: { id: 1 } })
router.replace('/login')
router.go(-1)

// Route bilgisi
const userId = route.params.id
const query = route.query
</script>`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Pinia (State Management)</h2>

          <CodeBlock
            language="javascript"
            title="Pinia Store"
            code={`// stores/counter.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
    name: 'Counter'
  }),

  getters: {
    doubleCount: (state) => state.count * 2
  },

  actions: {
    increment() {
      this.count++
    },
    async fetchCount() {
      const res = await fetch('/api/count')
      this.count = await res.json()
    }
  }
})

// Component icinde
<script setup>
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()

// State
console.log(counter.count)

// Getters
console.log(counter.doubleCount)

// Actions
counter.increment()
</script>`}
          />
        </section>
      </div>
    </div>
  )
}
