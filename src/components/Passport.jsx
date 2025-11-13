
import React, { useRef } from "react";
import "./Passport.css";
// import profileImg from "./assets/profile.jpg";
import html2canvas from "html2canvas"; // npm i html2canvas

export default function AkbarTravelsCard() {
  const phoneE164 = "+919995579646";
  const phoneHuman = "+91 99955 79646";
  const email = "ajmalrahim.ttp9@gmail.com";
  const website = "https://www.akbartravels.com";

  const cardRef = useRef(null);

  const handleSaveVcf = async () => {
    const EOL = "\r\n";
    const vcard =
      "BEGIN:VCARD" + EOL +
      "VERSION:3.0" + EOL +
      "N:Rahim;Ajmal;;;" + EOL +
      "FN:Ajmal Rahim" + EOL +
      "ORG:AKBAR TRAVELS;MARIHA TOURS & TRAVELS" + EOL +
      "TITLE:Franchise of Akbar Travels" + EOL +
      `TEL;TYPE=CELL:${phoneE164}` + EOL +
      `EMAIL;TYPE=INTERNET:${email}` + EOL +
      `URL:${website}` + EOL +
      "END:VCARD" + EOL;

    const mime = "text/vcard;charset=utf-8";
    const fileName = "Ajmal_Rahim.vcf";

    try {
      const file = new File([vcard], fileName, { type: mime });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "Ajmal Rahim — Contact",
          text: "Save to your contacts."
        });
        return;
      }
    } catch {}

    const blob = new Blob([vcard], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.rel = "noopener";
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  };

  const handleDownloadPng = async () => {
    if (!cardRef.current) return;
    await document.fonts?.ready;
    const canvas = await html2canvas(cardRef.current, {
      backgroundColor: null,
      scale: window.devicePixelRatio > 1 ? 2 : 1.5,
      useCORS: true
    });
    const dataURL = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataURL;
    a.download = "AkbarTravels-Card.png";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <main
      ref={cardRef}
      className="at-card"
      role="main"
      onClick={handleSaveVcf}
      title="Tap to save contact"
    >
      {/* Profile image floated high like the sample */}
      <div className="at-avatarWrap" aria-hidden="true">
        <div className="at-avatarRing" />
        <img
          className="at-avatar"
          src="/akbar.jpg" /* or: src={profileImg} */
          alt="Profile photo of Ajmal Rahim"
        />
      </div>

      <header className="at-head">
        <div className="at-title">AKBAR TRAVELS</div>
        <div className="at-subtitle">MARIHA TOURS &amp; TRAVELS</div>
        <div className="at-caption">(FRANCHAISE OF AKBAR TRAVELS)</div>
      </header>

      <p className="at-tagline">FROM DREAMS TO DESTINATION </p>

      <div className="at-chips" aria-hidden="true">
        <span className="at-chip">Flight Tickets</span>
        <span className="at-chip">Visa &amp; Tours</span>
        <span className="at-chip">Hotels</span>
      </div>

      <div className="at-ctaRow">
        {/* WhatsApp */}
        <a
          className="at-iconBtn"
          href={`https://wa.me/${phoneE164.replace("+", "")}`}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          onClick={(e) => e.stopPropagation()}
        >
          <svg className="at-icon" viewBox="0 0 24 24" fill="none">
            <path d="M20.5 11.7c0 4.9-4 8.8-8.8 8.8-1.6 0-3.1-.4-4.3-1.1L3.5 21l1.7-3.7a8.7 8.7 0 0 1-1.3-4.6c0-4.9 4-8.8 8.8-8.8s8.8 4 8.8 8.8Z" stroke="#25D366" strokeWidth="1.6"/>
            <path d="M9.6 7.9c-.2-.5-.4-.5-.6-.5H8.4c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.3s.9 2.7 1 2.9 1.8 2.8 4.3 3.8c2.1.8 2.6.7 3 .7.4 0 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2 0-.1-.1-.2-.3-.3l-1.6-.7c-.2-.1-.3 0-.4.1l-.6.8c-.1.2-.3.2-.5.1-.2-.1-.9-.3-1.7-1-.6-.5-1-1.1-1.2-1.2-.1-.2 0-.3.1-.4l.3-.3c.2-.2.2-.3.3-.5 0-.2 0-.4 0-.5s-.5-1.4-.7-1.9z" fill="#25D366"/>
          </svg>
        </a>

        {/* Save Contact */}
        <button
          className="at-btn at-primary"
          type="button"
          onClick={(e) => { e.stopPropagation(); handleSaveVcf(); }}
          aria-label="Save contact"
        >
          <svg className="at-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 3v14m0 0 4-4m-4 4-4-4M4 21h16" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          SAVE CONTACT
        </button>

        {/* Download PNG */}
        <button
          className="at-btn at-secondary"
          type="button"
          onClick={(e) => { e.stopPropagation(); handleDownloadPng(); }}
          aria-label="Download PNG"
          title="Download card as PNG"
        >
          <svg className="at-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 21h16" stroke="#e5e7eb" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          PNG
        </button>
      </div>

      {/* NEW: Attention buttons for Call / Email / Website */}
      <div className="at-attnRow">
        <a
          className="at-attnBtn"
          href={`tel:${phoneE164}`}
          onClick={(e)=>e.stopPropagation()}
          aria-label="Call Ajmal Rahim"
        >
          <svg className="at-attnIcon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M22 16.9v2a2 2 0 0 1-2.2 2 19.9 19.9 0 0 1-8.7-3.1 19.6 19.6 0 0 1-6-6A19.9 19.9 0 0 1 2.9 3.8 2 2 0 0 1 4.9 2h2a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.2 9.4a16 16 0 0 0 6 6l1.8-1c.6-.3 1.4-.2 2 .2.9.3 1.8.6 2.7.7A2 2 0 0 1 22 16.9Z" stroke="currentColor" strokeWidth="1.6"/>
          </svg>
          Call
          <span className="at-shimmer" aria-hidden="true" />
        </a>

        <a
          className="at-attnBtn"
          href={`mailto:${email}`}
          onClick={(e)=>e.stopPropagation()}
          aria-label="Email Ajmal Rahim"
        >
          <svg className="at-attnIcon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 4h16v16H4z" stroke="currentColor" strokeWidth="1.6"/>
            <path d="m4 6 8 7L20 6" stroke="currentColor" strokeWidth="1.6"/>
          </svg>
          Email
          <span className="at-shimmer" aria-hidden="true" />
        </a>

        <a
          className="at-attnBtn"
          href={website}
          target="_blank"
          rel="noreferrer"
          onClick={(e)=>e.stopPropagation()}
          aria-label="Open Akbar Travels website"
        >
          <svg className="at-attnIcon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/>
            <path d="M3 12h18M12 3c3 3.5 3 14 0 18M8 3c2 3.5 2 14 0 18M16 3c-2 3.5-2 14 0 18" stroke="currentColor" strokeWidth="1.2"/>
          </svg>
          Website
          <span className="at-shimmer" aria-hidden="true" />
        </a>
      </div>

      <section className="at-contact" aria-label="Contact details">
        <div className="at-row">
          <svg className="at-smallIcon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M3 5h18M3 12h18M3 19h18" stroke="#9ca3af" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <div>
            <div className="at-strong">Ajmal Rahim</div>
            <div className="at-muted">AKBAR TRAVELS · Mariha Tours &amp; Travels</div>
          </div>
        </div>

        <div className="at-row">
          <svg className="at-smallIcon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M22 16.9v2a2 2 0 0 1-2.2 2 19.9 19.9 0 0 1-8.7-3.1 19.6 19.6 0 0 1-6-6A19.9 19.9 0 0 1 2.9 3.8 2 2 0 0 1 4.9 2h2a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.2 9.4a16 16 0 0 0 6 6l1.8-1c.6-.3 1.4-.2 2 .2.9.3 1.8.6 2.7.7A2 2 0 0 1 22 16.9Z" stroke="#9ca3af" strokeWidth="1.4"/>
          </svg>
          <a href={`tel:${phoneE164}`} onClick={(e)=>e.stopPropagation()}>{phoneHuman}</a>
        </div>

        <div className="at-row">
          <svg className="at-smallIcon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 4h16v16H4z" stroke="#9ca3af" strokeWidth="1.4" />
            <path d="m4 6 8 7L20 6" stroke="#9ca3af" strokeWidth="1.4" />
          </svg>
          <a href={`mailto:${email}`} onClick={(e)=>e.stopPropagation()}>{email}</a>
        </div>

        <div className="at-row">
          <svg className="at-smallIcon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="9" stroke="#9ca3af" strokeWidth="1.4" />
            <path d="M3 12h18M12 3c3 3.5 3 14 0 18M8 3c2 3.5 2 14 0 18M16 3c-2 3.5-2 14 0 18" stroke="#9ca3af" strokeWidth="1.2" />
          </svg>
          <a href={website} target="_blank" rel="noreferrer" onClick={(e)=>e.stopPropagation()}>
            www.akbartravels.com
          </a>
        </div>
      </section>

      <footer className="at-footer">
        <button type="button" className="at-linkLike" onClick={(e)=>{e.stopPropagation(); handleSaveVcf();}}>
          Share your contact with a tap
        </button>
        <span className="at-brandDot" />
        <span>AKBAR TRAVELS</span>
      </footer>
    </main>
  );
}
