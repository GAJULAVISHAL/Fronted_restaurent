import { MdClose } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import apiClient from "../../apiClient";
import { useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useToast } from "../../context/ToastContext";

interface AdminQrModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AdminQrModal = ({ isOpen, onClose }: AdminQrModalProps) => {
    const [qrLink, setQrLink] = useState<string>("");
    const qrCodeRef = useRef<HTMLDivElement>(null);
    const {showToast} = useToast();
    const handleGenerate = async () => {
        const response = await apiClient.get("/api/v1/admin/QrLink");
        setQrLink(response.data.qrLink);
        return;
    };

    const handleDownload = () => {
        if (!qrLink) {
            showToast("Generate a QR code first.");
            return;
        }

        const svgElement = qrCodeRef.current?.querySelector("svg");

        if (!svgElement) {
            showToast("QR code is not ready to download.");
            return;
        }

        const clonedSvg = svgElement.cloneNode(true) as SVGElement;
        clonedSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

        const serializedSvg = new XMLSerializer().serializeToString(clonedSvg);
        const blob = new Blob([serializedSvg], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = "restaurant-qr-code.svg";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    if (!isOpen) {
        return null;
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-end justify-start pl-20 pb-12 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.94, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: 8 }}
                    transition={{ type: "spring", stiffness: 260, damping: 22 }}
                    onClick={(event) => event.stopPropagation()}
                    className="relative mb-8 w-full max-w-sm rounded-lg bg-stone-100 p-4 shadow-2xl"
                >
                    <button
                        type="button"
                        onClick={onClose}
                        className="absolute right-4 top-4 rounded-full p-1 text-neutral-600 transition hover:bg-neutral-300 hover:text-neutral-900"
                        aria-label="Close QR popup"
                    >
                        <MdClose size={18} />
                    </button>

                    <div className="flex flex-col items-center gap-6 pt-8">
                        <div ref={qrCodeRef} className="flex h-48 w-48 items-center justify-center rounded-lg border border-black/10 bg-neutral-950 text-center text-white shadow-inner shadow-black/40">
                            <div className="rounded-lg border border-white/10 bg-neutral-950 p-2 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
                                {qrLink ? (
                                    <QRCodeSVG
                                        value={qrLink}
                                        size={200}
                                        bgColor={"#ffffff"}
                                        fgColor={"#000000"}
                                        level={"H"} // High error correction is REQUIRED if you are adding a logo
                                        imageSettings={{
                                            src: "https://your-app.com/default-icon.png",
                                            x: undefined,
                                            y: undefined,
                                            height: 42,
                                            width: 42,
                                            excavate: true, // Creates a clean white border around the logo
                                        }}
                                    />
                                ) : (
                                    <span className="text-sm text-white/80">Your QR code will appear here</span>
                                )}

                            </div>
                        </div>

                        <div className="flex w-full gap-3">
                            <button
                                type="button"
                                onClick={handleDownload}
                                className="flex-1 rounded-lg bg-neutral-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800"
                            >
                                Download
                            </button>
                            <button
                                type="button"
                                onClick={handleGenerate}
                                className="flex-1 rounded-lg bg-neutral-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800"
                            >
                                Generate
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default AdminQrModal;