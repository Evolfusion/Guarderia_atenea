import './Daycare.css';

import {
  gallery as imagenes
} from '../data/daycareData.js';

import {
  useUploadFile
} from "../daycare/hooks/useUploadFile";

import {
  useSubmitForm
} from "../daycare/hooks/useSubmitForm";

import {
  buildDaycareData
} from "../daycare/utils/buildDaycareData";

export default function Daycare() {

  const { uploadFile } =
    useUploadFile();

  const { submitForm } =
    useSubmitForm();
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
      <section className='daycare'>
        <div className='daycare__header'>
          <h1 className='daycare__title'>GUARDERÍA CANINA</h1>
        </div>
        <p className='daycare__description'>Ofrecemos un ambiente familiar y seguro con cuidado personalizado para tu mascota. Nuestro equipo está capacitado para brindarle atención, juego y mucho amor mientras estás fuera.</p>
        <div className="daycare__img">
          {imagenes.map((img) => (
            <div key={img.id} className="daycare__img-item">
              <img src={img.image} alt={img.alt} loading="lazy" />
            </div>
          ))}
        </div>
      </section>
      <section>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="ownerName">Nombre y apellido del dueño </label>
            <input type="text" id="ownerName" name='ownerName' required />
          </div>
          <div>
            <label htmlFor="phone">Celular</label>
            <input type="tel" id="phone" name='phone' required />
          </div>
          <div>
            <label htmlFor="secondaryPhone">Segundo Celular (opcional)</label>
            <input type="tel" id="secondaryPhone" name='secondaryPhone' />
          </div>
          <div>
            <label htmlFor="address">Dirección de domicilio</label>
            <input type="text" id="address" name='address' required />
          </div>
          <div>
            <label htmlFor="idDocument">Documento de identidad</label>
            <input type="text" id="idDocument" name='idDocument' required />
          </div>
          <div>
            <label htmlFor="petName">Nombre de mascota</label>
            <input type="text" id="petName" name='petName' required />
          </div>
          <div>
            <label htmlFor="petBreed">Raza de la mascota</label>
            <input type="text" id="petBreed" name='petBreed' required />
          </div>
          <div>
            <label htmlFor="petVaccination">Carnet de vacunación (adjuntar foto o pdf) </label>
            <input type="file" id="petVaccination" name="petVaccination" accept=".jpg,.jpeg,.png,.pdf" required />
          </div>
          <div>
            <label htmlFor="veterinarianInfo">Nombre y contacto del veterinario  (Opcional) </label>
            <input type="text" id="veterinarianInfo" name='veterinarianInfo' />
          </div>
          <div>
            <label htmlFor="petBehavior">¿Cómo se lleva tu mascota con otros perros y personas?</label>
            <select name="petBehavior" id="petBehavior" defaultValue="" >
              <option value="" disabled >Seleccionar</option>
              <option value="mal">Mal</option>
              <option value="regular">Regular</option>
              <option value="bien">Bien</option>
              <option value="muybien">Muy Bien</option>
            </select>
          </div>
          <div>
            <label htmlFor="petGender">Tu mascota se lleva bien con ...</label>
            <select id="petGender" defaultValue="" name="petGender">
              <option value="" disabled>Seleccionar</option>
              <option value="macho">Macho</option>
              <option value="hembra">Hembra</option>
              <option value="ambos">Ambos</option>
            </select>
          </div>
          <div>
            <label htmlFor="petSpayed">¿Tu mascota esta esterilizado?</label>
            <select name="petSpayed" id="petSpayed" defaultValue="">
              <option value="" disabled>Seleccionar</option>
              <option value="si">Si</option>
              <option value="no">No</option>
            </select>
          </div>
          <div>
            <label htmlFor="petSpecialNeeds">¿Tiene alguna alergia, condiciones médicas o necesidades especiales que debamos tener en cuenta durante su estancia?</label>
            <select name="petSpecialNeeds" id="petSpecialNeeds" defaultValue="">
              <option value="" disabled >Seleccionar</option>
              <option value="si">Si</option>
              <option value="no">No</option>
            </select>
          </div>
          <div>
            <label htmlFor="descriptionSpecialNeeds">Descripción</label>
            <input type="text" id="descriptionSpecialNeeds" name="descriptionSpecialNeeds" />
          </div>
          <div>
            <label htmlFor="petVaccinationStatus">¿Está al día con todas las vacunas requeridas?</label>
            <select name="petVaccinationStatus" id="petVaccinationStatus" defaultValue="">
              <option value="" disabled >Seleccionar</option>
              <option value="si">Si</option>
              <option value="no">No</option>
            </select>
          </div>
          <div>
            <label htmlFor="petFleasTicks">¿Tu mascota presenta pulgas o garrapatas?</label>
            <select name="petFleasTicks" id="petFleasTicks" defaultValue="">
              <option value="" disabled >Seleccionar</option>
              <option value="si">Si</option>
              <option value="no">No</option>
            </select>
          </div>
          <div>
            <label htmlFor="petComfortItems">¿Tu mascota tiene algún juguete, manta u objeto reconfortante que le gustaría tener durante su estancia?</label>
            <select name="petComfortItems" id="petComfortItems" defaultValue="">
              <option value="" disabled >Seleccionar</option>
              <option value="si">Si</option>
              <option value="no">No</option>
            </select>
          </div>
          <div>
            <label htmlFor="descriptionComfortItems">Descripción</label>
            <input type="text" id="descriptionComfortItems" name="descriptionComfortItems" />
          </div>
          <div>
            <label htmlFor="petPlayfulness">¿Tu mascota le gusta ir a la plaza?</label>
            <select name="petPlayfulness" id="petPlayfulness" defaultValue="">
              <option value="" disabled >Seleccionar</option>
              <option value="si">Si</option>
              <option value="no">No</option>
            </select>
          </div>
          <div>
            <label htmlFor="descriptionPlayfulness">¿Cuántas veces al día le gusta salir a pasear a tu mascota?</label>
            <input type="text" id="descriptionPlayfulness" name="descriptionPlayfulness" />
          </div>
          <div>
            <label htmlFor="petFeedingFrequency">¿Cuántas veces al día come tu mascota ?</label>
            <select name="petFeedingFrequency" id="petFeedingFrequency" defaultValue="">
              <option value="" disabled >Seleccionar</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">Otro</option>
            </select>
          </div>
          <div>
            <label htmlFor="petSocialization">Autorizo a mi mascota  a que aparezca en el Instagram de la guardería</label>
            <select name="petSocialization" id="petSocialization" defaultValue="">
              <option value="" disabled >Seleccionar</option>
              <option value="si">Si</option>
              <option value="no">No</option>
            </select>
          </div>
          <div>
            <label htmlFor="descriptionAdditionalInfo">¿Hay algo más que quieras que sepamos sobre tu perro o cualquier otra información importante que creas que deberíamos conocer para garantizar una experiencia positiva durante su estadía en nuestra guardería?</label>
            <textarea name="descriptionAdditionalInfo" id="descriptionAdditionalInfo"></textarea>
          </div>
          <div>
            <label htmlFor="petDeclaration"> Declaro que acepto los términos y condiciones de la Guardería de Atenea, y autorizo voluntariamente que mi mascota sea cuidada por el personal de la guardería durante el tiempo acordado. Entiendo que la guardería tomará las medidas necesarias para garantizar el bienestar de mi mascota, y acepto que se sigan los protocolos establecidos en caso de emergencia.  </label>
            <select name="petDeclaration" id="petDeclaration" defaultValue="">
              <option value="" disabled >Seleccionar</option>
              <option value="si">Si</option>
              <option value="no">No</option>
            </select>
          </div>
          <div>
            <button type="submit">Enviar</button>
          </div>
        </form>
      </section>
    </>
  );
}