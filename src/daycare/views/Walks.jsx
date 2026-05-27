import '../Daycare.css';

import {
  useUploadFile
} from "../hooks/useUploadFile";

import {
  useSubmitForm
} from "../hooks/useSubmitForm";

import {
  buildWalksData
} from "../utils/buildWalksData";

export default function Walks() {

  const { uploadFile } = useUploadFile();

  const { submitForm } = useSubmitForm();

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const formData = new FormData(e.target);

      const petVaccinationFile =
        formData.get("petVaccination");

      const petVaccinationUrl =
        await uploadFile(
          petVaccinationFile
        );

      const dataToSend = {
          
        formType: "paseos",

        ownerName:
          formData.get("ownerName"),

        phone:
          formData.get("phone"),

        secondaryPhone:
          formData.get("secondaryPhone"),

        address:
          formData.get("address"),

        emergencyContact:
          formData.get("emergencyContact"),

        petName:
          formData.get("petName"),

        petAge:
          formData.get("petAge"),

        petBreed:
          formData.get("petBreed"),

        petSize:
          formData.get("petSize"),

        petGender:
          formData.get("petGender"),

        petSpayed:
          formData.get("petSpayed"),

        petVaccinationUrl,

        petVaccinationStatus:
          formData.get("petVaccinationStatus"),

        veterinarianInfo:
          formData.get("veterinarianInfo"),

        petSpecialNeeds:
          formData.get("petSpecialNeeds"),

        descriptionSpecialNeeds:
          formData.get("descriptionSpecialNeeds"),

        petBehaviorWithDogs:
          formData.get("petBehaviorWithDogs"),

        petBehaviorWithPeople:
          formData.get("petBehaviorWithPeople"),

        petPullsOnLeash:
          formData.get("petPullsOnLeash"),

        petOffLeash:
          formData.get("petOffLeash"),

        petAggressionHistory:
          formData.get("petAggressionHistory"),

        energyLevel:
          formData.get("energyLevel"),

        walkMode:
          formData.get("walkMode"),

        walkHours:
          formData.get("walkHours"),

        authorizeEmergencyVet:
          formData.get("authorizeEmergencyVet"),

        acceptWalkTerms:
          formData.get("acceptWalkTerms"),

        additionalInfo:
          formData.get("additionalInfo"),
      };

      console.log(dataToSend);

      const result =
        await submitForm(dataToSend);

      console.log(result);

      alert("Formulario enviado ✅");

      e.target.reset();

    } catch (error) {

      console.error(error);

      alert("Error al enviar ❌");

    }

  };

  return (
    <>
      <section className='daycare'>

        <div className='daycare__header'>
          <h1 className='daycare__title'>
            PASEO DE PERROS
          </h1>
        </div>

        <p className='daycare__description'>
          Ofrecemos paseos seguros,
          personalizados y responsables
          adaptados a las necesidades
          de tu mascota.
        </p>

      </section>

      <section>

        <form onSubmit={handleSubmit}>

          <fieldset>
            <legend>Datos del dueño</legend>

            <div>
              <label htmlFor="ownerName">
                Nombre y apellido
              </label>

              <input
                type="text"
                id="ownerName"
                name="ownerName"
                required
              />
            </div>

            <div>
              <label htmlFor="phone">
                Celular principal
              </label>

              <input
                type="tel"
                id="phone"
                name="phone"
                required
              />
            </div>

            <div>
              <label htmlFor="address">
                Dirección
              </label>

              <input
                type="text"
                id="address"
                name="address"
                required
              />
            </div>

            <div>
              <label htmlFor="emergencyContact">
                Contacto de emergencia
              </label>

              <input
                type="text"
                id="emergencyContact"
                name="emergencyContact"
                required
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Datos de la mascota</legend>

            <div>
              <label htmlFor="petName">
                Nombre de la mascota
              </label>

            <input
              type="text"
              id="petName"
              name="petName"
              required
            />
          </div>

          <div>
            <label htmlFor="petAge">
              Edad
            </label>

            <input
              type="text"
              id="petAge"
              name="petAge"
              required
            />
          </div>

          <div>
            <label htmlFor="petBreed">
              Raza
            </label>

            <input
              type="text"
              id="petBreed"
              name="petBreed"
              required
            />
          </div>

          <div>
            <label htmlFor="petSize">
              Tamaño
            </label>

            <select
              id="petSize"
              name="petSize"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Seleccionar
              </option>

              <option value="pequeño">
                Pequeño
              </option>

              <option value="mediano">
                Mediano
              </option>

              <option value="grande">
                Grande
              </option>
            </select>
          </div>

          <div>
            <label htmlFor="petVaccination">
              Carnet de vacunación
            </label>

            <input
              type="file"
              id="petVaccination"
              name="petVaccination"
              accept=".jpg,.jpeg,.png,.pdf"
              required
            />
          </div>

          <div>
            <label htmlFor="petVaccinationStatus">
              ¿Vacunas al día?
            </label>

            <select
              id="petVaccinationStatus"
              name="petVaccinationStatus"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Seleccionar
              </option>

              <option value="si">
                Si
              </option>

              <option value="no">
                No
              </option>
            </select>
          </div>

          <div>
            <label htmlFor="petSpecialNeeds">
              ¿Tiene alergias o enfermedades?
            </label>

            <select
              id="petSpecialNeeds"
              name="petSpecialNeeds"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Seleccionar
              </option>

              <option value="si">
                Si
              </option>

              <option value="no">
                No
              </option>
            </select>
          </div>

          <div>
            <label htmlFor="descriptionSpecialNeeds">
              Descripción
            </label>

            <input
              type="text"
              id="descriptionSpecialNeeds"
              name="descriptionSpecialNeeds"
            />
          </div>
          </fieldset>

          <fieldset>
            <legend>Salud y comportamiento</legend>

            <div>
              <label htmlFor="petBehaviorWithDogs">
                ¿Cómo se comporta con otros perros?
              </label>

            <input
              type="text"
              id="petBehaviorWithDogs"
              name="petBehaviorWithDogs"
              required
            />
          </div>

          <div>
            <label htmlFor="petPullsOnLeash">
              ¿Tira de la correa?
            </label>

            <select
              id="petPullsOnLeash"
              name="petPullsOnLeash"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Seleccionar
              </option>

              <option value="si">
                Si
              </option>

              <option value="no">
                No
              </option>
            </select>
          </div>

          <div>
            <label htmlFor="petAggressionHistory">
              ¿Antecedentes de agresividad?
            </label>

            <select
              id="petAggressionHistory"
              name="petAggressionHistory"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Seleccionar
              </option>

              <option value="si">
                Si
              </option>

              <option value="no">
                No
              </option>
            </select>
          </div>

          <div>
            <label htmlFor="energyLevel">
              Nivel de energía
            </label>

            <select
              id="energyLevel"
              name="energyLevel"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Seleccionar
              </option>

              <option value="bajo">
                Bajo
              </option>

              <option value="medio">
                Medio
              </option>

              <option value="alto">
                Alto
              </option>
            </select>
          </div>
          </fieldset>

          <fieldset>
            <legend>Detalles del paseo</legend>

          <div>
            <label htmlFor="walkHours">
              Horas de paseo
            </label>

            <select
              id="walkHours"
              name="walkHours"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Seleccionar
              </option>

              <option value="1">
                1 hora
              </option>

              <option value="2">
                2 horas
              </option>
            </select>
          </div>

          <div>
            <label htmlFor="authorizeEmergencyVet">
              ¿Autoriza veterinario en emergencia?
            </label>

            <select
              id="authorizeEmergencyVet"
              name="authorizeEmergencyVet"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Seleccionar
              </option>

              <option value="si">
                Si
              </option>

              <option value="no">
                No
              </option>
            </select>
          </div>

          <div>
            <label htmlFor="additionalInfo">
              Información adicional
            </label>

            <textarea
              id="additionalInfo"
              name="additionalInfo"
            ></textarea>
          </div>
          </fieldset>

          <div>
            <button type="submit">
              Enviar
            </button>
          </div>

        </form>

      </section>
    </>
  );
}