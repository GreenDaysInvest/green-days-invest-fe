"use client";

import React from "react";
import { motion } from "framer-motion";
import VerticalGallery from "../VerticalGallery/VericalGallery";
import Button from "../Button/Button";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { useAuth } from "@/app/context/AuthContext";
import { useApp } from "@/app/context/AppContext";

const Header: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { setIsRegisterModalOpen, setActiveTab } = useApp();
  const t = useTranslations("Header");

  const handleRequestTreatment = () => {
    if (!user) {
      setIsRegisterModalOpen(true);
    } else {
      router.push("/dashboard");
      if (!user.isAdmin) {
        setActiveTab("questionaries");
      } else {
        setActiveTab("questionariesList");
      }
    }
  };

  return (
    <div className="bg-darkGreen">
      <div className="lg:container mx-auto py-10 lg:py-0 px-0 lg:px-4">
        <div className="overflow-hidden flex flex-col lg:flex-row items-center">
          <div className="container px-4 sm:px-0 md:px-8 lg:px-0 w-full lg:w-1/2 mb-20 lg:mb-0 text-left xl:py-56">
            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl text-tertiary font-medium leading-tight"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {t("title")}
            </motion.h1>

            <motion.p
              className="text-white mt-12 mb-14"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {t("subtitle")}
            </motion.p>

            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Button
                  label={t("firstButton")}
                  variant="white"
                  onClick={handleRequestTreatment}
                />
              </motion.div>

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <Button
                  label={t("secondButton")}
                  variant="tertiary"
                  onClick={() => router.push("/cannabis")}
                />
              </motion.div>
            </div>
          </div>

          <motion.div
            className="w-full lg:container lg:w-1/2 flex justify-center lg:justify-end lg:my-[-100px] h-[320] md:h-[360px] lg:h-auto"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <VerticalGallery />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Header;
