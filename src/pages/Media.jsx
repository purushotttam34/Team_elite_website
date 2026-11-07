
import { useState } from "react";
import {
  Play,
  Image as ImageIcon,
  ExternalLink,
  X,
  Clapperboard,
  Camera,
} from "lucide-react";
import "../styles.css";

// Replace these sample entries with verified media.
// Add the real image URLs, video links, and captions when available.
const mediaItems = [
  {
    id: 1,
    type: "video",
    category: "Clutch",
    title: "Clutch Moments",
    player: "Amin Qureshi",
    event: "FFMAI FALL 2026",
    year: "2026",
    description: "amin wiped out whole S8UL with a single launcher",
    thumbnail: "",
    url: "https://youtu.be/ZdEp3Zu6iAk?si=BP8H_OK_D__Figlk",
  },
  {
    id: 2,
    type: "video",
    category: "Aura",
    title: "Aura Moments",
    player: "Player name",
    event: "Tournament / event",
    year: "Year",
    description: "Add a description of this iconic moment.",
    thumbnail: "",
    url: "",
  },
  {
    id: 3,
    type: "photo",
    category: "Team Elite",
    title: "Team Elite Memories",
    year: "Year",
    description: "Add the verified team photo caption and credits.",
    image: "",
  },
  {
    id: 4,
    type: "photo",
    category: "Orangutan",
    title: "Orangutan Era",
    year: "Year",
    description: "Add the verified roster or team photo caption.",
    image: "",
  },
];

const filters = [
  { id: "all", label: "All Media" },
  { id: "video", label: "Clutches & Aura" },
  { id: "photo", label: "Team Photos" },
];

export default function Media() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const filteredItems = mediaItems.filter((item) => {
    if (activeFilter === "all") return true;
    return item.type === activeFilter;
  });

  const videos = filteredItems.filter((item) => item.type === "video");
  const photos = filteredItems.filter((item) => item.type === "photo");

  return (
    <main className="media-vault">
      {/* HERO */}
      <section className="media-hero">
        <div className="media-hero-content">
          <span className="media-eyebrow">
            <Clapperboard size={15} />
            THE LEGACY VAULT
          </span>

          <h1>
            MOMENTS THAT
            <br />
            <span>LIVE FOREVER.</span>
          </h1>

          <p>
            The clutches, the aura, and the memories.
            A visual tribute to Team Elite and the Orangutan era.
          </p>

          <div className="media-hero-stats">
            <div>
              <strong>{mediaItems.filter((item) => item.type === "video").length}</strong>
              <span>Video entries</span>
            </div>
            <div>
              <strong>{mediaItems.filter((item) => item.type === "photo").length}</strong>
              <span>Photo entries</span>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY FILTERS */}
      <section className="media-library">
        <div className="media-library-heading">
          <div>
            <span className="media-eyebrow">EXPLORE THE ARCHIVE</span>
            <h2>The Collection</h2>
          </div>

          <span className="media-item-count">
            {filteredItems.length} entries
          </span>
        </div>

        <nav className="media-filters" aria-label="Media categories">
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              className={`media-filter ${
                activeFilter === filter.id ? "active" : ""
              }`}
              onClick={() => setActiveFilter(filter.id)}
              aria-pressed={activeFilter === filter.id}
            >
              {filter.label}
            </button>
          ))}
        </nav>

        {/* CLUTCHES AND AURA VIDEOS */}
        {videos.length > 0 && (
          <section className="media-section">
            <div className="media-section-heading">
              <div className="media-section-icon">
                <Play size={20} />
              </div>
              <div>
                <h3>Clutches & Aura Moments</h3>
                <p>
                  Insane plays, unforgettable rounds, and iconic moments.
                </p>
              </div>
            </div>

            <div className="media-grid media-video-grid">
              {videos.map((item) => (
                <article className="media-card" key={item.id}>
                  <div className="media-thumbnail">
                    {item.thumbnail ? (
                      <img src={item.thumbnail} alt={item.title} />
                    ) : (
                      <div className="media-placeholder">
                        <Play size={34} />
                        <span>ADD VIDEO THUMBNAIL</span>
                      </div>
                    )}

                    <span className="media-type-badge">
                      {item.category}
                    </span>

                    {item.url && (
                      <a
                        className="media-play-button"
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Watch ${item.title}`}
                      >
                        <Play size={23} fill="currentColor" />
                      </a>
                    )}
                  </div>

                  <div className="media-card-content">
                    <div className="media-card-meta">
                      <span>{item.player}</span>
                      <span>{item.year}</span>
                    </div>

                    <h4>{item.title}</h4>
                    <p>{item.description}</p>

                    <div className="media-card-footer">
                      <span>{item.event}</span>
                      {item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open ${item.title}`}
                        >
                          Watch <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* TEAM PHOTO GALLERY */}
        {photos.length > 0 && (
          <section className="media-section">
            <div className="media-section-heading">
              <div className="media-section-icon">
                <Camera size={20} />
              </div>
              <div>
                <h3>Team Photos</h3>
                <p>
                  The faces, friendships, and memories behind the legacy.
                </p>
              </div>
            </div>

            <div className="media-grid media-photo-grid">
              {photos.map((item) => (
                <button
                  type="button"
                  className="media-photo-card"
                  key={item.id}
                  onClick={() => setSelectedPhoto(item)}
                  aria-label={`View ${item.title}`}
                >
                  <div className="media-photo-image">
                    {item.image ? (
                      <img src={item.image} alt={item.title} />
                    ) : (
                      <div className="media-placeholder">
                        <ImageIcon size={34} />
                        <span>ADD TEAM PHOTO</span>
                      </div>
                    )}

                    <span className="media-photo-open">
                      <ImageIcon size={18} />
                    </span>
                  </div>

                  <div className="media-photo-caption">
                    <div>
                      <h4>{item.title}</h4>
                      <p>{item.description}</p>
                    </div>
                    <span>{item.year}</span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {filteredItems.length === 0 && (
          <div className="media-empty">
            <ImageIcon size={36} />
            <h3>No media in this category yet</h3>
            <p>New memories will appear here when they are added.</p>
          </div>
        )}
      </section>

      {/* PHOTO LIGHTBOX */}
      {selectedPhoto && (
        <div
          className="media-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={selectedPhoto.title}
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            type="button"
            className="media-lightbox-close"
            onClick={() => setSelectedPhoto(null)}
            aria-label="Close photo"
          >
            <X size={25} />
          </button>

          <div
            className="media-lightbox-content"
            onClick={(event) => event.stopPropagation()}
          >
            {selectedPhoto.image ? (
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
              />
            ) : (
              <div className="media-placeholder media-lightbox-placeholder">
                <ImageIcon size={48} />
                <span>ADD TEAM PHOTO</span>
              </div>
            )}

            <div className="media-lightbox-caption">
              <h3>{selectedPhoto.title}</h3>
              <p>{selectedPhoto.description}</p>
              <span>{selectedPhoto.year}</span>
            </div>
          </div>
        </div>
      )}

      <footer className="media-disclaimer">
        <p>
          An unofficial fan tribute. Historical media, dates, player names,
          and tournament details should be verified and credited to their
          original creators.
        </p>
      </footer>
    </main>
  );
}
