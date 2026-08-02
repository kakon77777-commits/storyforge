/**
 * Scoped to /s/* so the reading app at / is untouched.
 *
 * The app stores the reader's theme in localStorage and applies it as
 * `data-theme` on <html> from a client effect (app/page.tsx:262). These pages
 * are server-rendered and never run that effect, so without this a reader who
 * chose dark mode in the app would land on a story in light mode.
 *
 * It runs before paint rather than in an effect, because setting the attribute
 * after first paint is a visible flash of the wrong theme — the one thing worse
 * than not honouring the preference at all.
 */

const THEME_BOOT = `(function(){try{var t=localStorage.getItem("storyforge-theme");
if(t==="light"||t==="dark"){document.documentElement.dataset.theme=t;}
var s=localStorage.getItem("storyforge-style");
if(s==="canvas"||s==="literary"||s==="compact"){document.documentElement.dataset.style=s;}
}catch(e){}})();`;

export default function StoryRoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />
      {children}
    </>
  );
}
