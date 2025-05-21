'use client'
import {createContext,useContext,useState,useEffect} from 'react'

type Language = 'en' | 'id'

interface LanguageContextProps {
    language : Language;
    toggleLanguage : ()=>void
}
const languageContext = createContext<LanguageContextProps | undefined>(undefined)

export const LanguageProvider :React.FC<{children:React.ReactNode}>=({children})=>{
const [language,setLanguage]= useState<Language>('id')

useEffect(() => {
 const savedLanguage = localStorage.getItem("appLanguage") as Language| null
 if (savedLanguage) {
    setLanguage(savedLanguage)
 }
}, [])

const toggleLanguage = ()=>{
const newLanguage:Language = language === 'id' ? 'en' :'id'
setLanguage(newLanguage)
localStorage.setItem("appLanguage",newLanguage)
}

return(
    <languageContext.Provider value={{language,toggleLanguage}}>
        {children}
    </languageContext.Provider>
)
}

export const useLanguage =():LanguageContextProps=>{
const context = useContext(languageContext)
if (!context) {
    throw new Error ("eror")
}
return context
}