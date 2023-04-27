<script setup>
import { defineProps, ref, watch, onMounted } from "vue";
const props = defineProps({
  rightPageData: Object,
});

</script>
<template lang="pug">
.text-lg(v-for="dom in props.rightPageData" :key="dom.name")
  .flex.cursor-pointer
    span.font-bold {{dom.name}}
    span.ml-1(v-if="dom.text !== ''") {{ dom.text }}
    span.ml-1(v-else) [-]
  .pl-8
    ChildDom(v-if="dom.components" :rightPageData="dom.components")
</template>
