'use client'
import React from 'react'
import { useLanguage } from '@/context/LanguageContext'

const HeaderDest = () => {
  const { language } = useLanguage()

  const isIndo = language === 'id'

  return (
    <>
      <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
        {isIndo ? 'Jelajahi Destinasi Palembang' : 'Explore Palembang Destinations'}
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto text-center">
        {isIndo
          ? 'Temukan kekayaan budaya dan destinasi bersejarah Palembang, ibu kota kuno dari kerajaan Sriwijaya.'
          : 'Discover the rich cultural heritage and historic destinations of Palembang, the ancient capital of the Sriwijaya kingdom.'}
      </p>
    </>
  )
}

export default HeaderDest
