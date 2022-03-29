<script>
  import { writable, derived } from "svelte/store";
  import {
    patientName,
    gender,
    birthDate,
    address,
    // document,
  } from "./SmartOnFhirStore";
  import {
    encounter,
    patient,
    documentId,
    fhir,
    document,
  } from "dips-smart-on-fhir-svelte";

  let documentDescription = [];

  let allPatients = [];

  async function getDocuments() {
    let a = await $fhir.client.request(
      `/documentreference?patient=${$patient.id}`
    );
    console.log(a);

    documentDescription = a?.entry.map((d) => d.resource.description);

    // for (let i = 0; i < 50; i++) {
    //   documentIdentification += a?.entry[i]?.resource.description;
    // }
  }

  // tester om man kan hente pasienter på samme måte som dokumenter
  async function getPatients() {
    let b = await $fhir.client.request(`/Patient/${$patient.id}`);
    console.log(b);
  }

  if ($fhir) getDocuments();
</script>

<main>
  <h1>
    Hello
    {$patientName}
    {$gender}
    {$birthDate}
    {$address}
    {documentDescription}
    {allPatients}
  </h1>

  <button on:click={getDocuments}>Click</button>

  <!-- tester om man kan hente pasienter på samme måte som dokumenter -->
  <button on:click={getPatients}>Patient</button>

  <!-- <div>{$document}</div> -->
</main>
