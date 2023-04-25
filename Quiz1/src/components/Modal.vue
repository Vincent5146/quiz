
<script setup>
import { defineProps, defineEmits, ref } from "vue";
const props = defineProps({
  open: Boolean,
  person: Object,
});
const emit = defineEmits(["openModal"]);

const open = ref(false);
const openModal = (value) => {
  open.value = value;
  emit("openModal", open.value);
};
</script>

<template lang="pug">
transition(name="fade")
  .absolute.inset-0.z-0(v-if="props.open")
    .absolute.bg-black.opacity-70.inset-0.z-0(@click="openModal(open)")
    .w-full.max-w-lg.p-3.relative.mx-auto.rounded-xl.shadow-lg.bg-white(class="top-1/3")
      div.flex.flex-col.justify-center.items-center
        img.w-40(:src="props.person.picture.large", :alt="person")
        .text-center.p-3.flex-auto.justify-center.leading-6
          h2.text-2xl.font-bold.py-4 {{ props.person.name.first }} {{ props.person.name.last }} | {{ props.person.dob.age }}y
          h2.px-3.py-1.text-sm.font-semibold.text-center.text-gray-700 {{ props.person.phone }}
          a(:href="'mailto:' + props.person.email") {{ props.person.email }}
          h2.px-3.py-1.text-sm.font-semibold.text-center.text-gray-700 {{ props.person.location.street.number }} {{ props.person.location.city }} {{ props.person.location.state }}
        .p-3.mt-2.text-center.space-x-4(class="md:block")
          button.mb-2.bg-purple-500.border.border-purple-500.px-5.py-2.text-sm.shadow-sm.font-medium.tracking-wider.text-white.rounded-md(
            @click="openModal(open)",
            class="md:mb-0 hover:shadow-lg hover:bg-purple-600"
          ) Close
</template>

<style scope>
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 500ms ease-out;
}
</style>