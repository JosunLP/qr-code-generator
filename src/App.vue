<template>
  <h1>QR Code Generator</h1>
  <h4>Welcome to the most simple QR Code Generator you can find</h4>
  <p>Enter the text you want to convert to a QR code.</p>

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
const inputType = ref<"text" | "url" | "vcard" | "wifi" | "email">("text");

function onInputValueChange(val: string) {
  inputValue.value = val;
}

function onInputTypeChange(
  newType: "text" | "url" | "vcard" | "wifi" | "email"
) {
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

/* Grundlegende Heading-Styles */
h1 {
  font-size: 2rem;
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 0.5rem;
  color: #333;
}

h4 {
  text-align: center;
  margin-bottom: 1rem;
  color: #555;
}

p {
  text-align: center;
  font-size: 1rem;
  margin-bottom: 2rem;
  color: #666;
}

/* Container für unsere Input-, Preview- und Download-Komponenten */
.app-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  max-width: 700px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);

  /* Einheitliches Styling für die Kinder-Komponenten */
  & > * {
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 1rem;
    background: #fafafa;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.05);
  }
}
</style>
