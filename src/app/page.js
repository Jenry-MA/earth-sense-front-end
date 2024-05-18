"use client"
import { Header } from "./Layout/Header";
import { Main } from "./Views/Main";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import {es} from "date-fns/locale/es"

export default function Home() {
  return (
    <main className="min-h-screen">
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
        <Header/>
        <Main/>
      </LocalizationProvider>
    </main>
  );
}
