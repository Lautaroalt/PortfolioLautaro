import { Download } from "lucide-react";

type CvButtonProps = {
  className?: string;
  label?: string;
};

export function CvButton({
  className = "",
  label = "Descargar CV",
}: CvButtonProps) {
  return (
    <a
      href="/AltamiranoLautaroCV.pdf"
      download
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/14 px-5 py-3 text-sm font-semibold text-emerald-50 shadow-[0_14px_32px_rgba(16,185,129,0.12)] transition duration-300 hover:border-emerald-300/70 hover:bg-emerald-400/22 hover:shadow-[0_18px_42px_rgba(16,185,129,0.2)] ${className}`.trim()}
    >
      <Download className="h-4 w-4" />
      {label}
    </a>
  );
}
