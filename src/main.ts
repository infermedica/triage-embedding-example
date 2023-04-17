import "./styles.css";
import setupTriageFrame from "./components/TriageFrame";

const triageUrl = import.meta.env.VITE_TRIAGE_URL;

setupTriageFrame({ triageUrl }, "#app");
