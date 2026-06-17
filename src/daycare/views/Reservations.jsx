import '../Daycare.css';
import { useState } from "react";
import LoadingOverlay from "../../components/LoadingOverlay";

import {
  useSubmitForm
} from "../hooks/useSubmitForm";

import { User, Dog, Calendar, PawPrint } from "lucide-react";

export default function Reservations() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const { submitForm } = useSubmitForm();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.target);

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

      const result = await submitForm(dataToSend);

      console.log(result);

      setSubmitSuccess(true);

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);

      e.target.reset();

    } catch (error) {
      console.error(error);
      alert("Error al enviar ❌");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {isSubmitting && <LoadingOverlay />}

      {submitSuccess && (
        <div className="success-message">
          ✅ Reserva enviada correctamente
        </div>
      )}

      <section className='daycare'>
        <div className='daycare__header'>
          <h1 className='daycare__title'>
            RESERVAR ESTADÍA
          </h1>
        </div>

        <p className='daycare__description'>
          Completá el formulario y nos pondremos
          en contacto con vos para confirmar
          tu reserva.
        </p>
      </section>

      <section className="daycare__form-container">
        <h3 className="daycare__form-title">Formulario reservas</h3>

        <form className='reservation-form' onSubmit={handleSubmit}>
          <fieldset className="daycare__form-section">
            <div className="daycare__form-field">
              <label
                htmlFor="serviceType"
                className="daycare__form-legend reservation-form__legend"
              >
                <PawPrint /> Tipo de Servicio
              </label>

              <select
                id="serviceType"
                name="serviceType"
                defaultValue=""
                className="daycare__input"
                required
              >
                <option value="" disabled>
                  Seleccionar
                </option>
                <option value="Guarderia">🏠 Guarderia</option>
              </select>
            </div>
          </fieldset>

          <fieldset className="daycare__form-section">
            <legend className="daycare__form-legend">
              <User /> Datos de contacto
            </legend>

            <div className="daycare__form-field">
              <label htmlFor="name" className="daycare__label">
                Nombre Completo
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="daycare__input"
                required
              />
            </div>

            <div className="daycare__form-field">
              <label htmlFor="phone" className="daycare__label">
                Número de Teléfono
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="daycare__input"
                required
              />
            </div>
          </fieldset>

          <fieldset className="daycare__form-section">
            <legend className="daycare__form-legend">
              <Dog /> Datos de la mascota
            </legend>

            <div className="daycare__form-field">
              <label htmlFor="petName" className="daycare__label">
                Nombre de tu Mascota
              </label>
              <input
                type="text"
                id="petName"
                name="petName"
                className="daycare__input"
                required
              />
            </div>
          </fieldset>

          <fieldset className="daycare__form-section">
            <legend className="daycare__form-legend">
              <Calendar /> Fechas y horario
            </legend>

            <div>
              <div className="daycare__form-field">
                <label htmlFor="startDate" className="daycare__label">
                  Desde
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  className="daycare__input"
                  required
                />
              </div>

              <div className="daycare__form-field">
                <label htmlFor="endDate" className="daycare__label">
                  Hasta
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  className="daycare__input"
                  required
                />
              </div>
            </div>

            <div className="daycare__form-field">
              <label htmlFor="time" className="daycare__label">
                Horario de ingreso
              </label>
              <input
                type="time"
                id="time"
                name="time"
                className="daycare__input"
                required
              />
            </div>
          </fieldset>

          <div className="daycare__form-actions daycare__form-field">
            <button
              type="submit"
              className='reservation-form__submit'
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Enviar Reserva"}
            </button>
          </div>
        </form>
      </section>
    </>
  );
}