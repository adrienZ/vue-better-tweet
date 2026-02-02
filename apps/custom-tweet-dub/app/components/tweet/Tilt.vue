<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    tiltMaxAngleX?: number
    tiltMaxAngleY?: number
    scale?: number
    glareEnable?: boolean
    glareMaxOpacity?: number
    glareColor?: string
    glarePosition?: 'top' | 'right' | 'bottom' | 'left' | 'all'
    glareBorderRadius?: string
  }>(),
  {
    tiltMaxAngleX: 10,
    tiltMaxAngleY: 10,
    scale: 1,
    glareEnable: false,
    glareMaxOpacity: 0.2,
    glareColor: '#ffffff',
    glarePosition: 'all',
    glareBorderRadius: '0px',
  }
)

const root = ref<HTMLElement | null>(null)
const rotateX = ref(0)
const rotateY = ref(0)
const glareOpacity = ref(0)
const glareX = ref(50)
const glareY = ref(50)

const updateFromEvent = (event: PointerEvent) => {
  if (!root.value) return
  const rect = root.value.getBoundingClientRect()
  const x = (event.clientX - rect.left) / rect.width
  const y = (event.clientY - rect.top) / rect.height

  rotateX.value = (props.tiltMaxAngleX ?? 0) * (0.5 - y) * 2
  rotateY.value = (props.tiltMaxAngleY ?? 0) * (x - 0.5) * 2
  glareX.value = Math.min(100, Math.max(0, x * 100))
  glareY.value = Math.min(100, Math.max(0, y * 100))
  glareOpacity.value = props.glareEnable ? props.glareMaxOpacity : 0
}

const resetTilt = () => {
  rotateX.value = 0
  rotateY.value = 0
  glareOpacity.value = 0
}

const innerStyle = computed(() => ({
  transform: `rotateX(${rotateX.value}deg) rotateY(${rotateY.value}deg) scale(${props.scale})`,
}))

const glareStyle = computed(() => ({
  opacity: glareOpacity.value,
  borderRadius: props.glareBorderRadius,
  background: `radial-gradient(circle at ${glareX.value}% ${glareY.value}%, ${props.glareColor} 0%, rgba(255,255,255,0) 60%)`,
}))
</script>

<template>
  <div
    ref="root"
    :class="$style.root"
    @pointermove="updateFromEvent"
    @pointerleave="resetTilt"
  >
    <div :class="$style.inner" :style="innerStyle">
      <div v-if="props.glareEnable" :class="$style.glare" :style="glareStyle" />
      <slot />
    </div>
  </div>
</template>

<style module>
.root {
  perspective: 1000px;
  transform-style: preserve-3d;
}

.inner {
  position: relative;
  transform-style: preserve-3d;
  transition: transform 120ms ease;
}

.glare {
  position: absolute;
  inset: 0;
  pointer-events: none;
  transition: opacity 120ms ease;
}
</style>
