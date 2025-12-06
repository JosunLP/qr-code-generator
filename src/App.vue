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
        <p class="relative text-gray-600 mb-4 flex items-center justify-center gap-2">
          {{ t("welcomeMessage") }}
          <span class="inline-block sm:relative" ref="tooltipContainer">
            <button
              type="button"
              class="inline-flex items-center justify-center w-7 h-7 text-sm font-bold text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-colors shadow-md hover:shadow-lg"
              :aria-label="t('tooltip')"
              :aria-expanded="showTooltip"
              aria-describedby="tooltip-content"
              @click="showTooltip = !showTooltip"
              @mouseenter="showTooltipHover = true"
              @mouseleave="showTooltipHover = false"
            >
              ?
            </button>
            <!-- Tooltip Content -->
            <Transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="opacity-0 translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 translate-y-1"
            >
              <div
                v-if="showTooltip || showTooltipHover"
                id="tooltip-content"
                role="tooltip"
                class="absolute z-50 top-full mt-3 w-72 max-w-[calc(100vw-2rem)] p-4 text-sm text-left text-gray-700 bg-white rounded-xl shadow-xl border border-gray-200 left-0 right-0 mx-auto sm:left-1/2 sm:right-auto sm:mx-0 sm:-translate-x-1/2"
                @mouseenter="showTooltipHover = true"
                @mouseleave="showTooltipHover = false"
              >
                <!-- Tooltip Arrow -->
                <div
                  class="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45"
                ></div>
                <div class="relative flex items-start gap-3">
                  <span
                    class="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center"
                  >
                    <svg
                      class="w-4 h-4 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </span>
                  <span class="pt-0.5">{{ t("tooltip") }}</span>
                </div>
              </div>
            </Transition>
          </span>
        </p>

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
  import { onMounted, onUnmounted, ref } from "vue";
  import { useI18n } from "vue-i18n";
  import LocalSwitch from "./components/LocalSwitch.vue";
  import QrDownload from "./components/QrDownload.vue";
  import QrInput from "./components/QrInput.vue";
  import QrPreview from "./components/QrPreview.vue";

  const { t } = useI18n();
  const inputValue = ref("");
  const inputType = ref<"text" | "url" | "vcard" | "wifi" | "email">("text");
  const showTooltip = ref(false);
  const showTooltipHover = ref(false);
  const tooltipContainer = ref<HTMLElement | null>(null);

  // Close tooltip when clicking outside
  function handleClickOutside(event: MouseEvent) {
    if (tooltipContainer.value && !tooltipContainer.value.contains(event.target as Node)) {
      showTooltip.value = false;
    }
  }

  // Close tooltip on Escape key
  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      showTooltip.value = false;
    }
  }

  onMounted(() => {
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
  });

  onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
    document.removeEventListener("keydown", handleKeyDown);
  });

  function onInputValueChange(val: string) {
    inputValue.value = val;
  }

  function onInputTypeChange(newType: "text" | "url" | "vcard" | "wifi" | "email") {
    inputType.value = newType;
  }
</script>
