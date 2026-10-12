import { useState } from "react";
import CourseDetailView from "./components/CourseDetailView";
import Dashboard from "./components/Dashboard";
import DailyActivityView from "./components/DailyActivityView";
import DownloadsView from "./components/DownloadsView";
import LessonContentView from "./components/LessonContentView";
import PracticeHub from "./components/PracticeHub";
import PracticeSession from "./components/PracticeSession";
import type { Tab } from "./components/BottomNav";
import { courses, initialProgress, practiceDone, type CourseId } from "./data/courses";

type Screen = Tab | "courseDetail" | "lessonContent" | "practiceSession";
export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [downloaded, setDownloaded] = useState<CourseId[]>(["programacion"]);
  const [progress, setProgress] = useState(initialProgress);
  const [practiceProgress, setPracticeProgress] = useState(practiceDone);
  const [todayDone, setTodayDone] = useState<Record<CourseId, number>>({ programacion: 2, diseno: 1, hojas: 0 });
  const [selectedCourse, setSelectedCourse] = useState<CourseId>("programacion");
  const [selectedLesson, setSelectedLesson] = useState(0);
  const activeCourse = courses.find((course) => course.id === selectedCourse)!;
  const navigate = (next: Tab) => { setScreen(next); document.querySelector(".app-shell")?.scrollTo({ top: 0, behavior: "smooth" }); };
  const openCourse = (id: CourseId) => { setSelectedCourse(id); setScreen("courseDetail"); };
  const openLesson = (index: number) => { setSelectedLesson(index); setScreen("lessonContent"); };
  const toggleDownload = (id: CourseId) => setDownloaded((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  const completeLesson = () => { const isNewCompletion = selectedLesson >= progress[selectedCourse]; setProgress((current) => ({ ...current, [selectedCourse]: Math.max(current[selectedCourse], selectedLesson + 1) })); if (isNewCompletion) setTodayDone((current) => ({ ...current, [selectedCourse]: current[selectedCourse] + 1 })); setScreen("courseDetail"); };
  const practiceFinished = () => { setPracticeProgress((current) => ({ ...current, [selectedCourse]: Math.min(activeCourse.practiceTotal, current[selectedCourse] + 1) })); setScreen("practice"); };
  return <div className="app-backdrop"><div className="app-shell">
    {screen === "home" && <Dashboard downloaded={downloaded} progress={progress} openCourse={openCourse} openPractice={() => setScreen("practice")} openDownloads={() => navigate("downloads")} onNavigate={navigate}/>}
    {screen === "courseDetail" && <CourseDetailView course={activeCourse} progress={progress[selectedCourse]} downloaded={downloaded.includes(selectedCourse)} onBack={() => navigate("home")} onLesson={openLesson} onDownload={() => toggleDownload(selectedCourse)}/>}
    {screen === "lessonContent" && <LessonContentView course={activeCourse} index={selectedLesson} onBack={() => setScreen("courseDetail")} onPractice={() => setScreen("practiceSession")} onComplete={completeLesson}/>}
    {screen === "practice" && <PracticeHub doneByCourse={practiceProgress} onStart={(id) => { setSelectedCourse(id); setScreen("practiceSession"); }} onNavigate={navigate}/>}
    {screen === "practiceSession" && <PracticeSession course={activeCourse} onBack={() => setScreen("practice")} onFinish={practiceFinished}/>}
    {screen === "lessons" && <DailyActivityView downloaded={courses.filter((course) => downloaded.includes(course.id) || progress[course.id] > 0).map((course) => course.id)} progress={progress} todayDone={todayDone} onCourse={openCourse} onNavigate={navigate}/>}
    {screen === "downloads" && <DownloadsView downloaded={downloaded} onToggle={toggleDownload} onCourse={openCourse} onNavigate={navigate}/>}
  </div></div>;
}
