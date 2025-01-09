<template>
  <div class="qr-download-container">
    <div class="download-controls">
      <label for="formatSelect">{{ t("download.selectFormat") }}:</label>
      <select id="formatSelect" v-model="selectedFormat">
        <option v-for="fmt in formats" :key="fmt" :value="fmt">
          {{ fmt.toUpperCase() }}
        </option>
      </select>
      <button @click="handleDownload">
        {{ t("download.downloadButton") }}
      </button>
    </div>
    <p class="hint">
      {{ t("download.downloadFormat") }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref } from "vue";
import QRCode from "qrcode";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps<{
  inputValue: string;
}>();

const formats = ["svg", "png", "jpeg", "gif", "tiff", "webp"] as const;

type FormatType = (typeof formats)[number]; // "svg" | "png" | "jpeg" | "gif" | "tiff" | "webp"

// aktuell ausgewähltes Format
const selectedFormat = ref<FormatType>("png");

// Hilfsfunktion, um eine Data-URL oder Blob-URL herunterzuladen.
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
    // Wenn nichts eingegeben wurde, kein Download
    alert("Bitte zuerst einen Text oder eine URL eingeben!");
    return;
  }

  try {
    if (selectedFormat.value === "svg") {
      const svgString = await QRCode.toString(input, { type: "svg" });
      const blob = new Blob([svgString], { type: "image/svg+xml" });
      const blobUrl = URL.createObjectURL(blob);
      downloadFile(blobUrl, "qrcode.svg");
      URL.revokeObjectURL(blobUrl); // aufräumen
    } else {
      const dataUrl = await QRCode.toDataURL(input, {
        errorCorrectionLevel: "H",
        margin: 2,
        width: 256,
      });
      downloadFile(dataUrl, `qrcode.${selectedFormat.value}`);
    }
  } catch (err) {
    console.error("Fehler beim Erstellen des QR Codes:", err);
    alert(
      "Beim Erstellen oder Herunterladen des QR-Codes ist ein Fehler aufgetreten."
    );
  }
}
</script>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style lang="scss" scoped>
.qr-download-container {
  margin-top: 1rem;

  .download-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;

    label {
      font-weight: 600;
    }

    select {
      padding: 0.3rem;
      border-radius: 4px;
      border: 1px solid #ccc;
    }

    button {
      padding: 0.4rem 0.8rem;
      border: none;
      border-radius: 4px;
      background-color: #4caf50;
      color: #fff;
      font-weight: 600;
      cursor: pointer;

      &:hover {
        background-color: #45a049;
      }
    }
  }

  .hint {
    font-size: 0.9rem;
    color: #777;
  }
}
</style>
