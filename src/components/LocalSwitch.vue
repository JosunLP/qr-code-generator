<template>
  <select v-model="currentLocale" @change="changeLocale">
    <option value="en">English</option>
    <option value="de">Deutsch</option>
  </select>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ref } from "vue";

const { locale } = useI18n();

const currentLocale = ref(locale.value); // ref-Objekt, das du direkt binden kannst
locale.value = currentLocale.value;

function changeLocale() {
  locale.value = currentLocale.value;
}
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({});
</script>
