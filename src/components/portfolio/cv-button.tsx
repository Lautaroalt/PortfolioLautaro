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
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/12 px-5 py-3 text-sm font-semibold text-emerald-50 transition hover:border-emerald-300/55 hover:bg-emerald-400/18 ${className}`.trim()}
    >
      <Download className="h-4 w-4" />
      {label}
    </a>
  );
}
