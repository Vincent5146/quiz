<script setup>
import { ref, onMounted, watch } from "vue";
import ChildDom from "../components/ChildDom.vue";

const rightPage = ref(null);
const defaultData = ref({
  dom: [],
  key: "",
  value: "",
});
const rightPageData = ref([
  {
    name: "1",
    text: "",
    components: [
      {
        name: "1",
        text: "",
        components: [
          {
            name: "1",
            text: "123",
            components: [],
          },
        ],
      },
    ],
  },
]);
const showData = ref([]);
const addInput = () => {
  const newData = { ...defaultData.value };
  showData.value.push(newData);
};
const deleteDom = (index) => {
  showData.value.splice(index, 1);
  rightPageData.value.splice(index, 1);
};
const stringToData = (item, index) => {
  //避免重複推送
  if (showData.value[index]) {
    const data = [];
    const levels = item.key.split(".");
    levels[levels.length - 1] = `${levels[levels.length - 1]}:${item.value}`;
    let currentLevel = data;
    levels.forEach((level, index) => {
      const isLastLevel = index === levels.length - 1;
      const isLastLevelWithContent = isLastLevel && level.includes(":");
      if (isLastLevelWithContent) {
        const [name, text] = level.split(":");
        currentLevel.push({
          name,
          text,
          components: [],
        });
      } else {
        const [name] = level.split(":");
        const newLevel = {
          name,
          text: "",
          components: [],
        };
        currentLevel.push(newLevel);
        currentLevel = newLevel.components;
      }
    });
    rightPageData.value.splice(index, 1, data);
  }
};
onMounted(() => {
  // 產一筆預設資料
  const newData = { ...defaultData.value };
  showData.value.push(newData);
});
</script>

<template lang="pug">
#app.px-20.pb-20.pt-5.h-screen.bg-slate-900
  .mb-2.text-2xl.text-slate-200.font-bold Nested Key-Value Pair Tree Viewer
  .grid.grid-cols-2.gap-8.h-full
    .border.border-slate-500
      .flex.justify-end.p-3
        button.bg-slate-200.text-slate-800.p-2.font-bold(@click="addInput") ＋Add New Pair
      div
        .px-5.py-2.flex(v-for="(item, index) in showData")
          .grid.grid-cols-2.gap-4.flex-grow.mr-3
            input.bg-transparent.outline-none.border.text-slate-200.border-slate-500.text-base.px-2.py-1.w-full(
              placeholder="Key",
              v-model="item.key",
              @input="stringToData(item, index)"
            )
            input.bg-transparent.outline-none.border.text-slate-200.border-slate-500.text-base.px-2.py-1.w-full(
              placeholder="Value",
              v-model="item.value",
              @input="stringToData(item, index)"
            )
          button.w-10.text-sm.flex.justify-center.items-center.bg-slate-300.text-slate-800(
            @click="deleteDom(index)"
          ) －
    .text-slate-200.p-6.border.border-slate-500
      template(v-if="showData")
        //- 用迴圈讓元件呼叫自己
        ChildDom(
          v-for="(item, index) in rightPageData",
          :key="item",
          :rightPageData="item"
        )
</template>

<style scoped>
</style>
