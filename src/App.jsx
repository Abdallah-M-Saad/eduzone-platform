import { useState } from "react";
import {
  GraduationCap,
  BookOpen,
  PlayCircle,
  Users,
  ArrowLeft,
  ArrowRight,
  Trophy,
  Clock,
  CheckCircle,
  X,
  Mail,
  Lock,
  User,
  FileText,
  HelpCircle,
} from "lucide-react";
import "./App.css";

function App() {
  const [selectedStage, setSelectedStage] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null); // { stage, subject }
  const [authModal, setAuthModal] = useState(null);
  const [userName, setUserName] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
const [showAllCourses, setShowAllCourses] = useState(false);
  // حالات الاختبار القصير جوه الدرس
  const [answers, setAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const stages = [
    {
      icon: "🎒",
      title: "المرحلة الابتدائية",
      description: "ابدأ رحلتك التعليمية من الأساس.",
      grades: "الصف الأول إلى السادس",
      subjects: ["اللغة العربية", "الرياضيات", "اللغة الإنجليزية", "العلوم", "الدراسات الاجتماعية"],
    },
    {
      icon: "📚",
      title: "المرحلة الإعدادية",
      description: "طور مهاراتك واستعد للمستقبل.",
      grades: "الصف الأول إلى الثالث",
      subjects: ["اللغة العربية", "الجبر والهندسة", "اللغة الإنجليزية", "العلوم", "الدراسات الاجتماعية", "الحاسب الآلي"],
    },
    {
      icon: "🎓",
      title: "المرحلة الثانوية",
      description: "استعد للجامعة وحقق طموحاتك.",
      grades: "الصف الأول إلى الثالث",
      subjects: ["اللغة العربية", "الفيزياء", "الكيمياء", "الأحياء", "الرياضيات البحتة والتطبيقية", "اللغة الإنجليزية"],
    },
  ];

  const sampleQuiz = [
    {
      id: 1,
      question: "ما هو الهدف الأساسي من تنظيم وقت المذاكرة يومياً؟",
      options: ["زيادة التركيز وتقليل التوتر", "السهر لفترات طويلة", "حفظ الدروس بدون فهم"],
      correct: 0,
    },
    {
      id: 2,
      question: "أفضل طريقة لتثبيت المعلومات بعد مشاهدة الشرح هي:",
      options: ["إغلاق الكتاب فوراً", "حل تدريبات واختبارات تطبيقية", "قراءة العناوين فقط"],
      correct: 1,
    },
  ];

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    const displayName = formData.name.trim() || formData.email.split("@")[0] || "طالب EduZone";
    setUserName(displayName);
    setAuthModal(null);
    setFormData({ name: "", email: "", password: "" });
  };

  const openCourse = (stageTitle, subjectName) => {
    setSelectedStage(null);
    setSelectedCourse({ stage: stageTitle, subject: subjectName });
    setAnswers({});
    setQuizSubmitted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const calculateScore = () => {
    let score = 0;
    sampleQuiz.forEach((q) => {
      if (answers[q.id] === q.correct) score += 1;
    });
    return score;
  };

  return (
    <div className="app">
      {/* شريط التنقل العلوي */}
      <nav className="navbar">
        <a
          href="#"
          className="logo"
          onClick={(e) => {
            e.preventDefault();
            setSelectedCourse(null);
          }}
        >
          <span className="logo-icon">
            <GraduationCap size={27} />
          </span>
          Edu<span>Zone</span>
        </a>

        <div className="nav-links">
          <a href="#home" onClick={() => setSelectedCourse(null)}>الرئيسية</a>
          <a href="#stages" onClick={() => setSelectedCourse(null)}>المراحل التعليمية</a>
          <a href="#features" onClick={() => setSelectedCourse(null)}>مميزاتنا</a>
          <a href="#about">عن المنصة</a>
        </div>

        <div className="nav-actions">
          {userName ? (
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontWeight: "700", color: "#4c1d95" }}>أهلاً، {userName} 👋</span>
              <button
                className="login-btn"
                onClick={() => setUserName("")}
                style={{ padding: "0.4rem 0.9rem", fontSize: "0.85rem" }}
              >
                خروج
              </button>
            </div>
          ) : (
            <>
              <button className="login-btn" onClick={() => setAuthModal("login")}>
                تسجيل الدخول
              </button>
              <button className="register-btn" onClick={() => setAuthModal("register")}>
                إنشاء حساب
              </button>
            </>
          )}
        </div>
      </nav>

      {/* التبديل بين صفحة الدرس والصفحة الرئيسية */}
      {selectedCourse ? (
        <main style={{ padding: "3rem 5%", maxWidth: "1000px", margin: "0 auto", width: "100%" }}>
          <button
            onClick={() => setSelectedCourse(null)}
            className="login-btn"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "2rem" }}
          >
            <ArrowRight size={18} />
            العودة للرئيسية
          </button>

          <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "20px", boxShadow: "0 10px 30px rgba(109,40,217,0.06)", marginBottom: "2rem" }}>
            <span className="hero-badge" style={{ marginBottom: "0.8rem" }}>
              {selectedCourse.stage}
            </span>
            <h1 style={{ fontSize: "2.2rem", color: "#1e1b4b", marginBottom: "0.5rem" }}>
              مادة {selectedCourse.subject}
            </h1>
            <p style={{ color: "#6b7280", marginBottom: "2rem" }}>
              الدرس الأول: مقدمة شاملة وأساسيات المادة
            </p>

            {/* شاشة الفيديو */}
            <div
              style={{
                backgroundColor: "#1e1b4b",
                borderRadius: "16px",
                height: "360px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                gap: "1rem",
                marginBottom: "2rem",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  backgroundColor: "#6d28d9",
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: "0 0 30px rgba(109, 40, 217, 0.8)",
                }}
              >
                <PlayCircle size={38} />
              </div>
              <h3 style={{ fontSize: "1.2rem" }}>فيديو الشرح التفاعلي - {selectedCourse.subject}</h3>
              <span style={{ color: "#c4b5fd", fontSize: "0.9rem" }}>مدة الدرس: 25 دقيقة • جودة عالية HD</span>
            </div>

            {/* ملخص الدرس */}
            <div style={{ backgroundColor: "#faf8ff", padding: "1.5rem", borderRadius: "14px", border: "1px solid #ede9fe" }}>
              <h3 style={{ display: "flex", alignItems: "center", gap: "8px", color: "#4c1d95", marginBottom: "0.8rem" }}>
                <FileText size={20} />
                أهم نقاط الدرس
              </h3>
              <ul style={{ paddingRight: "1.5rem", color: "#4b5563", lineHeight: "1.9" }}>
                <li>فهم المفاهيم الأساسية وتطبيقاتها العملية في الحياة اليومية.</li>
                <li>الربط بين القوانين والقواعد وحل المسائل المتدرجة من السهل للأصعب.</li>
                <li>مراجعة أهم الأسئلة المتوقعة في الامتحانات على هذا الجزء.</li>
              </ul>
            </div>
          </div>

          {/* قسم الاختبار القصير */}
          <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "20px", boxShadow: "0 10px 30px rgba(109,40,217,0.06)" }}>
            <h2 style={{ display: "flex", alignItems: "center", gap: "10px", color: "#1e1b4b", marginBottom: "1.5rem" }}>
              <HelpCircle size={26} color="#6d28d9" />
              اختبر فهمك للدرس
            </h2>

            <div style={{ display: "grid", gap: "1.5rem" }}>
              {sampleQuiz.map((q, qIdx) => (
                <div key={q.id} style={{ padding: "1.2rem", borderRadius: "12px", border: "1px solid #f1f5f9" }}>
                  <p style={{ fontWeight: "700", marginBottom: "1rem", color: "#1e1b4b" }}>
                    {qIdx + 1}. {q.question}
                  </p>
                  <div style={{ display: "grid", gap: "0.6rem" }}>
                    {q.options.map((opt, optIdx) => {
                      const isSelected = answers[q.id] === optIdx;
                      let bg = "#f8fafc";
                      let border = "#e2e8f0";

                      if (quizSubmitted) {
                        if (optIdx === q.correct) {
                          bg = "#d1fae5";
                          border = "#10b981";
                        } else if (isSelected && optIdx !== q.correct) {
                          bg = "#fee2e2";
                          border = "#ef4444";
                        }
                      } else if (isSelected) {
                        bg = "#ede9fe";
                        border = "#6d28d9";
                      }

                      return (
                        <div
                          key={optIdx}
                          onClick={() => !quizSubmitted && setAnswers({ ...answers, [q.id]: optIdx })}
                          style={{
                            padding: "0.8rem 1rem",
                            borderRadius: "10px",
                            backgroundColor: bg,
                            border: `2px solid ${border}`,
                            cursor: quizSubmitted ? "default" : "pointer",
                            fontWeight: isSelected ? "600" : "400",
                          }}
                        >
                          {opt}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {!quizSubmitted ? (
              <button
                className="register-btn"
                style={{ marginTop: "1.5rem", padding: "0.9rem 2rem", fontSize: "1rem" }}
                onClick={() => setQuizSubmitted(true)}
                disabled={Object.keys(answers).length < sampleQuiz.length}
              >
                تسليم الإجابات وعرض النتيجة
              </button>
            ) : (
              <div
                style={{
                  marginTop: "1.5rem",
                  padding: "1.2rem",
                  borderRadius: "12px",
                  backgroundColor: "#f5f3ff",
                  border: "1px solid #ddd6fe",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <strong style={{ color: "#4c1d95", fontSize: "1.1rem" }}>
                  نتيجتك: {calculateScore()} من {sampleQuiz.length} 🎉
                </strong>
                <button
                  className="login-btn"
                  onClick={() => {
                    setAnswers({});
                    setQuizSubmitted(false);
                  }}
                >
                  إعادة الاختبار
                </button>
              </div>
            )}
          </div>
        </main>
      ) : (
        /* الصفحة الرئيسية */
        <main>
          <section className="hero" id="home">
            
            <div className="hero-content">
              <span className="hero-badge">
                <GraduationCap size={17} />
                مستقبلك يبدأ من هنا
              </span>

              <h1>
                تعلم بذكاء،
                <br />
                واصنع <span>مستقبلك</span>
              </h1>

              <p>
                منصة EduZone التعليمية تجمع لك كل ما تحتاجه
                من دروس وامتحانات ومتابعة مستواك الدراسي
                في مكان واحد.
              </p>

              <div className="hero-buttons">
                <a href="#stages" className="primary-btn" style={{ textDecoration: "none" }}>
                  ابدأ التعلم الآن
                  <ArrowLeft size={19} />
                </a>

                <a href="#features" className="secondary-btn" style={{ textDecoration: "none" }}>
                  <PlayCircle size={20} />
                  اكتشف المنصة
                </a>
              </div>

              <div className="hero-rating">
                <div className="rating-icon">
                  <Users size={22} />
                </div>

                <div>
                  <strong>تعلم بلا حدود</strong>
                  <p>رحلتك التعليمية في مكان واحد</p>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-card">
                <div className="hero-card-top">
                  <div className="hero-card-icon">
                    <BookOpen size={27} />
                  </div>
                  <span className="online-status">منصة تعليمية</span>
                </div>

                <h3>رحلتك نحو النجاح</h3>
                <p>كل يوم فرصة جديدة للتعلم والتطور.</p>

                <div className="progress-info">
                  <span>ابدأ رحلتك التعليمية</span>
                  <strong>100%</strong>
                </div>

                <div className="progress-bar">
                  <div></div>
                </div>

                <div className="hero-card-bottom">
                  <span><CheckCircle size={17} /> دروس منظمة</span>
                  <span><Trophy size={17} /> أهداف أكبر</span>
                </div>
              </div>
            </div>
          </section>

          <section className="stats">
            <div className="stat-item">
              <BookOpen />
              <div>
                <h3>كل المواد</h3>
                <p>محتوى تعليمي متنوع</p>
              </div>
            </div>

            <div className="stat-item">
              <Users />
              <div>
                <h3>كل المراحل</h3>
                <p>من الابتدائي للثانوي</p>
              </div>
            </div>

            <div className="stat-item">
              <Clock />
              <div>
                <h3>في أي وقت</h3>
                <p>تعلم حسب وقتك</p>
              </div>
            </div>
          </section>

          <section className="stages-section" id="stages">
            <div className="section-heading">
              <span>المراحل التعليمية</span>
              <h2>اختار مرحلتك وابدأ التعلم</h2>
              <p>محتوى تعليمي مناسب لكل مرحلة دراسية.</p>
            </div>

            <div className="stages-grid">
              {stages.map((stage, index) => (
                <div className="stage-card" key={index}>
                  <div className="stage-icon">{stage.icon}</div>
                  <h3>{stage.title}</h3>
                  <p>{stage.description}</p>
                  <span className="grade-label">{stage.grades}</span>

                  <button
                    className="stage-btn"
                    onClick={() => setSelectedStage(stage)}
                  >
                    استكشف المرحلة
                    <ArrowLeft size={17} />
                  </button>
                </div>
              ))}
            </div>
          </section>
{/* قسم الكورسات المختارة */}
        <section className="courses-section">
          <div className="courses-header-flex">
            <h2>كورسات مختارة</h2>
            <span 
              onClick={() => setShowAllCourses(!showAllCourses)} 
              className="view-all-btn"
              style={{ cursor: "pointer" }}
            >
              {showAllCourses ? "إخفاء الباقي ∧" : "عرض الكل ∨"}
            </span>
          </div>

          <div className="courses-grid">
            {[
              { title: "خطة الإنقاذ (هندسة فراغية - استاتيكا - تفاضل وتكامل)", teacher: "السيّد الشامي", stage: "الثانوية العامة", price: "299 جنيه", subject: "رياضيات" },
              { title: "خطة الإنقاذ ( الترم الأول )", teacher: "إبراهيم فريد", stage: "الصف الثاني الثانوي", price: "249 جنيه", subject: "إنجليزي" },
              { title: "خطة الإنقاذ ( نص المنهج - الترم الأول كامل)", teacher: "وائل عيسى", stage: "الصف الأول الثانوي", price: "224 جنيه", subject: "لغة عربية" },
              { title: "باقة الترم الأول أولي بكالوريا - كل المواد", teacher: "فريق أبواب", stage: "الصف الأول بكالوريا", price: "1,700 جنيه", subject: "باقة كاملة" },
              { title: "أساسيات الفيزياء الحديثة والميكانيكا", teacher: "د. أحمد زهران", stage: "الثانوية العامة", price: "350 جنيه", subject: "فيزياء" },
              { title: "الكيمياء العضوية وباب التحليل الكيميائي", teacher: "مستر محمود عزمي", stage: "الثانوية العامة", price: "320 جنيه", subject: "كيمياء" },
              { title: "شرح مبسط لقواعد الجبر والهندسة الإحداثية", teacher: "أستاذ سعيد عبدالحميد", stage: "المرحلة الإعدادية", price: "180 جنيه", subject: "رياضيات" },
              { title: "العلوم العامة وتجارب المعمل التفاعلية", teacher: "مس هبة حسين", stage: "المرحلة الابتدائية", price: "150 جنيه", subject: "علوم" },
              { title: "اللغة الإنجليزية - التحدث بطلاقة والجرامر", teacher: "مستر جون وليم", stage: "جميع المراحل", price: "210 جنيه", subject: "إنجليزي" },
              { title: "الأحياء العامة (الدعامة والحركة في الهياكل الحية)", teacher: "د. سامح الهواري", stage: "الثانوية العامة", price: "280 جنيه", subject: "أحياء" },
              { title: "دراسات اجتماعية وتاريخ الوطن العربي", teacher: "أستاذة فاطمة الزهراء", stage: "المرحلة الإعدادية", price: "160 جنيه", subject: "دراسات" },
              { title: "تأسيس اللغة العربية والنحو من الصفر", teacher: "الشيخ عماد الدين", stage: "المرحلة الابتدائية", price: "130 جنيه", subject: "عربي" },
            ]
              .slice(0, showAllCourses ? 12 : 6)
              .map((course, idx) => (
                <div className="course-card" key={idx}>
                  <div className="course-img-box">
                    <span>📚</span>
                    <span className="course-badge-tag">{course.subject}</span>
                  </div>
                  <div className="course-card-body">
                    <h3>{course.title}</h3>
                    <p className="course-info-text">{course.teacher}</p>
                    <p className="course-info-text">{course.stage}</p>

                    <div className="course-footer-flex">
                      <span className="course-price">{course.price}</span>
                      <button className="subscribe-card-btn" onClick={() => setSelectedCourse({ stage: course.stage, subject: course.title })}>
                        اشترك
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </section>
          

          <section className="features-section" id="features">
            <div className="section-heading">
              <span>لماذا EduZone؟</span>
              <h2>كل أدوات نجاحك في مكان واحد</h2>
            </div>

            <div className="features-grid">
              <div className="feature-card">
                <BookOpen />
                <h3>دروس تعليمية</h3>
                <p>شروحات منظمة لجميع المواد الدراسية.</p>
              </div>

              <div className="feature-card">
                <PlayCircle />
                <h3>فيديوهات تعليمية</h3>
                <p>تعلم من خلال محتوى مرئي سهل ومبسط.</p>
              </div>

              <div className="feature-card">
                <Trophy />
                <h3>اختبارات إلكترونية</h3>
                <p>اختبر معلوماتك وتابع تطور مستواك.</p>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* نافذة المراحل التعليمية */}
      {selectedStage && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(30, 27, 75, 0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2000,
            padding: "1rem",
          }}
          onClick={() => setSelectedStage(null)}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "2rem",
              borderRadius: "20px",
              maxWidth: "500px",
              width: "100%",
              position: "relative",
              boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedStage(null)}
              style={{
                position: "absolute",
                top: "1.5rem",
                left: "1.5rem",
                background: "#f3e8ff",
                border: "none",
                borderRadius: "50%",
                width: "35px",
                height: "35px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#6d28d9",
              }}
            >
              <X size={20} />
            </button>

            <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
              {selectedStage.icon}
            </div>
            <h2 style={{ color: "#1e1b4b", marginBottom: "0.5rem" }}>
              {selectedStage.title}
            </h2>
            <p style={{ color: "#6b7280", marginBottom: "1.5rem" }}>
              {selectedStage.grades} - اختر المادة الدراسية للبدء:
            </p>

            <div style={{ display: "grid", gap: "0.8rem" }}>
              {selectedStage.subjects.map((subject, idx) => (
                <div
                  key={idx}
                  onClick={() => openCourse(selectedStage.title, subject)}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0.9rem 1.2rem",
                    backgroundColor: "#faf8ff",
                    border: "1px solid #ede9fe",
                    borderRadius: "12px",
                    fontWeight: "600",
                    color: "#4c1d95",
                    cursor: "pointer",
                  }}
                >
                  <span>{subject}</span>
                  <ArrowLeft size={18} color="#6d28d9" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* نافذة تسجيل الدخول وإنشاء حساب */}
      {authModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(30, 27, 75, 0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2000,
            padding: "1rem",
          }}
          onClick={() => setAuthModal(null)}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "2.2rem",
              borderRadius: "20px",
              maxWidth: "420px",
              width: "100%",
              position: "relative",
              boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setAuthModal(null)}
              style={{
                position: "absolute",
                top: "1.5rem",
                left: "1.5rem",
                background: "#f3e8ff",
                border: "none",
                borderRadius: "50%",
                width: "35px",
                height: "35px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#6d28d9",
              }}
            >
              <X size={20} />
            </button>

            <h2 style={{ color: "#1e1b4b", marginBottom: "0.4rem" }}>
              {authModal === "login" ? "تسجيل الدخول" : "إنشاء حساب جديد"}
            </h2>
            <p style={{ color: "#6b7280", marginBottom: "1.5rem", fontSize: "0.95rem" }}>
              {authModal === "login"
                ? "أهلاً بعودتك إلى منصة EduZone"
                : "ابدأ رحلتك التعليمية معنا الآن"}
            </p>

            <form onSubmit={handleAuthSubmit} style={{ display: "grid", gap: "1rem" }}>
              {authModal === "register" && (
                <div style={{ position: "relative" }}>
                  <User size={18} color="#6d28d9" style={{ position: "absolute", right: "12px", top: "14px" }} />
                  <input
                    type="text"
                    required
                    placeholder="الاسم بالكامل"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "0.8rem 2.5rem 0.8rem 1rem",
                      borderRadius: "10px",
                      border: "1px solid #ddd6fe",
                      outline: "none",
                    }}
                  />
                </div>
              )}

              <div style={{ position: "relative" }}>
                <Mail size={18} color="#6d28d9" style={{ position: "absolute", right: "12px", top: "14px" }} />
                <input
                  type="email"
                  required
                  placeholder="البريد الإلكتروني"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.8rem 2.5rem 0.8rem 1rem",
                    borderRadius: "10px",
                    border: "1px solid #ddd6fe",
                    outline: "none",
                  }}
                />
              </div>

              <div style={{ position: "relative" }}>
                <Lock size={18} color="#6d28d9" style={{ position: "absolute", right: "12px", top: "14px" }} />
                <input
                  type="password"
                  required
                  placeholder="كلمة المرور"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.8rem 2.5rem 0.8rem 1rem",
                    borderRadius: "10px",
                    border: "1px solid #ddd6fe",
                    outline: "none",
                  }}
                />
              </div>

              <button type="submit" className="register-btn" style={{ padding: "0.9rem", fontSize: "1rem", marginTop: "0.5rem" }}>
                {authModal === "login" ? "دخول للمنصة" : "تسجيل الحساب"}
              </button>
            </form>

            <p style={{ textAlign: "center", marginTop: "1.2rem", fontSize: "0.9rem", color: "#6b7280" }}>
              {authModal === "login" ? "معندكش حساب؟ " : "عندك حساب بالفعل؟ "}
              <span
                onClick={() => setAuthModal(authModal === "login" ? "register" : "login")}
                style={{ color: "#6d28d9", fontWeight: "700", cursor: "pointer" }}
              >
                {authModal === "login" ? "أنشئ حساباً" : "سجّل دخولك"}
              </span>
            </p>
          </div>
        </div>
      )}

     {/* الفوتر الاحترافي الجديد */}
      <footer className="footer-container" id="about">
        <div className="footer-top">
          
          {/* العمود الأول: الشعار والسوشيال */}
          <div className="footer-col">
            <a href="#" className="logo" style={{ color: "white", marginBottom: "1rem", display: "inline-flex" }}>
              <span className="logo-icon" style={{ background: "#6d28d9", color: "white" }}>
                <GraduationCap size={27} />
              </span>
              Edu<span>Zone</span>
            </a>
            <p style={{ color: "#9ca3af", fontSize: "0.95rem", lineHeight: "1.6" }}>
              منصتك التعليمية الأولى نحو مستقبل أفضل وشروحات تفاعلية لكل المراحل.
            </p>
            <div className="footer-socials">
              <div className="social-icon-box">📘</div>
              <div className="social-icon-box">📸</div>
              <div className="social-icon-box">🐦</div>
              <div className="social-icon-box">▶️</div>
              <div className="social-icon-box">💼</div>
            </div>
          </div>

          {/* العمود الثاني: الأحكام وسياسات الاستخدام */}
          <div className="footer-col">
            <h4>الأحكام</h4>
            <ul>
              <li><a href="#">شروط الاستخدام</a></li>
              <li><a href="#">اتفاقية الخصوصية</a></li>
              <li><a href="#">سياسة الأمان</a></li>
            </ul>
          </div>

          {/* العمود الثالث: المزيد عن المنصة */}
          <div className="footer-col">
            <h4>المزيد</h4>
            <ul>
              <li><a href="#">عن EduZone</a></li>
              <li><a href="#">فريق العمل</a></li>
              <li><a href="#">الوظائف</a></li>
              <li><a href="#">تواصل معنا</a></li>
            </ul>
          </div>

          {/* العمود الرابع: الدولة والدعم */}
          <div className="footer-col">
            <h4>البلد</h4>
            <div style={{ 
              backgroundColor: "rgba(255,255,255,0.08)", 
              padding: "0.7rem 1rem", 
              borderRadius: "10px", 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center",
              cursor: "pointer",
              border: "1px solid rgba(255,255,255,0.1)"
            }}>
              <span>🇪🇬 مصر</span>
              <span>▼</span>
            </div>
          </div>

        </div>

        {/* الجزء السفلي: حقوق النشر وطرق الدفع */}
        <div className="footer-bottom">
          <p style={{ color: "#6b7280", fontSize: "0.85rem" }}>
            © 2026 EduZone. All Rights Reserved.
          </p>

          <div className="payment-methods">
            <span className="payment-badge" style={{ color: "#eb001b" }}>mastercard</span>
            <span className="payment-badge" style={{ color: "#1434cb" }}>VISA</span>
            <span className="payment-badge" style={{ color: "#e60000" }}>vodafone</span>
            <span className="payment-badge" style={{ color: "#ff6600" }}>orange</span>
            <span className="payment-badge" style={{ color: "#660099" }}>we</span>
            <span className="payment-badge" style={{ color: "#00b09b" }}>valu*</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;