import {
  useEffect,
  useMemo,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { invite } from "./data/invite";
import { IoPause, IoMusicalNotes, IoClose } from "react-icons/io5";
import { MdDateRange, MdAccessTime, MdPlace } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { FiCamera } from "react-icons/fi";

const BASE = import.meta.env.BASE_URL;
const img = (p) => `${BASE}${p.replace(/^\/+/, "")}`;

function CardSection({ id, title, children, contentClassName = "" }) {
  return (
    <section id={id} className="py-6">
      <div className="linen-card">
        {title ? (
          <>
            <h2 className="linen-title text-[22px] font-semibold text-center">
              {title}
            </h2>
            <div className="mt-3 mx-auto linen-divider max-w-[220px]" />
          </>
        ) : null}

        <div
          className={`linen-body whitespace-pre-line text-[15px] leading-7 text-center ${
            title ? "mt-4" : ""
          } ${contentClassName}`}
        >
          {children}
        </div>
      </div>
    </section>
  );
}

function TikTokEmbed({ videoId, cite, maxWidth = 605, minWidth = 325 }) {
  return (
    <blockquote
      className="tiktok-embed"
      cite={cite}
      data-video-id={videoId}
      style={{ maxWidth, minWidth }}
    >
      <section />
    </blockquote>
  );
}

function Countdown({ targetISO }) {
  const [left, setLeft] = useState(() => calcLeft(targetISO));

  useEffect(() => {
    const t = setInterval(() => setLeft(calcLeft(targetISO)), 1000);
    return () => clearInterval(t);
  }, [targetISO]);

  return (
    <div className="linen-card text-center">
      <div
        className="linen-title text-4xl font-semibold tracking-wide"
        style={{ color: "rgba(166,128,87,.95)" }}
      >
        Faltan
      </div>

      <div className="mt-5 grid grid-cols-4 items-center">
        <TimeBox value={left.days} label="Días" />
        <Divider />
        <TimeBox value={left.hours} label="hr" />
        <Divider />
        <TimeBox value={left.minutes} label="min" />
        <Divider />
        <TimeBox value={left.seconds} label="seg" />
      </div>

      <div className="mt-5 flex items-center justify-center">
        <FaHeart size={18} style={{ color: "rgba(166,128,87,.8)" }} />
      </div>
    </div>
  );
}

function IntroScreen({ open, onEnter }) {
  const [fadeIn, setFadeIn] = useState(false);
  const [fadeWhite, setFadeWhite] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);

    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    if (!open) return;
    setFadeWhite(false);
    setFadeIn(false);
    const t = setTimeout(() => setFadeIn(true), 30);
    return () => clearTimeout(t);
  }, [open]);

  const handleEnter = () => {
    setFadeWhite(true);
    setTimeout(() => onEnter?.(), 650);
  };

  if (!open) return null;

  // ✅ Antes: "/intropc.png" : "/intro.jpg"
  const imgSrc = isDesktop ? img("intropc.png") : img("intro.jpg");

  return (
    <div className="fixed inset-0 z-[70]">
      {/* Fondo blur detrás (PC + Mobile) */}
      <div
        className="absolute inset-0 bg-center bg-cover scale-105 blur-sm"
        style={{ backgroundImage: `url(${imgSrc})` }}
      />
      {/* Oscurecimiento leve para que se vea más elegante */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Flash a blanco al entrar */}
      <div
        className={`absolute inset-0 bg-white transition-opacity duration-700 ${
          fadeWhite ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Contenido click */}
      <button
        type="button"
        onClick={handleEnter}
        className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
          fadeIn ? "opacity-100" : "opacity-0"
        }`}
        aria-label="Entrar a la invitación"
        title="Entrar"
      >
        <img
          src={imgSrc}
          alt="Portada invitación"
          draggable="false"
          className={`w-full h-full object-center ${
            isDesktop ? "object-contain" : "object-cover"
          }`}
        />

        {/* Hint */}
        <div className="absolute bottom-10 left-0 right-0 text-center">
          <div className="mx-auto inline-flex rounded-full bg-white/75 backdrop-blur-md px-4 py-2 text-sm font-semibold text-zinc-900 shadow">
            Toca para abrir
          </div>
        </div>
      </button>
    </div>
  );
}

function ImageModal({ open, src, alt, onClose }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[900px] max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 h-10 w-10 rounded-full bg-white/90 text-zinc-900 shadow flex items-center justify-center active:scale-95"
          aria-label="Cerrar"
          title="Cerrar"
        >
          <IoClose size={22} />
        </button>

        <img
          src={src}
          alt={alt}
          className="w-full h-full max-h-[85vh] object-contain rounded-2xl"
          draggable="false"
        />
      </div>
    </div>
  );
}

function GalleryCarousel({ id, title, subtitle, photos, onPhotoClick }) {
  return (
    <section id={id} className="py-6">
      <div className="linen-card">
        <div className="text-center">
          <h2 className="linen-title text-3xl font-semibold">{title}</h2>
          {subtitle ? (
            <p className="mt-2 text-sm linen-body opacity-90">{subtitle}</p>
          ) : null}

          <div
            className="mt-4 flex justify-center"
            style={{ color: "rgba(166,128,87,.9)" }}
          >
            <FiCamera size={28} />
          </div>
        </div>

        <div className="mt-5">
          <div
            className="
              flex gap-4 overflow-x-auto pb-3
              snap-x snap-mandatory
              [-webkit-overflow-scrolling:touch]
            "
          >
            {photos.map((p, idx) => (
              <button
                key={`${p.src}-${idx}`}
                type="button"
                onClick={() => onPhotoClick?.(p)}
                className="
                  snap-center shrink-0
                  w-[78%] sm:w-[60%]
                  text-left
                "
                title="Ver foto"
              >
                <div className="overflow-hidden rounded-2xl border border-black/10 bg-white/30 shadow">
                  <img
                    src={p.src}
                    alt={p.alt || `Foto ${idx + 1}`}
                    loading="lazy"
                    className="h-[380px] sm:h-[420px] w-full object-cover"
                    draggable="false"
                  />
                </div>
              </button>
            ))}
          </div>

          <p className="mt-2 text-center text-xs linen-body opacity-80">
            Desliza para ver más / Presiona para agrandar
          </p>
        </div>
      </div>
    </section>
  );
}

const MusicButton = forwardRef(function MusicButton(
  { videoId, startSeconds = 0 },
  ref
) {
  const playerRef = useRef(null);
  const containerIdRef = useRef(
    `yt-player-${Math.random().toString(16).slice(2)}`
  );
  const pendingPlayRef = useRef(false);

  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const loadApi = () =>
      new Promise((resolve) => {
        if (window.YT && window.YT.Player) return resolve();

        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);

        window.onYouTubeIframeAPIReady = () => resolve();
      });

    let mounted = true;

    loadApi().then(() => {
      if (!mounted) return;

      playerRef.current = new window.YT.Player(containerIdRef.current, {
        height: "0",
        width: "0",
        videoId,
        playerVars: {
          start: startSeconds,
          autoplay: 0,
          controls: 0,
          rel: 0,
          playsinline: 1,
        },
        events: {
          onReady: () => {
            setReady(true);

            // Si el usuario ya clickeó antes de que el player esté listo:
            if (pendingPlayRef.current) {
              pendingPlayRef.current = false;
              try {
                playerRef.current.seekTo?.(startSeconds, true);
              } catch {}
              playerRef.current.playVideo();
            }
          },
          onStateChange: (e) => {
            if (e.data === 1) setPlaying(true);
            if (e.data === 2) setPlaying(false);
          },
        },
      });
    });

    return () => {
      mounted = false;
      try {
        playerRef.current?.destroy?.();
      } catch {}
    };
  }, [videoId, startSeconds]);

  const playFromStart = () => {
    // Esto debe llamarse DIRECTAMENTE desde el click del usuario (Intro)
    if (!playerRef.current || !ready) {
      pendingPlayRef.current = true;
      return;
    }
    try {
      playerRef.current.seekTo?.(startSeconds, true);
    } catch {}
    playerRef.current.playVideo();
  };

  const toggle = () => {
    if (!ready || !playerRef.current) return;
    const state = playerRef.current.getPlayerState?.();
    if (state !== 1) {
      playFromStart();
    } else {
      playerRef.current.pauseVideo();
    }
  };

  useImperativeHandle(ref, () => ({ playFromStart, toggle }), [ready]);

  return (
    <>
      <div className="hidden">
        <div id={containerIdRef.current} />
      </div>

      <button
        onClick={toggle}
        className="fixed bottom-5 right-5 z-50 h-12 w-12 rounded-full bg-white/80 backdrop-blur-md border border-black/10 shadow-lg flex items-center justify-center active:scale-95"
        aria-label={playing ? "Pausar música" : "Reproducir música"}
        title={playing ? "Pausar música" : "Reproducir música"}
      >
        {playing ? <IoPause size={22} /> : <IoMusicalNotes size={22} />}
      </button>
    </>
  );
});

function TimeBox({ value, label }) {
  return (
    <div className="px-2">
      <div className="text-4xl font-semibold text-zinc-800">
        {String(value).padStart(2, "0")}
      </div>
      <div
        className="mt-1 text-sm font-medium"
        style={{ color: "rgba(166,128,87,.85)" }}
      >
        {label}
      </div>
    </div>
  );
}

function Divider() {
  return <div className="hidden" />;
}

function calcLeft(targetISO) {
  const target = new Date(targetISO).getTime();
  const now = Date.now();
  const diff = Math.max(0, target - now);

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
}

export default function App() {
  const [showGift, setShowGift] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [entered, setEntered] = useState(false);
  const [musicKick, setMusicKick] = useState(0);
  const musicRef = useRef(null);

  // ✅ Antes: "/novios.jpg"
  const bgUrl = img("novios.jpg");

  const enterInvitation = () => {
    musicRef.current?.playFromStart?.();
    setEntered(true);
  };

  const [showDress, setShowDress] = useState(false);

  const dressTiktoks = [
    {
      videoId: "7460441085836365074",
      cite: "https://www.tiktok.com/@ortcclothingco/video/7460441085836365074",
    },
    {
      videoId: "7366359414439300384",
      cite: "https://www.tiktok.com/@_victoreis_/video/7366359414439300384",
    },
  ];

  useEffect(() => {
    if (!showDress) return;

    const src = "https://www.tiktok.com/embed.js";

    const load = () => {
      // Si ya existe el script, solo recarga embeds
      if (document.querySelector(`script[src="${src}"]`)) {
        window.tiktokEmbed?.load?.();
        return;
      }

      const s = document.createElement("script");
      s.src = src;
      s.async = true;
      s.onload = () => window.tiktokEmbed?.load?.();
      document.body.appendChild(s);
    };

    // deja que el DOM pinte antes de cargar
    const t = setTimeout(load, 50);
    return () => clearTimeout(t);
  }, [showDress]);

  const bankText = useMemo(() => {
    const b = invite.gifts.bank;
    return `Titular: ${b.holder}
RUT: ${b.rut}
Banco: ${b.bank}
Tipo: ${b.accountType}
N° Cuenta: ${b.accountNumber}
Email: ${b.email}`;
  }, []);

  const copyBank = async () => {
    try {
      await navigator.clipboard.writeText(bankText);
      alert("Datos bancarios copiados.");
    } catch {
      alert("No se pudo copiar automáticamente. Copia manualmente.");
    }
  };

  return (
    <div className="min-h-screen">
      {/* Fondo fijo */}
      <div
        className="fixed inset-0 -z-10 bg-center bg-cover"
        style={{ backgroundImage: `url(${bgUrl})` }}
      />
      <div className="fixed inset-0 -z-10 bg-black/35" />

      {/* Contenido principal (aparece después del intro) */}
      <div
        className={`mx-auto w-full max-w-[520px] px-5 transition-opacity duration-700 ${
          entered ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* PORTADA */}
        <div className="min-h-[88vh] flex flex-col justify-center py-10 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-white/90 drop-shadow">
            Invitación Matrimonio
          </p>

          <h1 className="mt-4 font-script text-4xl sm:text-5xl leading-tight text-white drop-shadow-lg">
            {invite.couple}
          </h1>

          <div className="mt-6 text-white/95 drop-shadow">
            <p className="text-sm">{invite.verse}</p>
            <p className="mt-1 text-sm font-medium">{invite.verseRef}</p>
          </div>

          <p className="mt-6 text-base font-semibold text-white drop-shadow">
            {invite.dateLong}
          </p>

          <a
            href="#presentacion"
            className="mt-8 w-full rounded-xl bg-white/20 backdrop-blur-md border border-white/30 px-4 py-3 text-white font-semibold hover:bg-white/25 active:bg-white/30"
          >
            Ver invitación
          </a>
        </div>

        {/* PRESENTACIÓN */}
        <CardSection id="presentacion" title="Presentación">
          Con la bendición de Dios, queremos invitarte a celebrar nuestro
          matrimonio y compartir un día especial de celebración al aire
          libre y en el campo.
        </CardSection>

        {/* CONTADOR */}
        <section className="py-6">
          <Countdown targetISO={invite.eventDateISO} />
        </section>

        {/* FECHA HORA LUGAR */}
        <CardSection id="evento" title="Fecha, hora y lugar">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MdDateRange size={18} />
              <span>{invite.event.date}</span>
            </div>

            <div className="flex items-center gap-2">
              <MdAccessTime size={18} />
              <span>{invite.event.time}</span>
            </div>

            <div className="flex items-center gap-2">
              <MdPlace size={18} />
              <span>{invite.event.place}</span>
            </div>
          </div>

          <div className="mt-5 overflow-hidden rounded-xl border border-black/10">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3192.6654382893203!2d-72.77955732415943!3d-36.85048787223271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzbCsDUxJzAxLjgiUyA3MsKwNDYnMzcuMSJX!5e0!3m2!1ses!2scl!4v1768185552512!5m2!1ses!2scl"
              className="w-full h-[260px] sm:h-[320px]"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación matrimonio"
            />
          </div>

          <a
            href={invite.event.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex w-full items-center justify-center linen-btn"
          >
            Cómo llegar
          </a>
        </CardSection>

        {/* GALERÍA */}
        <GalleryCarousel
          id="galeria"
          title={invite.gallery.title}
          subtitle={invite.gallery.subtitle}
          photos={invite.gallery.photos}
          onPhotoClick={(p) => setSelectedPhoto(p)}
        />

        {/* ACCESO */}
        <CardSection id="acceso" title="Acceso y estacionamientos">
          {invite.access.text}
        </CardSection>

        {/* CELEBRACIÓN */}
        <CardSection id="celebracion" title="Nuestra celebración">
          {invite.celebration}
        </CardSection>

        {/* VESTIMENTA */}
        <CardSection id="vestimenta" title="Vestimenta sugerida">
          {invite.dressCode}

          <button onClick={() => setShowDress(true)} className="mt-5 w-full linen-btn">
            Ver sugerencias
          </button>
        </CardSection>

        <CardSection id="regalos" title="Hacer un regalo">
          {`Si deseas hacernos un regalo, aquí encontrarás la información 💛\n\n`}
          <button onClick={() => setShowGift(true)} className="w-full linen-btn mt-0">
            Haz click aqui!
          </button>
        </CardSection>

        <CardSection id="rsvp" title="Confirmación de asistencia">
          {invite.rsvp.deadlineText}
        </CardSection>

        <CardSection id="fotografia" title="Fotografía">
          {`Para que puedan disfrutar la ceremonia con tranquilidad, contaremos con un fotógrafo profesional.
        Les pedimos amablemente no interrumpir su trabajo durante la ceremonia.
        Luego, con mucho cariño, compartiremos las fotos para que también puedan tener este recuerdo.`}
        </CardSection>

        <CardSection id="info-importante" title="Información importante">
          {`Esta invitación es una página web y podrá actualizarse con nueva información.
        Les recomendamos revisarla periódicamente para estar al tanto de cualquier novedad.`}
        </CardSection>

        {/* CIERRE */}
        <div className="py-12 text-center text-sm text-white/95 whitespace-pre-line drop-shadow">
          {invite.closing}
        </div>
      </div>

      {/* MODAL REGALOS (responsive) */}
      {showGift ? (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-3"
          onClick={() => setShowGift(false)}
        >
          <div
            className="w-full max-w-md max-h-[85vh] overflow-hidden rounded-2xl shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Contenedor tipo lino */}
            <div className="linen-card !p-0 h-full">
              {/* Header fijo */}
              <div className="flex items-start justify-between gap-4 px-5 py-4 border-b border-black/10">
                <h3 className="linen-title text-lg font-semibold">Hacer un regalo</h3>

                <button
                  onClick={() => setShowGift(false)}
                  className="rounded-lg px-2 py-1 text-sm text-zinc-600 hover:bg-black/5"
                  aria-label="Cerrar"
                  title="Cerrar"
                >
                  Cerrar
                </button>
              </div>

              {/* Contenido scrolleable */}
              <div className="px-5 py-4 overflow-y-auto max-h-[calc(85vh-64px)]">
                <div className="rounded-2xl bg-white/35 border border-black/10 p-4 text-center">
                  <div className="linen-body text-[14px] leading-7">
                    {invite.gifts.text}
                  </div>
                </div>

                {/* Opciones */}
                <div className="mt-4 space-y-3">
                  {invite.gifts.options.map((g) => (
                    <div
                      key={g.title}
                      className="rounded-2xl bg-white/30 border border-black/10 p-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/40 border border-black/10">
                          <span className="text-lg">{g.icon}</span>
                        </div>

                        <div className="flex-1">
                          <div className="linen-title text-[15px] font-semibold">
                            {g.title}
                          </div>
                          <div className="linen-body text-sm opacity-90">
                            {g.amount
                              ? `$${g.amount.toLocaleString("es-CL")}`
                              : "El monto que tú desees"}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Datos bancarios */}
                <div className="mt-4 rounded-2xl bg-white/35 border border-black/10 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="linen-title text-[15px] font-semibold">
                      Datos bancarios
                    </div>

                    <button
                      onClick={copyBank}
                      className="rounded-xl bg-zinc-900 px-3 py-2 text-sm font-semibold text-white hover:opacity-90"
                    >
                      Copiar
                    </button>
                  </div>

                  <pre className="mt-3 whitespace-pre-wrap text-[13px] leading-6 text-zinc-800">
{bankText}
                  </pre>

                  <p className="mt-3 text-xs text-zinc-700">
                    {invite.gifts.materialGiftNote}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* MODAL VESTIMENTA */}
      {showDress ? (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-3"
          onClick={() => setShowDress(false)}
        >
          <div
            className="w-full max-w-md max-h-[85vh] overflow-hidden rounded-2xl shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="linen-card !p-0 h-full">
              <div className="flex items-start justify-between gap-4 px-5 py-4 border-b border-black/10">
                <h3 className="linen-title text-lg font-semibold">Ideas de vestimenta</h3>

                <button
                  onClick={() => setShowDress(false)}
                  className="rounded-lg px-2 py-1 text-sm text-zinc-600 hover:bg-black/5"
                  aria-label="Cerrar"
                  title="Cerrar"
                >
                  Cerrar
                </button>
              </div>

              <div className="px-5 py-4 overflow-y-auto max-h-[calc(85vh-64px)]">
                <div className="space-y-4">
                  {dressTiktoks.map((t) => (
                    <div
                      key={t.videoId}
                      className="rounded-2xl bg-white/35 border border-black/10 p-3"
                    >
                      <TikTokEmbed videoId={t.videoId} cite={t.cite} />
                    </div>
                  ))}
                </div>

                <p className="mt-4 text-xs text-zinc-700 text-center">
                  Si no cargan al instante, espera un segundo (TikTok tarda en cargar sus videos!).
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <IntroScreen open={!entered} onEnter={enterInvitation} />

      <MusicButton
        ref={musicRef}
        videoId={invite.music.videoId}
        startSeconds={invite.music.startSeconds}
      />

      <ImageModal
        open={!!selectedPhoto}
        src={selectedPhoto?.src}
        alt={selectedPhoto?.alt || "Foto"}
        onClose={() => setSelectedPhoto(null)}
      />
    </div>
  );
}
