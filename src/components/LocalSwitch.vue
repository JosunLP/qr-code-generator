<template>
  <div class="inline-flex items-center gap-2">
    <label for="language-select" class="sr-only"> Select Language </label>
    <select
      id="language-select"
      v-model="currentLocale"
      @change="changeLocale"
      class="form-select text-sm py-2 pr-8 pl-3"
      aria-label="Select Language"
    >
      <option value="en">🇬🇧 English</option>
      <option value="de">🇩🇪 Deutsch</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

const currentLocale = ref(locale.value);
locale.value = currentLocale.value;

function changeLocale() {
  locale.value = currentLocale.value;
}
</script>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({});
</script>
