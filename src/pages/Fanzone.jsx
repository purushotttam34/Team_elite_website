import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  Heart,
  ArrowUpRight,
  Trophy,
  Gamepad2,
  Vote,
  Clock3,
  Medal,
  CheckCircle2,
  RotateCcw,
  Star,
  Zap,
} from "lucide-react";

const STORAGE = {
  nickname: "elite-fanzone-nickname",
  points: "elite-fanzone-points",
  votes: "elite-fanzone-votes",
  quizDone: "elite-fanzone-quiz-done",
  activity: "elite-fanzone-activity",
};

const questions = [
  {
    question: "Which game does this fan website celebrate?",
    options: ["PUBG Mobile", "Free Fire", "Valorant", "Call of Duty"],
    answer: "Free Fire",
    explanation: "The website celebrates the Team Elite × Orangutan Free Fire legacy.",
  },
  {
    question: "What is the main purpose of this website?",
    options: [
      "Official tournament registration",
      "Selling game accounts",
      "Celebrating the team's legacy",
      "Providing game downloads",
    ],
    answer: "Celebrating the team's legacy",
    explanation: "This is an unofficial fan tribute.",
  },
  {
    question: "Which activity belongs in the Fan Zone?",
    options: ["Fan polls", "Quiz games", "Fan rankings", "All of these"],
    answer: "All of these",
    explanation: "The Fan Zone brings community activities together.",
  },
 
  {
    question: "What do points mean in this prototype?",
    options: [
      "Official tournament ranking",
      "Cash rewards monthly",
      "Fan activity points",
      "Professional player statistics",
    ],
    answer: "Cash rewards monthly",
    explanation: "These points are for fun, not official rankings or cash rewards.",
  },
];

const polls = [
  {
    id: "favorite-era",
    question: "Which era would you most like to explore?",
    options: [
      "Team Elite",
      "Orangutan era 2021",
      "S8UL era",
      "Orangutan era 2026"
    ],
  },
  
];

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : JSON.parse(value);
  } catch {
    return fallback;
  }
}

function saveStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // The page can still run if browser storage is unavailable.
  }
}

function todayKey() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

export default function FanZone() {
  const [nickname, setNickname] = useState(
    () => readStorage(STORAGE.nickname, "")
  );
  const [nicknameInput, setNicknameInput] = useState(
    () => readStorage(STORAGE.nickname, "")
  );
  const [points, setPoints] = useState(
    () => readStorage(STORAGE.points, 0)
  );
  const [votes, setVotes] = useState(
    () => readStorage(STORAGE.votes, {})
  );
  const [quizDone, setQuizDone] = useState(
    () => readStorage(STORAGE.quizDone, false)
  );

  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answerChecked, setAnswerChecked] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const [activeSeconds, setActiveSeconds] = useState(0);
  const [activity, setActivity] = useState(() => {
    const saved = readStorage(STORAGE.activity, null);

    return saved?.date === todayKey()
      ? saved
      : { date: todayKey(), seconds: 0, rewardedMinutes: 0 };
  });

  // Save local demo progress.
  useEffect(() => {
    saveStorage(STORAGE.nickname, nickname);
  }, [nickname]);

  useEffect(() => {
    saveStorage(STORAGE.points, points);
  }, [points]);

  useEffect(() => {
    saveStorage(STORAGE.votes, votes);
  }, [votes]);

  useEffect(() => {
    saveStorage(STORAGE.quizDone, quizDone);
  }, [quizDone]);

  // Demo activity rewards: 1 point per 5 active minutes,
  // capped at 6 points per day. Not secure against cheating.
  useEffect(() => {
    let lastActivity = Date.now();
    let lastTick = Date.now();

    const markActivity = () => {
      lastActivity = Date.now();
    };

    const events = ["mousemove", "keydown", "pointerdown", "scroll"];

    events.forEach((event) =>
      window.addEventListener(event, markActivity, { passive: true })
    );

    const timer = window.setInterval(() => {
      const now = Date.now();
      const elapsed = Math.min((now - lastTick) / 1000, 2);
      lastTick = now;

      const active =
        document.visibilityState === "visible" &&
        now - lastActivity < 60000;

      if (!active) return;

      setActiveSeconds((previous) => previous + elapsed);

      setActivity((previous) => {
        const current =
          previous.date === todayKey()
            ? previous
            : { date: todayKey(), seconds: 0, rewardedMinutes: 0 };

        const seconds = current.seconds + elapsed;
        const totalEarnedMinutes = Math.floor(seconds / 300);
        const newRewards = Math.min(
          Math.max(totalEarnedMinutes - current.rewardedMinutes, 0),
          Math.max(6 - current.rewardedMinutes, 0)
        );

        if (newRewards > 0) {
          setPoints((previousPoints) => previousPoints + newRewards);
        }

        const updated = {
          date: todayKey(),
          seconds,
          rewardedMinutes: current.rewardedMinutes + newRewards,
        };

        saveStorage(STORAGE.activity, updated);
        return updated;
      });
    }, 1000);

    return () => {
      window.clearInterval(timer);
      events.forEach((event) =>
        window.removeEventListener(event, markActivity)
      );
    };
  }, []);

  const currentQuestion = questions[questionIndex];

  function joinFanZone(event) {
    event.preventDefault();
    const cleanName = nicknameInput.trim().slice(0, 18);

    if (!cleanName) return;

    setNickname(cleanName);
    setNicknameInput(cleanName);
  }

  function castVote(poll, option) {
    if (!nickname || votes[poll.id]) return;

    const updated = {
      ...votes,
      [poll.id]: { option },
    };

    setVotes(updated);
    setPoints((previous) => previous + 5);
  }

  function checkAnswer() {
    if (!nickname || !selectedAnswer || answerChecked) return;

    setAnswerChecked(true);

    if (selectedAnswer === currentQuestion.answer) {
      setCorrectCount((previous) => previous + 1);
      setPoints((previous) => previous + 10);
    }
  }

  function nextQuestion() {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex((previous) => previous + 1);
      setSelectedAnswer("");
      setAnswerChecked(false);
      return;
    }

    setQuizFinished(true);

    if (!quizDone) {
      setPoints((previous) => previous + 5);
      setQuizDone(true);
    }
  }

  function restartQuiz() {
    setQuestionIndex(0);
    setSelectedAnswer("");
    setAnswerChecked(false);
    setCorrectCount(0);
    setQuizFinished(false);
  }

  function getVoteCount(pollId, option) {
    return Object.values(votes).filter(
      (vote) => vote.option === option && polls.some(
        (poll) => poll.id === pollId && vote === votes[poll.id]
      )
    ).length;
  }

  function getPollCount(poll) {
    return poll.options.reduce(
      (total, option) => total + (votes[poll.id]?.option === option ? 1 : 0),
      0
    );
  }

  return (
    <section className="section fz-page">
      <p className="section-tag">07 / THE COMMUNITY</p>

      <h2>
        FAN <span>ZONE.</span>
      </h2>

      <p className="page-description">
        Play. Vote. Compete. Make your mark on the legacy.
        A community space for Team Elite × Orangutan supporters.
      </p>

      <div className="fz-hero-links">
        <a href="#fz-games" className="primary-btn">
          PLAY GAMES <Gamepad2 size={17} />
        </a>
        <a href="#fz-polls" className="primary-btn">
          VOTE NOW <Vote size={17} />
        </a>
        <a href="#fz-leaderboard" className="primary-btn">
          TOP FANS <Trophy size={17} />
        </a>
      </div>

      <div className="fz-profile">
        <div className="fz-profile-icon">
          <Heart size={26} />
        </div>

        <div className="fz-profile-info">
          <strong>{nickname ? `WELCOME, ${nickname.toUpperCase()}` : "JOIN THE FAN RANKS"}</strong>
          <span>Use a nickname; don't enter your full name or private details.</span>
        </div>

        <form className="fz-nickname-form" onSubmit={joinFanZone}>
          <input
            value={nicknameInput}
            onChange={(event) => setNicknameInput(event.target.value)}
            placeholder="Fan nickname"
            maxLength={18}
            aria-label="Fan nickname"
            required
          />
          <button className="fz-button" type="submit">
            {nickname ? "UPDATE" : "JOIN"}
          </button>
        </form>
      </div>

      <div className="fz-stat-grid">
        <article className="fz-stat">
          <Zap size={22} />
          <span>YOUR POINTS</span>
          <strong>{points}</strong>
        </article>
        <article className="fz-stat">
          <Clock3 size={22} />
          <span>ACTIVE TIME</span>
          <strong>{Math.floor(activeSeconds / 60)}m</strong>
        </article>
        <article className="fz-stat">
          <CheckCircle2 size={22} />
          <span>QUIZ STATUS</span>
          <strong>{quizDone ? "DONE" : "READY"}</strong>
        </article>
      </div>

      {/* FAN GAMES */}
      <div className="fz-content-section" id="fz-games">
        <div className="fz-heading">
          <div>
            <p className="section-tag">01 / TEST YOUR KNOWLEDGE</p>
            <h2>FAN <span>GAMES.</span></h2>
          </div>
          <Gamepad2 size={30} />
        </div>

        <article className="fz-card fz-quiz">
          {!nickname ? (
            <p className="fz-message">Choose a nickname above to start playing.</p>
          ) : quizFinished ? (
            <div className="fz-quiz-result">
              <Trophy size={42} />
              <p className="section-tag">QUIZ COMPLETE</p>
              <h3>{correctCount} / {questions.length} CORRECT</h3>
              <p>
                {correctCount === questions.length
                  ? "Perfect score! Great work."
                  : "Nice try! Replay the quiz to practise."}
              </p>
              {quizDone && (
                <p className="fz-message">
                  The quiz completion bonus can only be claimed once in this browser.
                </p>
              )}
              <button className="fz-button" onClick={restartQuiz}>
                <RotateCcw size={16} /> PLAY AGAIN
              </button>
            </div>
          ) : (
            <>
              <div className="fz-quiz-topline">
                <span>TEAM ELITE TRIVIA</span>
                <span>QUESTION {questionIndex + 1}/{questions.length}</span>
              </div>

              <div className="fz-progress">
                <span style={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }} />
              </div>

              <h3>{currentQuestion.question}</h3>

              <div className="fz-answer-list">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option}
                    type="button"
                    disabled={answerChecked || !nickname}
                    className={[
                      "fz-answer",
                      selectedAnswer === option ? "is-selected" : "",
                      answerChecked && option === currentQuestion.answer ? "is-correct" : "",
                      answerChecked &&
                      option === selectedAnswer &&
                      option !== currentQuestion.answer ? "is-wrong" : "",
                    ].join(" ")}
                    onClick={() => setSelectedAnswer(option)}
                  >
                    <span>{option}</span>
                    {answerChecked && option === currentQuestion.answer && (
                      <CheckCircle2 size={18} />
                    )}
                  </button>
                ))}
              </div>

              {answerChecked && (
                <p className="fz-explanation">
                  {selectedAnswer === currentQuestion.answer
                    ? "Correct! +10 points. "
                    : `Correct answer: ${currentQuestion.answer}. `}
                  {currentQuestion.explanation}
                </p>
              )}

              {!answerChecked ? (
                <button
                  className="fz-button"
                  onClick={checkAnswer}
                  disabled={!selectedAnswer || !nickname}
                >
                  LOCK ANSWER
                </button>
              ) : (
                <button className="fz-button" onClick={nextQuestion}>
                  {questionIndex === questions.length - 1 ? "FINISH QUIZ" : "NEXT QUESTION"}
                </button>
              )}
            </>
          )}
        </article>

        <p className="fz-note">
          This is a starter quiz. We can add verified player and tournament-history questions later.
        </p>
      </div>

      {/* FAN POLLS */}
      <div className="fz-content-section" id="fz-polls">
        <div className="fz-heading">
          <div>
            <p className="section-tag">02 / HAVE YOUR SAY</p>
            <h2>FAN <span>POLLS.</span></h2>
          </div>
          <Vote size={30} />
        </div>

        <div className="fz-poll-grid">
          {polls.map((poll) => {
            const myVote = votes[poll.id];

            return (
              <article className="fz-card fz-poll-card" key={poll.id}>
                <div className="fz-poll-icon"><Vote size={22} /></div>
                <h3>{poll.question}</h3>

                <div className="fz-poll-options">
                  {poll.options.map((option) => {
                    const count = getVoteCount(poll.id, option);
                    const total = getPollCount(poll);
                    const percentage = total ? Math.round((count / total) * 100) : 0;

                    return (
                      <button
                        type="button"
                        key={option}
                        className={[
                          "fz-poll-option",
                          myVote?.option === option ? "is-voted" : "",
                        ].join(" ")}
                        disabled={!nickname || Boolean(myVote)}
                        onClick={() => castVote(poll, option)}
                      >
                        <span>{option}</span>
                        {myVote && (
                          <span className="fz-vote-result">
                            {percentage}% ({count})
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="fz-poll-footer">
                  <span>{getPollCount(poll)} vote(s) on this browser</span>
                  {myVote ? (
                    <span className="fz-voted"><CheckCircle2 size={15} /> VOTED</span>
                  ) : (
                    <span>+5 points for voting</span>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {!nickname && (
          <p className="fz-message">Choose a nickname before voting.</p>
        )}
      </div>

      {/* TOP FANS */}
      <div className="fz-content-section" id="fz-leaderboard">
        <div className="fz-heading">
          <div>
            <p className="section-tag">03 / COMMUNITY RANKINGS</p>
            <h2>TOP <span>FANS.</span></h2>
          </div>
          <Trophy size={30} />
        </div>

        <article className="fz-card">
          <div className="fz-leaderboard-heading">
            <div>
              <h3>FAN LEADERBOARD</h3>
              <p>Your local demo profile</p>
            </div>
            <Medal size={28} />
          </div>

          {nickname ? (
            <div className="fz-fan-row">
              <span className="fz-rank">#1</span>
              <div className="fz-fan-avatar"><Star size={19} /></div>
              <div className="fz-fan-name">
                <strong>{nickname}</strong>
                <span>Fan Zone member</span>
              </div>
              <strong className="fz-fan-points">{points} PTS</strong>
            </div>
          ) : (
            <p className="fz-message">Join the Fan Zone to see your local points.</p>
          )}

          <div className="fz-leaderboard-note">
            <Zap size={17} />
            <p>
              This demo does not show other visitors. A shared leaderboard requires
              a backend database and server-verified points.
            </p>
          </div>
        </article>
      </div>

      <div className="fz-disclaimer">
        <Heart size={17} />
        <p>
          This is an unofficial fan-made community feature. Fan points have no cash
          value and are not official esports rankings.
        </p>
      </div>

      <Link to="/legacy" className="primary-btn fz-legacy-link">
        EXPLORE THE LEGACY <ArrowUpRight size={17} />
      </Link>
    </section>
  );
}
