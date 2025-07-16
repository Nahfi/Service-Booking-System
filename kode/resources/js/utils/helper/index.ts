import toast from "react-hot-toast";

export const generateUUID = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};

// Download File
export const downloadFile = (url) => {
    const URL = url;
    if (typeof window !== "undefined") {
        window.location.href = URL;
    }
};

// Export CSV 
export const exportCSVExel = (
    export_type,
    headers,
    rows,
    file_name = "users"
) => {
    if (export_type === "exel") {
        const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, keyToValue(file_name));
        XLSX.writeFile(wb, `${file_name}.xlsx`);
    } else {
        const csvContent = [headers, ...rows]
            .map((e) => e.join(","))
            .join("\n");
        const blob = new Blob([csvContent], {
            type: "text/csv;charset=utf-8;",
        });
        saveAs(blob, `${file_name}.csv`);
    }
};

// Export PDF
export const exportToPDF = (
    headers,
    rows,
    columnWidths,
    file_name = "users"
) => {
    const doc = new jsPDF();
    const marginLeft = 14;
    const marginTop = 10;
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    let yPosition = marginTop;

    doc.setFontSize(14);
    doc.text(`Exported ${file_name}`, marginLeft, yPosition);
    yPosition += 20;
    doc.setFontSize(7);
    const totalWidth = columnWidths.reduce((acc, width) => acc + width, 0);
    const startX = (pageWidth - totalWidth) / 2;

    headers.forEach((header, index) => {
        const xPosition =
            startX +
            columnWidths.slice(0, index).reduce((acc, width) => acc + width, 0);
        doc.text(header, xPosition, yPosition);
    });

    yPosition += 12;

    doc.setFontSize(7);
    rows.forEach((row) => {
        if (yPosition > pageHeight - 20) {
            doc.addPage();
            yPosition = marginTop + 10;

            headers.forEach((header, index) => {
                const xPosition =
                    startX +
                    columnWidths
                        .slice(0, index)
                        .reduce((acc, width) => acc + width, 0);
                doc.text(header, xPosition, yPosition);
            });
            yPosition += 12;
        }

        row.forEach((cell, colIndex) => {
            const xPosition =
                startX +
                columnWidths
                    .slice(0, colIndex)
                    .reduce((acc, width) => acc + width, 0);
            doc.text(String(cell), xPosition, yPosition);
        });

        yPosition += 8;
    });

    doc.save(`exported-${file_name}.pdf`);
};


// Convert key to value
export const keyToValue = (text: string, replaceWith: string = " "): string => {
    try {
        return text
            .replace(/_/g, replaceWith)
            .toLowerCase()
            .replace(/^./, (char) => char.toUpperCase());
    } catch (error) {
        return text;
    }
};

// Convert value to key
export const valueToKey = (text: string, separator: string = "_"): string => {
    try {
        return text.replace(/\s+/g, separator).toLowerCase();
    } catch (error) {
        return text;
    }
};


export const getToken = () => {
    if (typeof window !== "undefined") {
        return window.localStorage.getItem("token");
    }
};


export const normalizeDate = (date) => {
    const normalized = new Date(date);
    normalized.setHours(0, 0, 0, 0);
    return normalized;
};



export const getFilterableUrl = (url, filters) => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
        if (
            value !== null &&
            value !== undefined &&
            value !== "" &&
            value !== "null"
        ) {
            params.append(key, value);
        }
    });

    const queryString = params.toString();
    return queryString ? `${url}?${queryString}` : url;
};

export const handlePageChange = (page, hookFn) => {
    hookFn((prevState) => ({
        ...prevState,
        page: page,
    }));
};

export const onCopy = (textToCopy) => {
    const cleanText = textToCopy?.toString().trim();
    navigator.clipboard
        .writeText(cleanText)
        .then(() => {
            toast.success("Copied!");
        })
        .catch((err) => {
            toast.error("Failed to copy: " + err.message);
        });
}