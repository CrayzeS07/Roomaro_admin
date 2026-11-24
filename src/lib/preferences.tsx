import {useSyncExternalStore} from 'react';
import {Moon,Sun} from 'lucide-react';
import translations from './translations.json';
type Language='uz'|'ru'|'en';
type Theme='light'|'dark';
type Preference={lang:Language;theme:Theme};
const dictionary:Record<string,string[]>=translations;
const storageKey='roomora.preferences.v1';
function read():Preference{try{const v=JSON.parse(localStorage.getItem(storageKey)||'{}');return {lang:v.lang==='en'||v.lang==='ru'?v.lang:'uz',theme:v.theme==='dark'?'dark':'light'};}catch{return {lang:'uz',theme:'light'};}}
let current=read();
const listeners=new Set<()=>void>();
function apply(){document.documentElement.lang=current.lang;document.documentElement.dataset.theme=current.theme;document.title=tr("Roomora — Boshqaruv paneli");document.querySelector('meta[name="theme-color"]')?.setAttribute("content",current.theme==="dark"?"#111c24":"#f6f8f9");}
apply();
function update(p:Partial<Preference>){current={...current,...p};apply();try{localStorage.setItem(storageKey,JSON.stringify(current));}catch{}listeners.forEach(fn=>fn());}
window.addEventListener('storage',e=>{if(e.key===storageKey){current=read();apply();listeners.forEach(fn=>fn());}});
export function usePreferences(){return useSyncExternalStore(fn=>{listeners.add(fn);return ()=>{listeners.delete(fn);};},()=>current,()=>current);}
export function tr(text:string):string{if(current.lang==='uz')return text;const entry=dictionary[text];return entry?.[current.lang==='en'?0:1]??text;}
export function locale(){return current.lang==='ru'?'ru-RU':current.lang==='en'?'en-US':'uz-UZ';}
export function PreferencesControl(){const {lang,theme}=usePreferences();const label=tr(theme==='dark'?'Yorug‘ rejim':'Tungi rejim');return <div className="preferences-control"><button type="button" className="preference-theme" title={label} aria-label={label} aria-pressed={theme==='dark'} onClick={()=>update({theme:theme==='dark'?'light':'dark'})}>{theme==='dark'?<Sun size={19}/>:<Moon size={19}/>}</button><select className="preference-language" aria-label={tr('Til')} title={tr('Til')} value={lang} onChange={e=>update({lang:e.target.value as Language})}><option value="uz">UZ</option><option value="ru">RU</option><option value="en">EN</option></select></div>}
