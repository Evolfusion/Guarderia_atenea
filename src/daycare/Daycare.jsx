import './Daycare.css';
import { gallery as imagenes } from '../data/daycareData.js';

export default function Daycare() {
  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      // Obtener datos del formulario
      const formData = new FormData(e.target);

      // Obtener archivo
      const file = formData.get("petVaccination");

      // Datos para Cloudinary
      const cloudinaryData = new FormData();

      cloudinaryData.append("file", file);

      cloudinaryData.append(
        "upload_preset",
        "guarderia_atenea"
      );

      // Subir archivo a Cloudinary
      const cloudinaryResponse = await fetch(
        "https://api.cloudinary.com/v1_1/dxkdlvkdq/auto/upload",
        {
          method: "POST",
          body: cloudinaryData,
        }
      );

      const cloudinaryResult =
        await cloudinaryResponse.json();

      console.log(cloudinaryResult);

      // URL del archivo subido
      const fileUrl =
        cloudinaryResult.secure_url;

      console.log(fileUrl);

      // Crear objeto con todos los datos
      const dataToSend = {

        ownerName:
          formData.get("ownerName"),

        phone:
          formData.get("phone"),

        secondaryPhone:
          formData.get("secondaryPhone"),

        address:
          formData.get("address"),

        idDocument:
          formData.get("idDocument"),

        petName:
          formData.get("petName"),

        petBreed:
          formData.get("petBreed"),

        veterinarianInfo:
          formData.get("veterinarianInfo"),

        petBehavior:
          formData.get("petBehavior"),

        petGender:
          formData.get("petGender"),

        petSpayed:
          formData.get("petSpayed"),

        petSpecialNeeds:
          formData.get("petSpecialNeeds"),

        descriptionSpecialNeeds:
          formData.get("descriptionSpecialNeeds"),

        petVaccinationStatus:
          formData.get("petVaccinationStatus"),

        petFleasTicks:
          formData.get("petFleasTicks"),

        petComfortItems:
          formData.get("petComfortItems"),

        descriptionComfortItems:
          formData.get("descriptionComfortItems"),

        petPlayfulness:
          formData.get("petPlayfulness"),

        descriptionPlayfulness:
          formData.get("descriptionPlayfulness"),

        petFeedingFrequency:
          formData.get("petFeedingFrequency"),

        petSocialization:
          formData.get("petSocialization"),

        descriptionAdditionalInfo:
          formData.get("descriptionAdditionalInfo"),

        petDeclaration:
          formData.get("petDeclaration"),

        petVaccinationUrl:
          fileUrl,
      };

      // Enviar datos a Google Sheets
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbznfMH0-o1e0tIO43gjkvqAO3J4AD3Wt96Ued7vrwDQf3kKxiquwk7tqFCHzTFUXW8d/exec",
        {
          method: "POST",
          body: new URLSearchParams(dataToSend),
        }
      );

      const result =
        await response.json();

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
            <input type="text" id="descriptionAdditionalInfo" name='descriptionAdditionalInfo' />
          </div>
          <div>
            <label htmlFor="petDeclaration"> Declaro que acepto los términos y condiciones de la Guardería de Atenea, y autorizo voluntariamente que mi mascota sea cuidada por el personal de la guardería durante el tiempo acordado. Entiendo que la guardería tomará las medidas necesarias para garantizar el bienestar de mi mascota, y acepto que se sigan los protocolos establecidos en caso de emergencia.  </label>
            <select name="petDeclaration" id="petDeclaration" defaultValue="">
              <option value="" disabled >Seleccionar</option>
              <option value="yes">Si</option>
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