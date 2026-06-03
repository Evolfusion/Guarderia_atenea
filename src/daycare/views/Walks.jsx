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

import { User, Dog, Heart, NotebookPen} from "lucide-react";

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
          <h1 className='daycare__title'>PASEO DE PERROS</h1>
        </div>
        <p className='daycare__description'>Ofrecemos paseos seguros,personalizados y responsablesadaptados a las necesidadesde tu mascota.</p>
      </section>

      <section className="daycare__form-container">
        <h3 className="daycare__form-title">Formulario paseos</h3>
        <form onSubmit={handleSubmit} className="daycare__form">
          <fieldset className="daycare__form-section">
            <legend className="daycare__form-legend"><User />Datos del dueño</legend>
            <div className="daycare__form-field">
              <label htmlFor="ownerName" className="daycare__label">Nombre y apellido</label>
              <input type="text" id="ownerName"name="ownerName" className="daycare__input" required/>
            </div>
            <div className="daycare__form-field">
              <label htmlFor="phone" className="daycare__label">Celular principal</label>
              <input type="tel" id="phone" name="phone" className="daycare__input" required />
            </div>
            <div className="daycare__form-field">
              <label htmlFor="address" className="daycare__label"> Dirección </label>
              <input type="text" id="address" name="address" className="daycare__input" placeholder='Ej: Av. Santa Fe 3329' required/>
            </div>
            <div className="daycare__form-field">
              <label htmlFor="emergencyContact" className="daycare__label"> Contacto de emergencia </label>
              <input type="text" id="emergencyContact" name="emergencyContact" className="daycare__input" placeholder='Ej: 1138748734' required/>
            </div>
          </fieldset>
          <fieldset className="daycare__form-section">
            <legend className="daycare__form-legend"> <Dog />Datos de la mascota</legend>
            <div className="daycare__form-field">
              <label htmlFor="petName" className="daycare__label">Nombre de la mascota</label>
              <input type="text" id="petName" name="petName" className="daycare__input" required/>
            </div>
            <div className="daycare__form-field">
              <label htmlFor="petAge" className="daycare__label"> Edad </label>
              <input type="text" id="petAge" name="petAge" className="daycare__input" placeholder='Ej: 3' required/>
            </div>
            <div className="daycare__form-field">
              <label htmlFor="petBreed" className="daycare__label"> Raza </label>
              <input type="text" id="petBreed" name="petBreed" className="daycare__input" placeholder='Ej: Mestizo' required/>
            </div>
            <div className="daycare__form-field">
              <label htmlFor="petSize" className="daycare__label">
                Tamaño
              </label>
              <select id="petSize"name="petSize" defaultValue="" className="daycare__input" required >
                <option value="" disabled> Seleccionar </option>
                <option value="pequeño"> Pequeño</option>
                <option value="mediano">Mediano</option>
                <option value="grande">Grande</option>
              </select>
            </div>
            <div className="daycare__form-field">
              <label htmlFor="petVaccination" className="daycare__label"> Carnet de vacunación</label>
              <input type="file" id="petVaccination" name="petVaccination" accept=".jpg,.jpeg,.png,.pdf"  required />
            </div>
            <div className="daycare__form-field">
              <label htmlFor="petVaccinationStatus" className="daycare__label"> ¿Vacunas al día?</label>
              <select id="petVaccinationStatus" name="petVaccinationStatus" defaultValue="" className="daycare__input" required >
                <option value="" disabled> Seleccionar</option>
                <option value="si"> Si </option>
                <option value="no"> No </option>
              </select>
            </div>
            <div className="daycare__form-field">
              <label htmlFor="petSpecialNeeds" className="daycare__label">¿Tiene alergias o enfermedades?</label>
              <select id="petSpecialNeeds" name="petSpecialNeeds" defaultValue="" className="daycare__input" required >
                <option value="" disabled>Seleccionar</option>
                <option value="si"> Si </option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="daycare__form-field">
              <label htmlFor="descriptionSpecialNeeds" className="daycare__label">Descripción</label>
              <textarea id="descriptionSpecialNeeds" name="descriptionSpecialNeeds" className="daycare__input--textarea" placeholder="Ej: Alergia a las pulgas, necesita medicación diaria"></textarea>
            </div>
          </fieldset>
          <fieldset className="daycare__form-section">
            <legend className="daycare__form-legend"> <Heart />Salud y comportamiento</legend>
            <div className="daycare__form-field">
              <label htmlFor="petBehaviorWithDogs" className="daycare__label"> ¿Cómo se comporta con otros perros?
              </label>
              <input type="text" id="petBehaviorWithDogs" name="petBehaviorWithDogs" className="daycare__input" required/>
            </div>
            <div className="daycare__form-field">
              <label htmlFor="petPullsOnLeash" className="daycare__label"> ¿Tira de la correa?</label>
              <select id="petPullsOnLeash" name="petPullsOnLeash" defaultValue="" className="daycare__input" required >
                <option value="" disabled> Seleccionar </option>
                <option value="si">Si</option>
                <option value="no"> No</option>
              </select>
            </div>
            <div className="daycare__form-field">
              <label htmlFor="petAggressionHistory" className="daycare__label"> ¿Antecedentes de agresividad?</label>
              <select id="petAggressionHistory" name="petAggressionHistory" defaultValue="" className="daycare__input"required>
                <option value="" disabled> Seleccionar</option>
                <option value="si">Si</option>
                <option value="no">No </option>
              </select>
            </div>
            <div className="daycare__form-field">
              <label htmlFor="energyLevel" className="daycare__label">Nivel de energía </label>
              <select id="energyLevel" name="energyLevel" defaultValue="" className="daycare__input" required >
                <option value="" disabled> Seleccionar </option>
                <option value="bajo"> Bajo</option>
                <option value="medio"> Medio</option>
                <option value="alto"> Alto</option>
              </select>
            </div>
          </fieldset>
          <fieldset className="daycare__form-section">
            <legend className="daycare__form-legend"> <NotebookPen />Detalles del paseo</legend>
            <div className="daycare__form-field">
              <label htmlFor="walkHours" className="daycare__label"> Horas de paseo</label>
              <select id="walkHours" name="walkHours" defaultValue=""className="daycare__input"required>
                <option value="" disabled> Seleccionar</option>
                <option value="1">1 hora</option>
                <option value="2">2 horas</option>
              </select>
            </div>
            <div className="daycare__form-field">
              <label htmlFor="authorizeEmergencyVet" className="daycare__label">¿Autoriza veterinario en emergencia?</label>
              <select id="authorizeEmergencyVet" name="authorizeEmergencyVet" defaultValue=""className="daycare__input"required >
                <option value="" disabled> Seleccionar</option>
                <option value="si">Si</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="daycare__form-field">
              <label htmlFor="additionalInfo" className="daycare__label"> Información adicional</label>
              <textarea id="additionalInfo" name="additionalInfo" className="daycare__input--textarea" placeholder="Ej: Prefiere paseos tranquilos por el parque, no le gustan los ruidos fuertes" ></textarea>
            </div>
          </fieldset>
          <div className="daycare__form-actions daycare__form-field">
            <button type="submit">Enviar </button>
          </div>
        </form>
      </section>
    </>
  );
}