import '../Daycare.css';
import { useState, useEffect } from "react";
import LoadingOverlay from "../../components/LoadingOverlay";
import { useSubmitForm } from "../hooks/useSubmitForm";

import { User, Dog, Calendar, PawPrint } from "lucide-react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";

export default function Reservations() {

  const [capacity, setCapacity] = useState({});
  const [selectedRange, setSelectedRange] = useState(null);
  const [rangeStart, setRangeStart] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [calendarRefresh, setCalendarRefresh] = useState(0);
  const [showNoCapacityModal, setShowNoCapacityModal] = useState(false);

  const { submitForm } = useSubmitForm();

  const fetchCapacity = async () => {
    try {
      const res = await fetch(
        "https://script.google.com/macros/s/AKfycbxdV3jc741f87a85_OqPfMVKeiAcz1xumVNkd3yVeTZAfrbfwmE0rV8QINDbxO-LOu4/exec?cache=" + Date.now()
      );

      const data = await res.json();

      setCapacity(data || {});
      setCalendarRefresh(prev => prev + 1);

    } catch (error) {
      console.error("Error cargando disponibilidad", error);
    }
  };
  // Cargar cupos al abrir la página
  useEffect(() => {
    fetchCapacity();
  }, []);


  // 🧠 FECHA NORMALIZADA (FIX IMPORTANTE)
  const normalizeDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };
  const parseLocalDate = (dateStr) => {
    const [year, month, day] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day);
  };
  // 🧠 OBTENER CUPOS
  const getCount = (date) => {
    return capacity?.[date] ?? 0;
  };

  // 🚀 SELECCIÓN TIPO AIRBNB
  const handleDateClick = (info) => {
    const clickedDate = new Date(info.date);
    const clickedISO = normalizeDate(clickedDate);

    if ((capacity?.[clickedISO] || 0) >= 3) {
      setShowNoCapacityModal(true);
      return;
    }

    // Primer click
    if (!rangeStart) {
      setRangeStart(clickedISO);

      setSelectedRange({
        start: clickedISO,
        end: clickedISO
      });

      return;
    }

    // Segundo click
    let startDate = parseLocalDate(rangeStart);
    let endDate = clickedDate;

    if (endDate < startDate) {
      [startDate, endDate] = [endDate, startDate];
    }

    // Validar rango
    for (
      let d = new Date(startDate);
      d <= endDate;
      d.setDate(d.getDate() + 1)
    ) {
      const iso = normalizeDate(d);

      if ((capacity?.[iso] || 0) >= 3) {
        setRangeStart(null);
        setSelectedRange(null);
        return;
      }
    }

    setSelectedRange({
      start: normalizeDate(startDate),
      end: normalizeDate(endDate)
    });

    setRangeStart(null);
  };

  // 📤 SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedRange) return;

    setIsSubmitting(true);

    try {
      const formData = new FormData(e.target);

      const dataToSend = {
        formType: "reservas",
        serviceType: formData.get("serviceType"),
        name: formData.get("name"),
        phone: formData.get("phone"),
        petName: formData.get("petName"),
        startDate: selectedRange.start,
        endDate: selectedRange.end,
        time: formData.get("time"),
      };

      await submitForm(dataToSend);
      await fetchCapacity();

      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);

      e.target.reset();
      setSelectedRange(null);
      setRangeStart(null);

    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const isInRange = (date) => {
    if (!selectedRange) return false;

    return (
      date >= selectedRange.start &&
      date <= selectedRange.end
    );
  };

  return (
    <>
      {isSubmitting && <LoadingOverlay />}
      {showNoCapacityModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>🐶 Sin disponibilidad</h3>
            <p>Lo sentimos, ese día ya no tiene cupos disponibles.</p>

            <button onClick={() => setShowNoCapacityModal(false)}>
              Entendido
            </button>
          </div>
        </div>
      )}
      {submitSuccess && (
        <div className="success-message">
          ✅ Reserva enviada correctamente
        </div>
      )}

      {/* HEADER */}
      <section className='daycare'>
        <h1 className='daycare__title'>RESERVAR ESTADÍA</h1>
        <p className='daycare__description'>
          Completá el formulario y nos pondremos en contacto con vos para confirmar tu reserva.
        </p>
      </section>
      {/* FORMULARIO ORIGINAL */}
      <section className="daycare__form-container">

        <form className="reservation-form" onSubmit={handleSubmit}>
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
              <Calendar /> Horario
            </legend>

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
          {/* CALENDARIO */}
          <FullCalendar
            key={calendarRefresh}
            dateClick={handleDateClick}

            dayCellClassNames={(info) => {
              const date = normalizeDate(info.date);

              if (isInRange(date)) {
                return ["selected-range"];
              }

              return [];
            }}
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            locale={esLocale}
            dateClick={handleDateClick}

            dayCellDidMount={(info) => {

              const date = normalizeDate(info.date);
              const count = getCount(date);
              console.log(date, count);

              if (selectedRange) {
                if (
                  date >= selectedRange.start &&
                  date <= selectedRange.end
                ) {
                  info.el.style.border = "3px solid #2563eb";
                  info.el.style.borderRadius = "8px";
                }
              }
              // 🔴 ROJO (FULL)
              if (count >= 3) {
                info.el.style.backgroundColor = "#ff4d4d";
                info.el.style.opacity = "0.6";
              }

              // 🟡 AMARILLO (HAY RESERVAS)
              else if (count > 0) {
                info.el.style.backgroundColor = "#ffd24d";
              }

              // 🟢 LIBRE
              else {
                info.el.style.backgroundColor = "#7dff7d";
              }
              const oldBadge = info.el.querySelector(".capacity-badge");
              if (oldBadge) oldBadge.remove();
              // 🔢 contador
              info.el.style.position = "relative";

              const badge = document.createElement("div");
              badge.innerText = `${count}/3`;
              badge.className = "capacity-badge";
              info.el.appendChild(badge);
            }}
          />
          <div class="calendar-legend">
            <span class="legend-item">🟢 Disponible</span>
            <span class="legend-item">🟡 Cupos limitados</span>
            <span class="legend-item">🔴 Completo</span>
          </div>
          {/* MENSAJE PRIMER CLICK */}
          {rangeStart && (
            <div>
              Selecciona fecha de salida
            </div>
          )}

          {/* RANGO SELECCIONADO */}
          {selectedRange && (
            <div>
              📅 {selectedRange.start}
              {selectedRange.start !== selectedRange.end && (
                <> → {selectedRange.end}</>
              )}
            </div>
          )}

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