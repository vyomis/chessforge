import {
    ArrowRight,
    BookOpen,
    CheckCircle2,
    GraduationCap,
    Swords,
  } from "lucide-react";
  import { lessons, openings } from "../data/chessData";
  
  export default function Learn() {
    return (
      <div className="page">
        <section className="hero">
          <div>
            <span className="eyebrow">CHESS SCHOOL</span>
            <h1>Learn chess.</h1>
            <p>Structured lessons designed around real improvement.</p>
          </div>
        </section>
  
        <section className="learning-hero panel">
          <div>
            <div className="learning-icon">
              <GraduationCap />
            </div>
  
            <span className="eyebrow">YOUR TRAINING PATH</span>
  
            <h2>From first move to complete player.</h2>
  
            <p>
              Learn the fundamentals, develop tactical vision and
              build the strategic understanding needed to play stronger
              chess.
            </p>
          </div>
  
          <div className="learning-visual">♞</div>
        </section>
  
        <div className="section-heading">
          <div>
            <span className="eyebrow">COURSES</span>
            <h2>Learning paths</h2>
          </div>
        </div>
  
        <section className="lesson-grid">
          {lessons.map((lesson) => (
            <article className="lesson-card" key={lesson.id}>
              <div className="lesson-icon">{lesson.icon}</div>
  
              <span className="lesson-level">{lesson.level}</span>
  
              <h3>{lesson.title}</h3>
  
              <p>{lesson.description}</p>
  
              <div className="lesson-footer">
                <span>
                  <BookOpen size={14} />
                  {lesson.lessons} lessons
                </span>
  
                <button>
                  Start
                  <ArrowRight size={15} />
                </button>
              </div>
            </article>
          ))}
        </section>
  
        <div className="section-heading">
          <div>
            <span className="eyebrow">OPENINGS</span>
            <h2>Explore opening theory</h2>
          </div>
        </div>
  
        <section className="opening-grid">
          {openings.map((opening) => (
            <article className="opening-card" key={opening.name}>
              <div className="opening-piece">♟</div>
              <div>
                <span>{opening.style}</span>
                <h3>{opening.name}</h3>
                <p>{opening.moves}</p>
              </div>
              <CheckCircle2 size={17} />
            </article>
          ))}
        </section>
      </div>
    );
  }