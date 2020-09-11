import headerLanguage from "./headerLanguage";
import redirect from "./redirect";

export default (req, res) => {
  const {
    query: { slug },
    _parsedUrl
  } = req;

  const fallback = "in";
  const allowedLocales = [
    { name: "de-DE", locale: "in" },
    { name: "de", locale: "in" },
    { name: "en-AU", locale: "in" },
    { name: "en-IN", locale: "in" },
    { name: "en-CA", locale: "in" },
    { name: "en-NZ", locale: "in" },
    { name: "en-US", locale: "in" },
    { name: "en-ZA", locale: "in" },
    { name: "en-GB", locale: "in" },
    { name: "en", locale: "in" }
  ];

  const detections = headerLanguage(req);

  let found;

  if (detections && detections.length) {
    detections.forEach((language) => {
      if (found || typeof language !== "string") return;

      const lookedUpLocale = allowedLocales.find((allowedLocale) => allowedLocale.name === language);

      if (lookedUpLocale) {
        found = lookedUpLocale.locale;
      }
    });
  }

  if (!found) {
    found = fallback;
  }

  const queryPart = (_parsedUrl && _parsedUrl.query) ? `?${_parsedUrl.query}` : "";

  if (slug) {
    return redirect(res, 302, `/${found}${slug ? `/${slug.join("/")}` : ""}${queryPart}`);
  }

  return redirect(res, 302, `/${found}${queryPart}`);
};
