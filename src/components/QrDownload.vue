<template>
  <div class="space-y-4">
    <div class="flex flex-col sm:flex-row sm:items-end gap-4">
      <div class="flex-1">
        <label for="formatSelect" class="form-label">
          {{ t("download.selectFormat") }}
        </label>
        <select
          id="formatSelect"
          v-model="selectedFormat"
          class="form-select"
          aria-describedby="format-hint"
        >
          <option v-for="fmt in formats" :key="fmt" :value="fmt">
            {{ fmt.toUpperCase() }}
          </option>
        </select>
      </div>
      <button
        type="button"
        class="btn-primary w-full sm:w-auto"
        @click="handleDownload"
        :disabled="!inputValue.trim()"
        :aria-disabled="!inputValue.trim()"
      >
        <svg
          class="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
        {{ t("download.downloadButton") }}
      </button>
    </div>
    <p id="format-hint" class="text-sm text-gray-500">
      {{ t("download.downloadFormat") }}
    </p>
  </div>
</template>

<script lang="ts" setup>
  import QRCode from "qrcode";
  import { ref } from "vue";
  import { useI18n } from "vue-i18n";

  const { t } = useI18n();

  const props = defineProps<{
    inputValue: string;
  }>();

  const formats = ["svg", "png", "jpeg", "gif", "tiff", "webp"] as const;

  type FormatType = (typeof formats)[number];

  const selectedFormat = ref<FormatType>("png");

  function downloadFile(url: string, filename: string) {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  async function handleDownload() {
    const input = props.inputValue.trim();
    if (!input) {
      return;
    }

    try {
      if (selectedFormat.value === "svg") {
        const svgString = await QRCode.toString(input, { type: "svg" });
        const blob = new Blob([svgString], { type: "image/svg+xml" });
        const blobUrl = URL.createObjectURL(blob);
        downloadFile(blobUrl, "qrcode.svg");
        URL.revokeObjectURL(blobUrl);
      } else {
        const dataUrl = await QRCode.toDataURL(input, {
          errorCorrectionLevel: "H",
          margin: 2,
          width: 512,
        });
        downloadFile(dataUrl, `qrcode.${selectedFormat.value}`);
      }
    } catch (err) {
      console.error("Fehler beim Erstellen des QR Codes:", err);
    }
  }
</script>

<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({});
</script>
