<template>
  <img alt="logo" class="logo" src="./assets/logo.png" />
  <h1>{{ t("appTitle") }}</h1>
  <h4>
    {{ t("welcomeMessage") }}
    <!-- Tooltip-Icon -->
    <span class="tooltip-icon" :data-tooltip="t('tooltip')"> ? </span>
  </h4>
  <LocalSwitch class="switch" />
  <p>{{ t("enterText") }}</p>

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
import { useI18n } from "vue-i18n";

const { t } = useI18n();
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
import LocalSwitch from "./components/LocalSwitch.vue";

export default defineComponent({
  name: "App",
  components: {
    QrInput,
    QrPreview,
    QrDownload,
    LocalSwitch,
  },
});
</script>

<style lang="scss" scoped>
@import "./styles/main.scss";

/* Heading-Styles */
h1 {
  font-size: 2rem;
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 0.5rem;
  color: #333;
}

h4 {
  margin-bottom: 1rem;
  color: #555;

  display: flex;
  align-items: center;
  justify-content: center; // <-- zentriert den Inhalt

  .tooltip-icon {
    margin-left: 0.5rem;
  }
}

p {
  text-align: center;
  font-size: 1rem;
  margin-bottom: 2rem;
  color: #666;
}

.logo {
  display: block;
  margin: 0 auto;
  width: 100px;
  height: 100px;
  margin-top: 2rem;
}

.switch {
  margin: 0 auto;
  display: block;
}

/* Container-Styling */
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

  & > * {
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 1rem;
    background: #fafafa;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.05);
  }
}

/* Tooltip-Icon */
.tooltip-icon {
  position: relative;
  display: inline-block;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.9rem;
  color: #555;
  background-color: #eee;
  padding: 0 0.4rem;
  border-radius: 50%;
  line-height: 1.5;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #ddd;
  }

  /* Tooltip-Text, der mit data-tooltip gesetzt wird */
  &::after {
    content: attr(data-tooltip);
    /* Standardmäßig unsichtbar */
    position: absolute;
    left: 50%;
    bottom: 120%;
    transform: translateX(-50%);
    width: max-content;
    max-width: 200px;

    padding: 0.4rem 0.6rem;
    background-color: #333;
    color: #fff;
    font-size: 0.8rem;
    border-radius: 4px;
    text-align: center;
    white-space: normal;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

    visibility: hidden;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease, visibility 0.2s ease;
  }

  /* kleiner Pfeil unter dem Tooltip */
  &::before {
    content: "";
    position: absolute;
    left: 50%;
    bottom: 110%;
    transform: translateX(-50%);
    border: 0.4rem solid transparent;
    border-top-color: #333;
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.2s ease, visibility 0.2s ease;
  }

  /* Zeigen, wenn man hovert */
  &:hover::after,
  &:hover::before {
    visibility: visible;
    opacity: 1;
  }
}
</style>
