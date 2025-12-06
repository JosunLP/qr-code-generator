<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-6 sm:py-10 px-4">
    <div class="max-w-2xl mx-auto">
      <!-- Header -->
      <header class="text-center mb-8">
        <img
          alt="QRify Logo"
          class="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4"
          src="./assets/logo.png"
        />
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          {{ t("appTitle") }}
        </h1>
        <p class="text-gray-600 mb-4 flex items-center justify-center gap-2">
          {{ t("welcomeMessage") }}
          <button
            type="button"
            class="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-gray-500 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            :aria-label="t('tooltip')"
            @click="showTooltip = !showTooltip"
          >
            ?
          </button>
        </p>

        <!-- Tooltip Content -->
        <div
          v-if="showTooltip"
          role="tooltip"
          class="inline-block max-w-xs p-3 mb-4 text-sm text-left text-gray-700 bg-white rounded-lg shadow-lg border border-gray-200"
        >
          {{ t("tooltip") }}
        </div>

        <!-- Language Switch -->
        <LocalSwitch class="mx-auto" />
      </header>

      <!-- Main Content -->
      <main>
        <p class="text-center text-gray-600 mb-6">
          {{ t("enterText") }}
        </p>

        <div class="space-y-6">
          <!-- Input Card -->
          <section aria-labelledby="input-heading" class="card">
            <h2 id="input-heading" class="sr-only">
              {{ t("input.textUrl.inputType") }}
            </h2>
            <QrInput
              @update:inputValue="onInputValueChange"
              @update:inputType="onInputTypeChange"
            />
          </section>

          <!-- Preview Card -->
          <section aria-labelledby="preview-heading" class="card">
            <h2 id="preview-heading" class="sr-only">
              {{ t("preview.dummyText") }}
            </h2>
            <QrPreview :inputValue="inputValue" :inputType="inputType" />
          </section>

          <!-- Download Card -->
          <section aria-labelledby="download-heading" class="card">
            <h2 id="download-heading" class="sr-only">
              {{ t("download.selectFormat") }}
            </h2>
            <QrDownload :inputValue="inputValue" />
          </section>
        </div>
      </main>

      <!-- Footer -->
      <footer class="mt-10 text-center">
        <a
          href="https://github.com/JosunLP/qr-code-generator"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded px-2 py-1"
          :aria-label="t('footer.viewOnGithub')"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill-rule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="font-medium">{{ t("footer.github") }}</span>
        </a>
      </footer>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  import { useI18n } from "vue-i18n";
  import LocalSwitch from "./components/LocalSwitch.vue";
  import QrDownload from "./components/QrDownload.vue";
  import QrInput from "./components/QrInput.vue";
  import QrPreview from "./components/QrPreview.vue";

  const { t } = useI18n();
  const inputValue = ref("");
  const inputType = ref<"text" | "url" | "vcard" | "wifi" | "email">("text");
  const showTooltip = ref(false);

  function onInputValueChange(val: string) {
    inputValue.value = val;
  }

  function onInputTypeChange(newType: "text" | "url" | "vcard" | "wifi" | "email") {
    inputType.value = newType;
  }
</script>
