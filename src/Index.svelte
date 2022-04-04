<script>
  import {
    patientName,
    gender,
    birthDate,
    address,
    // document,
  } from "./SmartOnFhirStore";
  import { patient, fhir } from "dips-smart-on-fhir-svelte";

  let documents = [];

  let allPatients = [];

  // if (documentDescription.length == 0) {
  //   let a = $fhir.client.request(`/documentreference?patient=${$patient.id}`);
  //   console.log(a);
  //   console.log("HHH");

  //   documentDescription = a?.entry.map((d) => d.resource.description);
  // }

  // onMount(async () => {
  //   let a = await $fhir.client.request(
  //     `/documentreference?patient=${$patient.id}`
  //   );
  //   console.log(a);

  //   documentDescription = a?.entry.map((d) => d.resource.description);
  // });

  async function getDocuments() {
    let a = await $fhir.client.request(
      `/documentreference?patient=${$patient.id}`
    );
    console.log(a);

    documents = a?.entry.map((d) => d.resource);
    //documentDescription = a?.entry.map((d) => d.resource.description);
    // let b = a?.entry
    //   .map((d) => d.resource.content[0].attachment)
    //   .filter((e) => e.contentType == "application/markdown");
  }

  // async function checkIfMarkdown(id){

  //   let a = await $fhir.client.request(
  //     `/documentreference?patient=${$patient.id}`
  //   );

  //   let b =

  // }

  // tester om man kan hente pasienter på samme måte som dokumenter
  async function getPatients() {
    let b = await $fhir.client.request(`/Patient/${$patient.id}`);
    console.log(b);
  }

  if ($fhir) getDocuments();
</script>

<main>
  <img
    src="/images/dips_logo.png"
    alt="Dips Logo"
    height="100"
    align="center"
    style="margin: 20px;"
  />
  <div id="personalia_container">
    <h2>{$patientName}</h2>

    <div class="personalia_detail">
      <p style="font-weight: 500;">Gender &nbsp</p>
      <p>{$gender}</p>
    </div>

    <div class="personalia_detail">
      <p style="font-weight: 500;">Date of birth &nbsp</p>
      <p>{$birthDate}</p>
    </div>

    <div class="personalia_detail">
      <p style="font-weight: 500;">Home address &nbsp</p>
      <p>{$address}</p>
    </div>

    {allPatients}
  </div>

  <div id="patient_documents">
    <table>
      <thead>
        <th on:click={getDocuments}>Documents</th>
      </thead>
      <tbody>
        {#each documents as document}
          <h2>{document.description}</h2>
          <p>
            {#if document.content[0].attachment.contentType == "application/markdown"}
              {document.content[0].attachment.data}{/if}
            {#if document.content[0].attachment.contentType == "image/jpeg"}
              <img
                src={document.content[0].attachment.url}
                alt="img"
                height="200px"
              />
            {/if}
          </p>
        {/each}
      </tbody>
    </table>
  </div>

  <!-- <div>{$document}</div> -->
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: black 1px dotted;
    height: 100%;
    width: 100%;
    overflow: scroll;
  }

  #personalia_container {
    justify-content: center;
    background-color: #e6e6e6;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: 1px black dotted;
    width: 20%;
    padding: 25px;
    flex: 1;
  }

  .personalia_detail {
    display: flex;
    flex-direction: row;
    margin: 5px;
  }

  #patient_documents {
    flex: 2;
    overflow: auto;
  }

  p {
    margin: 0;
  }

  h2 {
    margin: 0;
  }

  table {
    table-layout: fixed;
    width: 100%;
  }

  th {
    background: var(--lighter-gray);
    padding: 20px 5px 2px 5px;
    font-size: 2rem;
  }

  th:hover {
    color: grey;
    cursor: pointer;
  }
</style>
