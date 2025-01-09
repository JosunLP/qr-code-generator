<template>
  <h1>QR Code Generator</h1>
  <h4>Welcome to the most simple QR Code Generator you can find</h4>
  <p>Enter the text you want to convert to QR Code</p>
  <div class="app-container">
    <!-- Eingabekomponente -->
    <QrInput
      @update:inputValue="onInputValueChange"
      @update:inputType="onInputTypeChange"
    />

    <!-- Vorschaukomponente -->
    <QrPreview :inputValue="inputValue" :inputType="inputType" />

    <!-- Downloadkomponente -->
    <QrDownload :inputValue="inputValue" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const inputValue = ref("");
const inputType = ref<"text" | "url" | "vcard">("text");

function onInputValueChange(val: string) {
  inputValue.value = val;
}

function onInputTypeChange(newType: "text" | "url" | "vcard") {
  inputType.value = newType;
}
</script>

<script lang="ts">
import { defineComponent } from "vue";
import QrInput from "./components/QrInput.vue";
import QrPreview from "./components/QrPreview.vue";
import QrDownload from "./components/QrDownload.vue";

export default defineComponent({
  name: "App",
  components: {
    QrInput,
    QrPreview,
    QrDownload,
  },
});
</script>

<style lang="scss" scoped>
@import "./styles/main.scss";

.app-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;

  /* Einfaches zentrieren und minimaler Style */
  & > * {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 1rem;
    background: #fafafa;
  }
}
</style>
