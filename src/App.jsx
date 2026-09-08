import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Briefcase,
  Check,
  Compass,
  DiceFive,
  DownloadSimple,
  EnvelopeSimple,
  Export,
  FileText,
  GithubLogo,
  Hammer,
  Info,
  InstagramLogo,
  LinkedinLogo,
  Minus,
  PaperPlaneTilt,
  Play,
  Plus,
  SealCheck,
  Stack,
  Target,
  UsersThree,
  X,
} from "@phosphor-icons/react";
import "@fontsource-variable/vazirmatn";
import { content } from "./content.fa.js";
import { Dice3D } from "./Dice3D.jsx";

const assetPath = (path) => `${import.meta.env.BASE_URL}assets/${path}`;
const faNumber = (value) => String(value).replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit]);

const iconMap = {
  lead: Briefcase,
  build: Hammer,
  play: DiceFive,
  gather: UsersThree,
  together: Stack,
};

const sectionLabel = {
  role: "تجربه‌ی من",
  problem: "مسئله‌ای که می‌بینم",
  decision: "کاری که می‌کنم",
  result: "چیزی که می‌سازیم",
};

function routeFromHash() {
  const hash = window.location.hash.replace("#", "");
  return ["board", "cv", "puzzle"].includes(hash) ? hash : "entry";
}

function go(view) {
  if (view === "entry") {
    history.pushState(null, "", window.location.pathname);
    window.dispatchEvent(new Event("popstate"));
  }
  else window.location.hash = view;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function Button({ children, kind = "primary", icon: Icon, ...props }) {
  return (
    <button className={`button button--${kind}`} {...props}>
      {Icon ? <Icon size={20} weight="bold" aria-hidden="true" /> : null}
      <span>{children}</span>
    </button>
  );
}

function LinkButton({ children, kind = "primary", icon: Icon, ...props }) {
  return (
    <a className={`button button--${kind}`} {...props}>
      {Icon ? <Icon size={20} weight="bold" aria-hidden="true" /> : null}
      <span>{children}</span>
    </a>
  );
}

function BrandMark() {
  return (
    <button className="brand-mark" onClick={() => go("entry")} aria-label="بازگشت به صفحه‌ی اول">
      <span className="brand-mark__monogram">OH</span>
      <span>
        <strong>{content.identity.name}</strong>
        <small>{content.identity.role}</small>
      </span>
    </button>
  );
}

function UtilityNav({ view, onReview }) {
  return (
    <header className="utility-nav">
      <BrandMark />
      <nav aria-label="مسیرهای اصلی">
        <button className={view === "board" ? "is-active" : ""} onClick={() => go("board")}>میز بازی</button>
        <button className={view === "cv" ? "is-active" : ""} onClick={() => go("cv")}>رزومه</button>
        <button className={view === "puzzle" ? "is-active" : ""} onClick={() => go("puzzle")}>معمای اختیاری</button>
        <a href={assetPath("Omid-Heidari-CV.pdf")} download>دانلود PDF</a>
        <button onClick={onReview}>بازبینی نسخه‌ی {content.meta.version}</button>
      </nav>
    </header>
  );
}

function Entry({ onReview }) {
  return (
    <main id="main-content" className="entry-shell">
      <div className="entry-table" aria-hidden="true" />
      <section className="entry-card" aria-labelledby="entry-title">
        <div className="entry-card__portrait">
          <img src={assetPath("omid-portrait.png")} alt={content.identity.name} />
          <span>{content.identity.nameEn}</span>
        </div>
        <div className="entry-card__copy">
          <p className="eyebrow">یک مسیر کافی نبود</p>
          <h1 id="entry-title">{content.identity.name}</h1>
          <p className="entry-card__role">{content.identity.role}</p>
          <p className="entry-card__opening">{content.identity.opening}</p>
          <div className="entry-card__actions">
            <Button icon={DiceFive} onClick={() => go("board")}>{content.identity.slogan}</Button>
            <Button kind="ink" icon={FileText} onClick={() => go("cv")}>مطالعه‌ی رزومه</Button>
            <LinkButton kind="quiet" icon={DownloadSimple} href={assetPath("Omid-Heidari-CV.pdf")} download>دانلود مستقیم PDF</LinkButton>
          </div>
          <button className="review-link" onClick={onReview}>این نسخه هنوز روی میز کار است</button>
        </div>
        <div className="entry-die">
          <div className="wooden-well">
            <Dice3D value={6} compact />
          </div>
          <p>برای من، بازی پوسته‌ی کار نیست؛ روشی برای فکرکردن است.</p>
        </div>
      </section>
      <p className="entry-credit">
        طراحی تجربه و روایت: <a href={content.meta.creatorUrl}>یاس دستان</a>
      </p>
    </main>
  );
}

function ProfileCard() {
  return (
    <aside className="profile-card paper-surface">
      <div className="profile-card__photo">
        <img src={assetPath("omid-portrait.png")} alt="پرتره‌ی امید حیدری" />
      </div>
      <p className="profile-card__name">{content.identity.name}</p>
      <p className="profile-card__role">{content.identity.role}</p>
      <blockquote>{content.identity.line}</blockquote>
      <div className="profile-card__links">
        <button onClick={() => go("cv")}><FileText size={18} />رزومه‌ی من را سریع ببینید</button>
        <a href={assetPath("Omid-Heidari-CV.pdf")} download><DownloadSimple size={18} />دانلود نسخه‌ی PDF</a>
        <a href={content.meta.linkedin} target="_blank" rel="noreferrer"><LinkedinLogo size={18} />لینکدین من</a>
        <a href={`mailto:${content.meta.email}`}><EnvelopeSimple size={18} />{content.meta.email}</a>
      </div>
      <p className="profile-card__slogan">{content.identity.slogan}</p>
    </aside>
  );
}

function TerritoryTile({ territory, active, onSelect }) {
  const Icon = iconMap[territory.id];
  return (
    <button
      className={`territory territory--${territory.id}${active ? " is-active" : ""}`}
      style={{ "--territory": territory.color }}
      onClick={() => onSelect(territory.id)}
      aria-pressed={active}
    >
      <Icon size={30} weight="duotone" aria-hidden="true" />
      <strong>{territory.name}</strong>
      <span>{territory.summary}</span>
      <b className="territory__number" aria-label={`شماره‌ی ${faNumber(territory.face)}`}>{faNumber(territory.face)}</b>
    </button>
  );
}

function BoardMap({ activeId, setActiveId }) {
  return (
    <section className="board-map" aria-label="قلمروهای تجربه‌ی امید">
      <div className="board-map__hub">
        <Compass size={30} weight="duotone" aria-hidden="true" />
        <p>دوست دارید از کدام مسیر شروع کنیم؟</p>
        <small>یکی را بردارید</small>
      </div>
      {content.territories.map((territory) => (
        <TerritoryTile
          key={territory.id}
          territory={territory}
          active={activeId === territory.id}
          onSelect={setActiveId}
        />
      ))}
    </section>
  );
}

function CaseFile({ territory, onOpenDetail, onContact }) {
  const Icon = iconMap[territory.id];
  return (
    <aside className="case-file paper-surface" style={{ "--territory": territory.color }}>
      <header className="case-file__head">
        <span className="case-file__icon"><Icon size={28} weight="duotone" /></span>
        <div>
          <small>مسیر انتخابی شما</small>
          <h2>{territory.name}</h2>
        </div>
      </header>
      <p className="case-file__summary">{territory.summary}</p>
      <dl className="case-file__facts">
        {["role", "problem", "decision", "result"].map((key) => (
          <div key={key}>
            <dt>{sectionLabel[key]}</dt>
            <dd>{territory[key]}</dd>
          </div>
        ))}
      </dl>
      <div className="evidence-slip">
        <SealCheck size={22} weight="duotone" />
        <span><b>چیزی که می‌توانید بررسی کنید</b>{territory.proof}</span>
        <small>{territory.evidenceStatus}</small>
      </div>
      <div className="case-file__actions">
        <Button icon={ArrowLeft} onClick={onOpenDetail}>این مسیر را بیشتر ببینید</Button>
        <Button kind="ink" icon={Briefcase} onClick={() => onContact(territory.cta)}>{territory.cta}</Button>
      </div>
    </aside>
  );
}

function MobilePathSheet({ territory, open, onClose, onOpenDetail, onContact }) {
  if (!open) return null;
  return (
    <div className="mobile-case-layer" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="mobile-case-sheet" role="dialog" aria-modal="true" aria-label={`جزئیات مسیر ${territory.name}`}>
        <div className="mobile-case-sheet__handle" aria-hidden="true" />
        <button className="icon-button mobile-case-sheet__close" onClick={onClose} aria-label="بستن"><X size={22} /></button>
        <CaseFile territory={territory} onOpenDetail={onOpenDetail} onContact={onContact} />
      </section>
    </div>
  );
}

function DiceStation({ value, rollKey, message, onRoll }) {
  return (
    <section className="dice-station" aria-label="تاس انتخاب مسیر">
      <div className="dice-station__well">
        <Dice3D value={value} rollKey={rollKey} />
      </div>
      <div className="dice-station__copy">
        <p>اگر انتخاب را بسپارید به شانس</p>
        <strong>{message}</strong>
        <small>۱ رهبری · ۲ ساختن · ۳ بازی · ۴ دور یک میز · ۵ با تیم · ۶ انتخاب آزاد</small>
        <Button kind="quiet" icon={DiceFive} onClick={onRoll}>تاس را بیندازید</Button>
      </div>
    </section>
  );
}

function MethodTrack() {
  return (
    <section className="method-track" aria-labelledby="method-title">
      <div className="method-track__intro">
        <span>روش من</span>
        <h2 id="method-title">از مسئله تا اثری که بتوانیم ببینیم</h2>
        <p>این امتیازشمار نیست؛ مسیری است که برای اجرای یک پروژه‌ی گیمیفیکیشن طی می‌کنم.</p>
      </div>
      <ol>
        {content.method.map((stage, index) => (
          <li key={stage}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <b>{stage}</b>
          </li>
        ))}
      </ol>
    </section>
  );
}

function ProjectShelf() {
  return (
    <section className="project-shelf" aria-labelledby="projects-title">
      <header className="project-shelf__head paper-surface">
        <div>
          <p className="eyebrow">چند بازی که از روی میز بیرون آمده‌اند</p>
          <h2 id="projects-title">ایده و جهت با من؛ ساختن با تیم</h2>
        </div>
        <p>در این پروژه‌ها ذهن اولیه، مسئله و جهت طراحی را رهبری کرده‌ام. جزئیات طراحی و اجرای هر بازی حاصل کار تیمی بوده است.</p>
        <LinkButton kind="ink" icon={ArrowLeft} href={content.meta.projectsUrl} target="_blank" rel="noreferrer">پروژه‌های بیشتر در گیک‌بازی</LinkButton>
      </header>
      <div className="project-shelf__cards">
        {content.projects.map((project) => (
          <article className="project-card paper-surface" key={project.id}>
            <img src={assetPath(project.image)} alt={project.alt} />
            <div className="project-card__body">
              <p>{project.client}</p>
              <h3>{project.title}</h3>
              <p>{project.story}</p>
              <dl>
                <div><dt>نقش من</dt><dd>{project.role}</dd></div>
                <div><dt>تیم</dt><dd>{project.team}</dd></div>
              </dl>
            </div>
          </article>
        ))}
      </div>
      <div className="studio-stamps" aria-label="مجموعه‌ها و برندهای مرتبط">
        {content.studios.map((studio) => (
          <figure key={studio.name} className="studio-stamp paper-surface">
            <img src={assetPath(studio.image)} alt={`نشان ${studio.name}`} />
            <figcaption><b>{studio.name}</b><span>{studio.kind}</span></figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function ContactLinks({ compact = false }) {
  return (
    <div className={`contact-links${compact ? " contact-links--compact" : ""}`}>
      <a href={`mailto:${content.meta.email}`}><EnvelopeSimple size={19} />ایمیل</a>
      <a href={content.meta.linkedin} target="_blank" rel="noreferrer"><LinkedinLogo size={19} />لینکدین</a>
      <a href={content.meta.instagram} target="_blank" rel="noreferrer"><InstagramLogo size={19} />اینستاگرام</a>
      <a href={content.meta.github} target="_blank" rel="noreferrer"><GithubLogo size={19} />گیت‌هاب</a>
    </div>
  );
}

function ContactSheet({ title, onClose }) {
  const formReady = Boolean(content.meta.formspreeEndpoint.trim());

  return (
    <div className="modal-layer" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="contact-sheet paper-surface" role="dialog" aria-modal="true" aria-labelledby="contact-title">
        <button className="icon-button" onClick={onClose} aria-label="بستن"><X size={22} /></button>
        <p className="eyebrow">اگر مسئله‌ای روی میز دارید</p>
        <h2 id="contact-title">{title}</h2>
        <p>کمی از مسئله بگویید؛ اگر بتوانم کمک کنم، خودم ادامه‌ی گفت‌وگو را با شما پیش می‌برم.</p>
        <ContactLinks />
        <form className="contact-form" action={formReady ? content.meta.formspreeEndpoint : undefined} method="POST" onSubmit={formReady ? undefined : (event) => event.preventDefault()}>
          <input type="hidden" name="_subject" value={`پیام تازه از پورتفولیوی امید — ${title}`} />
          <label><span>نام و نام خانوادگی</span><input name="name" autoComplete="name" required /></label>
          <label><span>ایمیل</span><input name="email" type="email" autoComplete="email" required /></label>
          <label><span>سازمان یا نقش شما <small>اختیاری</small></span><input name="organization" autoComplete="organization" /></label>
          <label className="contact-form__wide"><span>چه چیزی روی میز است؟</span><textarea name="message" rows="4" required placeholder="مسئله، پروژه یا گفت‌وگویی که در ذهن دارید…" /></label>
          <input type="hidden" name="path" value={title} />
          <Button icon={PaperPlaneTilt} type="submit" disabled={!formReady}>{formReady ? "ارسال برای امید" : "فرم هنوز فعال نشده"}</Button>
        </form>
        {!formReady ? <p className="prototype-truth"><Info size={18} />فرم آماده است. لینک Formspree را در فایل <b>content.fa.js</b> وارد کنید تا دکمه‌ی ارسال فعال شود.</p> : null}
      </section>
    </div>
  );
}

function TerritoryDetail({ territory, onClose, onContact }) {
  return (
    <div className="modal-layer" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <article className="detail-sheet paper-surface" role="dialog" aria-modal="true" aria-labelledby="detail-title" style={{ "--territory": territory.color }}>
        <button className="icon-button" onClick={onClose} aria-label="بستن"><X size={22} /></button>
        <header>
          <p className="eyebrow">مسیر {faNumber(territory.face)} / {territory.stamp}</p>
          <h2 id="detail-title">{territory.name}</h2>
          <p>{territory.summary}</p>
        </header>
        <div className="detail-sheet__grid">
          {territory.detail.map((item, index) => (
            <section key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{item}</p>
            </section>
          ))}
        </div>
        <div className="detail-sheet__proof">
          <SealCheck size={26} weight="duotone" />
          <div><b>وضعیت شواهد</b><p>{territory.evidenceStatus}</p></div>
        </div>
        <Button icon={ArrowLeft} onClick={() => onContact(territory.cta)}>{territory.cta}</Button>
      </article>
    </div>
  );
}

function BoardView({ onReview }) {
  const [activeId, setActiveId] = useState("lead");
  const [dieValue, setDieValue] = useState(1);
  const [rollKey, setRollKey] = useState(0);
  const [diceMessage, setDiceMessage] = useState("تاس روی ۱ است: از رهبری شروع کنیم.");
  const [mobileCaseOpen, setMobileCaseOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [contactTitle, setContactTitle] = useState("");
  const active = content.territories.find((item) => item.id === activeId) ?? content.territories[0];

  useEffect(() => {
    if (!mobileCaseOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => event.key === "Escape" && setMobileCaseOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [mobileCaseOpen]);

  const revealMobileCase = () => {
    if (window.matchMedia("(max-width: 900px)").matches) setMobileCaseOpen(true);
  };

  const choose = (id) => {
    const territory = content.territories.find((item) => item.id === id);
    setActiveId(id);
    setDieValue(territory.face);
    setRollKey((key) => key + 1);
    setDiceMessage(`${faNumber(territory.face)} یعنی ${territory.name}؛ انتخاب شما همین‌جاست.`);
    revealMobileCase();
  };

  const roll = () => {
    const value = Math.floor(Math.random() * 6) + 1;
    setDieValue(value);
    setRollKey((key) => key + 1);
    if (value === 6) {
      setDiceMessage("۶ آمد؛ این بار انتخاب کاملاً با شماست.");
      return;
    }
    const territory = content.territories.find((item) => item.face === value);
    setActiveId(territory.id);
    setDiceMessage(`${faNumber(value)} آمد: ${territory.name}. این مسیر را باز کردم.`);
    revealMobileCase();
  };

  return (
    <>
      <UtilityNav view="board" onReview={onReview} />
      <main id="main-content" className="board-stage">
        <div className="board-stage__intro paper-surface">
          <div>
            <p className="eyebrow">میز استراتژی / نسخه‌ی {content.meta.version}</p>
            <h1>{content.identity.headline}</h1>
          </div>
          <p>{content.identity.intro}</p>
        </div>
        <div className="tabletop-layout">
          <ProfileCard />
          <div className="play-board">
            <div className="mobile-board-prompt">
              <Compass size={24} weight="duotone" />
              <div><b>از کدام مسیر شروع کنیم؟</b><span>یک کارت را انتخاب کنید یا تاس را بیندازید.</span></div>
            </div>
            <DiceStation value={dieValue} rollKey={rollKey} message={diceMessage} onRoll={roll} />
            <BoardMap activeId={activeId} setActiveId={choose} />
          </div>
          <CaseFile territory={active} onOpenDetail={() => setDetailOpen(true)} onContact={setContactTitle} />
        </div>
        <MethodTrack />
        <ProjectShelf />
        <section className="interview-strip paper-surface">
          <img src={assetPath("omid-interview-poster.jpg")} alt="تصویر مصاحبه‌ی امید حیدری" />
          <div>
            <p className="eyebrow">اگر ترجیح می‌دهید از زبان خودم بشنوید</p>
            <h2>این مسیر را با صدای خودم تعریف کرده‌ام</h2>
            <p>مصاحبه‌ی کامل من در آپارات است؛ بدون پخش خودکار و بدون اینکه مسیرتان را قطع کند.</p>
            <LinkButton icon={Play} href={content.meta.aparat} target="_blank" rel="noreferrer">مصاحبه‌ی من را ببینید</LinkButton>
          </div>
        </section>
        <footer className="site-footer">
          <span>نسخه‌ی آزمایشی {content.meta.version}؛ ادعاهای نیازمند سند عمداً با احتیاط نوشته شده‌اند.</span>
          <a href={content.meta.creatorUrl}>طراحی تجربه و روایت: یاس دستان</a>
        </footer>
      </main>
      <MobilePathSheet
        territory={active}
        open={mobileCaseOpen}
        onClose={() => setMobileCaseOpen(false)}
        onOpenDetail={() => { setMobileCaseOpen(false); setDetailOpen(true); }}
        onContact={(title) => { setMobileCaseOpen(false); setContactTitle(title); }}
      />
      {detailOpen ? <TerritoryDetail territory={active} onClose={() => setDetailOpen(false)} onContact={(title) => { setDetailOpen(false); setContactTitle(title); }} /> : null}
      {contactTitle ? <ContactSheet title={contactTitle} onClose={() => setContactTitle("")} /> : null}
    </>
  );
}

function CVView({ onReview }) {
  return (
    <>
      <UtilityNav view="cv" onReview={onReview} />
      <main id="main-content" className="cv-view">
        <header className="cv-identity">
          <img src={assetPath("omid-portrait.png")} alt="پرتره‌ی امید حیدری" />
          <div>
            <p className="eyebrow">اگر ترجیح می‌دهید مستقیم سر اصل مطلب برویم</p>
            <h1>{content.identity.name}</h1>
            <p>{content.identity.role}</p>
            <div className="cv-identity__actions">
              <LinkButton icon={DownloadSimple} href={assetPath("Omid-Heidari-CV.pdf")} download>دانلود PDF</LinkButton>
              <Button kind="ink" icon={DiceFive} onClick={() => go("board")}>برگردیم به میز بازی</Button>
            </div>
          </div>
        </header>
        <div className="cv-layout">
          <section className="cv-main">
            <h2>مسیر کاری من</h2>
            {content.cv.experience.map((job) => (
              <article className="cv-job" key={`${job.title}-${job.org}`}>
                <div>
                  <time>{job.period}</time>
                  <small>{job.org}</small>
                </div>
                <div>
                  <h3>{job.title}</h3>
                  <ul>{job.points.map((point) => <li key={point}>{point}</li>)}</ul>
                  {job.note ? <p className="evidence-note"><Info size={17} />{job.note}</p> : null}
                </div>
              </article>
            ))}
          </section>
          <aside className="cv-side">
            <section>
              <h2>کارهایی که انجام می‌دهم</h2>
              <ul>{content.cv.capabilities.map((item) => <li key={item}><Check size={16} />{item}</li>)}</ul>
            </section>
            <section>
              <h2>تحصیلات من</h2>
              <ul>{content.cv.education.map((item) => <li key={item}>{item}</li>)}</ul>
            </section>
            <section>
              <h2>عضویت حرفه‌ای</h2>
              <p>{content.cv.membership}</p>
            </section>
            <section>
              <h2>راه‌های گفت‌وگو</h2>
              <ContactLinks compact />
              <a href={content.meta.aparat} target="_blank" rel="noreferrer"><Play size={18} />مصاحبه‌ی من در آپارات</a>
            </section>
          </aside>
        </div>
        <footer className="cv-footer">طراحی تجربه و روایت: <a href={content.meta.creatorUrl}>یاس دستان</a></footer>
      </main>
    </>
  );
}

function createSecret() {
  const values = [1, 2, 3, 4, 5, 6];
  for (let index = values.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [values[index], values[swap]] = [values[swap], values[index]];
  }
  return values.slice(0, 3);
}

function scoreGuess(secret, guess) {
  const exact = guess.filter((value, index) => value === secret[index]).length;
  const shared = guess.filter((value) => secret.includes(value)).length;
  return { exact, misplaced: shared - exact };
}

function PuzzleDie({ value, index, onChange, disabled }) {
  const change = (step) => {
    const next = value + step > 6 ? 1 : value + step < 1 ? 6 : value + step;
    onChange(index, next);
  };

  return (
    <div className="code-die">
      <button onClick={() => change(1)} disabled={disabled} aria-label={`زیادکردن تاس ${faNumber(index + 1)}`}><Plus size={19} /></button>
      <div className="code-die__well"><Dice3D value={value} compact /></div>
      <button onClick={() => change(-1)} disabled={disabled} aria-label={`کم‌کردن تاس ${faNumber(index + 1)}`}><Minus size={19} /></button>
    </div>
  );
}

function PuzzleView({ onReview }) {
  const [secret, setSecret] = useState(createSecret);
  const [guess, setGuess] = useState([1, 2, 3]);
  const [attempts, setAttempts] = useState([]);
  const [status, setStatus] = useState("playing");

  const changeDie = (index, value) => setGuess((current) => current.map((item, itemIndex) => itemIndex === index ? value : item));
  const submitGuess = () => {
    const score = scoreGuess(secret, guess);
    const nextAttempts = [...attempts, { guess: [...guess], ...score }];
    setAttempts(nextAttempts);
    if (score.exact === 3) setStatus("won");
    else if (nextAttempts.length >= 5) setStatus("lost");
  };
  const newRound = () => {
    setSecret(createSecret());
    setGuess([1, 2, 3]);
    setAttempts([]);
    setStatus("playing");
  };

  return (
    <>
      <UtilityNav view="puzzle" onReview={onReview} />
      <main id="main-content" className="puzzle-view">
        <section className="puzzle-brief paper-surface">
          <p className="eyebrow">یک بازی کوتاه از طرف من؛ کاملاً اختیاری</p>
          <h1>قفل سه‌تاس</h1>
          <p>سه عدد متفاوت از ۱ تا ۶ پشت این قفل پنهان شده‌اند. ترتیب هم مهم است. پنج بار فرصت دارید ترکیب را پیدا کنید.</p>
          <div className="puzzle-brief__rule"><BookOpen size={24} /><span><b>جای درست</b> یعنی عدد و موقعیت هر دو درست‌اند. <b>جای دیگر</b> یعنی عدد در رمز هست، اما نه در آن موقعیت.</span></div>
        </section>
        <section className="code-board" aria-label="بازی قفل سه‌تاس">
          <div className="code-board__tray">
            {guess.map((value, index) => <PuzzleDie key={index} value={value} index={index} onChange={changeDie} disabled={status !== "playing"} />)}
          </div>
          <div className="code-board__actions">
            <Button icon={Target} onClick={submitGuess} disabled={status !== "playing" || new Set(guess).size !== 3}>ثبت این ترکیب</Button>
            <small>{new Set(guess).size !== 3 ? "هر سه عدد باید متفاوت باشند." : `${faNumber(5 - attempts.length)} تلاش مانده`}</small>
          </div>
          <ol className="attempt-log" aria-label="تلاش‌های ثبت‌شده">
            {attempts.length ? attempts.map((attempt, index) => (
              <li key={`${attempt.guess.join("-")}-${index}`}>
                <span>{faNumber(index + 1)}</span>
                <b dir="ltr">{attempt.guess.map(faNumber).join(" · ")}</b>
                <em>{faNumber(attempt.exact)} جای درست</em>
                <em>{faNumber(attempt.misplaced)} جای دیگر</em>
              </li>
            )) : <li className="attempt-log__empty">اولین ترکیب را بسازید؛ نتیجه‌ی هر تلاش همین‌جا می‌ماند.</li>}
          </ol>
        </section>
        <div className="puzzle-actions">
          <Button kind="quiet" icon={DiceFive} onClick={newRound}>رمز تازه</Button>
          <Button kind="ink" icon={ArrowRight} onClick={() => go("board")}>بازگشت به میز</Button>
        </div>
        {status !== "playing" ? (
          <section className={`puzzle-result paper-surface ${status === "won" ? "is-correct" : "is-wrong"}`} role="status">
            <div className="puzzle-result__secret" dir="ltr">{secret.map((value) => <Dice3D key={value} value={value} />)}</div>
            <div>
              <h2>{status === "won" ? "قفل باز شد." : "این رمز جان سالم به در برد."}</h2>
              <p>{status === "won" ? `در ${faNumber(attempts.length)} تلاش پیدایش کردید.` : `رمز ${secret.map(faNumber).join("، ")} بود. دور بعدی رمز تازه‌ای دارد.`}</p>
              <Button kind="ink" icon={DiceFive} onClick={newRound}>یک دور دیگر</Button>
            </div>
          </section>
        ) : null}
      </main>
    </>
  );
}

function ReviewDrawer({ open, onClose }) {
  const [answers, setAnswers] = useState(() => {
    try { return JSON.parse(localStorage.getItem("omid-v03-review")) ?? {}; }
    catch { return {}; }
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    localStorage.setItem("omid-v03-review", JSON.stringify(answers));
    setSaved(true);
    const timer = window.setTimeout(() => setSaved(false), 900);
    return () => window.clearTimeout(timer);
  }, [answers]);

  const exportReview = () => {
    const blob = new Blob([JSON.stringify({ version: content.meta.version, createdAt: new Date().toISOString(), answers }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "omid-portfolio-review-v03.json";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  if (!open) return null;
  return (
    <aside className="review-drawer paper-surface" role="dialog" aria-modal="true" aria-labelledby="review-title">
      <header>
        <div><p className="eyebrow">بازبینی نمونه‌ی اولیه</p><h2 id="review-title">امید، این نسخه را دست‌کاری کن.</h2></div>
        <button className="icon-button" onClick={onClose} aria-label="بستن"><X size={22} /></button>
      </header>
      <p>جواب‌ها روی همین دستگاه ذخیره می‌شوند. در پایان فایل را خروجی بگیر و برای یاس بفرست.</p>
      <div className="review-drawer__questions">
        {content.reviewQuestions.map((question, index) => (
          <label key={question}>
            <span><b>{String(index + 1).padStart(2, "0")}</b>{question}</span>
            <textarea value={answers[index] ?? ""} onChange={(event) => setAnswers((current) => ({ ...current, [index]: event.target.value }))} rows="3" />
          </label>
        ))}
      </div>
      <div className="review-drawer__actions">
        <Button icon={Export} onClick={exportReview}>خروجی پاسخ‌ها</Button>
        <span>{saved ? "ذخیره شد" : "ذخیره‌ی خودکار روشن است"}</span>
      </div>
    </aside>
  );
}

export function App() {
  const [view, setView] = useState(routeFromHash);
  const [reviewOpen, setReviewOpen] = useState(false);

  useEffect(() => {
    const sync = () => setView(routeFromHash());
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    return () => {
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("popstate", sync);
    };
  }, []);

  return (
    <div dir="rtl" lang="fa">
      <a className="skip-link" href="#main-content">پرش به محتوای اصلی</a>
      {view === "entry" ? <Entry onReview={() => setReviewOpen(true)} /> : null}
      {view === "board" ? <BoardView onReview={() => setReviewOpen(true)} /> : null}
      {view === "cv" ? <CVView onReview={() => setReviewOpen(true)} /> : null}
      {view === "puzzle" ? <PuzzleView onReview={() => setReviewOpen(true)} /> : null}
      <ReviewDrawer open={reviewOpen} onClose={() => setReviewOpen(false)} />
    </div>
  );
}
