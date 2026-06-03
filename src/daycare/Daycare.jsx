import "./Daycare.css";
import { useState } from "react";

"../data/daycareData.js";

import {
  useUploadFile
} from "../daycare/hooks/useUploadFile";

import {
  useSubmitForm
} from "../daycare/hooks/useSubmitForm";

import {
  buildDaycareData
} from "../daycare/utils/buildDaycareData";
import { User, Dog, Heart, NotebookPen} from "lucide-react";

export default function Daycare() {

  const [selectedVaccinationFileName, setSelectedVaccinationFileName] = useState(" ");

  const { uploadFile } =
    useUploadFile();

  const { submitForm } =
    useSubmitForm();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setSelectedVaccinationFileName(file ? file.name : "Seleccionar archivo");
  };
  // Función para manejar el envío del formulario

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const formData =
        new FormData(e.target);

      const petVaccinationFile =
        formData.get("petVaccination");

      const petVaccinationUrl =
        await uploadFile(
          petVaccinationFile
        );

      const dataToSend =
        buildDaycareData(
          formData,
          petVaccinationUrl
        );

      const result =
        await submitForm(
          dataToSend
        );

      console.log(result);

      alert(
        "Formulario enviado ✅"
      );

      e.target.reset();

    } catch (error) {

      console.error(error);

      alert(
        "Error al enviar ❌"
      );

    }
  };
  return (
    <>
      <section className="daycare">
        <div className="daycare__header">
          <h1 className="daycare__title">GUARDERÍA CANINA</h1>
        </div>
        <p className="daycare__description">Ofrecemos un ambiente familiar y seguro con cuidado personalizado para tu mascota. Nuestro equipo está capacitado para brindarle atención, juego y mucho amor mientras estás fuera.</p>
        <div className="daycare__img">
            <div  className="daycare__img-item">
             <img src="/img/familia-portada.jpg" alt="Familia de perros" loading="lazy" />
            </div>
        </div>
      </section>
      <section className="daycare__form-container">
        <h3 className="daycare__form-title">Formulario guardería</h3>
        <form onSubmit={handleSubmit} className="daycare__form">
          <fieldset className="daycare__form-section">
            <legend className="daycare__form-legend"> <User /> Datos del dueño</legend>
            <section className="daycare__form-section-content">
              <div className="daycare__form-field">
                <label htmlFor="ownerName" className="daycare__label">Nombre y apellido</label>
                <input type="text" id="ownerName" name="ownerName" className="daycare__input" required />
              </div>
              <div className="daycare__form-field">
                <label htmlFor="phone" className="daycare__label">Celular</label>
                <input type="tel" id="phone" name="phone" className="daycare__input" required />
              </div>
              <div className="daycare__form-field">
                <label htmlFor="secondaryPhone" className="daycare__label">Segundo celular (opcional)</label>
                <input type="tel" id="secondaryPhone" name="secondaryPhone" className="daycare__input" />
              </div>
              <div className="daycare__form-field">
                <label htmlFor="address" className="daycare__label">Dirección de domicilio</label>
                <input type="text" id="address" name="address" className="daycare__input" placeholder="Ej: A renales 3367" required />
              </div>
              <div className="daycare__form-field">
                <label htmlFor="idDocument" className="daycare__label">Documento de identidad</label>
                <input type="text" id="idDocument" name="idDocument" className="daycare__input" placeholder="Ej: 43764345" required />
              </div>
            </section>
          </fieldset>

          <fieldset className="daycare__form-section">
            <legend className="daycare__form-legend"> <Dog /> Datos de la mascota</legend>
            <section className="daycare__form-section-content">
              <div className="daycare__form-field">
                <label htmlFor="petName" className="daycare__label">Nombre de mascota</label>
                <input type="text" id="petName" name="petName" className="daycare__input" required />
              </div>
              <div className="daycare__form-field">
                <label htmlFor="petBreed" className="daycare__label" >Raza de la mascota</label>
                <input type="text" id="petBreed" name="petBreed" className="daycare__input" placeholder="Ej: Mestizo" required />
              </div>
              <div className="daycare__form-field">
                <label htmlFor="petAge" className="daycare__label">Edad de la mascota</label>
                <input type="number" id="petAge" name="petAge" min="0" step="1" className="daycare__input" placeholder="Ej: 3" required />
              </div>
              <div className="daycare__form-field">
                <label htmlFor="petSize" className="daycare__label">Tamaño de la mascota</label>
                <select id="petSize" name="petSize" className="daycare__input" defaultValue="" required>
                  <option value="" disabled>Seleccionar</option>
                  <option value="pequeno">Pequeño</option>
                  <option value="mediano">Mediano</option>
                  <option value="grande">Grande</option>
                </select>
              </div>
              <div className="daycare__form-field daycare__form-field--file">
                <label htmlFor="petVaccination" className="daycare__label">Carnet de vacunación (adjuntar foto o pdf)</label>
                <input type="file" id="petVaccination" name="petVaccination" accept=".jpg,.jpeg,.png,.pdf" required onChange={handleFileChange} />
                <span className="daycare__file-name">{selectedVaccinationFileName}</span>
              </div>
              <div className="daycare__form-field">
                <label htmlFor="veterinarianInfo" className="daycare__label">Nombre y contacto del veterinario (opcional)</label>
                <input type="text" id="veterinarianInfo" name="veterinarianInfo" className="daycare__input" placeholder="Ej: Dr. Juan Pérez - 1138748734" />
              </div>
            </section>
          </fieldset>

          <fieldset className="daycare__form-section">
            <legend className="daycare__form-legend"> <Heart /> Salud y comportamiento</legend>
            <section className="daycare__form-section-content">
              <div className="daycare__form-field">
                <label htmlFor="petBehavior" className="daycare__label">¿Cómo se lleva tu mascota con otros perros y personas?</label>
                <select name="petBehavior" id="petBehavior" className="daycare__input" defaultValue="" required>
                  <option value="" disabled>Seleccionar</option>
                  <option value="mal">Mal</option>
                  <option value="regular">Regular</option>
                  <option value="bien">Bien</option>
                  <option value="muybien">Muy bien</option>
                </select>
              </div>
              <div className="daycare__form-field">
                <label htmlFor="petGender" className="daycare__label">Sexo de la mascota</label>
                <select id="petGender" defaultValue="" name="petGender" className="daycare__input" required>
                  <option value="" disabled>Seleccionar</option>
                  <option value="macho">Macho</option>
                  <option value="hembra">Hembra</option>
                </select>
              </div>
              <div className="daycare__form-field">
                <label htmlFor="petSpayed" className="daycare__label">¿Tu mascota está esterilizada?</label>
                <select name="petSpayed" id="petSpayed" className="daycare__input" defaultValue="" required>
                  <option value="" disabled>Seleccionar</option>
                  <option value="si">Sí</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div className="daycare__form-field">
                <label htmlFor="petSpecialNeeds" className="daycare__label">¿Tiene alguna alergia, condición médica o necesidad especial?</label>
                <select name="petSpecialNeeds" id="petSpecialNeeds" className="daycare__input" defaultValue="" required>
                  <option value="" disabled>Seleccionar</option>
                  <option value="si">Sí</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div className="daycare__form-field">
                <label htmlFor="descriptionSpecialNeeds" className="daycare__label">Descripción</label>
                <input type="text" id="descriptionSpecialNeeds" name="descriptionSpecialNeeds" className="daycare__input" />
              </div>
              <div className="daycare__form-field">
                <label htmlFor="petVaccinationStatus" className="daycare__label">¿Está al día con todas las vacunas requeridas?</label>
                <select name="petVaccinationStatus" id="petVaccinationStatus" className="daycare__input" defaultValue="" required>
                  <option value="" disabled>Seleccionar</option>
                  <option value="si">Sí</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div className="daycare__form-field">
                <label htmlFor="petFleasTicks" className="daycare__label">¿Tu mascota presenta pulgas o garrapatas?</label>
                <select name="petFleasTicks" id="petFleasTicks" className="daycare__input" defaultValue="" required>
                  <option value="" disabled>Seleccionar</option>
                  <option value="si">Sí</option>
                  <option value="no">No</option>
                </select>
              </div>
            </section>
          </fieldset>

          <fieldset className="daycare__form-section">
            <legend className="daycare__form-legend"> <NotebookPen /> Información adicional</legend>
            <section className="daycare__form-section-content">
              <div className="daycare__form-field">
                <label htmlFor="petComfortItems" className="daycare__label">¿Tu mascota tiene algún juguete, manta u objeto reconfortante que le gustaría tener durante su estancia?</label>
                <select name="petComfortItems" id="petComfortItems" className="daycare__input" defaultValue="" required>
                  <option value="" disabled>Seleccionar</option>
                  <option value="si">Sí</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div className="daycare__form-field">
                <label htmlFor="descriptionComfortItems" className="daycare__label">Descripción</label>
                <textarea id="descriptionComfortItems" name="descriptionComfortItems"  className="daycare__input--textarea" placeholder="Ej: Una manta azul"></textarea>
              </div>
              <div className="daycare__form-field">
                <label htmlFor="petPlayfulness" className="daycare__label">¿Tu mascota le gusta ir a la plaza?</label>
                <select name="petPlayfulness" id="petPlayfulness" className="daycare__input" defaultValue="" required>
                  <option value="" disabled>Seleccionar</option>
                  <option value="si">Sí</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div className="daycare__form-field">
                <label htmlFor="descriptionPlayfulness" className="daycare__label">¿Cuántas veces al día le gusta salir a pasear a tu mascota?</label>
                <input type="text" id="descriptionPlayfulness" name="descriptionPlayfulness" className="daycare__input" placeholder="Ej: 2 veces al día" />
              </div>
              <div className="daycare__form-field">
                <label htmlFor="petFeedingFrequency" className="daycare__label">¿Cuántas veces al día come tu mascota?</label>
                <select name="petFeedingFrequency" id="petFeedingFrequency" className="daycare__input" defaultValue="" required>
                  <option value="" disabled>Seleccionar</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
              <div className="daycare__form-field">
                <label htmlFor="petSocialization" className="daycare__label">Autorizo a mi mascota a que aparezca en el Instagram de la guardería</label>
                <select name="petSocialization" id="petSocialization" className="daycare__input"  defaultValue="" required>
                  <option value="" disabled>Seleccionar</option>
                  <option value="si">Sí</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div className="daycare__form-field">
                <label htmlFor="descriptionAdditionalInfo" className="daycare__label">¿Hay algo más que quieras que sepamos sobre tu perro?</label>
                <textarea name="descriptionAdditionalInfo" id="descriptionAdditionalInfo"  className="daycare__input--textarea" placeholder="Ej: Es muy juguetón y le encanta correr en el parque"></textarea>
              </div>
              <div className="daycare__form-field">
                <label htmlFor="petDeclaration" className="daycare__label">Declaro que acepto los términos y condiciones de la Guardería de Atenea y autorizo el cuidado de mi mascota.</label>
                <select name="petDeclaration" id="petDeclaration" className="daycare__input" defaultValue="" required>
                  <option value="" disabled>Seleccionar</option>
                  <option value="si">Sí</option>
                  <option value="no">No</option>
                </select>
              </div>
            </section>
          </fieldset>

          <div className="daycare__form-actions">
            <button type="submit">Enviar</button>
          </div>
        </form>
      </section>
    </>
  );
}