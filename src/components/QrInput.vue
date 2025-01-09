<template>
  <div class="qr-input-container">
    <!-- Auswahl, welcher Input-Typ -->
    <div class="field-group">
      <label for="inputType">Input-Typ:</label>
      <select id="inputType" v-model="inputType" @change="emitChanges">
        <option value="text">Text</option>
        <option value="url">URL</option>
        <option value="vcard">vCard</option>
      </select>
    </div>

    <!-- Für Text/URL: altes Eingabefeld -->
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

    <!-- vCard Felder werden angezeigt, sobald 'vcard' gewählt ist -->
    <div v-else class="field-group vcard-fields">
      <!-- Name -->
      <div>
        <label for="firstName">Vorname</label>
        <input
          id="firstName"
          type="text"
          v-model="firstName"
          @input="emitChanges"
          placeholder="Max"
        />
      </div>
      <div>
        <label for="lastName">Nachname</label>
        <input
          id="lastName"
          type="text"
          v-model="lastName"
          @input="emitChanges"
          placeholder="Mustermann"
        />
      </div>

      <!-- Nummern -->
      <div>
        <label for="mobile">Handynummer</label>
        <input
          id="mobile"
          type="tel"
          v-model="mobile"
          @input="emitChanges"
          placeholder="+49 123 456789"
        />
      </div>
      <div>
        <label for="phone">Telefon</label>
        <input
          id="phone"
          type="tel"
          v-model="phone"
          @input="emitChanges"
          placeholder="+49 40 123456"
        />
      </div>
      <div>
        <label for="fax">Fax</label>
        <input
          id="fax"
          type="tel"
          v-model="fax"
          @input="emitChanges"
          placeholder="+49 40 987654"
        />
      </div>

      <!-- E-Mail -->
      <div>
        <label for="email">E-Mail</label>
        <input
          id="email"
          type="email"
          v-model="email"
          @input="emitChanges"
          placeholder="max@mustermann.de"
        />
      </div>

      <!-- Unternehmen -->
      <div>
        <label for="company">Unternehmen</label>
        <input
          id="company"
          type="text"
          v-model="company"
          @input="emitChanges"
          placeholder="Mustermann GmbH"
        />
      </div>

      <!-- Adresse -->
      <div>
        <label for="street">Straße</label>
        <input
          id="street"
          type="text"
          v-model="street"
          @input="emitChanges"
          placeholder="Musterstr. 123"
        />
      </div>
      <div>
        <label for="city">Stadt</label>
        <input
          id="city"
          type="text"
          v-model="city"
          @input="emitChanges"
          placeholder="Hamburg"
        />
      </div>
      <div>
        <label for="zipcode">Postleitzahl</label>
        <input
          id="zipcode"
          type="text"
          v-model="zipcode"
          @input="emitChanges"
          placeholder="20095"
        />
      </div>
      <div>
        <label for="state">Bundesland</label>
        <input
          id="state"
          type="text"
          v-model="state"
          @input="emitChanges"
          placeholder="Hamburg"
        />
      </div>
      <div>
        <label for="country">Land</label>
        <input
          id="country"
          type="text"
          v-model="country"
          @input="emitChanges"
          placeholder="Deutschland"
        />
      </div>

      <!-- Webseite -->
      <div>
        <label for="website">Webseite</label>
        <input
          id="website"
          type="url"
          v-model="website"
          @input="emitChanges"
          placeholder="https://www.mustermann.de"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from "vue";

/**
 * Erweitern wir den Type, damit "vcard" erlaubt ist
 */
const emit = defineEmits<{
  (event: "update:inputValue", value: string): void;
  (event: "update:inputType", type: "text" | "url" | "vcard"): void;
}>();

const inputValue = ref<string>("");
const inputType = ref<"text" | "url" | "vcard">("text");

/* Felder für die vCard */
const firstName = ref("");
const lastName = ref("");
const mobile = ref("");
const phone = ref("");
const fax = ref("");
const email = ref("");
const company = ref("");
const street = ref("");
const city = ref("");
const zipcode = ref("");
const state = ref("");
const country = ref("");
const website = ref("");

/**
 * Baue den vCard-String (Version 3.0).
 * Für gängige Scanner sollte das genügen.
 */
function buildVcardString(): string {
  return `BEGIN:VCARD
VERSION:3.0
N:${lastName.value};${firstName.value};;;
FN:${firstName.value} ${lastName.value}
TEL;TYPE=CELL,voice:${mobile.value}
TEL;TYPE=WORK,voice:${phone.value}
TEL;TYPE=FAX,work:${fax.value}
EMAIL;TYPE=WORK:${email.value}
ORG:${company.value}
ADR;TYPE=WORK:;;${street.value};${city.value};${state.value};${zipcode.value};${country.value}
URL:${website.value}
END:VCARD`;
}

/**
 * emitChanges() wird getriggert, sobald irgendwo
 * Eingaben erfolgen. Ist der Typ 'vcard',
 * generieren wir die vCard, ansonsten direkt den Eingabe-String.
 */
function emitChanges() {
  if (inputType.value === "vcard") {
    emit("update:inputValue", buildVcardString());
  } else {
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

  input:hover,
  select:hover {
    border-color: #888;
  }

  /* Für die vCard-Felder nutzen wir Grid-Layout, 
     damit das Ganze halbwegs übersichtlich bleibt */
  .vcard-fields {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;

    /* Innere Gruppen (divs) mit label/input */
    > div {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
