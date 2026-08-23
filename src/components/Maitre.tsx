'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { detectTongue, opening, reply, type MaitreLink, type Tongue } from '@/lib/maitre';

type Bubble = { id: string; from: 'guest' | 'maitre'; text: string; links?: MaitreLink[] };

function duck(speaking: boolean) {
  window.dispatchEvent(new CustomEvent('joes:maitre-speaking', { detail: { speaking } }));
}

function RecCtor() {
  if (typeof window === 'undefined') return null;
  const w = window as Window & {
    SpeechRecognition?: new () => SpeechRecognition;
    webkitSpeechRecognition?: new () => SpeechRecognition;
  };
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
}

interface SpeechRecognition extends EventTarget {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  onresult: ((ev: { results: { [i: number]: { [j: number]: { transcript: string } } } }) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
}

export function Maitre() {
  const t = useTranslations('maitre');
  const [tongue, setTongue] = useState<Tongue>('en');
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [lines, setLines] = useState<Bubble[]>([{ id: 'hi', from: 'maitre', text: opening('en') }]);
  const [busy, setBusy] = useState(false);
  const [muted, setMuted] = useState(false);
  const [listening, setListening] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const recRef = useRef<SpeechRecognition | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const urlRef = useRef<string | null>(null);
  const mutedRef = useRef(false);
  mutedRef.current = muted;

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: 'smooth' });
  }, [lines, open]);

  useEffect(() => {
    if (!open) {
      duck(false);
      recRef.current?.stop();
      audioRef.current?.pause();
    }
  }, [open]);

  function unlock() {
    const audio = audioRef.current ?? new Audio();
    audioRef.current = audio;
    audio.muted = true;
    audio.src =
      'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA';
    void audio.play().catch(() => undefined);
    audio.muted = false;
  }

  function speakBrowser(text: string, lang: Tongue) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang === 'it' ? 'it-IT' : 'en-CA';
    const voices = window.speechSynthesis.getVoices();
    const want = lang === 'it' ? 'it' : 'en';
    const v =
      voices.find((voice) => voice.lang.toLowerCase().startsWith(want) && /male|marco|giorgio|luca|diego|matteo/i.test(voice.name)) ||
      voices.find((voice) => voice.lang.toLowerCase().startsWith(want)) ||
      null;
    if (v) u.voice = v;
    u.onstart = () => duck(true);
    u.onend = () => duck(false);
    u.onerror = () => duck(false);
    duck(true);
    window.speechSynthesis.speak(u);
  }

  async function speak(text: string, lang: Tongue) {
    if (mutedRef.current || !text) return;
    unlock();
    window.speechSynthesis?.cancel();
    try {
      const res = await fetch('/api/maitre/speak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, tongue: lang }),
      });
      if (!res.ok) {
        speakBrowser(text, lang);
        return;
      }
      const blob = await res.blob();
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
      const url = URL.createObjectURL(blob);
      urlRef.current = url;
      const audio = audioRef.current ?? new Audio();
      audioRef.current = audio;
      audio.muted = false;
      audio.onplay = () => duck(true);
      audio.onended = () => duck(false);
      audio.onpause = () => duck(false);
      audio.src = url;
      await audio.play();
    } catch {
      speakBrowser(text, lang);
    }
  }

  function ask(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    unlock();
    const nextTongue = detectTongue(trimmed, tongue);
    setTongue(nextTongue);
    const user: Bubble = { id: crypto.randomUUID(), from: 'guest', text: trimmed };
    const out = reply(trimmed, nextTongue);
    const bot: Bubble = { id: crypto.randomUUID(), from: 'maitre', text: out.text, links: out.links };
    setLines((cur) => [...cur, user, bot]);
    setInput('');
    setBusy(true);
    void speak(out.text, out.tongue).finally(() => setBusy(false));
  }

  function listen() {
    const Ctor = RecCtor();
    if (!Ctor) return;
    if (listening) {
      recRef.current?.stop();
      return;
    }
    const rec = new Ctor();
    recRef.current = rec;
    rec.lang = tongue === 'it' ? 'it-IT' : 'en-CA';
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    rec.onresult = (ev) => {
      const heard = ev.results[0]?.[0]?.transcript?.trim();
      if (heard) ask(heard);
    };
    rec.onerror = () => setListening(false);
    rec.onend = () => setListening(false);
    setListening(true);
    rec.start();
  }

  const chips =
    tongue === 'it'
      ? [
          { id: 'h', q: 'Quali sono gli orari?' },
          { id: 'p', q: 'Cos’è la pinsa?' },
          { id: 'r', q: 'Vorrei prenotare.' },
          { id: 'a', q: 'Dov’è Almonte?' },
        ]
      : [
          { id: 'h', q: 'What are the hours?' },
          { id: 'p', q: 'What is pinsa?' },
          { id: 'r', q: 'I want a table.' },
          { id: 'a', q: 'Where is Almonte?' },
        ];

  return (
    <div className="pointer-events-none fixed right-3 z-50 bottom-[4.35rem] md:right-4 md:bottom-[5.75rem]">
      {open ? (
        <div
          className="pointer-events-auto mb-3 flex h-[min(30rem,62dvh)] w-[min(24rem,calc(100vw-1.5rem))] flex-col overflow-hidden border border-gold bg-paper text-ink"
          role="dialog"
          aria-label={t('title')}
        >
          <div className="flex items-center gap-2 bg-night px-3 py-2 text-cream">
            <span className="grid h-10 w-10 place-items-center rounded-full border border-gold text-gold">M</span>
            <div className="min-w-0 flex-1">
              <p className="font-heading text-lg leading-none">{t('title')}</p>
              <p className="truncate text-[0.7rem] text-cream/60">{t('subtitle')}</p>
            </div>
            <button
              type="button"
              className={`px-2 text-[0.65rem] font-bold uppercase ${tongue === 'en' ? 'text-gold' : 'text-cream/50'}`}
              onClick={() => {
                setTongue('en');
                const hello = opening('en');
                setLines([{ id: 'hi', from: 'maitre', text: hello }]);
                void speak(hello, 'en');
              }}
            >
              EN
            </button>
            <button
              type="button"
              className={`px-2 text-[0.65rem] font-bold uppercase ${tongue === 'it' ? 'text-gold' : 'text-cream/50'}`}
              onClick={() => {
                setTongue('it');
                const hello = opening('it');
                setLines([{ id: 'hi', from: 'maitre', text: hello }]);
                void speak(hello, 'it');
              }}
            >
              IT
            </button>
            <button
              type="button"
              className="px-2 text-[0.65rem] font-bold uppercase"
              onClick={() => {
                const next = !muted;
                mutedRef.current = next;
                setMuted(next);
                if (next) {
                  audioRef.current?.pause();
                  window.speechSynthesis?.cancel();
                  duck(false);
                }
              }}
            >
              {muted ? t('unmute') : t('mute')}
            </button>
            <button type="button" className="px-2 text-[0.65rem] font-bold uppercase" onClick={() => setOpen(false)}>
              {t('close')}
            </button>
          </div>
          <div ref={scroller} className="flex-1 space-y-3 overflow-y-auto px-3 py-3">
            {lines.map((line) => (
              <div key={line.id} className={line.from === 'guest' ? 'ml-8 bg-red px-3 py-2 text-sm text-white' : 'mr-8 border border-line bg-cream px-3 py-2 text-sm'}>
                <p>{line.text}</p>
                {line.links?.length ? (
                  <ul className="mt-2 flex flex-wrap gap-2 text-[0.7rem] font-bold uppercase tracking-wide">
                    {line.links.map((link) => (
                      <li key={link.href + link.label}>
                        {link.external ? (
                          <a href={link.href} target="_blank" rel="noreferrer" className="text-red">
                            {link.label} →
                          </a>
                        ) : (
                          <Link href={link.href} className="text-red">
                            {link.label} →
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-1 border-t border-line px-3 py-2">
            {chips.map((chip) => (
              <button
                key={chip.id}
                type="button"
                className="border border-line px-2 py-1 text-[0.65rem] font-bold tracking-[0.08em] uppercase"
                onClick={() => ask(chip.q)}
              >
                {chip.q.replace(/\?$/, '')}
              </button>
            ))}
          </div>
          <form
            className="flex gap-2 border-t border-line p-2"
            onSubmit={(event) => {
              event.preventDefault();
              ask(input);
            }}
          >
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={t('placeholder')}
              className="min-w-0 flex-1 border border-line bg-white px-3 py-2 text-sm outline-none"
              maxLength={400}
              autoComplete="off"
            />
            <button type="button" className={`btn py-2 ${listening ? 'btn-red' : 'btn-ghost'}`} onClick={listen}>
              {listening ? t('listening') : t('mic')}
            </button>
            <button type="submit" className="btn btn-gold py-2" disabled={busy}>
              {t('send')}
            </button>
          </form>
        </div>
      ) : null}
      <button
        type="button"
        className="pointer-events-auto btn btn-gold shadow-lg"
        onClick={() => {
          setOpen((v) => {
            const next = !v;
            if (next && lines.length === 1) void speak(lines[0].text, tongue);
            return next;
          });
        }}
      >
        {t('open')}
      </button>
    </div>
  );
}
