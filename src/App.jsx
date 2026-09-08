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
  Export,
  FileText,
  Hammer,
  Info,
  LinkedinLogo,
  Play,
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
      <span className="territory__stamp">{territory.stamp}</span>
      <Icon size={30} weight="duotone" aria-hidden="true" />
      <strong>{territory.name}</strong>
      <span>{territory.summary}</span>
      <b>وجه {territory.face}</b>
    </button>
  );
}

function BoardMap({ activeId, setActiveId }) {
  return (
    <section className="board-map" aria-label="قلمروهای تجربه‌ی امید">
      <div className="board-map__hub">
        <Compass size={30} weight="duotone" aria-hidden="true" />
        <p>دوست دارید از کدام مسیر با هم شروع کنیم؟</p>
        <small>مسیرتان را انتخاب کنید</small>
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
          <small>انتخاب شما</small>
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
        <span><b>چیزی که فعلاً می‌توانید بررسی کنید</b>{territory.proof}</span>
        <small>{territory.evidenceStatus}</small>
      </div>
      <div className="case-file__actions">
        <Button icon={ArrowLeft} onClick={onOpenDetail}>این مسیر را بیشتر ببینید</Button>
        <Button kind="ink" icon={Briefcase} onClick={() => onContact(territory.cta)}>{territory.cta}</Button>
      </div>
    </aside>
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

function ContactSheet({ title, onClose }) {
  return (
    <div className="modal-layer" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="contact-sheet paper-surface" role="dialog" aria-modal="true" aria-labelledby="contact-title">
        <button className="icon-button" onClick={onClose} aria-label="بستن"><X size={22} /></button>
        <p className="eyebrow">شروع یک گفت‌وگوی واقعی</p>
        <h2 id="contact-title">{title}</h2>
        <p>اگر این مسیر به کارتان نزدیک است، خوشحال می‌شوم گفت‌وگو کنیم. فعلاً لینکدین مطمئن‌ترین راه عمومی تماس با من است.</p>
        <div className="contact-sheet__actions">
          <LinkButton icon={LinkedinLogo} href={content.meta.linkedin} target="_blank" rel="noreferrer">پیام در لینکدین</LinkButton>
          <LinkButton kind="ink" icon={Play} href={content.meta.aparat} target="_blank" rel="noreferrer">اول روایت من را ببینید</LinkButton>
        </div>
        <p className="prototype-truth"><Info size={18} />ایمیل یا فرم رزرو مستقیم را بعد از تأیید نهایی به اینجا اضافه می‌کنیم.</p>
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
          <p className="eyebrow">{territory.stamp} / وجه {territory.face}</p>
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
  const [dieHistory, setDieHistory] = useState([1, 4, 6]);
  const [rollKey, setRollKey] = useState(0);
  const [detailOpen, setDetailOpen] = useState(false);
  const [contactTitle, setContactTitle] = useState("");
  const active = content.territories.find((item) => item.id === activeId) ?? content.territories[0];

  const choose = (id) => {
    const territory = content.territories.find((item) => item.id === id);
    setActiveId(id);
    setDieValue(territory.face);
    setDieHistory((current) => [territory.face, ...current].slice(0, 3));
    setRollKey((key) => key + 1);
  };

  const roll = () => {
    const candidates = content.territories.filter((item) => item.id !== activeId);
    const territory = candidates[Math.floor(Math.random() * candidates.length)];
    choose(territory.id);
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
            <BoardMap activeId={activeId} setActiveId={choose} />
            <div className="dice-station">
              <div className="dice-station__well" aria-label="سه انتخاب اخیر روی تاس‌ها">
                {dieHistory.map((value, index) => (
                  <Dice3D key={`${value}-${index}-${rollKey}`} value={value} rollKey={index === 0 ? rollKey : 0} />
                ))}
              </div>
              <div>
                <p>اگر میان مسیرها مردد مانده‌اید</p>
                <strong>پیشنهاد تاس: {active.name}</strong>
                <Button kind="quiet" icon={DiceFive} onClick={roll}>بگذارید تاس پیشنهاد بدهد</Button>
              </div>
            </div>
          </div>
          <CaseFile territory={active} onOpenDetail={() => setDetailOpen(true)} onContact={setContactTitle} />
        </div>
        <MethodTrack />
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
              <a href={content.meta.linkedin} target="_blank" rel="noreferrer"><LinkedinLogo size={18} />لینکدین من</a>
              <a href={content.meta.aparat} target="_blank" rel="noreferrer"><Play size={18} />مصاحبه‌ی من در آپارات</a>
            </section>
          </aside>
        </div>
        <footer className="cv-footer">طراحی تجربه و روایت: <a href={content.meta.creatorUrl}>یاس دستان</a></footer>
      </main>
    </>
  );
}

const puzzleOptions = [
  { id: "a", invalid: false, faces: [3, 2, 1, 5, 6, 4] },
  { id: "b", invalid: true, faces: [3, 2, 1, 6, 5, 4] },
  { id: "c", invalid: false, faces: [2, 3, 1, 4, 6, 5] },
];

function DiceNet({ option, selected, onSelect }) {
  return (
    <button className={`dice-net${selected ? " is-selected" : ""}`} onClick={() => onSelect(option)} aria-pressed={selected}>
      <span className="dice-net__label">گزینه‌ی {option.id.toUpperCase()}</span>
      <span className="dice-net__grid" aria-label={`گسترده‌ی تاس گزینه‌ی ${option.id}`}>
        <i className="face face--top">{option.faces[0]}</i>
        <i className="face face--left">{option.faces[1]}</i>
        <i className="face face--center">{option.faces[2]}</i>
        <i className="face face--right">{option.faces[3]}</i>
        <i className="face face--far">{option.faces[4]}</i>
        <i className="face face--bottom">{option.faces[5]}</i>
      </span>
      <b>این گسترده غیرممکن است</b>
    </button>
  );
}

function PuzzleView({ onReview }) {
  const [choice, setChoice] = useState(null);
  const [answered, setAnswered] = useState(false);
  const correct = choice?.invalid;
  return (
    <>
      <UtilityNav view="puzzle" onReview={onReview} />
      <main id="main-content" className="puzzle-view">
        <section className="puzzle-brief paper-surface">
          <p className="eyebrow">یک چالش کوتاه از طرف من؛ کاملاً اختیاری</p>
          <h1>کدام تاس نمی‌تواند واقعی باشد؟</h1>
          <p>در تاس استاندارد، وجه‌های مقابل مجموعاً ۷ می‌شوند. یکی از این سه گسترده این قانون را می‌شکند. پیدایش می‌کنید؟</p>
          <div className="puzzle-brief__rule"><BookOpen size={24} /><span>۱ مقابل ۶ · ۲ مقابل ۵ · ۳ مقابل ۴</span></div>
        </section>
        <section className="puzzle-options" aria-label="گزینه‌های معمای تاس">
          {puzzleOptions.map((option) => <DiceNet key={option.id} option={option} selected={choice?.id === option.id} onSelect={(next) => { setChoice(next); setAnswered(false); }} />)}
        </section>
        <div className="puzzle-actions">
          <Button icon={Target} disabled={!choice} onClick={() => setAnswered(true)}>بررسی پاسخ</Button>
          <Button kind="ink" icon={ArrowRight} onClick={() => go("board")}>بازگشت به میز</Button>
        </div>
        {answered ? (
          <section className={`puzzle-result paper-surface ${correct ? "is-correct" : "is-wrong"}`} role="status">
            <div className="puzzle-result__die"><Dice3D value={correct ? 6 : 3} compact /></div>
            <div>
              <h2>{correct ? "درست بود." : "این یکی در واقع ممکن است."}</h2>
              <p>{correct ? "در گزینه‌ی B، دو وجهی که باید مقابل هم باشند در جایگاه کناری قرار گرفته‌اند." : "یک بار دیگر نسبت وجه‌های مقابل را با جای آن‌ها روی گسترده مقایسه کن."}</p>
              <small>این معما آزمون استخدامی نیست؛ فقط یکی از مکث‌های بازی‌گونه‌ای است که دوست دارم با شما قسمت کنم.</small>
            </div>
          </section>
        ) : null}
      </main>
    </>
  );
}

function ReviewDrawer({ open, onClose }) {
  const [answers, setAnswers] = useState(() => {
    try { return JSON.parse(localStorage.getItem("omid-v02-review")) ?? {}; }
    catch { return {}; }
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    localStorage.setItem("omid-v02-review", JSON.stringify(answers));
    setSaved(true);
    const timer = window.setTimeout(() => setSaved(false), 900);
    return () => window.clearTimeout(timer);
  }, [answers]);

  const exportReview = () => {
    const blob = new Blob([JSON.stringify({ version: content.meta.version, createdAt: new Date().toISOString(), answers }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "omid-portfolio-review-v02.json";
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
