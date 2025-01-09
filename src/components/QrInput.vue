<template>
  <div class="qr-input-container">
    <!-- Auswahl, welcher Input-Typ -->
    <div class="field-group">
      <label for="inputType">Input-Typ:</label>
      <select id="inputType" v-model="inputType" @change="emitChanges">
        <option value="text">Text</option>
        <option value="url">URL</option>
        <option value="vcard">vCard</option>
        <option value="wifi">WiFi</option>
      </select>
    </div>

    <!-- 1) Text / URL -->
    <div v-if="inputType === 'text' || inputType === 'url'" class="field-group">
      <label for="inputValue">Wert eingeben:</label>
      <input
        id="inputValue"
        type="text"
        v-model="inputValue"
        @input="emitChanges"
        placeholder="Gib hier deinen Text oder deine URL ein"
      />
    </div>

    <!-- 2) vCard Felder -->
    <div v-else-if="inputType === 'vcard'" class="field-group vcard-fields">
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

    <!-- 3) WiFi Felder -->
    <div v-else-if="inputType === 'wifi'" class="field-group wifi-fields">
      <div>
        <label for="networkName">Netzwerkname (SSID)</label>
        <input
          id="networkName"
          type="text"
          v-model="networkName"
          @input="emitChanges"
          placeholder="WLAN-SSID"
        />
      </div>

      <div>
        <label for="hidden">Versteckt</label>
        <!-- Boolean-Check (true/false) -->
        <input
          id="hidden"
          type="checkbox"
          v-model="hidden"
          @change="emitChanges"
        />
      </div>

      <div>
        <label for="wifiPassword">Passwort</label>
        <input
          id="wifiPassword"
          type="text"
          v-model="wifiPassword"
          @input="emitChanges"
          placeholder="WLAN-Passwort"
        />
      </div>

      <div>
        <label for="encryption">Verschlüsselung</label>
        <select id="encryption" v-model="encryption" @change="emitChanges">
          <option value="none">Keine</option>
          <option value="WPA/WPA2">WPA/WPA2</option>
          <option value="WEP">WEP</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from "vue";

// Wir erweitern den Typ, sodass "wifi" ebenfalls unterstützt wird.
const emit = defineEmits<{
  (event: "update:inputValue", value: string): void;
  (event: "update:inputType", type: "text" | "url" | "vcard" | "wifi"): void;
}>();

const inputValue = ref("");
const inputType = ref<"text" | "url" | "vcard" | "wifi">("text");

/** vCard-Felder */
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

/** WiFi-Felder */
const networkName = ref("");
const hidden = ref(false);
const wifiPassword = ref("");
// "none", "WPA/WPA2", "WEP"
const encryption = ref<"none" | "WPA/WPA2" | "WEP">("none");

/** vCard-String zusammenbauen */
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

/** WiFi-String zusammenbauen
 *  Format (für WPA/WPA2 z.B.):
 *  WIFI:T:WPA;S:MyNetwork;P:MyPass;H:true;;
 */
function buildWifiString(): string {
  // Verschlüsselung "none" => T: leer
  // "WPA/WPA2" => T: WPA
  // "WEP" => T: WEP
  let type = "";
  if (encryption.value === "WPA/WPA2") {
    type = "WPA";
  } else if (encryption.value === "WEP") {
    type = "WEP";
  }

  // H: "true", wenn hidden
  const hiddenFlag = hidden.value ? ";H:true" : "";
  // Passwort nur dann, wenn es auch wirklich existiert
  const pass = wifiPassword.value ? `;P:${wifiPassword.value}` : "";

  return `WIFI:T:${type};S:${networkName.value}${pass}${hiddenFlag};;`;
}

/** emitChanges() wird getriggert, sobald ein Wert geändert wird */
function emitChanges() {
  if (inputType.value === "vcard") {
    emit("update:inputValue", buildVcardString());
  } else if (inputType.value === "wifi") {
    emit("update:inputValue", buildWifiString());
  } else {
    // "text" oder "url"
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
    gap: 0.5rem;
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

  /* vCard-Felder: 2-spaltiges Layout */
  .vcard-fields {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;

    > div {
      display: flex;
      flex-direction: column;
    }
  }

  /* WiFi-Felder: auch 2-spaltiges Layout, je nach Geschmack */
  .wifi-fields {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;

    > div {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
