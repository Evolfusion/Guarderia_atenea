import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import PhotoAlbum from "react-photo-album";
import "react-photo-album/styles.css";

import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import { gallery } from "../../data/data";
import "../Daycare.css";

export default function Gallery() {
  const [index, setIndex] = useState(-1);

  return (
    <>
      <section className="daycare">
        <div className="daycare__header">
          <h1 className="daycare__title">GALERÍA</h1>
        </div>

        <p className="daycare__description">
          Conocé a nuestros huéspedes 🐶✨. En esta galería vas a ver momentos
          reales de los perritos disfrutando su estadía, jugando y recibiendo el
          cuidado y cariño que merecen.
        </p>

        <PhotoAlbum
          layout="columns"
          photos={gallery}
          columns={(containerWidth) =>
            containerWidth < 768 ? 2 : 3
          }
          spacing={10}
          onClick={({ index }) => setIndex(index)}
        />

        <Lightbox
          open={index >= 0}
          close={() => setIndex(-1)}
          index={index}
          slides={gallery}
          plugins={[Thumbnails]}
        />
      </section>
    </>
  );
}