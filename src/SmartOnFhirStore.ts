import { derived } from "svelte/store";
import {patient, fhir, encounter, documentId} from "dips-smart-on-fhir-svelte";

export const patientName = derived(
    patient,
    ($patient, set) => {
        if ($patient != null && $patient.name != null) {
            let familyName = $patient.name[0].family;
            let givenName = $patient.name[0].given[0];
            let patientName = givenName + " " + familyName;
            set(patientName);
            //console.log(patientName)
        }
    }
);

export const gender = derived (
    patient,
    ($patient, set) => {
        if ($patient != null) {
            set($patient.gender);
        }
    }
);

export const birthDate = derived(
    patient,
    ($patient, set) => {
        if ($patient != null) {
            set($patient.birthDate);
        }
    }
);

export const address = derived(
    patient,
    ($patient, set) => {
        if($patient != null) {
            set($patient.address[0].city)
        }
    }
)

// export const document = derived(
//     fhir,
//     ($fhir, set) => {
//         if($fhir != null && fhir.client != null){
//             $fhir.client.request(documentId).then(
//                 document => {
//                     set(document);
//                     console.log(document);
//                     console.log("hei")
//                 }
//             )
//         }
//         console.log("feil")
//     }
// )