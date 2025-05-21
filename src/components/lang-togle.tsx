'use client'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import Image from "next/image"
import { useLanguage } from "@/context/LanguageContext"
const LangTogle = () => {
    const{language,toggleLanguage} = useLanguage()
    function handleChangeLang(value:string){
if (value !== language) {
    toggleLanguage()
}
    }
    console.log({language});
    
  return (
    <Select onValueChange={handleChangeLang} value={language}>
    <SelectTrigger className="w-[120px] text-white border-none">
      <SelectValue placeholder="Bahasa" />
    </SelectTrigger>
    <SelectContent className="bg-white/5 text-white">
      <SelectItem value="id">ID <Image alt="id" width={20} className="w-6" height={20} src={'/indo-flag.webp'}/></SelectItem>
      <SelectItem value="en">ENG  <Image alt="en" width={20} className="w-6" height={20} src={'/uk-flag.png'}/></SelectItem>
     
    </SelectContent>
  </Select>
  )
}

export default LangTogle