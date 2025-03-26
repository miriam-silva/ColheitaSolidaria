
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCWlh0m_CxDx9sGoARkmM68EIdsrRC8Fog",
  authDomain: "colheitasolidaria-teste2.firebaseapp.com",
  projectId: "colheitasolidaria-teste2",
  storageBucket: "colheitasolidaria-teste2.firebasestorage.app",
  messagingSenderId: "138444161193",
  appId: "1:138444161193:web:94a9b4ba53111821c269b8",
  measurementId: "G-6PJZXMZMVS"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);