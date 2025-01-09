<template>
  <div class="qr-input-container">
    <!-- Auswahl, welcher Input-Typ verwendet werden soll -->
    <div class="field-group">
      <label for="inputType">Input-Typ:</label>
      <select id="inputType" v-model="inputType" @change="emitChanges">
        <option value="text">Text</option>
        <option value="url">URL</option>
        <option value="vcard">vCard</option>
      </select>
    </div>

    <!-- Eingabefeld nur, wenn 'text' oder 'url' ausgewählt ist -->
    <div v-if="inputType !== 'vcard'" class="field-group">
      <label for="inputValue">Wert eingeben:</label>
      <input
        id="inputValue"
        type="text"
        v-model="inputValue"
        @input="emitChanges"
        placeholder="Gib hier deinen Text oder deine URL ein"
      />
    </div>

    <!-- vCard-Eingabefelder werden angezeigt, wenn 'vcard' -->
    <div v-else class="field-group vcard-fields">
      <label for="firstName">Vorname:</label>
      <input
        id="firstName"
        type="text"
        v-model="firstName"
        @input="emitChanges"
        placeholder="Vorname"
      />

      <label for="lastName">Nachname:</label>
      <input
        id="lastName"
        type="text"
        v-model="lastName"
        @input="emitChanges"
        placeholder="Nachname"
      />

      <label for="email">E-Mail:</label>
      <input
        id="email"
        type="email"
        v-model="email"
        @input="emitChanges"
        placeholder="E-Mail"
      />

      <label for="phone">Telefon:</label>
      <input
        id="phone"
        type="tel"
        v-model="phone"
        @input="emitChanges"
        placeholder="Telefonnummer"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from "vue";

/**
 * Wir erweitern den Typ auf: "text" | "url" | "vcard"
 * und emittieren den entsprechend generierten Wert.
 */
const emit = defineEmits<{
  (event: "update:inputValue", value: string): void;
  (event: "update:inputType", type: "text" | "url" | "vcard"): void;
}>();

// Bisherige Felder
const inputValue = ref<string>("");
const inputType = ref<"text" | "url" | "vcard">("text");

// Zusätzliche Felder für vCard
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const phone = ref("");

/**
 * Kleiner Helfer, um aus den vCard-Feldern
 * einen validen vCard-String zusammenzubauen.
 * Minimales Beispiel für Version 3.0.
 */
function buildVcardString(): string {
  return `BEGIN:VCARD
VERSION:3.0
N:${lastName.value};${firstName.value};;;
FN:${firstName.value} ${lastName.value}
EMAIL;TYPE=work:${email.value}
TEL;TYPE=work,voice:${phone.value}
END:VCARD`;
}

/**
 * emitChanges() wird aufgerufen, wenn etwas im Formular
 * geändert wird. Je nachdem, ob wir 'vcard' oder
 * 'text'/'url' gewählt haben, packen wir den passenden
 * Wert in 'update:inputValue'.
 */
function emitChanges() {
  if (inputType.value === "vcard") {
    // Generiere einen vCard-String aus den Feldern
    emit("update:inputValue", buildVcardString());
  } else {
    // Bei 'text' oder 'url' nutzen wir das normale Eingabefeld
    emit("update:inputValue", inputValue.value);
  }
  emit("update:inputType", inputType.value);
}
</script>

<script lang="ts">
import { defineComponent } from "vue";
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

  /* Optional: Hover-Style */
  input:hover,
  select:hover {
    border-color: #888;
  }

  /* Ein wenig Grid-Layout für die vCard-Felder, 
     damit die Eingabe nebeneinander angezeigt werden kann. */
  .vcard-fields {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;

    label {
      margin-top: 1rem;
    }
  }
}
</style>
