<script lang="ts">
import type { ToggleGroupRootEmits, ToggleGroupRootProps } from 'reka-ui'
import { useForwardPropsEmits } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

export interface ToggleGroupAnimationContext {
  nodePresent: Ref<boolean>
  animating: Ref<boolean>
}

export const [injectToggleGroupAnimationContext, provideToggleGroupAnimationContext] =
  createContext<ToggleGroupAnimationContext>('ToggleGroupRoot')
</script>

<script lang="ts" setup>
export interface UToggleGroupRootProps extends ToggleGroupRootProps {
  class?: HTMLAttributes['class']
}
export type UToggleGroupRootEmits = ToggleGroupRootEmits

const props = defineProps<UToggleGroupRootProps>()
const emits = defineEmits<UToggleGroupRootEmits>()

const delegated = reactiveOmit(props, 'class')
const forwarded = useForwardPropsEmits(delegated, emits)

const animating = ref(false)
const { start } = useTimeoutFn(() => (animating.value = false), 150, { immediate: false })

function onValueChange() {
  animating.value = true
  start()
}

provideToggleGroupAnimationContext({
  animating,
  nodePresent: ref(false),
})
</script>

<template>
  <ToggleGroupRoot
    v-bind="forwarded"
    :class="cn('isolate anchor-scope-toggle', props.class)"
    data-slot="toggle-group-root"
    @update:model-value="onValueChange"
  >
    <slot />
  </ToggleGroupRoot>
</template>
