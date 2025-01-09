<template>
  <div class="qr-input-container">
    <!-- Auswahl, ob Text oder URL -->
    <div class="field-group">
      <label for="inputType">Input-Typ:</label>
      <select id="inputType" v-model="inputType" @change="emitChanges">
        <option value="text">Text</option>
        <option value="url">URL</option>
      </select>
    </div>

    <!-- Eingabefeld -->
    <div class="field-group">
      <label for="inputValue">Wert eingeben:</label>
      <input
        id="inputValue"
        type="text"
        v-model="inputValue"
        @input="emitChanges"
        placeholder="Gib hier deinen Text oder deine URL ein"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from "vue";

// Wir definieren eine "emit"-Funktion, um nach außen zu kommunizieren,
// wenn sich der Wert ändert. Der Eltern-Komponente erlauben wir so,
// den aktuellen Wert der Eingabe und des Typs zu erhalten.
const emit = defineEmits<{
  (event: "update:inputValue", value: string): void;
  (event: "update:inputType", type: "text" | "url"): void;
}>();

// Intern halten wir den aktuellen Eingabewert und den Eingabetyp
const inputValue = ref<string>("");
const inputType = ref<"text" | "url">("text");

// Diese Funktion rufen wir sowohl bei Änderungen des Textes als auch
// bei Änderungen des Input-Typs auf.
function emitChanges() {
  emit("update:inputValue", inputValue.value);
  emit("update:inputType", inputType.value);
}
</script>

<script lang="ts">
import { defineComponent } from "vue";

// Hier definierst du einen "leeren" Default-Export
export default defineComponent({});
</script>

<style lang="scss" scoped>
.qr-input-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .field-group {
    display: flex;
    flex-direction: column;
  }

  label {
    font-weight: 600;
    margin-bottom: 0.25rem;
  }

  input,
  select {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  /* Optional: ein bisschen Hover-Style */
  input:hover,
  select:hover {
    border-color: #888;
  }
}
</style>
