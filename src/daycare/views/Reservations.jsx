import '../Daycare.css';

import {
  useSubmitForm
} from "../hooks/useSubmitForm";

export default function Reservations() {

  const { submitForm } =
    useSubmitForm();

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const formData =
        new FormData(e.target);

      const dataToSend = {

        formType: "reservas",

        serviceType:
          formData.get("serviceType"),

        name:
          formData.get("name"),

        phone:
          formData.get("phone"),

        petName:
          formData.get("petName"),

        startDate:
          formData.get("startDate"),

        endDate:
          formData.get("endDate"),

        time:
          formData.get("time"),

      };

      console.log(dataToSend);

      const result =
        await submitForm(
          dataToSend
        );

      console.log(result);

      alert("Reserva enviada ✅");

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
            RESERVAR ESTADÍA
          </h1>
        </div>

        <p className='daycare__description'>
          Completá el formulario y nos pondremos
          en contacto contigo para confirmar
          tu reserva.
        </p>

      </section>

      <section>

        <form
          className='reservation-form'
          onSubmit={handleSubmit}
        >

          <fieldset>
            <legend>Servicio</legend>

            <div>
              <label htmlFor="serviceType">
                Tipo de Servicio
              </label>

              <select
                id="serviceType"
                name="serviceType"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Seleccionar
                </option>

                <option value="Guarderia">
                  🏠 Guarderia
                </option>
              </select>
            </div>
          </fieldset>

          <fieldset>
            <legend>Datos de contacto</legend>

            <div>
              <label htmlFor="name">
                Nombre Completo
              </label>

              <input
                type="text"
                id="name"
                name="name"
                placeholder="Tu nombre completo"
                required
              />
            </div>

            <div>
              <label htmlFor="phone">
                Número de Teléfono
              </label>

              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Tu número de teléfono"
                required
              />
            </div>

            <div>
              <label htmlFor="petName">
                Nombre de tu Mascota
              </label>

              <input
                type="text"
                id="petName"
                name="petName"
                placeholder="El nombre de tu mascota"
                required
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Fechas y horario</legend>

            <div>

              <div>
                <label htmlFor="startDate">
                  Desde
                </label>

                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  required
                />
              </div>

              <div>
                <label htmlFor="endDate">
                  Hasta
                </label>

                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  required
                />
              </div>

            </div>

            <div>
              <label htmlFor="time">
                Horario de ingreso
              </label>

              <input
                type="time"
                id="time"
                name="time"
                required
              />
            </div>
          </fieldset>

          <button
            type="submit"
            className='reservation-form__submit'
          >
            Enviar Reserva
          </button>

        </form>

      </section>
    </>
  );
}