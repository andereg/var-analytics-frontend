export default function ContactTrackingModule({
                                                  organization = "Kantonale Verwaltung Alpengrün",
                                                  department = "Abteilung Bürgerdienste",
                                                  address = ["Rathausplatz 14", "7421 Alpengrün"],
                                                  phone = "+41 44 583 29 17",
                                                  phoneHref = "+41445832917",
                                                  email = "kontakt@kanton-Alpengrün.ch",
                                                  openingHours = [
                                                      "Montag – Freitag: 08:00 – 17:00",
                                                      "Samstag: 09:00 – 12:00",
                                                      "Sonntag: geschlossen",
                                                  ],
                                                  demandType = "tax_registration",
                                                  pageName,
                                              }) {
    function trackContactClick(channel) {
        if (typeof window !== "undefined" && window.umami) {
            window.umami.track("human_contact_needed", {
                channel,
                page: window.location.pathname,
                page_name: pageName || document.title,
                demand_type: demandType,
            });
        }
    }

    return (
        <section className="box contact-box">
            <div className="contact-grid">
                <div>
                    <strong>{organization}</strong>
                    <br />
                    {department}
                    <br />
                    {address.map((line) => (
                        <span key={line}>
              {line}
                            <br />
            </span>
                    ))}
                </div>

                <div>
                    <strong>Kontakt</strong>
                    <br />
                    Telefon:{" "}
                    <a href={`tel:${phoneHref}`} onClick={() => trackContactClick("phone")}>
                        {phone}
                    </a>
                    <br />
                    E-Mail:{" "}
                    <a href={`mailto:${email}`} onClick={() => trackContactClick("email")}>
                        {email}
                    </a>
                </div>

                <div>
                    <strong>Öffnungszeiten</strong>
                    <br />
                    {openingHours.map((line) => (
                        <span key={line}>
              {line}
                            <br />
            </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
