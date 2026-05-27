'use client';

import { useState, useCallback, useEffect } from 'react';
import { Villa, VillaType } from '@/types/villa';
import InteractiveMasterPlan from './InteractiveMasterPlan';
import VillasGrid from './VillasGrid';
import { ScrollFadeIn } from '@/components/motion/ScrollMotion';

interface VillasExperienceProps {
  villas: Villa[];
  labels: {
    filters: {
      northFacade: string;
      southFacade: string;
      corner: string;
    };
    card: {
      villa: string;
      currency: string;
      registerInterest: string;
    };
    status: {
      available: string;
      sold: string;
      reserved: string;
      booked: string;
    }
  };
}

export default function VillasExperience({ villas, labels }: VillasExperienceProps) {
  const [activeTab, setActiveTab] = useState<VillaType>('corner'); // Default to corner as per map
  const [selectedVillaId, setSelectedVillaId] = useState<string | null>(null);

  const handleSelectVilla = useCallback((villaId: string, type: VillaType) => {
    setActiveTab(type);
    setSelectedVillaId(villaId);
    
    // We need to wait for the DOM to update if the tab changed, so we use a small timeout
    // before scrolling to the card.
    setTimeout(() => {
      const element = document.getElementById(`villa-card-${villaId}`);
      if (element) {
        // Offset for the sticky tabs header
        const y = element.getBoundingClientRect().top + window.scrollY - 200;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 150);
  }, []);

  // Clear selection if the user manually changes the tab
  const handleTabChange = useCallback((tab: VillaType) => {
    setActiveTab(tab);
    setSelectedVillaId(null);
  }, []);

  // Clear highlight after a few seconds
  useEffect(() => {
    if (selectedVillaId) {
      const timer = setTimeout(() => {
        setSelectedVillaId(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [selectedVillaId]);

  return (
    <div className="w-full flex flex-col items-center">
      <ScrollFadeIn className="w-full">
        <InteractiveMasterPlan 
          villas={villas}
          selectedVillaId={selectedVillaId}
          onSelectVilla={handleSelectVilla}
          labels={labels}
        />
      </ScrollFadeIn>

      <ScrollFadeIn className="w-full">
        <VillasGrid 
          villas={villas} 
          labels={labels}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          selectedVillaId={selectedVillaId}
        />
      </ScrollFadeIn>
    </div>
  );
}
