"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { fetchScraperData } from "@/app/services/scraper";
import { Flower } from "@/app/types/Flower.type";

type ScraperDataContextType = {
  scraperData: Flower[];
  error: string | null;
  loader: boolean;
};

const ScraperDataContext = createContext<ScraperDataContextType | undefined>(undefined);

export const ScraperDataProvider = ({ children }: { children: ReactNode }) => {
  const [scraperData, setScraperData] = useState<Flower[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loader, setLoader] = useState(true); // Set loader to true initially

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchScraperData();
        setScraperData(data);
      } catch (error) {
        setError("Failed to fetch data");
      } finally {
        setLoader(false); // Loader turns off after fetching
      }
    };

    getData();
  }, []);

  return (
    <ScraperDataContext.Provider value={{ scraperData, error, loader }}>
      {children}
    </ScraperDataContext.Provider>
  );
};

export const useScraperData = () => {
  const context = useContext(ScraperDataContext);
  if (context === undefined) {
    throw new Error("useScraperData must be used within a ScraperDataProvider");
  }
  return context;
};
