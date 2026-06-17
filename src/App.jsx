import AppRoutes from './daycare/routes/AppRoutes';
import Footer from './components/Footer';
import { useEffect, useState } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

function App() {
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const tutorialSeen = localStorage.getItem("ateneaTutorial");

    if (!tutorialSeen) {
      const timer = setTimeout(() => {
        setShowWelcome(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, []);

  // 🚀 DRIVER TOUR
  const driverObj = driver({
    showProgress: true,
    animate: true,
    nextBtnText: "Siguiente",
    prevBtnText: "Atrás",
    doneBtnText: "Finalizar",

    steps: [
      {
        element: ".tutorial-guarderia",
        popover: {
          title: "🐶 Guardería",
          description: "Aquí podés completar el formulario de guardería.",
        },
      },
      {
        element: ".tutorial-paseos",
        popover: {
          title: "🚶 Paseos",
          description: "En esta sección encontrarás el formulario de paseos.",
        },
      },
      {
        element: ".tutorial-reservas",
        popover: {
          title: "📅 Reservas",
          description: "Desde aquí podés realizar una reserva.",
        },
      },
      {
        element: ".tutorial-galeria",
        popover: {
          title: "📸 Galería",
          description: "Mirá fotos de nuestros huéspedes y sus aventuras.",
        },
      },

    ],
    onDestroyed: () => {
      localStorage.setItem("ateneaTutorial", "true");

      const isMobile = window.innerWidth <= 1024;

      if (isMobile) {
        window.__closeMenu?.();
      }
    },
  });

  const startTutorial = () => {
    setShowWelcome(false);

    const isMobile = window.innerWidth <= 1024;

    if (isMobile) {
      window.__toggleMenu?.(); // 👈 ABRIR ANTES DEL TOUR
    }

    setTimeout(() => {
      driverObj.drive();
    }, 100);
  };



  const skipTutorial = () => {
    localStorage.setItem("ateneaTutorial", "true");
    setShowWelcome(false);
  };

  return (
    <>
      {/* 🐾 WELCOME MODAL */}
      {showWelcome && (
        <div className="welcome-overlay">
          <div className="welcome-modal">
            <h2>🐾 ¡Bienvenido a Guardería Atenea!</h2>

            <p>
              Te mostraremos un breve recorrido para que conozcas cómo utilizar
              nuestra página y encuentres rápidamente toda la información.
            </p>

            <div className="welcome-buttons">
              <button onClick={startTutorial}>
                Comenzar recorrido
              </button>

              <button onClick={skipTutorial}>
                Omitir
              </button>
            </div>
          </div>
        </div>
      )}

      <main>
        <AppRoutes />
      </main>

      <Footer />
    </>
  );
}

export default App;