// Service worker: guarda a "casca" do app para abrir rápido e funcionar como app instalado.
// Os dados sempre vêm do Supabase (precisa de internet para lançar).
// Ao mudar qualquer arquivo do app, aumente a versão abaixo para os celulares pegarem a atualização.
const VERSAO = "tesouraria-v1";
const ARQUIVOS = [
  "./",
  "./index.html",
  "./config.js",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSAO).then(c => c.addAll(ARQUIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(chaves => Promise.all(chaves.filter(k => k !== VERSAO).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // Supabase (dados e login): nunca passa pelo cache
  if (url.hostname.endsWith("supabase.co")) return;

  // Arquivos do próprio app: rede primeiro, cache se estiver sem internet
  if (url.origin === location.origin) {
    e.respondWith(
      fetch(req)
        .then(resp => { const copia = resp.clone(); caches.open(VERSAO).then(c => c.put(req, copia)); return resp; })
        .catch(() => caches.match(req).then(r => r || caches.match("./index.html")))
    );
    return;
  }

  // Bibliotecas e fontes externas: cache primeiro
  e.respondWith(
    caches.match(req).then(r => r || fetch(req).then(resp => {
      const copia = resp.clone(); caches.open(VERSAO).then(c => c.put(req, copia)); return resp;
    }))
  );
});
