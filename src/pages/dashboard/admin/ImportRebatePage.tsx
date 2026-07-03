import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

import { AdminAPI } from "@/api";
import { getLocalizedPath } from "@/helper/pathHelper";
import { HEADER_REBATE_IMPORT, type StatusImport } from "@/utils/adminUnit";
import type { ErrorImport, ImportRebateData } from "@/types/importRebate.type";

import TitleDashboard from "@/components/dashboard/common/TitleDashboard";
import Stepper from "@/components/dashboard/admin/importRebatePage/Stepper";
import ParagraphDashboard from "@/components/dashboard/common/ParagraphDashboard";
import WrapperDashboardComponent from "@/components/dashboard/common/WrapperDashboardComponent";
import ReviewImportRebate from "@/components/dashboard/admin/importRebatePage/ReviewImportRebate";
import PreviewImportRebate from "@/components/dashboard/admin/importRebatePage/PreviewImportRebate";
import SectionImportRebate from "@/components/dashboard/admin/importRebatePage/SectionImportRebate";

import Button from "@/components/ui/Button";

import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ImportRebatePage = () => {
  const { i18n } = useTranslation();
  const [step, setStep] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<ImportRebateData[]>([]);
  const [errorImport, setErrorImport] = useState<ErrorImport>({
    message: "",
    count: 0,
    detail: []
  });
  const [statusImport, setStatusImport] = useState<StatusImport>(null);
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setStatusImport(null);

    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setErrorImport((prev) => ({
          ...prev,
          message: "File terlalu besar! Maksimal 10mb."
        }));
        return;
      }
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result;

        const workbook = XLSX.read(data, {
          type: "array",
        });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
          defval: ""
        });

        if (jsonData.length === 0) {
          setErrorImport((prev) => ({
          ...prev,
            message: "Tidak ditemukan data dalam file excel."
          }));
          return;
        }

        // transform header
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const transformedData = jsonData.map((item: any) => {
          const newItem: Record<string, string> = {};

          Object.keys(item).forEach((key) => {
            const trimHeader = key.trim();
            const mappedHeader = HEADER_REBATE_IMPORT[trimHeader] || trimHeader;

            let value = item[key];
            if (mappedHeader === "created_at") {
              value = value
                ? XLSX.SSF.format("yyyy-mm-dd", value)
                : ""
            }
            newItem[mappedHeader] = value;
          });

          return newItem;
        });

        const detectedHeaders = Object.keys(transformedData[0] || {});
        const missingHeaders = Object.values(HEADER_REBATE_IMPORT).filter((item) => !detectedHeaders.includes(item));
        if (missingHeaders.length > 0) {
          setErrorImport((prev) => ({
          ...prev,
            message: "File Excel tidak valid. Pastikan format kolom sesuai."
          }));
          return;
        }

        setFile(file);
        setData(transformedData as ImportRebateData[]);
      } catch (error) {
        console.error(error);
        setErrorImport((prev) => ({
        ...prev,
          message: "Gagal membaca file excel."
        }));
      }
    };

    reader.readAsArrayBuffer(file);
  }, []);

  const sendImportDataRebates = async () => {
    if (!file) return;
    setIsLoading(true);

    const { error, detailErrors } = await AdminAPI.importExcelRebates({ file });
    if (error && detailErrors) {
      setStatusImport("ERROR");
      setErrorImport((prev) => ({
        ...prev,
        count: detailErrors.length,
        detail: detailErrors
      }));
    } else {
      setStatusImport("SUCCESS");
    }

    setIsLoading(false);
  }

  const handleNextStep = async () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      await sendImportDataRebates();
      setStep(3);
    } else if (step === 3 && statusImport === "SUCCESS") {
      navigate(getLocalizedPath("dashboard/rebates", i18n.language));
    }
  }
  const handlePrevStep = () => {
    setStep((prev) => {
      if (prev <= 1) return prev;
      return prev - 1;
    });
    setErrorImport((prev) => ({
      ...prev,
      message: "",
      count: 0,
      detail: []
    }));
    setStatusImport(null);
  }

  const canNextStepFromOne = file || data.length !== 0;
  return (
    <WrapperDashboardComponent>
      <section className="flex flex-col justify-between min-h-[calc(100vh-120px)] 3xl:min-h-[calc(100vh-170px)] h-full">
        <div>
          <div className="space-y-2.5">
            <TitleDashboard>
              Import Rebate
            </TitleDashboard>
            <ParagraphDashboard maxW="w-full">
              Seluruh data yang berhasil diimpor akan tersimpan ke dalam database dengan status pending. Tinjau dan verifikasi data rebate untuk mencegah kesalahan data dan memastikan distribusi saldo ke pengguna berjalan dengan akurat.
            </ParagraphDashboard>
          </div>
          <Stepper step={step} />

          <div className="mt-6">
            {step === 1 && 
              <SectionImportRebate 
                  onDrop={onDrop} 
                  errorImport={errorImport.message}
                  onDeleteFile={() => {
                    setFile(null);
                    setData([])
                  }}
                  file={file}
              />
            }
            {step === 2 && file &&
              <PreviewImportRebate
                file={file}
                data={data}
              />
            }
            {step === 3 && file &&
              <ReviewImportRebate 
                file={file} 
                statusImport={statusImport} 
                totalData={data.length} 
                countError={errorImport.count} 
                detailError={errorImport.detail} 
              />
            }
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          {(step > 1 && statusImport !== "SUCCESS") &&
            <Button
              type="button"
              onClick={handlePrevStep}
              variant="outline"
              icon={<IoIosArrowRoundBack className="text-4xl" />}
              iconPosition="left"
              disabled={isLoading}
              size="md"
              className="px-0! 3xl:px-0! pr-6! 3xl:pr-8! pl-3! 3xl:pl-5! py-2! 3xl:py-3! rounded-lg!"
            >
              {step === 2 && "Back"}
              {step === 3 && statusImport === "ERROR" && "Tinjau Ulang"}
            </Button>
          }
          {statusImport !== "ERROR" &&
            <Button
              type="button"
              onClick={handleNextStep}
              variant="primary-light"
              disabled={!canNextStepFromOne || isLoading}
              icon={<IoIosArrowRoundForward className="text-4xl" />}
              loading={isLoading}
              iconPosition="right"
              size="md"
              className="ml-auto px-0! 3xl:px-0! pl-6! 3xl:pl-8! pr-3! 3xl:pr-5! py-2! 3xl:py-3! rounded-lg!"
            >
              {step === 1 && "Next"}
              {step === 2 && "Import"}
              {step === 3 && "Verifikasi Data"}
            </Button>
          }
        </div>
      </section>
    </WrapperDashboardComponent>
  )
}

export default ImportRebatePage;
